import { Product } from '../db/models/Product';
import { CheaperQuantityDeal } from '../db/models/CheaperQuantityDeal';
import { DiscountDeal } from '../db/models/DiscountDeal';
import { QuantityDiscountDeal } from '../db/models/QuantityDiscountDeal';

export interface PricingDeals {
    cheaperQuantitiesDeals: Array<CheaperQuantityDeal>;
    discountDeals: Array<DiscountDeal>;
    quantityDiscountDeals: Array<QuantityDiscountDeal>;
}
