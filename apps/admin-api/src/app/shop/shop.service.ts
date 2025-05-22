import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopCategoryStatus } from '@urbana/database/shop/enums/shop-category-status.enum';
import { ShopCategoryEntity } from '@urbana/database/shop/shop-category.entity';
import { ShopEntity } from '@urbana/database/shop/shop.entity';
import { In, Repository } from 'typeorm';
import { ShopFiltersInput } from './input/shop-filters.input';
import { ShopDeliveryZoneEntity } from '@urbana/database/shop/shop-delivery-zone.entity';
import { RiderAddressEntity } from '@urbana/database/rider-address.entity';
import { DispatcherShopDTO } from './dto/dispatcher-shop.dto';
import { ItemCategoryFiltersInput } from './input/item-category-filters.input';
import { ItemCategoryDTO } from './dto/item-category.dto';
import { ProductCategoryEntity } from '@urbana/database/shop/product.category.entity';
import { ShopProductPresetEntity } from '@urbana/database/shop/shop-product-preset.entity';
import { ShopOrderInput } from './input/shop-order.input';
import { ShopOrderDTO } from './dto/shop-order.dto';
import { ShopOrderEntity } from '@urbana/database/shop/shop-order.entity';
import { ShopOrderCartEntity } from '@urbana/database/shop/shop-order-cart.entity';
import { ShopOrderCartProductEntity } from '@urbana/database/shop/shop-order-cart-product.entity';
import { ProductOptionEntity } from '@urbana/database/shop/product-option.entity';
import { ProductVariantEntity } from '@urbana/database/shop/product-variant.entity';
import { CalculateDeliveryFeeInput } from './input/calculate-delivery-fee.input';
import { CalculateDeliveryFeeDTO } from './dto/calculate-delivery-fee.dto';
import { CancelShopOrderCartsInput } from './input/cancel-shop-order-carts.input';
import { CartStatus } from '@urbana/database/shop/enums/shop-order-cart-status.enum';
import { ShopWalletService } from './shop-wallet.service';
import { TransactionType } from '@urbana/database/enums/transaction-type.enum';
import { ShopTransactionDebitType } from '@urbana/database/shop/enums/shop-transaction-debit-type.enum';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { RiderRechargeTransactionType } from '@urbana/database/enums/rider-recharge-transaction-type.enum';
import { RemoveItemFromCartInput } from './input/remove-item-from-cart.input';
import { SharedCustomerWalletService } from '@urbana/customer-wallet';
import { DeliveryFeeService } from '@urbana/shop';

@Injectable()
export class ShopService {
  constructor(
    private shopWalletService: ShopWalletService,
    private sharedCustomerWalletService: SharedCustomerWalletService,
    @InjectRepository(ShopEntity)
    private shopRepository: Repository<ShopEntity>,
    @InjectRepository(ShopCategoryEntity)
    private shopCategoryRepository: Repository<ShopCategoryEntity>,
    @InjectRepository(ShopDeliveryZoneEntity)
    private shopDeliveryZoneRepository: Repository<ShopDeliveryZoneEntity>,
    @InjectRepository(RiderAddressEntity)
    private riderAddressRepository: Repository<RiderAddressEntity>,
    @InjectRepository(ProductCategoryEntity)
    private itemCategoryRepository: Repository<ProductCategoryEntity>,
    @InjectRepository(ShopProductPresetEntity)
    private shopProductPresetRepository: Repository<ShopProductPresetEntity>,
    @InjectRepository(ShopOrderCartEntity)
    private shopOrderCartRepository: Repository<ShopOrderCartEntity>,
    @InjectRepository(ShopOrderCartProductEntity)
    private shopOrderCartProductRepository: Repository<ShopOrderCartProductEntity>,
    @InjectRepository(ProductVariantEntity)
    private itemVariantRepository: Repository<ProductVariantEntity>,
    @InjectRepository(ProductOptionEntity)
    private itemOptionRepository: Repository<ProductOptionEntity>,
    @InjectRepository(ShopOrderEntity)
    private shopOrderRepository: Repository<ShopOrderEntity>,
    private deliveryFeeService: DeliveryFeeService,
  ) {}

