import { Context, Callback } from 'aws-lambda';
import { ClientService } from '../services/ClientService';
import { Client } from '../models/Client';
import { Response } from '../models/Response';

export default (event, context: Context, callback: Callback) => {
    let service = new ClientService();

    service
        .getClients()
        .then((clients: Array<Client>) => {
            callback(null, Response.ok(clients));
        })
        .catch(() => {
            callback(null, Response.serviceUnavailable());
        });
};
