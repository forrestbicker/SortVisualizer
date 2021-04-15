import { ASorter } from "../framework/ASorter";
import { TreeUtil } from "../Utility/TreeUtil";
import { TrackableArray } from "../framework/TrackableArray";
import { SortingTask } from "../framework/SortingTask"

export class HeapSort extends ASorter {
    constructor(sortingTask: SortingTask) {
        super(sortingTask);
        this.swapComplexity = "nlogn";
        this.comparisonComplexity = "nlogn";
        // TODO: add space complexity
        // in place
        this.description = "Heap sort is will visualize the unsorted elements of an array as a heap data structure from which it is possible to find the next value of interest in O(1) time. Once the value is found, it is moved into sorted position and the heap is reorganized in O(logn) time to preserve heap structure. This process is repeated until the array is sorted"; // basically insertion sort but better lol
    }

    sort(): SortingTask {
        let n: number = this.task.tArr.getLength()

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.maxHeapify(i, n);
        }

        for (let i = n - 1; i > 0; i--) {
            this.task.tArr.swap(0, i)
            this.maxHeapify(0, i)
        }

        return this.task;
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