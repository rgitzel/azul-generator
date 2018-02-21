
import PDFDocument = PDFKit.PDFDocument;
import {DistinctMatrix} from "./matrix";
import {Tile} from "./tile";

const width = 50;
const gap = 15;

export function render(doc: PDFDocument, board: DistinctMatrix<Tile>) {
    doc.lineWidth(10)
        .fillOpacity(1.0);

    for (let row = 1; row <= board.rows(); row ++) {
        for (let col = 1; col <= board.columns(); col++) {
            const tile = board.valueAt(row, col);
            if (tile != undefined) {
                tiler(tile)(doc, row, col);
            }
        }
    }
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
