import { ASorter } from "../framework/ASorter";
import { SortingTask } from "../framework/SortingTask"

// n^2
export class InsertionSort extends ASorter {
    constructor(sortingTask: SortingTask) {
        super(sortingTask);
        this.swapComplexity = "n^2";
        this.comparisonComplexity = "n^2";
        // in place
        this.description = "Insertion sort will repeatedly search an array for the location a next element belongs in until all elements have been sorted.";
        // advantages: in base case O(n) compares and 0 swaps when array is already sorted
    }

    sort(): SortingTask {
        for (var i = 1; i < this.task.tArr.getLength(); i++) {
            // at the start of the loop, arr is sorted up to ix i (exclusive)
            let j = i - 1; 
            // we find where to insert i so the arr is sorted up to ix i (inclusive)
            while (j >= 0 && this.task.tArr.compare(i, j)) {
                j--;
            }
            j++;
            // once i's sorted location is found, we need to swap elements back up to shift the array over
            while (j < i) {
                this.task.tArr.swap(j, i);
                j++;
            }
        }
        return this.task;
    }

}