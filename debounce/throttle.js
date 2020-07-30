// 节流函数：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效
// 使用场景1：在页面滚动事件中，引入函数的节流是一个比较好的实践。页面滚动的时候，每隔指定时间才会去执行一次判断逻辑。
// 使用场景2：页面缩放的onresize事件触发时，可以每隔指定时间才执行一次函数。
// 如果实现了dom拖拽功能，但是在绑定拖拽事件的时候发现每当元素稍微移动一点便触发了大量的回调函数，导致浏览器直接卡死，这个时候怎么办？

// 节流和防抖的区别
// 节流是每隔一段时间，函数必然会执行一次。而防抖是在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

/**
 * 第一版
 * 使用时间戳的方式实现: 当触发事件的时候，我们取出当前的时间戳，
 * 然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，
 * 就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。
 * @param {*} fn 要执行的函数
 * @param {*} gapTime 间隔的时间，单位ms
 */
function throttle1(fn, gapTime) {
    var lastTime = 0;
    return function() {
        var context = this;
        var nowTime = new Date().getTime();

        if (nowTime - lastTime > gapTime) {
            fn.apply(context, arguments);
            lastTime = nowTime;
        }
    }
}

/**
 * 第二版
 * 使用定时器的方式实现:当触发事件的时候，我们设置一个定时器，
 * 在触发事件的时候，如果定时器存在，就不执行，直到定时器执行，
 * 然后执行函数，清空定时器，这样就可以设置下个定时器。
 * @param {*} fn 
 * @param {*} gapTime 
 */
function throttle2(fn, gapTime) {
    var timer = null;

    return function () {
        var context = this;
        if (!timer) {
            timer = setTimeout(function() {
                fn.apply(context, arguments);
                timer = null;
            }, gapTime);
        }
        
    }
}

// 比较第一版和第二版
// 1. 第一版事件会立刻执行，第二版事件会在 n 秒后第一次执行
// 2. 第一版事件停止触发后没有颁发再次执行事件，第二版事件停止触发后依然会执行一次事件。


/**
 * 第三版：能立刻执行函数，并且能在停止触发的时候还能再执行一次。
 * @param {*} fn 
 * @param {*} gapTime 
 */
function throttle3(fn, gapTime) {
    var last = 0;
    var timer = null;
    return function() {
        var context = this;
        var now = +new Date();
        if (now - last >= gapTime  || (now - last) < 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(context, arguments);
            last = now;
        } else if (timer) {
            timer = setTimeout(function() {
                fn.apply(context, arguments);
                last = +new Date();
                timer = null;
            }, gapTime - (now - last))
        }

    }
}

// 参考资料：https://github.com/mqyqingfeng/Blog/issues/26