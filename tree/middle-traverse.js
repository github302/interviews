// https://leetcode-cn.com/problems/binary-search-tree-iterator

/**
 * 实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。调用 next() 将返回二叉搜索树中的下一个最小的数。
 * 提示：
 * next() 和 hasNext() 操作的时间复杂度是 O(1)，并使用 O(h) 内存，其中 h 是树的高度。
 * 你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 中至少存在一个下一个最小的数。
*/

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
    this.list = [];
    this.current = 0;
    var self = this;

    function travser(element) {
       if (element == null) return ;
       travser(element.left);
       self.list.push(element.val);
       travser(element.right);
    }
    travser(root);
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    return this.list[this.current++];
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return !!(this.current < this.list.length);
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

 var root = new TreeNode(7);
 var obj2 = new TreeNode(15);
 obj2.left = new TreeNode(9);
 obj2.right = new TreeNode(20);
 root.left = new TreeNode(3);
 root.right = obj2;

 var obj = new BSTIterator(root);
 console.log(obj.next());
 console.log(obj.hasNext());
 console.log(obj.next());
 console.log(obj.hasNext());
 console.log(obj.next());
 console.log(obj.hasNext());
 console.log(obj.next());
 console.log(obj.hasNext());
 console.log(obj.next());
 console.log(obj.hasNext());

