import { ProductDeals } from '../../models/ProductDeals';

export class DealProcessor {
    calculateUnitPrice(
        price: number,
        deals: ProductDeals,
        quantity: number
    ): number {
        return price;
    }

    calculateChargeQuantity(deals: ProductDeals, quantity: number): number {
        return quantity;
    }
}
