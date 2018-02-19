
import * as pdf from "pdfkit"

import * as fs from "fs";

import {render} from "./renderer";


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

render(doc, 5, 5, "BKRTY YBKRT TYBKR RTYBK KRTYB".replace(/ /g, ""));

doc.end();


