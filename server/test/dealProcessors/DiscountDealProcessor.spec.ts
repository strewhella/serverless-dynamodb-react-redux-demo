import { ProductDeals } from '../../models/ProductDeals';
import { DiscountDealProcessor } from '../../deals/DiscountDealProcessor';

let processor: DiscountDealProcessor;
let deals: ProductDeals;

beforeEach(() => {
    processor = new DiscountDealProcessor();
});

test('should return discount price when lower', () => {
    deals = {
        discountDeal: {
            discountedPrice: 10
        }
    };

    let unitPrice = processor.calculateUnitPrice(20, deals, 3);
    expect(unitPrice).toBe(10);
});

test('should return standard price when lower', () => {
    deals = {
        discountDeal: {
            discountedPrice: 20
        }
    };

    let unitPrice = processor.calculateUnitPrice(10, deals, 3);
    expect(unitPrice).toBe(10);
});