  async getShopCategories() {
    return this.shopCategoryRepository.find({
      where: { status: ShopCategoryStatus.Enabled },
    });
  }

  async getShops(input: ShopFiltersInput): Promise<DispatcherShopDTO[]> {
    const address = await this.riderAddressRepository.findOneBy({
      id: input.addressId,
    });
    const regionQuery =
      this.shopDeliveryZoneRepository.createQueryBuilder('deliveryZone');
    // find delivery regions that are within the address
    regionQuery.where(
      `ST_Within(st_geomfromtext('POINT(:lat :lng)'), deliveryZone.region)`,
      { lat: address.location.lat, lng: address.location.lng },
    );
    const regions = await regionQuery.getMany();
    const regionIds = regions.map((region) => region.id);
    const query = this.shopRepository.createQueryBuilder('shop');
    query.leftJoinAndSelect('shop.deliveryZones', 'deliveryZone');
    query.leftJoinAndSelect('shop.reviews', 'reviews');
    query.leftJoinAndSelect('shop.image', 'image');
    // search where shop is in the category
    if (input.categoryId) {
      query.where('category.id = :categoryId', {
        categoryId: input.categoryId,
      });
    }
    // search where delivery region is within the address
    query.where('deliveryZone.id IN (:...regionIds)', { regionIds });
    // If input.query is not empty, search where shop name contains input.query
    if (input.query) {
      query.where('shop.name LIKE :query', { query: `%${input.query}%` });
    }
    const shops = await query.getMany();
    return shops.map((shop) => {
      // find the first delivery region that is within the address
      const deliveryZone = shop.deliveryZones.find((region) =>
        regionIds.includes(region.id),
      );
      return {
        ...shop,
        deliveryFee: deliveryZone.deliveryFee,
        minimumOrderAmount: deliveryZone.minimumOrderAmount,
        minDeliveryTime: deliveryZone.minDeliveryTimeMinutes,
        maxDeliveryTime: deliveryZone.maxDeliveryTimeMinutes,
        rating: shop.feedbacks.reduce((acc, review) => acc + review.score, 0),
      };
    });
  }

  async getItemCategories(
    input: ItemCategoryFiltersInput,
  ): Promise<ItemCategoryDTO[]> {
    const queryPreset =
      this.shopProductPresetRepository.createQueryBuilder('preset');
    // search where present belongs to the shop and is within the time
    queryPreset.where('preset.shopId = :shopId', { shopId: input.shopId });
    queryPreset.andWhere(
      `:timeOfDay BETWEEN preset.timeOfDayStart AND preset.timeOfDayEnd`,
      { timeOfDay: input.timeOfDay },
    );
    const presets = await queryPreset.getMany();
    const presetIds = presets.map((preset) => preset.id);

    const queryItemCategory =
      this.itemCategoryRepository.createQueryBuilder('itemCategory');
    queryItemCategory.leftJoinAndSelect('itemCategory.items', 'item');
    // search where the item belongs to the preset
    queryItemCategory.where('item.presetId IN (:...presetIds)', { presetIds });
    const itemCategories = await queryItemCategory.getMany();
    return itemCategories;
  }

