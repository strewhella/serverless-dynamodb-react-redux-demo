import { Client } from '../../../server/db/models/Client';
import { Product } from '../../../server/db/models/Product';

export class ActionCreators {
    addItem = (item: Product) => {
        return {
            type: 'addItem',
            item
        };
    };

    removeItem = (item: Product) => {
        return {
            type: 'removeItem',
            item
        };
    };

    resetCart = () => {
        return {
            type: 'resetCart'
        };
    };

    getClients = () => {
        return {
            type: 'getClients',
            method: 'GET',
            url: '/api/client'
        };
    };

    getProducts = () => {
        return {
            type: 'getProducts',
            method: 'GET',
            url: '/api/product'
        };
    };

    getPricingDeals = (clientId: string) => {
        return {
            type: 'getPricingDeals',
            method: 'GET',
            url: `/api/pricing-deal/${clientId}`
        };
    };

    selectClient = (client?: Client) => {
        return {
            type: 'selectClient',
            client
        };
    };

    httpError = (key: string) => {
        return {
            type: 'httpError',
            key
        };
    };

    httpLoading = (key: string) => {
        return {
            type: 'httpLoading',
            key
        };
    };

    httpSuccess = (key: string, body: any) => {
        return {
            type: 'httpSuccess',
            key,
            body
        };
    };
}
