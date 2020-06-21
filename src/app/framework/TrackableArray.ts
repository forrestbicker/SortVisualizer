import { ArrayDrawer } from "./ArrayDrawer";

export class TrackableArray { // todo: make extend Array<number>, MAYBE THATS NOT DESIRABLE because then u have easy acsess to methods that wll not incements counters when called  

    arr: Array<number>;
    acsesses: number;
    modifications: number;
    drawer: ArrayDrawer;
    isAux: boolean; // aux arrs are NOT drawable, primary arrs are, only one drawable arr should be active at a time

    constructor(array: Array<number>, drawer: ArrayDrawer) {
        this.arr = array;
        this.acsesses = 0;
        this.modifications = 0;

        if (this.arr.length > 0) {
            this.isAux = false;
        } else {
            this.isAux = true;
        }
        this.drawer = drawer;
    }

    get(ix: number): number {
        this.acsesses++;
        // this.updateCounters();

        this.updateCounters();

        return this.arr[ix];
    }

    set(ix: number, value: number): void {
        this.modifications++;
        this.arr[ix] = value;

        this.updateCounters();
        this.updateArray();
    }

    push(value: number): void {
        this.modifications++;
        this.arr.push(value);

        this.updateCounters();
        this.updateArray();
    }

    pop(): void {
        this.modifications++;
        this.arr.pop();

        this.updateArray();
    }

    getLength(): number {
        return this.arr.length;
    }
}