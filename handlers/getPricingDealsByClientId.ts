import { Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { Response } from '../models/Response';
import { PricingDealService } from '../services/PricingDealService';
import { PricingDeals } from '../models/PricingDeals';

export default (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    let clientId = event.pathParameters.clientId;
    let service = new PricingDealService();

    service
        .getPricingDealsByClientId(clientId)
        .then((deals: PricingDeals) => {
            callback(null, Response.ok(deals));
        })
        .catch(err => {
            callback(null, Response.serviceUnavailable());
        });
};
