
// give the enums each a character just to make it easier to debug and to log matrix states
export const enum Tile {
    Black = "K",
    Blue = "B",
    Red = "R",
    Turquoise = "T",
    Yellow = "Y"
}

export const AllTiles = new Set([Tile.Black, Tile.Blue, Tile.Red, Tile.Turquoise, Tile.Yellow]);

