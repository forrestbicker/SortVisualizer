export class SortingTask {
    arr: TrackableArray;
    auxiliaryArrs: Array<TrackableArray>;

    constructor(array: Array<number>) {
        this.arr = new TrackableArray(array);
        this.auxiliaryArrs = new Array<TrackableArray>();
    }

    generateNewAuxID(): number {
        this.auxiliaryArrs.push(new TrackableArray([]));
        return this.auxiliaryArrs.length - 1;
    }

    getData(): any { };
    updateCounters(): void { };
    updatePositions(): void { };
}