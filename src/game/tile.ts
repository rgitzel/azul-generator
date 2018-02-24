import {Rectangle} from "../rectangle";


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

// give the enums each a character just to make it easier to debug and to log board states
export const enum AzulColour {
    Black = "K",
    Blue = "B",
    Red = "R",
    Turquoise = "T",
    Yellow = "Y"
}

export const AzulColours = new Set([AzulColour.Black, AzulColour.Blue, AzulColour.Red, AzulColour.Turquoise, AzulColour.Yellow]);



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
