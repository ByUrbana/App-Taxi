import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ShopCategoryEntity } from '@urbana/database/shop/shop-category.entity';
import { ShopEntity } from '@urbana/database/shop/shop.entity';
import { ShopCategoryDTO } from './dto/shop-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MediaEntity } from '@urbana/database/media.entity';
import { ShopDTO } from './dto/shop.dto';
import { ShopDeliveryZoneEntity } from '@urbana/database/shop/shop-delivery-zone.entity';
import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderAddressEntity } from '@urbana/database/rider-address.entity';
import { ShopProductPresetEntity } from '@urbana/database/shop/shop-product-preset.entity';
import { ProductEntity } from '@urbana/database/shop/product.entity';
import { ProductCategoryEntity } from '@urbana/database/shop/product.category.entity';
import { ProductVariantEntity } from '@urbana/database/shop/product-variant.entity';
import { ShopItemPresetDTO } from './dto/shop-item-preset.dto';
import { ItemCategoryDTO } from './dto/item-category.dto';
import { ItemDTO } from './dto/item.dto';
import { ItemVariantDTO } from './dto/item-variant.dto';
import { ProductOptionEntity } from '@urbana/database/shop/product-option.entity';
import { ItemOptionDTO } from './dto/item-option.dto';
import { ShopOrderEntity } from '@urbana/database/shop/shop-order.entity';
import { ShopOrderCartEntity } from '@urbana/database/shop/shop-order-cart.entity';
import { ShopOrderCartProductEntity } from '@urbana/database/shop/shop-order-cart-product.entity';
import { GoogleServicesModule } from '@urbana/order/google-services/google-services.module';
import { ServiceEntity } from '@urbana/database/taxi/service.entity';
import { ServiceService } from '@urbana/order/service.service';
import { ShopOrderCartDTO } from './dto/shop-order-cart.dto';
import { ShopOrderCartItemDTO } from './dto/shop-order-cart-item.dto';
import { ShopOrderDTO } from './dto/shop-order.dto';
import { ShopSessionEntity } from '@urbana/database/shop/shop-session.entity';
import { ShopSupportRequestModule } from './modules/support-request/shop-support-request.module';
import { CreateShopCategoryInput } from './input/create-shop-category.input';
import { UpdateShopCategoryInput } from './input/update-shop-category.input';
import { ShopWalletEntity } from '@urbana/database/shop/shop-wallet.entity';
import { ShopOrderNoteEntity } from '@urbana/database/shop/shop-order-note.entity';
import { ShopOrderNoteDTO } from './dto/shop-order-note.dto';
import { CreateShopOrderNoteInput } from './input/create-shop-order-note.input';
import { ShopOrderStatusHistoryEntity } from '@urbana/database/shop/shop-order-status-history.entity';
import { ShopOrderStatusHistoryDTO } from './dto/shop-order-status-history.dto';
import { ShopTransactionEntity } from '@urbana/database/shop/shop-transaction.entity';
import { ShopTransactionDTO } from './dto/shop-transaction.dto';
import { ShopWalletDTO } from './dto/shop-wallet.dto';
import { ShopWalletService } from './shop-wallet.service';
import { SharedRiderService } from '@urbana/order/shared-rider.service';
import { SharedOrderModule } from '@urbana/order/shared-order.module';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { RiderWalletEntity } from '@urbana/database/rider-wallet.entity';
import { RiderTransactionEntity } from '@urbana/database/rider-transaction.entity';
import { CreateShopTransactionInput } from './input/create-shop-transaction.input';
import { ShopFeedbackModule } from './modules/feedback/shop-feedback.module';
import { ShopPayoutModule } from '../payout/modules/shop/shop-payout.module';
import { UpsertShopInput } from './input/shop.input';
import { ShopNoteEntity } from '@urbana/database/shop/shop-note.entity';
import { ShopNoteDTO } from './dto/shop-note.dto';
import { CreateShopNoteInput } from './input/create-shop-note.input';
import { ShopLoginSessionEntity } from '@urbana/database/shop/shop-login-session.entity';
import { ShopLoginSessionDTO } from './dto/shop-login-session.dto';
import { ShopLoginSessionService } from './shop-login-session.service';
import { ShopDeliveryZoneDTO } from './dto/shop-delivery-zone.dto';
import { CreateShopDeliveryZoneInput } from './input/create-shop-delivery-zone.input';
import { UpdateShopDeliveryZoneInput } from './input/update-shop-delivery-zone.input';
import { CreateItemCategoryInput } from './input/create-item-category.input';
import { UpdateItemCategoryInput } from './input/update-item-category.input';
import { CreateShopItemPresetInput } from './input/create-shop-item-preset.input';
import { UpdateShopItemPresetInput } from './input/update-shop-item-preset.input';
import { SharedCustomerWalletModule } from '@urbana/customer-wallet';
import { SharedShopModule } from '@urbana/shop';

