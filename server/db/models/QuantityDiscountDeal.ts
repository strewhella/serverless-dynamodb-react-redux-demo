export interface QuantityDiscountDeal {
    clientId?: string;
    sku?: string;
    minimumQuantity: number;
    discountedPrice: number;
}
