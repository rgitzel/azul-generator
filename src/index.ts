
import {renderToPdf} from "./renderer";
import {generateRandomBoard} from "./board";
import {Tile} from "./tile";
import * as blobStream from "blob-stream";
import {DistinctMatrix} from "./matrix";
import * as pdf from "pdfkit";

let element = document.createElement("iframe") as HTMLIFrameElement;
element.setAttribute("width", "600");
element.setAttribute("height", "800");

renderToPdfInBrowser(generateRandomBoard(), element);
document.body.appendChild(element);


export function renderToPdfInBrowser(board: DistinctMatrix<Tile>, iframe: HTMLIFrameElement) {
    const doc = new pdf();
    const stream = doc.pipe(blobStream());
    renderToPdf(board, doc);
    doc.end();

    stream.on("finish", () => {
        iframe.src = stream.toBlobURL('application/pdf');
    });
}

