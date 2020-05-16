import { SortingTask } from "./SortingTask"

export abstract class Sorter {
    sortingTask: SortingTask;

    constructor(sortingTask: SortingTask) {
        this.sortingTask = sortingTask;
    }

    abstract sort(): SortingTask;
}

