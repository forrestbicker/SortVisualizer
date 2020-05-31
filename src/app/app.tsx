import { SortingTask } from "./framework/SortingTask";
import { Sorter } from "./framework/Sorter";
import { MergeSort } from "./SortingAlgorithms/MergeSort";
import { InsertionSort } from "./SortingAlgorithms/InsertionSort";
import { HeapSort } from "./SortingAlgorithms/HeapSort";

var sorts = {
  merge: function (sortingTask: SortingTask): MergeSort {
    return new MergeSort(sortingTask);
  },
  insertion: function (sortingTask: SortingTask): InsertionSort {
    return new InsertionSort(sortingTask);
  },
  heapSort: function (sortingTask: SortingTask): HeapSort {
    return new HeapSort(sortingTask);
  },
};

function main() {
  var arr: Array<number> = [];
  for (var i = 0; i < 100; i++) {
    arr.push(Number(10 * Math.random()));
  }
}
