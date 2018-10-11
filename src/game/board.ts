
import {DistinctMatrix, distinctMatrix, randomlyFill} from "../math/matrix";
import {AzulColours, AzulColour} from "./colour";
import {AzulTile, azulTile, Dimensions} from "./tile";

/*
 * this represents a particular set of colours in a particular
 *  valid arrangement
 */

export interface AzulBoard {
    width: number; // TODO: shouldn't this be... 5?
    
    iterateOverTiles( fn: (tile: AzulTile) => void ): void;
    toString: () => string;
}

export function randomAzulBoard(): AzulBoard {
    let tries = 0;
    let madeAFullMatrix = false;
    let m: DistinctMatrix<AzulColour>|undefined;

    while (tries < 100 && !madeAFullMatrix) {
        m = distinctMatrix(5, 5, AzulColours);
        randomlyFill(m);
        console.log(m.toString());
        madeAFullMatrix = m.isFull();
        tries ++;
    }

    if (m) {
        return board(m);
    }
    else {
        throw new Error("failed to generate board");
    }
}

function board(m: DistinctMatrix<AzulColour>): AzulBoard {
    return {
        width: Dimensions.BoardWidth,

        iterateOverTiles:
            ( fn: (tile: AzulTile) => void ) => {
                if (!m.isFull()) {
                    throw new Error("can't make a board with missing spaces");
                }
                m.traverse(
                    (row, column, colour) => {
                        const tile = azulTile(row, column, colour as AzulColour);
                        fn(tile);
                    }
                );
            },

        toString: () => m.toString()
    };
}
