export class TrackableArray { // todo: make extend Array<number>
    arr: Array<number>;
    acsesses: number;
    modifications: number;
    canvas: HTMLElement;
    updateCounters: Function;
    updateArray: Function;

    constructor(array: Array<number>, canvas: HTMLElement, isAux: boolean) {
        this.arr = array;
        this.acsesses = 0;
        this.modifications = 0;
        this.canvas = canvas;

    }

    get(ix: number): number {
        this.acsesses++;
        // this.updateCounters();
        return this.arr[ix];
    }

    set(ix: number, value: number): void {
        this.modifications++;
        this.arr[ix] = value;
        // this.updateCounters();
        // this.updatePositions();
    }

    push(value: number): void {
        this.modifications++;
        this.arr.push(value);
    }

    pop(): void {
        this.modifications++;
        this.arr.pop();
    }
    
    popRetrive(): number | undefined {
        this.modifications++;
        this.acsesses++;
        return this.arr.pop();
    }

    // todo: determine how pop shoudl work, will it incromenet modifications or acsesses or both, or more than likley there will be 2 pop methods, or maybe just a remove method to be used in conjunction with get

    getLength(): number {
        return this.arr.length;
    }

}