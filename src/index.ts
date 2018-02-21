
import {DistinctMatrix, distinctMatrix, randomlyFill} from "./matrix";
import {renderToPdfFile} from "./renderer";
import {AllTiles, Tile} from "./tile";


let tries = 0;
let madeAFullMatrix = false;
let m: DistinctMatrix<Tile>|undefined;
while (tries < 10 && !madeAFullMatrix) {
    m = distinctMatrix(5, 5, AllTiles);
    randomlyFill(m);
    console.log(m.toString());
    madeAFullMatrix = m.isFull();
    tries ++;
}

if (m) {
    renderToPdfFile(m, "./file.pdf");
}



