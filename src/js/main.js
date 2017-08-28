/**
 * Created by JonathanZhang on 2017/6/19.
 */
var domain = document.domain;

/* 输入跳转 */
function lesson_input() {
    var input_in = document.getElementById('input_in');
    input_in.addEventListener("click",function () {
        window.location.href = "http://" + domain + "/containers/search/search-list.html";
    });
}

/* 通用事件绑定 */
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

/*设置cookie*/
function setCookie(name, value) {
    var expdate = new Date(); // 初始化时间
    expdate.setTime(expdate.getTime() + 30 * 24 * 60 * 60 * 1000); // 时间
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString()
        + ";path=/";
}

/*获取cookie*/
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

/*清除cookie*/
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
        f = f.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(f))
            f = f.replace(RegExp.$1, RegExp.$1.length == 1
                ?
                o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return f;
};

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
    var customerRole = getCustomerRole();
    var role = getCookie("role");
    if(role != ""){
        if (role == customerRole[2].code) {
            $(".icon-vip").css("color", "#cca77a");
            $("[data-type=role]").html(customerRole[2].name);
        } else if (role == customerRole[1].code) {
            $("[data-type=role]").html(customerRole[1].name);
        } else {
            $("[data-type=role]").html(customerRole[0].name);
        }
    }
    else {
        alert("error");
    }
}



function downloadMobile() { //判断是ios还是android
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if (isAndroid) {
			window.location.href = "RTTMALL://gxkj/shop/SplashActivity";
			window.setTimeout(function() {
                window.location.href = "http://img.rttmall.com/apk/RTTMALL.apk";
            }, 850);
		}
		if (isiOS) {
			window.location.href = "RTTMALL://com.xmgxkj.RTTMALL";
			window.setTimeout(function() {
                window.location.href = "https://itunes.apple.com/cn/app/rttmall/id1033048220?mt=8";
            }, 850);
		}
}

function removeOpen() {
    $("#footer_init").html('');
}

/*
* 底部app跳转*/
function init_footer() {
var tpl = '<footer class="footer" style="position: fixed; bottom: 0; left: 0; width: 100%; margin: 0; z-index: 999">'
    +'<ul id="footer_ul">'
    +'<li id="down_app">'
    +'<div class="mobOpen">'
    +'<div class="removeOpen" onClick="removeOpen()">X</div>'
    +'<div class="mobileLogo"></div>'
    +'<div class="mobileTitle">RTTMALL</div>'
    +'<div class="mobileOpen" onClick="downloadMobile()">OPEN</div>'
    +'</div>'
    +'</li>'
    +'</ul>'
    +'</footer>';
$("#footer_init").html(tpl);
}

/*字符转义*/
var escapeHtml = function(str) {
    if(!str) return '';
    str = str.replace(/</g,'&lt;');//替换成html实体
    str = str.replace(/>/g,'&gt;');
    str = str.replace(/"/g,'&quto');
    str = str.replace(/'/g,'&39');
    str = str.replace(/ /g,'&32'); //遵循书写规则，可以不做转义
    return str;
};

function timer() {
    countdown();
    setTimeout(timer, 1000); // time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
}

function countdown() {
    var obj = $("[data-type=countdown]");
    var endTime = obj.attr("data-countdown");
    var time = show_date_time(endTime);
    if (time == "close") {
        obj.attr("data-type", "close");
        obj.html("Close");
    } else {
        obj.html(time);
        obj.attr("data-countdown", endTime - 1000);
    }
}

function show_date_time(timerEndTime) {
    // 计算目标时间与当前时间间隔(毫秒数)
    var timeold = timerEndTime;
    // 得到小时数
    var e_hrsold = timeold / (60 * 60 * 1000);
    // 得到小时数(整数)
    var hrsold = Math.floor(e_hrsold);
    // 得到分数
    var e_minsold = (e_hrsold - hrsold) * 60;
    // 得到分数(整数)
    minsold = Math.floor((e_hrsold - hrsold) * 60);
    // 得到秒数(整数)
    seconds = Math.floor((e_minsold - minsold) * 60);
    if (hrsold < 0) {
        return "close";
    } else {
        return formatTime(hrsold) + ":" + formatTime(minsold) + ":" + formatTime(seconds);
    }
}

function formatTime(timeStr) {
    if (timeStr < 10)
        timeStr = "0" + timeStr;
    return timeStr;
}

/*登录状态监测*/
function all_login_status(){
    var token = getCookie("token");
    if (token == "") {
        //console.log(username);
        //console.log(imagePath);
        href_check();
    }
}

init_footer();
all_login_status();
