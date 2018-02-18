import { PricingDeals } from '../models/PricingDeals';
import { Product } from '../db/models/Product';
import { ProductDeals } from '../models/ProductDeals';
import { DealProcessor } from '../deals/DealProcessor';

export class Checkout {
    private cart: { [sku: string]: number };

    constructor(
        private products: Array<Product>,
        private pricingDeals: PricingDeals,
        private processors: Array<DealProcessor> = []
    ) {
        this.cart = {};
    }

    getTotal(): number {
        let total = Object.keys(this.cart)
            .map(sku => {
                let deals = this.getDealsBySku(sku);
                let product = this.products.find(p => p.sku === sku);

                let unitPrice = product.price;
                let chargeQuantity = this.cart[sku];

                this.processors.forEach(processor => {
                    unitPrice = processor.calculateUnitPrice(
                        unitPrice,
                        deals,
                        this.cart[sku]
                    );

                    chargeQuantity = processor.calculateChargeQuantity(
                        deals,
                        chargeQuantity
                    );
                });

                return chargeQuantity * unitPrice;
            })
            .reduce((prevPrice, currentPrice) => {
                return prevPrice + currentPrice;
            }, 0);

        return total;
    }

    add(sku: string, quantity: number): void {
        if (this.cart[sku]) {
            this.cart[sku] += quantity;
        } else {
            this.cart[sku] = quantity;
        }
    }

    private getDealsBySku(sku: string): ProductDeals {
        let {
            discountDeals,
            cheaperQuantitiesDeals,
            quantityDiscountDeals
        } = this.pricingDeals;

        let filter = d => d.sku === sku;

        return {
            discountDeal: discountDeals.find(filter),
            cheaperQuantitiesDeal: cheaperQuantitiesDeals.find(filter),
            quantityDiscountDeal: quantityDiscountDeals.find(filter)
        };
    }
}
