import { Sorter } from "../framework/Sorter";
import { SortingTask } from "../framework/SortingTask"

// n^2
export class InsertionSort extends Sorter {
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