@Module({
  imports: [
    GoogleServicesModule,
    ShopSupportRequestModule,
    ShopFeedbackModule,
    SharedOrderModule,
    SharedCustomerWalletModule,
    ShopPayoutModule,
    SharedShopModule,
    TypeOrmModule.forFeature([
      RiderAddressEntity,
      ServiceEntity,
      CustomerEntity,
      DriverEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ShopCategoryEntity,
          ShopEntity,
          ShopSessionEntity,
          ShopOrderCartEntity,
          ShopOrderCartProductEntity,
          ShopDeliveryZoneEntity,
          MediaEntity,
          ProductCategoryEntity,
          ProductEntity,
          ProductOptionEntity,
          ShopProductPresetEntity,
          ProductVariantEntity,
          ShopOrderEntity,
          ShopOrderCartEntity,
          ShopOrderNoteEntity,
          ShopNoteEntity,
          ShopOrderCartProductEntity,
          ShopWalletEntity,
          ShopOrderStatusHistoryEntity,
          ShopTransactionEntity,
          ShopLoginSessionEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ShopCategoryEntity,
          DTOClass: ShopCategoryDTO,
          CreateDTOClass: CreateShopCategoryInput,
          UpdateDTOClass: UpdateShopCategoryInput,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
        },
        {
          EntityClass: ShopEntity,
          DTOClass: ShopDTO,
          CreateDTOClass: UpsertShopInput,
          UpdateDTOClass: UpsertShopInput,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          enableTotalCount: true,
          enableAggregate: true,
        },
        {
          EntityClass: ShopLoginSessionEntity,
          DTOClass: ShopLoginSessionDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: ShopOrderNoteEntity,
          DTOClass: ShopOrderNoteDTO,
          guards: [JwtAuthGuard],
          CreateDTOClass: CreateShopOrderNoteInput,
          UpdateDTOClass: CreateShopOrderNoteInput,
          pagingStrategy: PagingStrategies.NONE,
          read: { one: { disabled: true } },
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: ShopNoteEntity,
          DTOClass: ShopNoteDTO,
          guards: [JwtAuthGuard],
          CreateDTOClass: CreateShopNoteInput,
          UpdateDTOClass: CreateShopNoteInput,
          pagingStrategy: PagingStrategies.NONE,
          read: { one: { disabled: true } },
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: ShopProductPresetEntity,
          DTOClass: ShopItemPresetDTO,
          CreateDTOClass: CreateShopItemPresetInput,
          UpdateDTOClass: UpdateShopItemPresetInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: ProductCategoryEntity,
          DTOClass: ItemCategoryDTO,
          CreateDTOClass: CreateItemCategoryInput,
          UpdateDTOClass: UpdateItemCategoryInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: ShopOrderStatusHistoryEntity,
          DTOClass: ShopOrderStatusHistoryDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: ProductEntity,
          DTOClass: ItemDTO,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: ProductVariantEntity,
          DTOClass: ItemVariantDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          EntityClass: ShopTransactionEntity,
          DTOClass: ShopTransactionDTO,
          CreateDTOClass: CreateShopTransactionInput,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: ShopDeliveryZoneEntity,
          DTOClass: ShopDeliveryZoneDTO,
          CreateDTOClass: CreateShopDeliveryZoneInput,
          UpdateDTOClass: UpdateShopDeliveryZoneInput,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: ProductOptionEntity,
          DTOClass: ItemOptionDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          EntityClass: ShopOrderEntity,
          DTOClass: ShopOrderDTO,
          pagingStrategy: PagingStrategies.OFFSET,
          enableAggregate: true,
          guards: [JwtAuthGuard],
          enableTotalCount: true,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: ShopWalletEntity,
          DTOClass: ShopWalletDTO,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: ShopOrderCartEntity,
          DTOClass: ShopOrderCartDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          EntityClass: ShopOrderCartProductEntity,
          DTOClass: ShopOrderCartItemDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [
    ShopService,
    ShopResolver,
    ServiceService,
    ShopWalletService,
    SharedRiderService,
    ShopLoginSessionService,
  ],
})
export class ShopModule {}
