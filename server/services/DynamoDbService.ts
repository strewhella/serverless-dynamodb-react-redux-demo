import { DynamoDB } from 'aws-sdk';

const DYNAMODB_ENDPOINT = 'http://localhost:8000';

export class DynamoDbService {
    protected client: DynamoDB.DocumentClient;

    constructor() {
        this.client = new DynamoDB.DocumentClient({
            endpoint: DYNAMODB_ENDPOINT,
            region: 'ap-southeast-2'
        });
    }

    getAll<T>(tableName: string): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            this.client.scan(
                {
                    TableName: tableName
                },
                (err: Error, result: DynamoDB.DocumentClient.ScanOutput) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }

                    resolve(result.Items as Array<T>);
                }
            );
        });
    }

    getAllByHashKey<T>(
        tableName: string,
        name: string,
        value: string
    ): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            var params = {
                TableName: tableName,
                KeyConditionExpression: `${name} = :value`,
                ExpressionAttributeValues: {
                    ':value': value
                }
            };

            this.client.query(
                params,
                (err: Error, result: DynamoDB.DocumentClient.QueryOutput) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }

                    resolve(result.Items as Array<T>);
                }
            );
        });
    }
}
