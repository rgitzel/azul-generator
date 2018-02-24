
import {DistinctMatrix, distinctMatrix, randomlyFill} from "./matrix";
import {AllTiles, Tile} from "./tile";


export function generateRandomBoard() {
    let tries = 0;
    let madeAFullMatrix = false;
    let m: DistinctMatrix<Tile>|undefined;

    while (tries < 100 && !madeAFullMatrix) {
        m = distinctMatrix(5, 5, AllTiles);
        randomlyFill(m);
        console.log(m.toString());
        madeAFullMatrix = m.isFull();
        tries ++;
    }

    if (m) {
        return m;
    }
    else {
        throw new Error("failed to generate board");
    }
}



