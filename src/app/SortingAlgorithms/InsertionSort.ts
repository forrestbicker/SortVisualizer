import { Sorter } from "../framework/Sorter";
import { SortingTask } from "../framework/SortingTask"

// n^2
class InsertionSort extends Sorter {
    sort(): SortingTask {
        for (var i = 1; i < this.task.arr.getLength(); i++) {
            let key = this.task.arr.get(i);
            let j = i - 1;
            while (j >= 0 && key < this.task.arr.get(j)) {
                this.task.arr.set(j + 1, this.task.arr.get(j));
                j--;
            }
            this.task.arr.set(j + 1, key);
        }
        return this.task;
    }
    
}