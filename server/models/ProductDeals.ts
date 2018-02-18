import { CheaperQuantityDeal } from '../db/models/CheaperQuantityDeal';
import { DiscountDeal } from '../db/models/DiscountDeal';
import { QuantityDiscountDeal } from '../db/models/QuantityDiscountDeal';

export interface ProductDeals {
    cheaperQuantitiesDeal?: CheaperQuantityDeal;
    discountDeal?: DiscountDeal;
    quantityDiscountDeal?: QuantityDiscountDeal;
}