  async createOrder(input: ShopOrderInput): Promise<ShopOrderDTO> {
    let shopOrder = new ShopOrderEntity();
    shopOrder.deliveryAddressId = input.deliveryAddressId;
    shopOrder.deliveryMethod = input.deliveryMethod;
    for (const cart of input.carts) {
      const shopOrderCart = new ShopOrderCartEntity();
      shopOrderCart.shopId = cart.shopId;
      shopOrderCart.orderId = shopOrder.id;
      let cartSubtotal = 0;
      for (const item of cart.items) {
        const variant = await this.itemVariantRepository.findOne({
          where: { id: item.itemVariantId },
        });
        const options = await this.itemOptionRepository.find({
          where: { id: In(item.itemOptionIds) },
        });
        cartSubtotal += variant.basePrice;
        cartSubtotal += options.reduce((acc, option) => acc + option.price, 0);
        const shopOrderCartItem = new ShopOrderCartProductEntity();
        shopOrderCartItem.productVariantId = variant.id;
        shopOrderCartItem.quantity = item.quantity;
        shopOrderCartItem.options = options;
        shopOrderCart.products.push(shopOrderCartItem);
      }
      shopOrderCart.subtotal = cartSubtotal;
      shopOrder.carts.push(shopOrderCart);
      shopOrder.subTotal += cartSubtotal;
    }
    shopOrder = await this.shopOrderRepository.save(shopOrder);
    return shopOrder;
  }

  async calculateDeliveryFee(
    input: CalculateDeliveryFeeInput,
  ): Promise<CalculateDeliveryFeeDTO> {
    return this.deliveryFeeService.calculateDeliveryFee({
      shopIds: input.carts.map((cart) => cart.shopId),
      deliveryAddressId: input.deliveryAddressId,
      totalItems: input.carts.reduce((acc, cart) => acc + cart.items.length, 0),
      produtIds: input.carts.reduce(
        (acc, cart) => acc.concat(cart.items.map((item) => item.productId)),
        [],
      ),
    });
  }

  async cancelShopOrderCarts(input: CancelShopOrderCartsInput) {
    const carts = await this.shopOrderCartRepository.find({
      where: { id: In(input.cartIds) },
    });
    const order = await this.shopOrderRepository.findOne({
      where: { id: carts[0].orderId },
    });
    for (const cart of carts) {
      cart.status = CartStatus.CanceledByShop;
      await this.shopWalletService.recordTransaction({
        status: TransactionStatus.Done,
        shopId: cart.shopId,
        currency: order.currency,
        amount: cart.subtotal,
        transactionDate: new Date(),
        type: TransactionType.Debit,
        debitType: ShopTransactionDebitType.Refund,
        shopOrderCartId: cart.id,
      });
      await this.sharedCustomerWalletService.rechargeWallet({
        status: TransactionStatus.Done,
        currency: order.currency,
        amount: cart.subtotal,
        action: TransactionAction.Recharge,
        rechargeType: RiderRechargeTransactionType.Correction,
        riderId: order.customerId,
      });
    }
    await this.shopOrderCartRepository.save(carts);
  }

  async removeItemFromCart(input: RemoveItemFromCartInput) {
    const cart = await this.shopOrderCartRepository.findOne({
      where: { id: input.cartId },
      relations: {
        products: true,
        order: true,
      },
    });
    let refundable = 0;
    input.cancelables.forEach(async (cancelable) => {
      const cartItem = await this.shopOrderCartProductRepository.findOne({
        where: { id: cancelable.shopOrderCartItemId },
      });
      this.shopOrderCartProductRepository.update(
        cancelable.shopOrderCartItemId,
        {
          canceledQuantity: cancelable.cancelQuantity,
        },
      );
      refundable += cancelable.cancelQuantity * cartItem.priceEach;
    });
    cart.subtotal -= refundable;
    await this.shopWalletService.recordTransaction({
      status: TransactionStatus.Done,
      shopId: cart.shopId,
      currency: cart.order.currency,
      amount: refundable,
      transactionDate: new Date(),
      type: TransactionType.Debit,
      debitType: ShopTransactionDebitType.Refund,
      shopOrderCartId: cart.id,
    });
    await this.sharedCustomerWalletService.rechargeWallet({
      status: TransactionStatus.Done,
      currency: cart.order.currency,
      amount: refundable,
      action: TransactionAction.Recharge,
      rechargeType: RiderRechargeTransactionType.Correction,
      riderId: cart.order.customerId,
    });
    await this.shopOrderCartRepository.save(cart);
  }
}
