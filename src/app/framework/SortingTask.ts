import { TrackableArray } from "./TrackableArray";
export class SortingTask {
    arr: TrackableArray;
    auxiliaryArrs: Array<TrackableArray>;
    swaps: number;
    comparisons: number;

    constructor(array: Array<number>) {
        this.arr = new TrackableArray(array);
        this.auxiliaryArrs = new Array<TrackableArray>();
        this.swaps = 0;
        this.comparisons = 0;
    }

    generateNewAuxID(): number {
        this.auxiliaryArrs.push(new TrackableArray([]));
        return this.auxiliaryArrs.length - 1;
    }

    getData(): any { };
    updateCounters(): void { };
    updatePositions(): void { };
}