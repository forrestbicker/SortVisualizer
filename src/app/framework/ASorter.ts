import { SortingTask } from "./SortingTask"

export abstract class ASorter {
    task: SortingTask;

    constructor(sortingTask: SortingTask) {
        this.task = sortingTask;
    }

    abstract sort(): SortingTask;

    // display(): number {
    //     this.dummy.textContent = "boo"
    //     setInterval(function (task: SortingTask) { task.updateCanvas() }, 20, this.task);
    //     return 0;
    // }

    execute(): void {
        this.task.randomize();
        this.sort();
        // this.task.drawer.stopDisplayLoop();
        this.task.drawer.display(15);
        this.task.tArr.display();
        // clearInterval(id); // stops display loop
    }

    verify(): number {
        return 0 // for sorted, 1 for not sorted
    }
}

