
/*
 * draw the game board onto a PDF
 */

// pdfkit is a bit odd to import, the '*' one is needed for the second one, but I'm not sure how they are connected
import * as pdf from "pdfkit";
import PDFDocument = PDFKit.PDFDocument;

import {AzulColour, AzulTile} from "./game/tile";
import {AzulBoard} from "./game/board";
import {offsetBy, Rectangle, scaleBy} from "./math/rectangle";

// From the left edge of left tile to right edge of the right tile is 10.2cm.  Between tiles is 2mm.

// I don't recall, now, if this is calculated, or just arrived at by generating and measuring
//  until it was right. Probably the latter.
const canvasWidth = 294;

// from the edge of the page
const leftMargin = 50;
const topMargin = 50;

// arrived at by trial-and-error
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

// TODO: someday could make these configurable, so that users can adjust for 
//  their particular printer
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
