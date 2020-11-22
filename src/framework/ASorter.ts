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

    verify(): boolean {
        let prev: number = this.task.tArr.arr[0];
        this.task.drawer.pushReaderUpdate(0, false)
        this.task.drawer.pushReaderUpdate(0, Config.colors.barCheckHighlight, true)
        for (var i = 1; i < this.task.tArr.getLength(); i++) {
            let val: number = this.task.tArr.arr[i];
            this.task.drawer.pushReaderUpdate(i, false) // display effect of moving head without modifying counters
            if (prev < val) {
                this.task.drawer.pushColorUpdate(i, "#00FF00")
            } else {
                return false
            }
        }
        return true
    }
}

