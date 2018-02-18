import { ProductDeals } from '../../../client/src/models/ProductDeals';
import { QuantityDiscountDealProcessor } from '../../../client/src/cart/deals/QuantityDiscountDealProcessor';

let processor: QuantityDiscountDealProcessor;
let deals: ProductDeals;

beforeEach(() => {
    processor = new QuantityDiscountDealProcessor();
});

test('should return discount price when at minimum quantity', () => {
    deals = {
        quantityDiscountDeal: {
            discountedPrice: 10,
            minimumQuantity: 3
        }
    };

    let unitPrice = processor.calculateUnitPrice(20, deals, 3);
    expect(unitPrice).toBe(10);
});

test('should return discount price when higher than minimum quantity', () => {
    deals = {
        quantityDiscountDeal: {
            discountedPrice: 10,
            minimumQuantity: 3
        }
    };

    let unitPrice = processor.calculateUnitPrice(20, deals, 10);
    expect(unitPrice).toBe(10);
});

test('should return standard price when less than minimum quantity', () => {
    deals = {
        quantityDiscountDeal: {
            discountedPrice: 10,
            minimumQuantity: 3
        }
    };

    let unitPrice = processor.calculateUnitPrice(20, deals, 2);
    expect(unitPrice).toBe(20);
});
