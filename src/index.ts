
import * as pdf from "pdfkit"

import * as fs from "fs";

import {render} from "./renderer";
import {DistinctMatrix, distinctMatrix, randomlyFill} from "./matrix";


const enum Tiles {
    Black,
    Blue,
    Red,
    Turquoise,
    Yellow
}

const AllTiles = new Set([Tiles.Black, Tiles.Blue, Tiles.Red, Tiles.Turquoise, Tiles.Yellow]);

const doc = new pdf();

doc.pipe(fs.createWriteStream('./file.pdf'));

let tries = 0;
let madeAFullMatrix = false;
let m: DistinctMatrix<string>|undefined;
while (tries < 10 && !madeAFullMatrix) {
    m = distinctMatrix(5, 5, new Set(["B", "K", "R", "T", "Y"]));
    randomlyFill(m);
    console.log(m.toString());
    madeAFullMatrix = m.isFull();
    tries ++;
}

if (m) {
    render(doc, 5, 5, m.toString().replace(/ /g, ""));
}

doc.end();


