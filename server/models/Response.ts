export class Response<T> {
    statusCode: number;
    body?: string;
    headers?: { [header: string]: string };

    static ok<T>(data?: T): Response<T> {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    }

    static serviceUnavailable(): Response<{}> {
        return {
            statusCode: 503
        };
    }
}
