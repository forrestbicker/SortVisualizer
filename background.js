function main() {
    var arr = [7, 4, 9, 2, 4, 5, 1]
    var a = new TrackableArray(arr);
    console.log(a.arr);
    console.log(sorts.insertion(arr));
}

class TrackableArray {

    constructor(array) {
        this.arr = array;
        this.n = array.length;

        this.acsesses = 0;
        this.modifications = 0;
    }

    get(ix) {
        this.acsesses++;
        return this.arr[ix];
    }

    set(ix, value) {
        this.modifications++
        this.arr[ix] = value;
        this.update();
    }

    update() {

    }
}

var sorts = {
    insertion: function (array) {
        var arr = new TrackableArray(array);
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
    }
}