import { PricingDeals } from '../../../../server/models/PricingDeals';

export default (pricingDeals: PricingDeals, clientId: string) => {
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
