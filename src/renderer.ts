
import PDFDocument = PDFKit.PDFDocument;

const width = 50;
const gap = 15;

export function render(doc: PDFDocument , rows: number, columns: number, pattern: string) {
    doc.lineWidth(10)
        .fillOpacity(1.0);

    for (let row = 1; row <= rows; row ++) {
        const i = (row - 1) * columns;
        renderRow(doc, row, pattern.substring(i, i + columns));
    }
}

function renderRow(doc: PDFDocument , row: number, pattern: string) {
    for (let col = 0; col < pattern.length; col++) {
        tilerForCode(pattern.charAt(col))(doc, row, col+1);
    }
}

function tileAt(doc: PDFDocument , row: number, column: number, colour: string) {
    doc.lineJoin('round')
        .rect(column * gap + (column - 1) * width, row * gap + (row - 1) * width, width, width)
        .fillAndStroke(colour, colour)
    ;
}

function blueTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#6EA4DF")
}

function redTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#FC585B")
}

function yellowTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#FBD44B")
}

function blackTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#000")
}

function turqoiseTileAt(doc: PDFDocument , row: number, column: number) {
    tileAt(doc, row, column, "#8ED3F0")
}

function tilerForCode(code: string): (doc: PDFDocument , r: number, c: number) => void {
    switch (code) {
        case "B": return blueTileAt;
        case "K": return blackTileAt;
        case "R": return redTileAt;
        case "T": return turqoiseTileAt;
        case "Y": return yellowTileAt;
        default:
            return (doc: PDFDocument, r: number, c: number) => {}
    }
}
