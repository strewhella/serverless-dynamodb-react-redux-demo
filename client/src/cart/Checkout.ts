import { Product } from '../../../server/db/models/Product';
import { ProductDeals } from '../models/ProductDeals';
import { DealProcessor } from './deals/DealProcessor';
import { DiscountDealProcessor } from './deals/DiscountDealProcessor';
import { CheaperQuantityDealProcessor } from './deals/CheaperQuantityDealProcessor';
import { QuantityDiscountDealProcessor } from './deals/QuantityDiscountDealProcessor';
import { PricingDeals } from '../../../server/models/PricingDeals';

export class Checkout {
    private cart: { [sku: string]: number };

    constructor(
        private products: Array<Product>,
        private pricingDeals: PricingDeals,
        private processors?: Array<DealProcessor>
    ) {
        this.cart = {};
        processors = processors || Checkout.configuredProcessors();
    }

    static configuredProcessors(): Array<DealProcessor> {
        return [
            new DiscountDealProcessor(),
            new CheaperQuantityDealProcessor(),
            new QuantityDiscountDealProcessor()
        ];
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

        return {
            discountDeal: discountDeals.find(d => d.sku === sku),
            cheaperQuantitiesDeal: cheaperQuantitiesDeals.find(
                d => d.sku === sku
            ),
            quantityDiscountDeal: quantityDiscountDeals.find(d => d.sku === sku)
        };
    }
}
