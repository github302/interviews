// 如果给一个按钮绑定了表单提交的post事件，但是用户有些时候在网络情况极差的情况下多次点击按钮造成表单重复提交，如何防止多次提交的发生？

// 函数防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
// 使用场景：在输入框输入名字搜索，指定时间内一直输入字符，会等输入字符结束后才会触发函数发送请求。

function debounce(fn, wait) {
    var timer = null;

    return function() {
        var context = this;
        if (timer) {
            clearTimeout(timer);
        }
        
        timer = setTimeout(function() {
            fn.apply(context, arguments);
        }, wait);
    }
}