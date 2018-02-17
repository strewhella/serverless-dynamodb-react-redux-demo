const AWS = require('aws-sdk-mock');
import getClients from '../handlers/getClients';
import { Client } from '../models/Client';
import { Response } from '../models/Response';
const createContext = require('aws-lambda-mock-context');

let context: AWSLambda.Context;
let clients: Array<Client>;

beforeEach(() => {
    context = createContext();
    clients = require('../db/seed/clients.json');

    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
        callback(null, { Items: clients });
    });
});

afterEach(() => {
    AWS.restore();
});

test('should return OK with all clients', done => {
    getClients({}, context, (err: Error, response: Response<Array<Client>>) => {
        expect(!err);
        expect(response.body.length === clients.length);
        expect(response.statusCode === 200);
        done();
    });
});

test('should return ServiceUnavailable on error', done => {
    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
        callback(new Error());
    });

    getClients({}, context, (err: Error, response: Response<{}>) => {
        expect(!err);
        expect(response.statusCode === 503);
        done();
    });
});
