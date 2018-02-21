
import * as pdf from "pdfkit"

import * as fs from "fs";

import {DistinctMatrix, distinctMatrix, randomlyFill} from "./matrix";
import {render} from "./renderer";
import {AllTiles, Tile} from "./tile";


const doc = new pdf();

doc.pipe(fs.createWriteStream('./file.pdf'));

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
    render(doc, m);
}

doc.end();


