import { ASorter } from "../framework/ASorter";
import { SortingTask } from "../framework/SortingTask"

export class BinaryInsertionSort extends ASorter {
	constructor(sortingTask: SortingTask) {
		super(sortingTask);
		// this.swapComplexity = "n^2";
		// this.comparisonComplexity = "nlogn";
		// in place
		// this.description = "Insertion sort will repeatedly search an array for the location a next element belongs in until all elements have been sorted.";
	}

	sort(): SortingTask {
		for (var end = 1; end < this.getLength(); end++) {
			// at the start of the loop, arr is sorted up to end (exclusive)
			// we find where to insert the next value value (ix = end) in the sorted portion of the arr by using binary search
			let l: number = 0;
			let r: number = end;
			let m: number = Math.floor(end / 2);
			while (l < r) {
				m = Math.floor((l + r) / 2);
				if (this.compare(end, m)) { // end < m
					r = m - 1;
				} else if (this.compare(m, end)) { // end > m
					l = m + 1;
				} else {
					break;
				}
			}
			// once i's sorted location is found, we need to swap elements back up to shift the array over
			while (m < end) {
				this.swap(m, end);
				m++;
			}
		}
		return this.task;
	}

}