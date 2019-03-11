
/*
 * a 2D array of values from a restricted set where no value
 *  appears more than once in any given row or column
 *
 * 'distinct' is a mathemetical term
 */

export interface DistinctMatrix<T> {
    rows(): number;
    columns(): number;

    toString(): string;

    isFull(): boolean;

    valueAt(row: number, column: number): T | undefined;
    availableAt(row: number, column: number): Set<T>;

    // TODO: make this immutable by returning copies
    set(row: number, column: number, value: T): void;

    traverse(use: (row: number, col: number, value: T|undefined) => void ): void;
}

export function distinctMatrix<T>(rows: number, columns: number, possibleValues: Set<T>): DistinctMatrix<T> {

    // TODO: fail if rows or columns > possibleValues.length
    // TODO: would generative testing make that fail and expose that bug by find a cell
    //   where there are no possible values?

    const entries = initializedMatrix(rows, columns, possibleValues);

    let filledEntries = 0;

    function entryAt(row: number, column: number): MatrixEntry<T> {
        return entries[row - 1][column - 1];
    }

    function updatedEntryFor(row: number, column: number, newValue: T) {
        const entry = entryAt(row, column);
        entry.value = newValue;
        entry.available.clear();
        return entry;
    }

    function removeFromRowPossibilities(row: number, value: T) {
        for (let col = 0; col < columns; col++) {
            entries[row - 1][col].available.delete(value);
        }
    }

    function removeFromColumnPossibilities(column: number, value: T) {
        for (let row = 0; row < rows; row++) {
            entries[row][column - 1].available.delete(value);
        }
    }

    return {
        rows: () => rows,

        columns: () => columns,

        isFull: () => filledEntries === (rows * columns),

        toString: () => {
            let s = "";
            for (let row = 1; row <= rows; row++) {
                for (let col = 1; col <= columns; col++) {
                    const v = entries[row - 1][col - 1].value;
                    s += ((v !== undefined) ? v : "-");
                }
                s += " ";
            }
            return s.trim();
        },

        valueAt: (row: number, column: number) => {
            return entryAt(row, column).value;
        },

        availableAt: (row: number, column: number) => {
            return entries[row - 1][column - 1].available;
        },

        set: (row: number, column: number, value: T) => {
            // TODO: fail if value already set? or return boolean?

            entries[row - 1][column - 1] = updatedEntryFor(row, column, value);
            removeFromRowPossibilities(row, value);
            removeFromColumnPossibilities(column, value);

            filledEntries ++;

            // TODO: 'set' any values that now have one possibility?
        },

        traverse: (fn: (row: number, col: number, value: T|undefined) => void ) => {
            for (let row = 1; row <= rows; row++) {
                for (let col = 1; col <= columns; col++) {
                    fn(row, col, entryAt(row, col).value);
                }
            }
        }
    };
}

// TODO: this doesn't always succeed... maybe need to recursively backtrack on choices?
//  that's where immutability would be handy
export function randomlyFill<T>(m: DistinctMatrix<T>) {
    for (let row = 1; row <= m.rows(); row++) {
        for (let col = 1; col <= m.columns(); col++) {
            const possible = m.availableAt(row, col);
            if (possible.size > 0) {
                m.set(row, col, randomFromSet(possible));
            }
        }
    }
}

function randomFromSet<T>(set: Set<T>): T {
    const i = Math.floor(Math.random() * Math.floor(set.size));
    return Array.from(set)[i];
}

interface MatrixEntry<T> {
    value: T|undefined;
    available: Set<T>;
}

function initializedMatrix<T>(rows: number, columns: number, possibleValues: Set<T>) {
    const m = new Array(rows);
    for (let row = 0; row < rows; row++) {
        m[row] = new Array(columns);
        for (let col = 0; col < columns; col++) {
            m[row][col] = {
                value: undefined,
                available: new Set(possibleValues)
            };
        }
    }
    return m;
}
