import { ASorter } from "../framework/ASorter";
import { SortingTask } from "../framework/SortingTask"

// n^2
export class SelectionSort extends ASorter {
    constructor(sortingTask: SortingTask) {
        super(sortingTask);
        this.swapComplexity = "n";
        this.comparisonComplexity = "n^2";
        this.description = "Selection sort will repeatedly search an array for the next element in order and swap it into place once found until all elements have been sorted.";
    }

    sort(): SortingTask {
        for (var cutoff = 0; cutoff < this.task.tArr.getLength(); cutoff++) {
            let ixMin = cutoff;
            let min = this.task.tArr.get(cutoff);
            for (var i = cutoff; i < this.task.tArr.getLength(); i++) {
                let val: number = this.task.tArr.get(i);
                if (val < min) {
                    ixMin = i;
                    min = val;
                }
            }
            this.task.tArr.swap(ixMin, cutoff);
        }
        return this.task;
    }

}