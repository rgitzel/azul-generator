
import * as pdfkit from "pdfkit";

import {Callback, Context} from "aws-lambda";

import {AzulBoard, randomAzulBoard} from "./game/board";
import {renderToPdf} from "./renderer";

interface Response {
    statusCode: number;
    headers: any;
    body: string;
    isBase64Encoded: boolean;
}

function response(statusCode: number, body: any): Response {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/pdf"
        },
        body: (typeof body === "object") ? JSON.stringify(body) : body,
        isBase64Encoded: false
    }
}

function bufferResponse(statusCode: number, buffer: Buffer): Response {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/pdf"
        },
        body: buffer.toString('utf-8'),
        isBase64Encoded: false
    }
}

export function handler(event: any, context: Context, callback: Callback) {
    const board = randomAzulBoard();
    renderToBuffer(board, (buffer) => callback(null, bufferResponse(200, buffer))) ;
}


function renderToBuffer(board: AzulBoard, callback: (buffer: Buffer) => void) {
    let buffers: any[] = [];

    const pdf = new pdfkit();

    pdf.on('data', buffers.push.bind(buffers));
    pdf.on('end', () => {
        console.log(buffers.length);
        let pdfData = Buffer.concat(buffers);
        callback(pdfData);
    });

    renderToPdf(board, pdf);
    pdf.end();
}


handler({}, {} as any, (error: any, data: any) => {
   console.log(data);
});

