
// this is a bit odd to import, the '*' one is needed for the second one, but I'm not sure how they are connected
import * as pdf from "pdfkit";
import PDFDocument = PDFKit.PDFDocument;

import {AzulColour, AzulTile} from "./game/tile";
import {AzulBoard} from "./game/board";
import {offsetBy, Rectangle, scaleBy} from "./rectangle";

const leftMargin = 50;
const topMargin = 50;

const canvasWidth = 294;

const cornerRadius = 5;

export function renderToPdf(board: AzulBoard, doc: PDFDocument) {
    doc.fillOpacity(1.0);
    const factor = canvasWidth / board.width;
    board.iterateOverTiles(
        (tile: AzulTile) => {
            const r = offsetBy(topMargin, leftMargin, scaleBy(factor, tile.position));
            render(doc, r, colourCode(tile.colour));
        }
    );
}

function colourCode(tile: AzulColour): string {
    switch (tile) {
        case AzulColour.Black: return "#000";
        case AzulColour.Blue: return "#1789D4";
        case AzulColour.Red: return "#D33C39";
        case AzulColour.Turquoise: return "#4EC9E7";
        case AzulColour.Yellow: return "#F7CE3E";
    }
}

function render(doc: PDFDocument, r: Rectangle, colourCode: string) {
    doc.roundedRect(r.left, r.top, r.width, r.width, cornerRadius).fill(colourCode);
}
