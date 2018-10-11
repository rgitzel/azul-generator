import {Rectangle} from "../math/rectangle";
import {AzulColour} from "./colour"


// TODO: refactor this... we don't have "tiles" we at best have "tile spaces"...
//  but even then we don't a class, per se; better, I think, would be to have a 
//  AzulBoardLayout class which knows the coordinates of the 25 spaces, and nothing
//  about colours; and then the renderer combines a particular "board" (the colours)
//  with the "layout" (the squares)

export interface AzulTile {
    row: number;
    column: number;
    colour: AzulColour;
    position: Rectangle
}

export function azulTile(row: number, column: number, colour: AzulColour) {
    return {
        row,
        column,
        colour,
        position: rectangleFor(row, column)
    }

}


// the board is 10.2cm between the outside edges of the outside tiles,
//  and there is 2mm between tiles
//
//  20 2 20 2 20 2 20 2 20 = 108mm
//  19 2 19 2 19 2 19 2 19 = 103mm... close enough?

const tileWidth = 19;
const gapBetweenTiles = 2;

export const Dimensions = {
    TileWidth: tileWidth,
    GapBetweenTiles: gapBetweenTiles,
    BoardWidth: 5 * tileWidth + 4 * gapBetweenTiles
}

function rectangleFor(row: number, column: number): Rectangle {
    const top = (row - 1) * (tileWidth + gapBetweenTiles);
    const left = (column - 1) * (tileWidth + gapBetweenTiles);
    const height = tileWidth;
    const width = tileWidth;
    return {top, left, height, width};
}
