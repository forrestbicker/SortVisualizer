function main() {
    var arr = [7, 4, 9, 2, 4, 5, 1]
    sorts.insertion(arr);
    console.log(arr);
}

URLSearchParams

var sorts = {
    insertion: function (array) {
        var arr = array;
        for (var i = 1; i < arr.length; i++) {
            var key = arr[i];
            var j = i - 1;
            console.log(arr + " " + i);
            while (j >= 0 && key < arr[j]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }

        return arr;
    }
}