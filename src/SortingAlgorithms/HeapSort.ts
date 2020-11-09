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

    maxHeapify(root: number, end: number): void {
        let largest = root;
        let left = TreeUtil.getLeftChildIx(root);
        let right = TreeUtil.getRightChildIx(root);

        // if left child exists and is greater than root
        if (left < end && this.task.tArr.get(largest) < this.task.tArr.get(left)) {
            largest = left;
        }

        if (right < end && this.task.tArr.get(largest) < this.task.tArr.get(right)) {
            largest = right;
        }

        if (largest != root) {
            this.task.tArr.swap(largest, root)
            this.maxHeapify(largest, end);
        }
    }
}