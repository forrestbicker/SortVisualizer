import { TrackableArray } from "./TrackableArray";

export class ArrayDrawer { // TODO: each sorting tash should have an array drawer that is passed down and can tell aux from primary on method call

    counterCanvas: HTMLElement;
    posCanvas: HTMLElement;

    seetCounter: any;

    cWidthUnit: number;
    cHeightUnit: number;

    constructor(arrLength: number, counterCanvas: HTMLElement, posCanvas: HTMLElement) { // TODO: condense p and aux arrays to one, canvas will be null for aux, additional struct param: counter loc, will write all counter updates there and all pos update to canvas (which is null for aux cuz no need to update pos for aux)
        this.counterCanvas = counterCanvas;
        this.posCanvas = posCanvas;


        let canvasWidth: number = 500;
        let canvasHeight: number = 500;
        this.cWidthUnit = 1.0 * canvasWidth / arrLength; // assumes len = max - 1 (true if is consecuitive range of ints)
        this.cHeightUnit = 1.0 * canvasHeight / arrLength;

        this.posCanvas.setAttribute("width", String(canvasWidth));
        this.posCanvas.setAttribute("height", String(canvasHeight));

    }
}