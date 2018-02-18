const AWS = require('aws-sdk-mock');
import { Response } from '../models/Response';
import { PricingDeals } from '../models/PricingDeals';
import { DynamoDB } from 'aws-sdk';
import getPricingDealsByClientId from '../handlers/getPricingDealsByClientId';
import { APIGatewayEvent } from 'aws-lambda';
const createContext = require('aws-lambda-mock-context');

let context: AWSLambda.Context;
let pricingDeals: PricingDeals;
let clientId = 'ford';

const createEvent = (): APIGatewayEvent => {
    let event = require('./sampleEvent.json') as APIGatewayEvent;
    event.pathParameters = { clientId };
    return event;
};

beforeEach(() => {
    context = createContext();
    pricingDeals = {
        discountDeals: require('../db/seed/discountDeals.json'),
        cheaperQuantitiesDeals: require('../db/seed/cheaperQuantitiesDeals.json'),
        quantityDiscountDeals: require('../db/seed/quantityDiscountDeals.json')
    };

    AWS.mock(
        'DynamoDB.DocumentClient',
        'query',
        (params: DynamoDB.DocumentClient.QueryInput, callback) => {
            let items = [];
            if (params.TableName === 'DiscountDeal') {
                items = pricingDeals.discountDeals.filter(
                    d =>
                        d.clientId ===
                        params.ExpressionAttributeValues[':value']
                );
            } else if (params.TableName === 'CheaperQuantitiesDeal') {
                items = pricingDeals.cheaperQuantitiesDeals.filter(
                    d =>
                        d.clientId ===
                        params.ExpressionAttributeValues[':value']
                );
            } else if (params.TableName === 'QuantityDiscountDeal') {
                items = pricingDeals.quantityDiscountDeals.filter(
                    d =>
                        d.clientId ===
                        params.ExpressionAttributeValues[':value']
                );
            }

            callback(null, { Items: items });
        }
    );
});

afterEach(() => {
    AWS.restore();
});

test('should return OK with correct pricing deals', done => {
    getPricingDealsByClientId(
        createEvent(),
        context,
        (err: Error, response: Response<PricingDeals>) => {
            expect(!err);

            expect(response.body).toEqual({
                cheaperQuantitiesDeals: pricingDeals.cheaperQuantitiesDeals.filter(
                    d => d.clientId === clientId
                ),
                discountDeals: pricingDeals.discountDeals.filter(
                    d => d.clientId === clientId
                ),
                quantityDiscountDeals: pricingDeals.quantityDiscountDeals.filter(
                    d => d.clientId === clientId
                )
            });
            expect(response.statusCode === 200);
            done();
        }
    );
});

test('should return ServiceUnavailable on error', done => {
    AWS.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
        callback(new Error());
    });

    getPricingDealsByClientId(
        createEvent(),
        context,
        (err: Error, response: Response<{}>) => {
            expect(!err);
            expect(response.statusCode === 503);
            done();
        }
    );
});
