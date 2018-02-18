export class Response<T> {
    statusCode: number;
    body?: T;

    static ok<T>(data?: T): Response<T> {
        return {
            statusCode: 200,
            body: data
        };
    }

    static serviceUnavailable(): Response<{}> {
        return {
            statusCode: 503
        };
    }
}
