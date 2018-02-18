import { PricingDeals } from '../../../../server/models/PricingDeals';
import { ProductDeals } from '../../models/ProductDeals';

export const filterPricingDealsByClientId = (
    pricingDeals: PricingDeals,
    clientId: string
) => {
    return {
        discountDeals: pricingDeals.discountDeals.filter(
            d => d.clientId === clientId
        ),
        cheaperQuantitiesDeals: pricingDeals.cheaperQuantitiesDeals.filter(
            d => d.clientId === clientId
        ),
        quantityDiscountDeals: pricingDeals.quantityDiscountDeals.filter(
            d => d.clientId === clientId
        )
    };
};

export const findProductDealsBySku = (
    pricingDeals: PricingDeals,
    sku: string
): ProductDeals => {
    return {
        discountDeal: pricingDeals.discountDeals.find(d => d.sku === sku),
        cheaperQuantitiesDeal: pricingDeals.cheaperQuantitiesDeals.find(
            d => d.sku === sku
        ),
        quantityDiscountDeal: pricingDeals.quantityDiscountDeals.find(
            d => d.sku === sku
        )
    };
};
