import { SortingTask } from "./SortingTask"

export abstract class ASorter {
    task: SortingTask;

    constructor(sortingTask: SortingTask) {
        this.task = sortingTask;
    }

    abstract sort(): SortingTask;

    execute(): void {
        this.task.randomize();
        this.sort();
        this.task.drawer.display(15);
    }

    verify(): number {
        return 0 // for sorted, 1 for not sorted
    }
}

