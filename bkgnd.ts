function main() {
    var arr: Array<number> = [7, 4, 9, 2, 4, 5, 1];
    var a: SortingTask = new SortingTask(arr);
    console.log("hello");
}
console.log("hello there");

class SortingTask {
    arr: Array<number>;
    n: number;
    aux: {};
    acsesses: number;
    modifications: number;

    constructor(array: Array<number>) {
        this.arr = array;
        this.n = array.length;
        this.aux = {};

        this.acsesses = 0;
        this.modifications = 0;
        // auxilary
    }

    get(ix: number): number {
        this.acsesses++;
        this.updateCounters();
        return this.arr[ix];
    }

    set(ix: number, value: number): void {
        this.modifications++;
        this.arr[ix] = value;
        this.updateCounters();
        this.updatePositions();
    }

    updateCounters(): void { }
    updatePositions(): void { }
}

var sorts = {
    insertionSort: function (sortingTask: SortingTask): SortingTask {
        var arr = sortingTask;
        for (var i = 1; i < arr.n; i++) {
            var key = arr.get(i);
            var j = i - 1;
            while (j >= 0 && key < arr.get(j)) {
                arr.set(j + 1, arr.get(j));
                j--;
            }
            arr.set(j + 1, key);
        }
        return arr;
    },
    mergeSort: function (sortingTask): SortingTask {
        sortingTask.aux.r = [];
        sortingTask.aux.l = [];

        for (var i = 0; i < sortingTask.arr.length / 2; i++) {

        }

        return sortingTask;
    },
};
