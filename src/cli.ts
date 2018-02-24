
import * as fs from "fs";
import * as pdf from "pdfkit";

import {DistinctMatrix} from "./matrix";
import {renderToPdf} from "./renderer";
import {Tile} from "./tile";
import {generateRandomBoard} from "./board";

renderToPdfFile(generateRandomBoard(), "./file.pdf");


function renderToPdfFile(board: DistinctMatrix<Tile>, filename: string) {
    const doc = new pdf();
    doc.pipe(fs.createWriteStream(filename));
    renderToPdf(board, doc);
    doc.end();
}

