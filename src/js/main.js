/**
 * Created by JonathanZhang on 2017/6/19.
 */
var host = location.protocol + "//";
//设置cookie
function setCookie(name, value) {
    var expdate = new Date(); // 初始化时间
    expdate.setTime(expdate.getTime() + 30 * 24 * 60 * 60 * 1000); // 时间
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString()
        + ";path=/";
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//清除cookie
function delCookie(name) {
    setCookie(name, "", -1);
}


function role(code, name) {
    this.code = code;
    this.name = name;
}

function getCustomerRole() {
    var customerRole = [ new role("NOT_CERTIFIED", "Unauthenticated"),
        new role("UNDER_REVIEW", "Pending"),
        new role("VERIFIED", "Certified") ];
    return customerRole;
}

function generateUUID() {
    var uuid = getCookie("uuid");
    if (uuid == "") {
        var d = new Date().getTime();
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        setCookie("uuid", uuid);
    }
    return uuid;
}

Date.prototype.format = function(f) {
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(f))
        f = f.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(f))
            f = f.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
    return f;
};

function bindEvent(elem,type,selector,fn) {
    if (fn == null) {
        fn = selector;
    }
    elem.addEventListener(type,function (e) {
        var target;
        if (selector) {
            target = e.target;
            if (target.matches(selector)) {
                fn.call(target,e);
            }
        }else {
            fn(e);
        }
    })
}

/*登录*/
function href_check() {
    var href_check_item = $(".user_check");
        href_check_item.attr("href","/containers/login/login.html");
}

/*会员*/
function getCustomerRole() {
    var customerRole = [ new role("NOT_CERTIFIED", "Unauthenticated"),
        new role("UNDER_REVIEW", "Pending"),
        new role("VERIFIED", "Certified") ];
    return customerRole;
}

/*会员判断*/
function is_membership() {
    var data = getCustomerRole();
    var index = getCookie("role");
    var role_name = "";
    if(index != ""){
        for (var i= 0;i<data.length;i++){
            if(data[i].code == index){
                role_name = data[i].name;
                console.log(data[i].name);
                return;
            }
        }
    }
    else{
        alert("error");
    }
    return role_name;
}


