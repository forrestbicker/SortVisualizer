import { SortingTask } from "./framework/SortingTask";
import { ASorter } from "./framework/ASorter";
import { MergeSort } from "./SortingAlgorithms/MergeSort";
import { InsertionSort } from "./SortingAlgorithms/InsertionSort";
import { HeapSort } from "./SortingAlgorithms/HeapSort";
import { ArrayDrawer } from "./framework/ArrayDrawer";
import { SelectionSort } from "./SortingAlgorithms/SelectionSort";
import { Config } from "./Utility/Config";

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

document.getElementById("startButton")!.addEventListener("click", runSort);

function runSort(): void {
    // create arr
    var arr: Array<number> = [];
    for (var i = 1; i <= 32; i++) {
        arr.push(i);
    }

    // build drawer
    let drawer = new ArrayDrawer(
        document.getElementById("counter")!,
        document.getElementById("position")!,
        document.getElementById("reader")!,
        (document.getElementById("delaySlider")! as HTMLInputElement),
    );

    let selectedSort: string = dropdown.value;
    var s: ASorter = sorts[selectedSort](new SortingTask(arr, drawer)); // TODO: make a register, on click cancel the sort
    s.execute();
}

function initalize(counterCanvas: HTMLElement, posCanvas: HTMLElement, readerCanvas: HTMLElement) {
    posCanvas.setAttribute("width", `${100 * Config.canvasWidthPercent}vw`);
    posCanvas.setAttribute("height", `${100 * Config.canvasHeightPercent}vh`);
    counterCanvas.setAttribute("width", `${100 * Config.canvasWidthPercent}vw`);
    readerCanvas.setAttribute("width", `${100 * Config.canvasWidthPercent}vw`);
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
