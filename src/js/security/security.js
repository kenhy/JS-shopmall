function ajax(url,fnSucc,fnFaild) {
    //1.创建ajax对象
    if(window.XMLHttpRequest){
        var iAjax = new XMLHttpRequest();
    }else{
        var iAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2.连接服务器
    //open(方法、文件名、异步传输)
    iAjax.open('GET',url,true);
    //3.发送请求
    iAjax.send();
    //4.接受返回
    iAjax.onreadystatechange = function () {
        //iAjax.readyState 浏览器和服务器进行到哪一步了
        if(iAjax.readyState == 4){
            if(iAjax.status == 200){
                fnSucc(iAjax.responseText);
            }
            else{
                if(fnFaild){
                    fnFaild(iAjax.status);
                }
                alert('失败'+iAjax.status);
            }
        }
    }
}

(function() {
    var TOUCHSTART, TOUCHEND;
    if (typeof(window.ontouchstart) != 'undefined') {
        TOUCHSTART = 'touchstart';
        TOUCHEND = 'touchend';
        TOUCHMOVE ='touchmove';

    } else if (typeof(window.onmspointerdown) != 'undefined') {
        TOUCHSTART = 'MSPointerDown';
        TOUCHEND = 'MSPointerUp';
        TOUCHMOVE = 'MSPointerMove';
    } else {
        TOUCHSTART = 'mousedown';
        TOUCHEND = 'mouseup';
        TOUCHMOVE = 'mousemove';
    }
    function NodeTouch(node) {
        this._node = node;
    }
    function tap(node,callback,scope) {
        node.addEventListener(TOUCHSTART, function(e) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        });
        node.addEventListener(TOUCHEND, function(e) {
            e.stopPropagation();
            e.preventDefault();
            var curx = e.changedTouches[0].pageX;
            var cury = e.changedTouches[0].pageY;
            if (Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
                callback.apply(scope, arguments);
            }
        });
    }
    function longTap(node,callback,scope) {
        var x,y,startTime=0,endTime=0,in_dis=false;
        node.addEventListener(TOUCHSTART, function(e) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
            startTime=(new Date()).getTime();
        });
        node.addEventListener(TOUCHEND, function(e) {
            e.stopPropagation();
            e.preventDefault();
            var curx = e.changedTouches[0].pageX;
            var cury = e.changedTouches[0].pageY;
            if (Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
                in_dis=true;
            }else{
                in_dis=false;
            }
            endTime=(new Date()).getTime();
            if (endTime - startTime > 300 && in_dis) {
                callback.apply(scope, arguments);
            }
        });
    }
    NodeTouch.prototype.on = function(evt, callback, scope) {
        var scopeObj;
        var x,y;
        if (!scope) {
            scopeObj = this._node;
        } else {
            scopeObj = scope;
        }
        if (evt === 'tap') {
            tap(this._node,callback,scope);
        } else if(evt === 'longtap'){
            longTap(this._node,callback,scope);
        } else {
            this._node.addEventListener(evt, function() {
                callback.apply(scope, arguments);
            });
        }
        return this;
    };
    window.$ = function(selector) {
        var node = document.querySelector(selector);
        if (node) {
            return new NodeTouch(node);
        } else {
            return null;
        }
    }
})();

var box=$("#box");
box.on("longtap",function(){
    console.log("你已经长按了");
},box)

