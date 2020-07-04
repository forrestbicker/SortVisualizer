// import { ASorter } from "../framework/ASorter";
// import { TrackableArray } from "../framework/TrackableArray";
// import { SortingTask } from "../framework/SortingTask"

// export class MergeSort extends Sorter {
//     sort(): SortingTask {
//         this.mergeSort(this.task.tArr, 0, this.task.tArr.getLength());
//         return this.task;
//     }

//     mergeSort(start: number, end: number): void { // returns array of indicies
//         if (start == end) {
//             // return [];
//         } else if (start == end + 1) {
//             // return [start];
//         } else {

//         let mid: number = Math.floor((start + end) / 2);

//         this.mergeSort(start, mid);
//         this.mergeSort(mid, end);

//         return this.merge(start, mid, end);

//         }
//         // split arr into two smaller arrs
//         // let left: number = this.task.generateNewAuxID();
//         // let right: number = this.task.generateNewAuxID();


//         // for (var i: number = 0; i < mid; i++) {
//         //     this.task.auxiliaryArrs[left].push(arr.get(i));
//         // }

//         // for (var i: number = mid; i < arr.getLength(); i++) {
//         //     this.task.auxiliaryArrs[right].push(arr.get(i));
//         // }

//         // recursivley sort the two haves and then merge

//     }

//     merge(start: number, mid: number, end: number): void {

//         // crawlers
//         let l: number = start; // left goes up to and including mid
//         let r: number = mid + 1; // right is everything right of mid
//         let k: number = 0; // insertion point to main array
        

//         while (l < mid + 1 && r <= end) {
//             let leftValue: number = this.task.tArr.get(l);
//             let rightValue: number = this.task.tArr.get(r);
//             if (leftValue <= rightValue) {
//                 l++;
//             } else {
//                 this.task.tArr.swap(l, r);
//                 merged.push(rightValue);
//                 r++;
//             }
//         }


//         //     let leftPointerIx: number = 0;
//     //     let rightPointerIx: number = 0;

//     //     let combined: number = this.task.generateNewAuxID();

//     //     while (leftPointerIx < leftArr.getLength() - 1 && rightPointerIx < rightArr.getLength()) {
//     //         let leftPointer: number = leftArr.get(leftPointerIx);
//     //         let rightPointer: number = leftArr.get(rightPointerIx);
//     //         if (leftPointer <= rightPointer) {
//     //             this.task.auxiliaryArrs[combined].push(leftPointer);
//     //             leftPointerIx++;
//     //         } else {
//     //             this.task.auxiliaryArrs[combined].push(rightPointer);
//     //             rightPointerIx++;
//     //         }
//     //     }

//     //     return this.task.auxiliaryArrs[combined];
//     }

// }