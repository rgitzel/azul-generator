import {DistinctMatrix, distinctMatrix} from "./matrix";

describe("trivial matrix", () => {
    const rows = 1;
    const columns = 1;
    const possibleValues = new Set([0]);

    describe("should start", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        test("with all values undefined", () => {
            expect(m.valueAt(1, 1)).toBeUndefined();
        });

        test("with all values fully available", () => {
            const m = distinctMatrix(rows, columns, possibleValues);
            expect(m.availableAt(1, 1)).toEqual(possibleValues);
        });
    });

    test("setting the value should work, and reduce the possibilities to none", () => {
        const m = distinctMatrix(rows, columns, possibleValues);
        m.set(1, 1, 0);
        expect(m.valueAt(1, 1)).toBe(0);
        expect(m.availableAt(1, 1).size).toBe(0);
    });
});


describe("small matrix", () => {
    const rows = 2;
    const columns = 2;
    const possibleValues = new Set([1, 2, 3]);

    describe("should start", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        test("with all values undefined", () => {
            expectAcrossMatrix(rows, columns, m, (m, r, c) => expect(m.valueAt(r, c)).toBeUndefined());
        });

        test("with all values fully available", () => {
            expectAcrossMatrix(rows, columns, m, (m, r, c) => expect(m.availableAt(r, c)).toEqual(possibleValues));
        });

    });

    describe("setting a single value should", () => {
        const m = distinctMatrix(rows, columns, possibleValues);
        m.set(1, 1, 2);

        const leftovers = new Set([1, 3]);

        test("change the value for that cell", () => {
            expect(m.valueAt(1, 1)).toBe(2);
        });

        test("leave the rest undefined", () => {
            expect(m.valueAt(1, 2)).toBeUndefined();
            expect(m.valueAt(2, 1)).toBeUndefined();
            expect(m.valueAt(2, 2)).toBeUndefined();
        });

        test("remove the possibilities for that cell", () => {
            expect(m.availableAt(1, 1).size).toBe(0);
        });

        test("reduce the possibilities for the rest of the row", () => {
            expect(m.availableAt(1, 2).size).toBe(2);
            expect(m.availableAt(1, 2)).toEqual(leftovers);
        });

        test("reduce the possibilities for the rest of the column", () => {
            expect(m.availableAt(2, 1).size).toBe(2);
            expect(m.availableAt(2, 1)).toEqual(leftovers);
        });

        test("leave all possibilities for the remaining cell", () => {
            expect(m.availableAt(2, 2).size).toBe(3);
            expect(m.availableAt(2, 2)).toEqual(possibleValues);
        });
    });

    describe("setting three values should", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        // 2 3
        // 1 -
        m.set(1, 1, 2);
        m.set(1, 2, 3);
        m.set(2, 1, 1);

        test("remove the possibilities for those three cells", () => {
            expect(m.availableAt(1, 1).size).toBe(0);
            expect(m.availableAt(1, 2).size).toBe(0);
            expect(m.availableAt(2, 1).size).toBe(0);
        });

        test("reduce the remaining cell to only a single available value", () => {
            expect(m.valueAt(2, 2)).toBeUndefined();
            expect(m.availableAt(2, 2).size).toBe(1);
            expect(m.availableAt(2, 2)).toEqual(new Set([2]));
        });
    });
});

function expectAcrossMatrix<T>(rows: number, columns: number, m: DistinctMatrix<T>, checkExpectation: (m: DistinctMatrix<T>, row: number, col: number) => void) {
    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= columns; c++) {
            checkExpectation(m, r, c);
        }
    }
}


