import { ProductDeals } from '../../../client/src/models/ProductDeals';
import { CheaperQuantityDealProcessor } from '../../../client/src/cart/deals/CheaperQuantityDealProcessor';

let processor: CheaperQuantityDealProcessor;
let deals: ProductDeals;

beforeEach(() => {
    processor = new CheaperQuantityDealProcessor();
});

test('should calculate charge quantity correctly with exact amount', () => {
    deals = {
        cheaperQuantitiesDeal: {
            purchasedQuantity: 3,
            chargedQuantity: 2
        }
    };

    let chargedQuantity = processor.calculateChargeQuantity(deals, 3);
    expect(chargedQuantity).toBe(2);
});

test('should calculate charge quantity correctly with multiple amount', () => {
    deals = {
        cheaperQuantitiesDeal: {
            purchasedQuantity: 3,
            chargedQuantity: 2
        }
    };

    let chargedQuantity = processor.calculateChargeQuantity(deals, 8);
    expect(chargedQuantity).toBe(6);
});

test('should calculate charge quantity correctly with below deal amount', () => {
    deals = {
        cheaperQuantitiesDeal: {
            purchasedQuantity: 3,
            chargedQuantity: 2
        }
    };

    let chargedQuantity = processor.calculateChargeQuantity(deals, 2);
    expect(chargedQuantity).toBe(2);
});
