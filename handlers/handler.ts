import { Context, Callback } from 'aws-lambda';

export const hello = (event, context: Context, callback: Callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event
        })
    };

    callback(null, response);
};
