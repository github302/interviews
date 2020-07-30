var $ = function(selector) {
    return document.querySelectorAll(selector);
}

window.onload = init();
function init() {
    var eleGarbage = $('.garbage')[0];
    var eleDrags = $('.item');
    var lDrags = eleDrags.length;
    var eleRemind = $(".drag-remind")[0];
    var eleDrag = null;

    for (var i = 0; i < lDrags; i++) {
        eleDrags[i].onselectstart = function() {
            return false;
        }
        eleDrags[i].ondragstart = function(ev) {
            /** 拖拽开始 */
            // 拖拽效果
    
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.setData('text', ev.target.innerHTML);
            ev.dataTransfer.setDragImage(ev.target, 0, 0);
            eleDrag = ev.target;
            return true;
        }
    
        eleDrags[i].ondragend = function(ev) {
            /** 拖拽结束 */
            ev.dataTransfer.clearData("text");
            eleDrag = null;
            return false;
        }
    }
    
    eleGarbage.ondragover = function(ev) {
        /** 拖拽元素在目标元素上移动的时候 */
        ev.preventDefault();
        return true;
    }
    
    eleGarbage.ondragenter = function(ev) {
        /** 拖拽元素进度目标元素头上的时候 */
        this.style.color = "#fff";
        return true;
    }
    
    eleGarbage.ondrop = function(ev) {
        /** 拖拽元素进度目标元素上，同时鼠标松开的时候 */
        if (eleDrag) {
            eleRemind.innerHTML = `<strong>${eleDrag.innerHTML}<strong>扔进了垃圾箱`;
            eleDrag.parentNode.removeChild(eleDrag);
        }
        this.style.color = '#000';
        return false;
    }
    
}
