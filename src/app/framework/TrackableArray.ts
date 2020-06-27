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
        this.drawer.pushCounterUpdate(this);
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

    pop(): void {
        this.arr.pop();

        this.modifications++;
        this.drawer.pushPositionUpdate(this);
    }
    }

    getLength(): number {
        return this.arr.length;
    }
}