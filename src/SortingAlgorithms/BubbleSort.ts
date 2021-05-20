import { ASorter } from "../framework/ASorter";
import { SortingTask } from "../framework/SortingTask"

// n^2
export class BubbleSort extends ASorter {
	constructor(sortingTask: SortingTask) {
		super(sortingTask);
		this.swapComplexity = "n^2";
		this.comparisonComplexity = "n^2";
		// in place
		this.description = "Bubble sort will repeatedly swap misordered pairs of adjacent until the array is sorted.";
	}

	sort(): SortingTask {
		let sorted: boolean = false;
		let iterations = 0;
		while (!sorted) {
			sorted = true;
			for (var i = 0; i < this.getLength() - 1 - iterations; i++) {
				if (!this.compare(i, i + 1)) {
					this.swap(i, i + 1);
					sorted = false; // if this condition is ever true, re-run the while loop
				}
			}
			iterations++;
		}
		return this.task;
	}

}