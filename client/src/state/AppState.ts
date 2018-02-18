import { Client } from '../../../server/db/models/Client';
import { Product } from '../../../server/db/models/Product';
import { PricingDeals } from '../../../server/models/PricingDeals';
import { HttpResponse } from '../models/HttpResponse';

export class AppState {
    getClients: HttpResponse<Array<Client>>;
    getProducts: HttpResponse<Array<Product>>;
    getPricingDeals: HttpResponse<PricingDeals>;
    selectedClient: Client;
}
