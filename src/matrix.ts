
/*
 * a 2D array of values from a restricted set where no value
 *  appears more than once in any given row or column
 */

export interface DistinctMatrix<T> {
    valueAt(row: number, column: number): T | undefined;
    availableAt(row: number, column: number): Set<T>;

    // TODO: make this immutable by returning copies
    set(row: number, column: number, value: T): void;
}

export function distinctMatrix<T>(rows: number, columns: number, possibleValues: Set<T>): DistinctMatrix<T> {
    
    // TODO: fail if rows or columns > possibleValues.length
    // TODO: would generative testing make that fail and expose that bug by find a cell
    //   where there are no possible values?

    const entries = initializedMatrix(rows, columns, possibleValues);

    function updatedEntryFor<T>(row: number, column: number, newValue: T) {
        const entry: MatrixEntry<T> = entries[row-1][column-1];
        entry.value = newValue;
        entry.available.clear();
        return entry;
    }

    function removeFromRowPossibilities(row: number, value: T) {
        for (let col = 0; col < columns; col++) {
            entries[row-1][col].available.delete(value);
        }
    }

    function removeFromColumnPossibilities(column: number, value: T) {
        for (let row = 0; row < rows; row++) {
            entries[row][column-1].available.delete(value);
        }
    }

    return {
        valueAt: (row: number, column: number) => {
            return entries[row-1][column-1].value;
        },

        availableAt: (row: number, column: number) => {
            return entries[row-1][column-1].available;
        },

        set: (row: number, column: number, value: T) => {
            // TODO: fail if value already set? or return boolean?

            entries[row-1][column-1] = updatedEntryFor(row, column, value);
            removeFromRowPossibilities(row, value);
            removeFromColumnPossibilities(column, value);
            
            // TODO: 'set' any values that now have one possibility?
        }
    }
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
