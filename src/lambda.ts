
import {Callback, Context, Handler} from "aws-lambda";

interface Response {
    statusCode: number;
    body: string;
}

function response(statusCode: number, bodyObject: any): Response {
    return {
        statusCode,
        body: JSON.stringify(bodyObject)
    }
}

export function handler(event: any, context: Context, callback: Callback) {
    callback(null, response(200, { foo: "bar" }));
}
    