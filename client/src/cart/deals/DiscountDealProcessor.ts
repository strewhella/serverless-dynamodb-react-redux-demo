import { DealProcessor } from './DealProcessor';
import { ProductDeals } from '../../models/ProductDeals';

export class DiscountDealProcessor extends DealProcessor {
    calculateUnitPrice(
        price: number,
        deals: ProductDeals,
        quantity: number
    ): number {
        if (deals.discountDeal && deals.discountDeal.discountedPrice < price) {
            return deals.discountDeal.discountedPrice;
        }

        return price;
    }
}
