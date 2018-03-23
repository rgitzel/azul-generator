
import * as fs from "fs";
import * as pdf from "pdfkit";

import {renderToPdf} from "./renderer";
import {AzulBoard, randomAzulBoard} from "./game/board";

renderToPdfFile(randomAzulBoard(), "./file.pdf");


function renderToPdfFile(board: AzulBoard, filename: string) {
    const doc = new pdf();
    doc.pipe(fs.createWriteStream(filename));
    renderToPdf(board, doc);
    doc.end();
}

