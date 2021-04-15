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
    }

    sort(): SortingTask {
        for (var i = 1; i < this.task.tArr.getLength(); i++) {
            let key = this.task.tArr.get(i);
            let j = i - 1;
            while (j >= 0 && key < this.task.tArr.get(j)) {
                this.task.tArr.set(j + 1, this.task.tArr.get(j));
                j--;
            }
            this.task.tArr.set(j + 1, key);
        }
        return this.task;
    }
    
}