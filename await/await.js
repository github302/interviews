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

    function travser(element) {
        if (element == null)
            return;
        travser(element.left);
        this.list.push(element.left);
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
}
;

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return !!(this.current < this.list.length);
}
;

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
obj.next();
obj.hasNext();
obj.next();
obj.hasNext();
obj.next();
obj.hasNext();
obj.next();
obj.hasNext();
