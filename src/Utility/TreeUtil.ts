import { TrackableArray } from "../framework/TrackableArray";

export class TreeUtil {

    static getRoot(arr: TrackableArray): number {
        return arr.get(0);
    }

    static getLeftChildIx(ix: number) {
        return ix * 2;
    }

    static getRightChildIx(ix: number) {
        return ix * 2 + 1;
    }

    static getParrentIx(ix: number) {
        return Math.floor(ix / 2 - 1);
    }
}