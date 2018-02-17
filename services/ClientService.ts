import { Client } from '../models/Client';
import { DynamoDB } from 'aws-sdk';

const DYNAMODB_ENDPOINT = 'http://localhost:8000';

export class ClientService {
    private client: DynamoDB.DocumentClient;

    constructor() {
        this.client = new DynamoDB.DocumentClient({
            endpoint: DYNAMODB_ENDPOINT,
            region: 'ap-southeast-2'
        });
    }

    getClients(): Promise<Array<Client>> {
        return new Promise((resolve, reject) => {
            this.client.scan(
                {
                    TableName: 'Client'
                },
                (err: Error, result: DynamoDB.DocumentClient.ScanOutput) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }

                    resolve(result.Items as Array<Client>);
                }
            );
        });
    }
}
