class TrackableArray { // todo: make extend Array<number>
    arr: Array<number>;
    acsesses: number;
    modifications: number;

    constructor(array: Array<number>) {
        this.arr = array;
        this.acsesses = 0;
        this.modifications = 0;
    }
}