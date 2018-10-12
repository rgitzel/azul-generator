
/*
 * I wasn't able to find a good Typescript representation of
 *  a plane old box on a 2D plane...
 */


export interface Rectangle {
    top: number
    left: number
    height: number
    width: number

    // this is scaled relative to the origin in the upper left
    scaleBy: (factor: number) => Rectangle

    offsetBy: (deltaTop: number, deltaLeft: number) => Rectangle
}

export function rectangle(top: number, left: number, height: number, width: number): Rectangle {
    return {
        top,
        left,
        height,
        width,

        scaleBy:
            (factor: number) => {
                return rectangle(top * factor, left * factor, height * factor, width * factor);
            },
        
        offsetBy:
            (deltaTop: number, deltaLeft: number) => {
                return rectangle(top + deltaTop, left + deltaLeft, height, width);
            }
    }
}
