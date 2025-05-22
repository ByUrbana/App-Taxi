import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiPayoutSessionEntity } from '@urbana/database/taxi/taxi-payout-session.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreatePayoutSessionInput } from '../../dto/create-payout-session.input';
import { ExportSessionToCsvInput } from '../../dto/export-session-to-csv.input';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { json2csv } from 'json-2-csv';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { RunAutoPayoutInput } from '../../dto/run-auto-payout.input';
import { PayoutMethodType } from '@urbana/database/enums/payout-method-type.enum';
import Stripe from 'stripe';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { DriverDeductTransactionType } from '@urbana/database/enums/driver-deduct-transaction-type.enum';
import { DriverExportCSV } from './dto/driver-export-csv';
import { ForbiddenError } from '@nestjs/apollo';
import { TaxiPayoutSessionPayoutMethodDetailEntity } from '@urbana/database/taxi/taxi-payout-session-payout-method-detail.entity';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';

@Injectable()
export class TaxiPayoutService {
  constructor(
    @InjectRepository(TaxiPayoutSessionEntity)
    private payoutSessionRepository: Repository<TaxiPayoutSessionEntity>,
    @InjectRepository(TaxiPayoutSessionPayoutMethodDetailEntity)
    private payoutSessionPayoutMethodDetailRepository: Repository<TaxiPayoutSessionPayoutMethodDetailEntity>,
    @InjectRepository(DriverTransactionEntity)
    private driverTransactionRepository: Repository<DriverTransactionEntity>,
    @InjectRepository(DriverWalletEntity)
    private driverWalletRepository: Repository<DriverWalletEntity>,
  ) {}

  async createPayoutSession(
    operatorId: number,
    input: CreatePayoutSessionInput,
  ): Promise<TaxiPayoutSessionEntity> {
    const driverWallets = await this.driverWalletRepository.find({
      where: {
        currency: input.currency,
        balance: MoreThan(input.minimumAmount),
      },
      relations: ['driver', 'driver.payoutAccounts'],
    });
    if (driverWallets.length === 0) {
      throw new ForbiddenError('No drivers to payout with these filters');
    }
    const session = this.payoutSessionRepository.create({
      createdByOperatorId: operatorId,
      currency: input.currency,
      description: input.description,
      totalAmount: 0,
      payoutMethods: input.payoutMethodIds.map((id) => ({ id })),
    });
    let payoutSession = await this.payoutSessionRepository.save(session);
    for (const payoutMethod of input.payoutMethodIds) {
      const detail = this.payoutSessionPayoutMethodDetailRepository.create({
        payoutSessionId: payoutSession.id,
        payoutMethodId: payoutMethod,
        status: PayoutSessionStatus.PENDING,
      });
      await this.payoutSessionPayoutMethodDetailRepository.save(detail);
    }
    let totalAmount = 0;
    const payoutSessionPayoutMethodDetails =
      await this.payoutSessionPayoutMethodDetailRepository.find({
        where: {
          payoutSessionId: payoutSession.id,
        },
      });

    driverWallets.forEach(async (driverWallet) => {
      const defaultPayoutAccount = driverWallet.driver.payoutAccounts.find(
        (account) => account.isDefault,
      );
      if (defaultPayoutAccount) {
        totalAmount += driverWallet.balance;
        const transaction = this.driverTransactionRepository.create({
          driverId: driverWallet.driver.id,
          amount: driverWallet.balance,
          currency: driverWallet.currency,
          status: TransactionStatus.Processing,
          action: TransactionAction.Deduct,
          deductType: DriverDeductTransactionType.Withdraw,
          payoutSessionId: payoutSession.id,
          payoutAccountId: defaultPayoutAccount.id,
          payoutMethodId: defaultPayoutAccount.payoutMethodId,
          payoutSessionMethodId: payoutSessionPayoutMethodDetails.find(
            (detail) =>
              detail.payoutMethodId === defaultPayoutAccount.payoutMethodId,
          )?.id,
        });
        await this.driverTransactionRepository.save(transaction);
      }
    });

    await this.payoutSessionRepository.update(payoutSession.id, {
      totalAmount,
    });
    payoutSession = await this.payoutSessionRepository.findOneBy({
      id: session.id,
    });

    return payoutSession;
  }

  async exportToCsv(input: ExportSessionToCsvInput): Promise<{ url: string }> {
    const driverTransactions = await this.driverTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['driver', 'payoutAccount', 'payoutMethod'],
    });
    const result: DriverExportCSV[] = driverTransactions.map((transaction) => {
      return {
        transactionId: transaction.id,
        driverFirstName: transaction.driver.firstName,
        driverLastName: transaction.driver.lastName,
        amount: transaction.amount,
        currency: transaction.currency,
        accountNumber: transaction.payoutAccount.accountNumber,
        routingNumber: transaction.payoutAccount.routingNumber,
        bankName: transaction.payoutAccount.bankName,
        branchName: transaction.payoutAccount.branchName,
        accountHolderName: transaction.payoutAccount.accountHolderName,
        accountHolderCountry: transaction.payoutAccount.accountHolderCountry,
        accountHolderState: transaction.payoutAccount.accountHolderState,
        accountHolderCity: transaction.payoutAccount.accountHolderCity,
        accountHolderAddress: transaction.payoutAccount.accountHolderAddress,
        accountHolderZip: transaction.payoutAccount.accountHolderZip,
      };
    });
    const str = await json2csv(result);
    const fileName = `${new Date().getTime().toString()}.csv`;
    await writeFile(
      join(process.cwd(), 'uploads', `${new Date().getTime().toString()}.csv`),
      str,
    );
    return {
      url: `uploads/${fileName}`,
    };
  }

  async runAutoPayout(input: RunAutoPayoutInput) {
    const driverTransactions = await this.driverTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['driver', 'payoutAccount', 'payoutMethod'],
    });
    for (const transaction of driverTransactions) {
      if (transaction.payoutMethod.type == PayoutMethodType.Stripe) {
        const instance = new Stripe(transaction.payoutMethod.privateKey!, {
          apiVersion: '2022-11-15',
        });
        const stripeTransaction = await instance.transfers.create({
          amount: Math.floor(transaction.amount * 100),
          currency: transaction.currency,
          destination: transaction.payoutAccount.token,
          description: 'Payout',
        });
        this.driverWalletRepository.decrement(
          {
            driverId: transaction.driverId,
            currency: transaction.currency,
          },
          'balance',
          transaction.amount,
        );
        await this.driverTransactionRepository.update(transaction.id, {
          status: TransactionStatus.Done,
          refrenceNumber: stripeTransaction.id,
        });
      }
    }
  }
}
