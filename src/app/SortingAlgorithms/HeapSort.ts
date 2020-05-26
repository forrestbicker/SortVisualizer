import { Sorter } from "../framework/Sorter";
import { TreeUtil } from "../framework/TreeUtil";
import { TrackableArray } from "../framework/TrackableArray";
import { SortingTask } from "../framework/SortingTask"

class HeapSort extends Sorter {
    sort(): SortingTask {
        return this.task;
    }

    convertToMaxHeap(): void {

    }

    maxHeapify(ix: number): void {
        let left = TreeUtil.getLeftChild(this.task.arr, ix);
        let right = TreeUtil.getRightChild(this.task.arr, ix);


    }
}