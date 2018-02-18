import { Client } from '../db/models/Client';
import { DynamoDB } from 'aws-sdk';
import { DynamoDbService } from './DynamoDbService';

export class ClientService extends DynamoDbService {
    getClients(): Promise<Array<Client>> {
        return this.getAll('Client');
    }
}
