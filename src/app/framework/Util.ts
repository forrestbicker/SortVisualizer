export class Util {

    static copyOf(arr: number[]): number[] {
        let out: number[] = [];
        for (const n of arr) {
            out.push(n);
        }
        return out;
    }
}