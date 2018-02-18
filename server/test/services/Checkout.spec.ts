import { Checkout } from '../../../client/src/cart/Checkout';
import { DiscountDealProcessor } from '../../../client/src/cart/deals/DiscountDealProcessor';
import { CheaperQuantityDealProcessor } from '../../../client/src/cart/deals/CheaperQuantityDealProcessor';
import { QuantityDiscountDealProcessor } from '../../../client/src/cart/deals/QuantityDiscountDealProcessor';
import { Product } from '../../db/models/Product';
import { PricingDeals } from '../../models/PricingDeals';
import { DealProcessor } from '../../../client/src/cart/deals/DealProcessor';
import pricingDealFilter from '../../../client/src/cart/deals/pricingDealFilter';

let checkout: Checkout;
let processors: Array<DealProcessor>;
let allPricingDeals: PricingDeals;
let products: Array<Product>;

const createCheckout = (clientId: string) => {
    return new Checkout(
        products,
        pricingDealFilter(allPricingDeals, clientId),
        processors
    );
};

beforeEach(() => {
    products = require('../../db/seed/products.json') as Array<Product>;
    allPricingDeals = {
        discountDeals: require('../../db/seed/discountDeals.json'),
        cheaperQuantitiesDeals: require('../../db/seed/cheaperQuantitiesDeals.json'),
        quantityDiscountDeals: require('../../db/seed/quantityDiscountDeals.json')
    };
    processors = [
        new DiscountDealProcessor(),
        new CheaperQuantityDealProcessor(),
        new QuantityDiscountDealProcessor()
    ];
});

test('should calculate default client correctly', () => {
    checkout = createCheckout('default');

    checkout.add('classic', 1);
    checkout.add('standout', 1);
    checkout.add('premium', 1);

    let total = checkout.getTotal();

    expect(total).toBe(987.97);
});

test('should calculate Unilever client correctly', () => {
    checkout = createCheckout('unilever');

    checkout.add('classic', 3);
    checkout.add('premium', 1);

    let total = checkout.getTotal();

    expect(total).toBe(934.97);
});

test('should calculate Apple client correctly', () => {
    checkout = createCheckout('apple');

    checkout.add('standout', 3);
    checkout.add('premium', 1);

    let total = checkout.getTotal();

    expect(total).toBe(1294.96);
});

test('should calculate Nike client correctly', () => {
    checkout = createCheckout('nike');

    checkout.add('premium', 4);

    let total = checkout.getTotal();

    expect(total).toBe(1519.96);
});

test('should calculate Ford client correctly', () => {
    checkout = createCheckout('ford');

    checkout.add('classic', 5);
    checkout.add('standout', 2);
    checkout.add('premium', 3);

    let total = checkout.getTotal();

    expect(total).toBe(1079.96 + 619.98 + 1169.97);
});
