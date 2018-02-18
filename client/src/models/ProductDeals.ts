import { CheaperQuantityDeal } from '../../../server/db/models/CheaperQuantityDeal';
import { DiscountDeal } from '../../../server/db/models/DiscountDeal';
import { QuantityDiscountDeal } from '../../../server/db/models/QuantityDiscountDeal';

export interface ProductDeals {
    cheaperQuantitiesDeal?: CheaperQuantityDeal;
    discountDeal?: DiscountDeal;
    quantityDiscountDeal?: QuantityDiscountDeal;
}
