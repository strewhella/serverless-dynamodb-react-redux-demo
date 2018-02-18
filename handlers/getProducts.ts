import { Context, Callback } from 'aws-lambda';
import { Response } from '../models/Response';
import { Product } from '../db/models/Product';
import { ProductService } from '../services/ProductService';

export default (event, context: Context, callback: Callback) => {
    let service = new ProductService();

    service
        .getProducts()
        .then((products: Array<Product>) => {
            callback(null, Response.ok(products));
        })
        .catch(() => {
            callback(null, Response.serviceUnavailable());
        });
};
