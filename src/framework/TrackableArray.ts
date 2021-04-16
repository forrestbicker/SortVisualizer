import { ArrayDrawer } from "./ArrayDrawer";
import { Config } from "../Utility/Config";

export class TrackableArray {

    arr: Array<number>;
    acsesses: number;
    modifications: number;
    comparisons: number;
    swaps: number;
    drawer: ArrayDrawer;
    isAux: boolean; // aux arrs are NOT drawable, primary arrs are, only one drawable arr should be active at a time

    constructor(array: Array<number>, drawer: ArrayDrawer, isAux: boolean) {
        this.arr = array;
        this.acsesses = 0;
        this.modifications = 0;
        this.comparisons = 0;
        this.swaps = 0;

        this.isAux = isAux;

        this.drawer = drawer;
    }

    /** returns a < b for values at indecies a and b */
    public compare(a: number, b: number) {
        this.comparisons++;
        this.drawer.pushColorUpdate(a, Config.colors.barCompareHighlight);
        this.drawer.pushColorUpdate(b, Config.colors.barCompareHighlight);
        this.drawer.pushCounterUpdate(this);
        this.drawer.pushBuffer();
        this.drawer.pushBuffer();

        this.drawer.pushColorUpdate(a, Config.colors.barColor)
        this.drawer.pushColorUpdate(b, Config.colors.barColor)
        // no buffer here because we only want to change colors back when the next update comes along

        return this.arr[a] < this.arr[b];
    } // todo: make extend Array<number>, MAYBE THATS NOT DESIRABLE because then u have easy acsess to methods that wll not incements counters when called  

    /** swaps values at indecies a and b */
    public swap(a: number, b: number): void { // added layer of abstraction above normal functions
        this.swaps++;
        this.drawer.pushColorUpdate(a, Config.colors.barSwapHighlight);
        this.drawer.pushColorUpdate(b, Config.colors.barSwapHighlight);
        this.drawer.pushCounterUpdate(this);
        this.drawer.pushBuffer();

        let aVal = this.arr[a];
        let bVal = this.arr[b];
        this.arr[a] = bVal;
        this.arr[b] = aVal;

        this.drawer.pushPositionUpdate(this);
        this.drawer.pushColorUpdate(a, Config.colors.barSwapHighlight);
        this.drawer.pushColorUpdate(b, Config.colors.barSwapHighlight);
        this.drawer.pushBuffer();

        this.drawer.pushColorUpdate(a, Config.colors.barColor);
        this.drawer.pushColorUpdate(b, Config.colors.barColor);
    }

    // returns a value at a given index and updates reader and stats
    get(ix: number): number {
        this.acsesses++;

        this.drawer.pushCounterUpdate(this);
        if (!this.isAux) {
            this.drawer.pushReaderUpdate(ix)
        }
        this.drawer.pushBuffer();
        return this.arr[ix];
    }

    // sets a value at a given index to annother value, updates reader and stats
    set(ix: number, value: number): void {
        this.arr[ix] = value;

        this.modifications++;
        this.drawer.pushCounterUpdate(this);
        this.drawer.pushPositionUpdate(this);
        this.drawer.pushColorUpdate(ix, Config.colors.writerColor);
        this.drawer.pushBuffer();
    }

    push(value: number): void {
        this.arr.push(value);

        this.modifications++;
        this.drawer.pushCounterUpdate(this);
        this.drawer.pushPositionUpdate(this);
    }

    // remove(ix: number): void {
    //     this.arr.
    // }

    pop(): void {
        this.arr.pop();

        this.modifications++;
        this.drawer.pushPositionUpdate(this);
    }

    getLength(): number {
        return this.arr.length;
    }

    display(): void {
        this.drawer.setCounter(this.acsesses, this.modifications);
        this.drawer.setPositions(this.arr);
    }

    // for debuging purposes
    toString(): String {
        let out: String = "[";
        out += String(this.arr[0]);
        for (var i = 1; i < this.arr.length; i++) {
            out += ", ";
            out += String(i);
        }
        out += "]";
        return out;
    }
}