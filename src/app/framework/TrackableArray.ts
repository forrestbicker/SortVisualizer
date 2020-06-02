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

        this.updateCounters = function () {
            // this.canvas.textContent = String(this.acsesses);
            // this.canvas.textContent = String(this.modifications);
            setTimeout(function (num: number) { canvas.textContent = String(num) }, 1, this.acsesses);
            ;
        };

        this.updateArray = function () {
            // arrayUpdater(this.arr)
        };
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

    popRetrive(): number | undefined {
        this.modifications++;
        this.acsesses++;
        let poped: number | undefined = this.arr.pop();

        this.updateCounters();
        this.updateArray();

        return poped;
    }

    // todo: determine how pop shoudl work, will it incromenet modifications or acsesses or both, or more than likley there will be 2 pop methods, or maybe just a remove method to be used in conjunction with get

    getLength(): number {
        return this.arr.length;
    }
}