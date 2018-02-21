
import * as fs from "fs";
import * as pdf from "pdfkit";

import PDFDocument = PDFKit.PDFDocument;

import {DistinctMatrix} from "./matrix";
import {Tile} from "./tile";

const width = 50;
const gap = 15;
const lineWidth = 10;

export function renderToPdfFile(board: DistinctMatrix<Tile>, filename: string) {
    const doc = new pdf();

    doc.pipe(fs.createWriteStream(filename));

    doc.lineWidth(lineWidth)
        .fillOpacity(1.0);

    board.iterateOver(
        (row: number, column: number, tile: Tile|undefined) => {
            if (tile != undefined) {
                tiler(tile)(doc, row, column);
            }
        }
    );

    doc.end();
}

function tiler(tile: Tile): (doc: PDFDocument , r: number, c: number) => void {
    switch (tile) {
        case Tile.Black: return blackTileAt;
        case Tile.Blue: return blueTileAt;
        case Tile.Red: return redTileAt;
        case Tile.Turquoise: return turqoiseTileAt;
        case Tile.Yellow: return yellowTileAt;
    }
}

function tileAt(doc: PDFDocument , row: number, column: number, colour: string) {
    doc.lineJoin('round')
        .rect(column * gap + (column - 1) * width, row * gap + (row - 1) * width, width, width)
        .fillAndStroke(colour, colour)
    ;
}

function blueTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#6EA4DF")
}

function redTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#FC585B")
}

function yellowTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#FBD44B")
}

function blackTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#000")
}

function turqoiseTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#8ED3F0")
}
