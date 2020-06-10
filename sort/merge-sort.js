// 归并排序
var D = [9,8,6,7,4,5,3, 1,2];
sortArray(D);
function sortArray(arr) {
    mergeSort(arr, 0, arr.length - 1);
}

function mergeSort(arr, start, end) {
    if (start >= end ) return ;
    var middle = Math.floor((start + end) / 2);
    mergeSort(arr, start, middle);
    mergeSort(arr, middle + 1, end);
    merge(arr, start, middle, end);

}

function merge(arr, start, middle, end) {
    var left = [], right = [];
    var lLen = middle - start + 1;
    var rLen = end - middle;
    for (var i = 0; i < lLen; i++) {
        left[i] = arr[start + i];
    }

    for (var j = 0; j < rLen; j++) {
        right[j] = arr[middle + j + 1];
    }
    i = 0;
    j = 0;
    k = start;
    while(i < lLen && j < rLen) {
        if (left[i] > right[j]) {
            arr[k] = right[j];
            j++;
        } else {
            arr[k] = left[i];
            i++;
        }
        k++;
    }
    while(i < lLen) {
        arr[k++] = left[i++];
    }
    while(j < rLen) {
        arr[k++] = right[j++];
    }
}
