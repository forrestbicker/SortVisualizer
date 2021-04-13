import { SortingTask } from "./SortingTask";
import { Config } from "../Utility/Config";

export abstract class ASorter {
    task: SortingTask;

    constructor(sortingTask: SortingTask) {
        this.task = sortingTask;
    }

    abstract sort(): SortingTask;

    execute(): void {
        this.task.randomize();
        this.task.tArr.display()
        this.sort();
        this.verify();
        this.task.drawer.display(15);
    }

    /** independent checker to verify the sort has completed correctly */
    verify(): boolean {
        let prev: number = this.task.tArr.arr[0];
        this.task.drawer.pushReaderUpdate(0, Config.colors.barCheckHighlight, true)
        for (var i = 1; i < this.task.tArr.getLength(); i++) {
            let val: number = this.task.tArr.arr[i];
            if (prev <= val) {
                this.task.drawer.pushReaderUpdate(i, Config.colors.barCheckHighlight, true) // display effect of moving head without modifying counters
                this.task.drawer.pushBuffer();
            } else {
                this.task.drawer.pushReaderUpdate(i, Config.colors.barErrorHighlight, true)
                this.task.drawer.pushBuffer();
                return false
            }
            prev = val;
        }
        return true
    }
}

