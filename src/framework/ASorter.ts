import { SortingTask } from "./SortingTask";
import { Config } from "../Utility/Config";

export abstract class ASorter {
    task: SortingTask;
    swapComplexity: string;
    comparisonComplexity: string;
    description: string;

    constructor(sortingTask: SortingTask) {
        this.task = sortingTask;
        this.swapComplexity = "";
        this.comparisonComplexity = "";
        this.description = "";
    }

    abstract sort(): SortingTask;

    public execute(): void {
        this.task.tArr.display();
        this.task.tArr.resetCounters();
        this.sort();
        this.verify();
        this.task.drawer.display();
    }

    /** independent checker to verify the sort has completed correctly */
    public verify(): boolean {
        let prev: number = this.task.tArr.arr[0];
        this.task.drawer.pushReaderUpdate(0, Config.colors.barCorrectColor);
        this.task.drawer.pushClassUpdate(0, 'correct');
        for (var i = 1; i < this.task.tArr.getLength(); i++) {
            let val: number = this.task.tArr.arr[i];
            if (prev <= val) {
                this.task.drawer.pushReaderUpdate(i, Config.colors.barCheckHighlight); // display effect of moving head without modifying counters
                this.task.drawer.pushClassUpdate(i, 'correct');
                this.task.drawer.pushBuffer();
            } else {
                this.task.drawer.pushReaderUpdate(i, Config.colors.barIncorrecColor);
                this.task.drawer.pushClassUpdate(i, 'incorrect');
                this.task.drawer.pushBuffer();
                return false
            }
            prev = val;
        }
        return true
    }
}

