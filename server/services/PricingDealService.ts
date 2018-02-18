import { DynamoDbService } from './DynamoDbService';
import { PricingDeals } from '../models/PricingDeals';
import { DiscountDeal } from '../db/models/DiscountDeal';
import { CheaperQuantityDeal } from '../db/models/CheaperQuantityDeal';
import { QuantityDiscountDeal } from '../db/models/QuantityDiscountDeal';

export class PricingDealService extends DynamoDbService {
    getPricingDealsByClientId(clientId: string): Promise<PricingDeals> {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getDiscountDealsByClientId(clientId),
                this.getCheaperQuantitiesDealsByClientId(clientId),
                this.getQuantityDiscountDealsByClientId(clientId)
            ])
                .then(deals => {
                    resolve({
                        discountDeals: deals[0],
                        cheaperQuantitiesDeals: deals[1],
                        quantityDiscountDeals: deals[2]
                    });
                })
                .catch(reject);
        });
    }

    getDiscountDealsByClientId(clientId: string): Promise<Array<DiscountDeal>> {
        return this.getAllByHashKey('DiscountDeal', 'clientId', clientId);
    }

    getCheaperQuantitiesDealsByClientId(
        clientId: string
    ): Promise<Array<CheaperQuantityDeal>> {
        return this.getAllByHashKey(
            'CheaperQuantitiesDeal',
            'clientId',
            clientId
        );
    }

    getQuantityDiscountDealsByClientId(
        clientId: string
    ): Promise<Array<QuantityDiscountDeal>> {
        return this.getAllByHashKey(
            'QuantityDiscountDeal',
            'clientId',
            clientId
        );
    }
}
