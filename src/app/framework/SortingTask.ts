import { TrackableArray } from "./TrackableArray";
export class SortingTask {
    arr: TrackableArray;
    auxiliaryArrs: Array<TrackableArray>;
    canvas: HTMLElement;
    // swaps: number;
    // comparisons: number;

    constructor(array: Array<number>, canvas: HTMLElement) {
        this.tArr = new TrackableArray(array, this.drawer);
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

    updateCounters(acsesses: number, modifications: number): void {
        // console.log(`acsesses: ${acsesses}`)
        this.canvas.textContent = String(acsesses);
        // console.log(`modifications: ${acsesses}`)
    };
    updatePositions(arr: Array<number>): void { };
            this.tArr.arr[cutoff] = this.tArr.arr[randIx];
            this.tArr.arr[randIx] = temp;
}