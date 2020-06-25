import { ASorter } from "../framework/ASorter";
import { TreeUtil } from "../Utility/TreeUtil";
import { TrackableArray } from "../framework/TrackableArray";
import { SortingTask } from "../framework/SortingTask"

export class HeapSort extends ASorter {
    sort(): SortingTask {
        return this.task;
    }

    convertToMaxHeap(): void {

    }

    maxHeapify(ix: number): void {
        let left = TreeUtil.getLeftChild(this.task.tArr, ix);
        let right = TreeUtil.getRightChild(this.task.tArr, ix);


    }
}