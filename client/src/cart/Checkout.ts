import { Product } from '../../../server/db/models/Product';
import { ProductDeals } from '../models/ProductDeals';
import { DealProcessor } from './deals/DealProcessor';
import { DiscountDealProcessor } from './deals/DiscountDealProcessor';
import { CheaperQuantityDealProcessor } from './deals/CheaperQuantityDealProcessor';
import { QuantityDiscountDealProcessor } from './deals/QuantityDiscountDealProcessor';
import { PricingDeals } from '../../../server/models/PricingDeals';
import { PriceInfo } from '../models/PriceInfo';
import { findProductDealsBySku } from './deals/pricingDealFilter';

interface SkuPriceInfo {
    unitPrice: number;
    chargeQuantity: number;
}

export class Checkout {
    private cart: { [sku: string]: number };

    constructor(
        private products: Array<Product>,
        private pricingDeals: PricingDeals,
        private processors?: Array<DealProcessor>
    ) {
        this.cart = {};
        this.processors = processors || Checkout.configuredProcessors();
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
                let skuPriceInfo = this.calculateSkuPriceInfo(sku);
                return skuPriceInfo.chargeQuantity * skuPriceInfo.unitPrice;
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

    getPriceInfo(sku: string): PriceInfo {
        let quantity = this.cart[sku] || 0;
        let product = this.products.find(p => p.sku === sku);
        if (!product) {
            throw new Error(`sku ${sku} not found`);
        }

        let skuPriceInfo = this.calculateSkuPriceInfo(sku);
        let productDeals = findProductDealsBySku(this.pricingDeals, sku);

        if (skuPriceInfo.chargeQuantity < quantity) {
            skuPriceInfo.unitPrice =
                skuPriceInfo.unitPrice * skuPriceInfo.chargeQuantity / quantity;
        }

        return {
            price: skuPriceInfo.unitPrice,
            discount: product.price - skuPriceInfo.unitPrice,
            cheaperQuantity: productDeals.cheaperQuantitiesDeal,
            quantityDiscount: productDeals.quantityDiscountDeal
        };
    }

    private calculateSkuPriceInfo(sku: string): SkuPriceInfo {
        let deals = findProductDealsBySku(this.pricingDeals, sku);
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

        return { chargeQuantity, unitPrice };
    }
}
