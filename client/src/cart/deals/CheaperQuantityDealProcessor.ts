import { DealProcessor } from './DealProcessor';
import { ProductDeals } from '../../models/ProductDeals';

export class CheaperQuantityDealProcessor extends DealProcessor {
    calculateChargeQuantity(deals: ProductDeals, quantity: number): number {
        let deal = deals.cheaperQuantitiesDeal;
        if (deal && quantity >= deal.purchasedQuantity) {
            let dealMultiples = Math.floor(quantity / deal.purchasedQuantity);
            let chargedQuantity =
                dealMultiples * deal.chargedQuantity +
                quantity % deal.purchasedQuantity;
            if (chargedQuantity < quantity) {
                return chargedQuantity;
            }
        }
        return quantity;
    }
}
