import { Client } from '../../../server/db/models/Client';

export class ActionCreators {
    getClients = () => {
        return {
            type: 'getClients',
            method: 'GET',
            url: '/api/client'
        };
    };

    selectClient = (client: Client) => {
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
