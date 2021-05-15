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
        for (var cutoff = 0; cutoff < this.getLength(); cutoff++) {
            let minIx = cutoff;
            for (var i = cutoff; i < this.getLength(); i++) {
                if (this.compare(i, minIx)) {
                    minIx = i;
                }
            }
            this.swap(minIx, cutoff);
        }
        return this.task;
    }

}