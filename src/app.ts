import { SortingTask } from "./framework/SortingTask";
import { ASorter } from "./framework/ASorter";
import { MergeSort } from "./SortingAlgorithms/MergeSort";
import { InsertionSort } from "./SortingAlgorithms/InsertionSort";
import { HeapSort } from "./SortingAlgorithms/HeapSort";
import { ArrayDrawer } from "./framework/ArrayDrawer";
import { SelectionSort } from "./SortingAlgorithms/SelectionSort";
import { Config } from "./Utility/Config";

let task: SortingTask;
let drawer: ArrayDrawer;
let swapLegend: HTMLElement;
var sorts: { [id: string]: any } = {
    mergeSort: function (sortingTask: SortingTask): MergeSort {
        return new MergeSort(sortingTask);
    },
    insertionSort: function (sortingTask: SortingTask): InsertionSort {
        return new InsertionSort(sortingTask);
    },
    heapSort: function (sortingTask: SortingTask): HeapSort {
        return new HeapSort(sortingTask);
    },
    selectionSort: function (sortingTask: SortingTask): SelectionSort {
        return new SelectionSort(sortingTask);
    }
};

let htmlString: string = "";
for (const sortName in sorts) {
    htmlString += `<option value='${sortName}'>${sortName}</option>`;
}

let dropdown: HTMLSelectElement = document.getElementById(
    "algoSelect"
)! as HTMLSelectElement;
dropdown.innerHTML = htmlString;
    Config.init();

document.getElementById("startButton")!.addEventListener("click", runSort);
    // start swap legend
    swapLegend = document.getElementById("swapLegend")!;
    swapA();

function runSort(): void {
    // create arr
    var arr: Array<number> = [];
    for (var i = 1; i <= 32; i++) {
        arr.push(i);
    }

    // build drawer
    drawer = new ArrayDrawer(
        document.getElementById("counter")!,
        document.getElementById("position")!,
        document.getElementById("reader")!,
        (document.getElementById("delaySlider")! as HTMLInputElement),
    );

    task = new SortingTask(arr, drawer);
    task.randomize();
    task.tArr.display();

    // bind commands to buttons
    document.getElementById("startButton")!.addEventListener("click", runSort);
    document.getElementById("randomizeButton")!.addEventListener("click", randomizeTask);
    document.getElementById("reverseButton")!.addEventListener("click", reverseTask);

}

function runSort(): void {
    generateSorter(task).execute();
}

}

function randomizeTask(): void {
    task.randomize();
    task.tArr.display();
}

function generateSorter(task: SortingTask): ASorter {
    let selectedSort: string = dropdown.value;
    var sorter: ASorter = sorts[selectedSort](task); // TODO: make a register, on click cancel the sort
    return sorter;
}

// // docum
// //
// // document!.getElementById('root')!.textContent = "hello"

// // var sorts = {
// //     mergeSort: function (sortingTask): SortingTask {
// //         sortingTask.aux.r = [];
// //         sortingTask.aux.l = [];

// //         for (var i = 0; i < sortingTask.arr.length / 2; i++) {

// //         }

// //         return sortingTask;
// //     },
// // };


function swapA() {
    swapLegend.innerHTML = `<rect style="height: calc(2 * var(--heightUnit)); x: 0px; y: calc(2 * var(--heightUnit));" class="swap"></rect>
    <rect style="height: calc(4 * var(--heightUnit)); x: calc(1.5 * var(--widthUnit)); y: calc(0);" class="swap"></rect>`;
    setTimeout(swapB, 1000);
}

function swapB() {
    swapLegend.innerHTML = `<rect style="height: calc(2 * var(--heightUnit)); x: calc(1.5 * var(--widthUnit)); y: calc(2 * var(--heightUnit));" class="swap"></rect>
    <rect style="height: calc(4 * var(--heightUnit)); x: 0px; y: calc(0);" class="swap"></rect>`;
    setTimeout(swapA, 1000);
}