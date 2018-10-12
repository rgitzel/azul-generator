
import {DistinctMatrix, distinctMatrix, randomlyFill} from "../math/matrix";
import {AzulColours, AzulColour} from "./colour";

/*
 * this represents a particular set of colours in a particular
 *  valid arrangement as a tile wall
 */

export const WallSize = 5;

export interface TileWall {
    iterateOverSpaces( fn: (row: number, column: number, colour: AzulColour) => void ): void;
    toString: () => string;
}

const maxTries = 100

export function randomTileWall(): TileWall {
    let m: DistinctMatrix<AzulColour>|undefined;

    let tries = 0;
    let success = false;
    while (tries < maxTries && !success) {
        m = distinctMatrix(WallSize, WallSize, AzulColours);
        randomlyFill(m);
        console.log(m.toString());
        success = m.isFull();
        tries ++;
    }

    if (m) {
        console.log(`took ${tries} tries to successfully generate a random wall`)
        return tileWall(m);
    }
    else {
        throw new Error(`failed to generate board in ${maxTries} attempts`);
    }
}

function tileWall(m: DistinctMatrix<AzulColour>): TileWall {
    return {
        iterateOverSpaces:
            ( fn: (row: number, column: number, colour: AzulColour) => void ) => {
                if (!m.isFull()) {
                    throw new Error("can't make a wall with missing spaces");
                }
                m.traverse(
                    (row, column, colour) => {
                        fn(row, column, colour as AzulColour);
                    }
                );
            },

        toString: () => m.toString()
    };
}
