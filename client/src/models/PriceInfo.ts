import { CheaperQuantityDeal } from '../../../server/db/models/CheaperQuantityDeal';
import { QuantityDiscountDeal } from '../../../server/db/models/QuantityDiscountDeal';

export interface PriceInfo {
    price: number;
    discount: number;
    cheaperQuantity?: CheaperQuantityDeal;
    quantityDiscount?: QuantityDiscountDeal;
}
