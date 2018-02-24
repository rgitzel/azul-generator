
import * as fs from "fs";
import * as pdf from "pdfkit";

import {DistinctMatrix, distinctMatrix, randomlyFill} from "./matrix";
import {renderToPdf} from "./renderer";
import {AllTiles, Tile} from "./tile";


let tries = 0;
let madeAFullMatrix = false;
let m: DistinctMatrix<Tile>|undefined;
while (tries < 10 && !madeAFullMatrix) {
    m = distinctMatrix(5, 5, AllTiles);
    randomlyFill(m);
    console.log(m.toString());
    madeAFullMatrix = m.isFull();
    tries ++;
}

if (m) {
    renderToPdfFile(m, "./file.pdf");
}



function renderToPdfFile(board: DistinctMatrix<Tile>, filename: string) {
    const doc = new pdf();
    doc.pipe(fs.createWriteStream(filename));
    renderToPdf(board, doc);
    doc.end();
}

