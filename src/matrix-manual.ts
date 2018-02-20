
import {distinctMatrix, randomlyFill} from "./matrix";


const testMatrix = distinctMatrix(3, 3, new Set([1, 2, 3]));
console.log(testMatrix.toString());

randomlyFill(testMatrix);
console.log(testMatrix.toString());

