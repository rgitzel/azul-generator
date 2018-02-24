
import * as fs from "fs";
import * as pdf from "pdfkit";

import {DistinctMatrix} from "./matrix";
import {renderToPdf} from "./renderer";
import {AzulColour} from "./game/tile";
import {AzulBoard, randomAzulBoard} from "./game/board";

renderToPdfFile(randomAzulBoard(), "./file.pdf");


function renderToPdfFile(board: AzulBoard, filename: string) {
    const doc = new pdf();
    doc.pipe(fs.createWriteStream(filename));
    renderToPdf(board, doc);
    doc.end();
}

