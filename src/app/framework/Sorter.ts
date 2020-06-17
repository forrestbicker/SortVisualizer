import { SortingTask } from "./SortingTask"

export abstract class Sorter {
    task: SortingTask;

    constructor(sortingTask: SortingTask) {
        this.task = sortingTask;
    }

    abstract sort(): SortingTask;
    execute(): void {
        // let id: number = this.display();
        this.task.randomize();
        this.sort();
        this.task.tArr.display();
        // clearInterval(id); // stops display loop
    }
}

