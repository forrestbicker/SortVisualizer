import { SortingTask } from "./SortingTask"

export abstract class Sorter {
    task: SortingTask;

    constructor(sortingTask: SortingTask) {
        this.task = sortingTask;
    }

    abstract sort(): SortingTask;
}

