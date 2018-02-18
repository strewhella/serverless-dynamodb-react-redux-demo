import { DealProcessor } from './DealProcessor';
import { ProductDeals } from '../../models/ProductDeals';

export class QuantityDiscountDealProcessor extends DealProcessor {
    calculateUnitPrice(
        price: number,
        deals: ProductDeals,
        quantity: number
    ): number {
        if (
            deals.quantityDiscountDeal &&
            quantity >= deals.quantityDiscountDeal.minimumQuantity
        ) {
            return deals.quantityDiscountDeal.discountedPrice;
        }
        return price;
    }
}
