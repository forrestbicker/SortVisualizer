import { SortingTask } from "./framework/SortingTask"

function main() {
    var arr: Array<number> = [7, 4, 9, 2, 4, 5, 1];
    arr = new Array<number>(7, 4, 2);
    console.log(arr);
    var a: SortingTask = new SortingTask(arr);
    console.log("hello");
}
console.log("hello");
document!.getElementById('root')!.textContent = "hello"

// var sorts = {
//     mergeSort: function (sortingTask): SortingTask {
//         sortingTask.aux.r = [];
//         sortingTask.aux.l = [];

//         for (var i = 0; i < sortingTask.arr.length / 2; i++) {

//         }

//         return sortingTask;
//     },
// };
