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


        // recursivley sort the two haves and then merge
        return this.merge(this.sortA(this.task.auxiliaryArrs[right]), this.sortA(this.task.auxiliaryArrs[left]));
    }

    merge(leftArr: TrackableArray, rightArr: TrackableArray): TrackableArray {
        let leftPointerIx: number = 0;
        let rightPointerIx: number = 0;

        let combined: number = this.task.generateNewAuxID();

        while (leftPointerIx < leftArr.getLength() - 1 && rightPointerIx < rightArr.getLength()) {
            let leftPointer: number = leftArr.get(leftPointerIx);
            let rightPointer: number = leftArr.get(rightPointerIx);
            if (leftPointer <= rightPointer) {
                this.task.auxiliaryArrs[combined].push(leftPointer);
                leftPointerIx++;
            } else {
                this.task.auxiliaryArrs[combined].push(rightPointer);
                rightPointerIx++;
            }
        }

        return this.task.auxiliaryArrs[combined];
    }

}