
import * as pdfkit from "pdfkit";

import {Callback, Context} from "aws-lambda";

import {AzulBoard, randomAzulBoard} from "./game/board";
import {renderToPdf} from "./renderer";

interface LambdaResponse {
    statusCode: number;
    headers: any;
    body: string;
    isBase64Encoded: boolean;
}

function bufferResponse(statusCode: number, buffer: Buffer): LambdaResponse {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/pdf"
        },
        body: buffer.toString("base64"),
        isBase64Encoded: true
    };
}

export function handler(event: any, context: Context, callback: Callback) {
    const board = randomAzulBoard();
    renderToBuffer(board, (error, buffer) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null, bufferResponse(200, buffer));
        }
    }) ;
}


function renderToBuffer(board: AzulBoard, callback: (error: any, buffer: Buffer) => void) {
    const buffers: any[] = [];

    const pdf = new pdfkit();

    pdf.on("data", buffers.push.bind(buffers));
    pdf.on("end", () => {
        console.log(buffers.length);
        const pdfData = Buffer.concat(buffers);
        callback(null, pdfData);
    });

    renderToPdf(board, pdf);
    pdf.end();
}

//
// handler({}, {} as any, (error: any, data: any) => {
//    console.log(data);
// });

