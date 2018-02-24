import {DistinctMatrix, distinctMatrix} from "./matrix";

describe("trivial matrix", () => {
    const rows = 1;
    const columns = 1;
    const possibleValues = new Set([0]);

    describe("should start...", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        test("with all values undefined", () => {
            expect(m.valueAt(1, 1)).toBeUndefined();
        });

        test("not full", () => {
            expect(m.isFull()).toBeFalsy();
        });

        test("just a dash for toString", () => {
            expect(m.toString()).toBe("-");
        });

        test("with all values fully available", () => {
            expect(m.availableAt(1, 1)).toEqual(possibleValues);
        });
    });

    describe("setting the value...", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        m.set(1, 1, 0);

        test("should change the value", () => {
            expect(m.valueAt(1, 1)).toBe(0);
        });

        test("should be full", () => {
            expect(m.isFull()).toBeTruthy();
        });

        // this seems trivial, but caught a bug, in that "0" is falsey
        //  just like "undefined", so this was coming back "-"
        test("just a number for toString", () => {
            expect(m.toString()).toBe("0");
        });

        test("remove the possibilities", () => {
            expect(m.availableAt(1, 1).size).toBe(0);
        });
    });
});


describe("small matrix", () => {
    const rows = 2;
    const columns = 2;
    const possibleValues = new Set([1, 2, 3]);

    describe("should start...", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        test("with all values undefined", () => {
            expectAcrossMatrix(rows, columns, m, (m, r, c) => expect(m.valueAt(r, c)).toBeUndefined());
        });

        test("not full", () => {
            expect(m.isFull()).toBeFalsy();
        });

        test("with all dashes for toString", () => {
            expect(m.toString()).toBe("-- --");
        });

        test("with all values fully available", () => {
            expectAcrossMatrix(rows, columns, m, (m, r, c) => expect(m.availableAt(r, c)).toEqual(possibleValues));
        });

    });

    describe("setting a single value should...", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        m.set(1, 1, 2);

        const leftovers = new Set([1, 3]);

        test("change the value for that cell", () => {
            expect(m.valueAt(1, 1)).toBe(2);
        });

        test("with proper dashes for toString", () => {
            expect(m.toString()).toBe("2- --");
        });

        test("still not full", () => {
            expect(m.isFull()).toBeFalsy();
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

    describe("setting three values should...", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        // 2 3
        // 1 -
        m.set(1, 1, 2);
        m.set(1, 2, 3);
        m.set(2, 1, 1);

        test("with proper dashes for toString", () => {
            expect(m.toString()).toBe("23 1-");
        });

        test("still not full", () => {
            expect(m.isFull()).toBeFalsy();
        });

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

    describe("setting four values should...", () => {
        const m = distinctMatrix(rows, columns, possibleValues);

        // 2 3
        // 1 2
        m.set(1, 1, 2);
        m.set(1, 2, 3);
        m.set(2, 1, 1);
        m.set(2, 2, 2);

        test("with proper values for toString", () => {
            expect(m.toString()).toBe("23 12");
        });

        test("be full", () => {
            expect(m.isFull()).toBeTruthy();
        });

        test("remove the possibilities for all cells", () => {
            expectAcrossMatrix(rows, columns, m, (m, r, c) => expect(m.availableAt(r, c).size).toEqual(0));
        });
    });
});

function expectAcrossMatrix<T>(rows: number, columns: number, m: DistinctMatrix<T>, checkExpectation: (m: DistinctMatrix<T>, row: number, col: number) => void) {
    m.iterateOver( (r, c, value) => checkExpectation(m, r, c) );
}


