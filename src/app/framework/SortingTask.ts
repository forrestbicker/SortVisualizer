import { TrackableArray } from "./TrackableArray";
import { ArrayDrawer } from "./ArrayDrawer";
export class SortingTask {
    tArr: TrackableArray;
    auxiliaryArrs: Array<TrackableArray>;
    drawer: ArrayDrawer;

    // swaps: number;
    // comparisons: number;

    constructor(array: Array<number>, drawer: ArrayDrawer) {
        this.drawer = drawer;
        this.drawer.setPrimaryArrayLength(array.length);
        
        this.tArr = new TrackableArray(array, this.drawer);
        this.auxiliaryArrs = new Array<TrackableArray>();
        // this.comparisons = 0;

    }

    generateNewAuxID(): number {
        this.auxiliaryArrs.push(new TrackableArray([], this.drawer));
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