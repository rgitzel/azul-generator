

export interface Rectangle {
    top: number;
    left: number;
    height: number;
    width: number;
}

export function scaleBy(factor: number, r: Rectangle): Rectangle {
    return {
        top: r.top * factor,
        left: r.left * factor,
        height: r.height * factor,
        width: r.width * factor
    };
}

export function offsetBy(deltaTop: number, deltaLeft: number, r: Rectangle): Rectangle {
    return {
        top: r.top + deltaTop,
        left: r.left + deltaLeft,
        height: r.height,
        width: r.width
    };
}
