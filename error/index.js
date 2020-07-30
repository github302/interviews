window.onerror = function(event, source, line, col) {
    const result = `错误信息：${event}, 
                    错误的源码: ${source},
                    所在行：${line},
                    所在列：${col},
                    `
    // console.log(result);
    return true;
}

document.addEventListener('error', function(event) {
    // console.log('addEventListener错误监控：', event);
    event.preventDefault();
}, true)
