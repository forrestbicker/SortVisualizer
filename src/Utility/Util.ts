export const UpdateType = {
    COUNTER: 0,
    POSITION: 1,
    READER: 2,
    COLOR: 3,
    BUFFER: 4,
}
export class Util {


    static copyOf(arr: number[]): number[] {
        let out: number[] = [];
        for (const n of arr) {
            out.push(n);
        }
        return out;
    }

    static subarray(arr: number[], start: number, end: number) {
        let out: number[] = [];
        for (var i = start; i <= end; i++) {
            out.push(arr[i]);
        }
        return out;
    }

    static max(arr: number[]): number {
        let max: number = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
}