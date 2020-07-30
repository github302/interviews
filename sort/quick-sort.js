// 快速排序
function quickSort(A, p, r) {
    if (p < r) {
        var q = partition(A, p, r);
        quickSort(A, p, q - 1);
        quickSort(A, q + 1, r)
    }
}

function partition(A, p, r) {
    var base = A[p];
    var i = p, j = r;
    while ( i < j) {
        while(A[j] >= base && i < j) {
            j--;
        }
        while(A[i] <= base && i < j) {
            i++
        }
        swap(A, i, j);
    }
    swap(A, p, j);
    return j;
}

function swap(A, a,  b) {
    var tmp = A[a];
    A[a] = A[b];
    A[b] = tmp;
}
var arr = [1, 9, 8, 100, 50, 80, 90, 20,8 ,0 ];
console.log(arr, arr.length);
quickSort(arr, 0, arr.length - 1);
console.log(arr, arr.length);

// 参考资料：https://wiki.jikexueyuan.com/project/easy-learn-algorithm/fast-sort.html