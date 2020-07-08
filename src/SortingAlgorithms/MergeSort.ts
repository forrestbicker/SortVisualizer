import { ASorter } from "../framework/ASorter";
import { TrackableArray } from "../framework/TrackableArray";
import { SortingTask } from "../framework/SortingTask"
import { Util } from "../Utility/Util";

export class MergeSort extends ASorter {
    sort(): SortingTask {
        this.mergeSort(0, this.task.tArr.getLength() - 1);
        return this.task;
    }

    mergeSort(start: number, end: number): void { // returns array of indicies
        if (start < end) {
            let mid: number = Math.trunc((start + end) / 2);

            this.mergeSort(start, mid);
            this.mergeSort(mid + 1, end);

            this.merge(start, mid, end);
        }
    }

    merge(start: number, mid: number, end: number): void {

        // allocate memory to array coppies
        let left: TrackableArray = this.task.generateNewAuxArr();
        let right: TrackableArray = this.task.generateNewAuxArr();

        // populate coppies
        for (var i: number = start; i <= mid; i++) {
            left.push(this.task.tArr.get(i));
        }

        for (var i: number = mid + 1; i <= end; i++) {
            right.push(this.task.tArr.get(i));
        }

        // crawlers
        let l: number = 0; // left goes up to and including mid
        let r: number = 0; // right is everything right of mid
        let k: number = start; // insertion point to main array

        while (l + start <= mid && r + mid + 1 <= end) {
            let leftValue: number = left.get(l);
            let rightValue: number = right.get(r);
            if (leftValue <= rightValue) {
                this.task.tArr.set(k, leftValue);
                l++;
            } else {
                this.task.tArr.set(k, rightValue);
                r++;
            }
            k++;
        }

        while (l + start <= mid) {
            this.task.tArr.set(k, left.get(l));
            l++;
            k++;
        }

        while (r + mid + 1 <= end) {
            this.task.tArr.set(k, right.get(r));
            r++;
            k++;
        }
    }

}