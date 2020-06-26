import { TrackableArray } from "../framework/TrackableArray";

export class TreeUtil {

    static getRoot(arr: TrackableArray): number {
        return arr.get(0);
    }

    static getLeftChild(arr: TrackableArray, ix: number) {
        return arr.get(ix / 2);
    }

    static getRightChild(arr: TrackableArray, ix: number) {
        return arr.get(ix / 2 + 1);
    }

    static getParrent(arr: TrackableArray, ix: number) {
        return arr.get(2 * (ix - ix % 2));
    }
}