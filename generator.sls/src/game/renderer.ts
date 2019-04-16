
/*
 * draw the game board onto a PDF
 */

import * as fs from "fs";

// pdfkit is a bit odd to import, the '*' one is needed for the second one, but I'm not sure how they are connected
import * as pdf from "pdfkit";
import PDFDocument = PDFKit.PDFDocument;

import {Rectangle, rectangle} from "../math/rectangle";
import {AzulColour} from "./colour";
import {TileWall, WallSize} from "./wall";

// I don't recall, now, if this is calculated, or just arrived at by generating and measuring
//  until it was right. Probably the latter.
const canvasWidth = 294;

// from the edge of the page
const leftMargin = 50;
const topMargin = 50;

// arrived at by trial-and-error
const cornerRadius = 5;

export function renderToPdf(board: TileWall, doc: PDFDocument) {
    doc.fillOpacity(1.0);
    const factor = canvasWidth / totalWidth;
    board.iterateOverSpaces(
        (row: number, column: number, colour: AzulColour) => {
            const r = rectangleFor(row, column).scaleBy(factor).offsetBy(topMargin, leftMargin);
            renderRectangle(doc, r, colourCode(colour));
        }
    );
}

export function renderToPdfFile(board: TileWall, filename: string) {
    const doc = new pdf();
    doc.pipe(fs.createWriteStream(filename));
    renderToPdf(board, doc);
    doc.end();
    console.log(`board written to '${filename}'`);
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

function renderRectangle(doc: PDFDocument, r: Rectangle, code: string) {
    doc.roundedRect(r.left, r.top, r.width, r.width, cornerRadius).fill(code);
}

// -----------------------------------------------------------------------

// TODO: where does this belong?

// the board is 10.2cm between the outside edges of the outside tiles,
//  and there is 2mm between tiles
//
//  20 2 20 2 20 2 20 2 20 = 108mm
//  19 2 19 2 19 2 19 2 19 = 103mm... close enough?

const tileWidth = 19;
const gapBetweenTiles = 2;
const totalWidth =  WallSize * tileWidth + (WallSize - 1) * gapBetweenTiles;

function rectangleFor(row: number, column: number): Rectangle {
    const top = (row - 1) * (tileWidth + gapBetweenTiles);
    const left = (column - 1) * (tileWidth + gapBetweenTiles);
    const height = tileWidth;
    const width = tileWidth;
    return rectangle(top, left, height, width);
}
