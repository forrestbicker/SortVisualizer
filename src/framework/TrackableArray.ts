import { ArrayDrawer } from "./ArrayDrawer";
import { Config } from "../Utility/Config";

export class TrackableArray { // todo: make extend Array<number>, MAYBE THATS NOT DESIRABLE because then u have easy acsess to methods that wll not incements counters when called  

    arr: Array<number>;
    acsesses: number;
    modifications: number;
    drawer: ArrayDrawer;
    isAux: boolean; // aux arrs are NOT drawable, primary arrs are, only one drawable arr should be active at a time

    constructor(array: Array<number>, drawer: ArrayDrawer, isAux: boolean) {
        this.arr = array;
        this.acsesses = 0;
        this.modifications = 0;


        this.isAux = isAux;

        this.drawer = drawer;
    }

    get(ix: number): number {
        this.acsesses++;

        this.drawer.pushCounterUpdate(this);
        if (!this.isAux) {
            this.drawer.pushReaderUpdate(ix)
        }

        return this.arr[ix];
    }

    set(ix: number, value: number): void {
        this.arr[ix] = value;

        this.modifications++;
        this.drawer.pushCounterUpdate(this);
        this.drawer.pushPositionUpdate(this);
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

    swap(a: number, b: number): void { // added layer of abstraction above normal functions
        this.drawer.pushColorUpdate(a, Config.colors.barSwapHighlight)
        this.drawer.pushColorUpdate(b, Config.colors.barSwapHighlight)

        let aVal = this.get(a);
        let bVal = this.get(b);
        this.set(a, bVal);
        this.set(b, aVal); // TODO: express tmp as an aux arr (or add a O(1) register) for const space tracking
        
        this.drawer.pushColorUpdate(a, Config.colors.barColor)
        this.drawer.pushColorUpdate(b, Config.colors.barColor)

    }

    getLength(): number {
        return this.arr.length;
    }

    display(): void {
        this.drawer.setCounter(this.acsesses, this.modifications);
        this.drawer.setPositions(this.arr);
    }

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