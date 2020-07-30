// 输入一个字符串，打印出该字符串中字符的所有排列。
// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]
var result = [];
var s = ""
function permutation(s) {
    dfs(0, s.length - 1, s);
}

function dfs(x) {
    if (x == s.length - 1) {
        result.push(s);
        return ;
    }
}

permutation("abc");