import { TrackableArray } from "./TrackableArray";
export class SortingTask {
    arr: TrackableArray;
    auxiliaryArrs: Array<TrackableArray>;
    canvas: HTMLElement;
    // swaps: number;
    // comparisons: number;

    constructor(array: Array<number>, canvas: HTMLElement) {
        this.arr = new TrackableArray(array, canvas, false);
        this.auxiliaryArrs = new Array<TrackableArray>();
        this.canvas = canvas;
        // this.swaps = 0;
        // this.comparisons = 0;
    }

    generateNewAuxID(): number {
        this.auxiliaryArrs.push(new TrackableArray([], this.canvas, true));
        return this.auxiliaryArrs.length - 1;
    }

    getData(): any { };
    updateCounters(): void { };
    updatePositions(): void { };
}