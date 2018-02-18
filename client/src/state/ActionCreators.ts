export class ActionCreators {
    httpError = (key: string) => {
        return {
            type: 'httpError',
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
