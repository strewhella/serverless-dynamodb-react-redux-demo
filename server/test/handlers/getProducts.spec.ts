const AWS = require('aws-sdk-mock');
import { Response } from '../../models/Response';
import { Product } from '../../db/models/Product';
import getProducts from '../../handlers/getProducts';
const createContext = require('aws-lambda-mock-context');

let context: AWSLambda.Context;
let products: Array<Product>;

beforeEach(() => {
    context = createContext();
    products = require('../../db/seed/products.json');

    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
        callback(null, { Items: products });
    });
});

afterEach(() => {
    AWS.restore();
});

test('should return OK with all products', done => {
    getProducts(
        {},
        context,
        (err: Error, response: Response<Array<Product>>) => {
            expect(!err);
            expect(response.body.length === products.length);
            expect(response.statusCode === 200);
            done();
        }
    );
});

test('should return ServiceUnavailable on error', done => {
    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
        callback(new Error());
    });

    getProducts({}, context, (err: Error, response: Response<{}>) => {
        expect(!err);
        expect(response.statusCode === 503);
        done();
    });
});
