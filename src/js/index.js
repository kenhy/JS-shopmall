/**
 * Created by JonathanZhang on 2017/7/11.
 */
$(document).ready(function () {
    init_index.initBanner();
    var data = init_index_detail();
    //console.log(data);
    index_footer_model(data);
    initSuperDeals(data);
    login_status();
    initSuperDeals();
    timer();
    var gallery = mui('.home-banner');
    gallery.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0;
    });
    mui('body').on('tap', 'a', function() {
        window.top.location.href = this.href;
    });
});


var init_index = {
    //初始化首页轮播图
    initBanner: function () {
        $.ajax({
            type: "get",
            url: RTTMALL_API.URL_INDEX_BANNER,
            dataType: "json",
            async: false,
            cache: false,
            data: {
                client: "ios"
            },
            success: function (data) {
                //console.log(data);
                var list = template('index-banner', data);
                //console.log(list);
                $("[data-type=home-banner]").html(list);

            }
        });
    }
};

//初始化首页底部
function init_index_detail() {
    var index;
    $.ajax({
        type: "get",
        url: RTTMALL_API.URL_INDEX_FOOTER,
        dataType: "json",
        async: false,
        cache: false,
        data: {},
        success: function (data) {
            index = data.data;
            //console.log(data);
        }
    });
    return index;
}

//model
function index_footer_model(data) {
    var index = data.models;
    //console.log(index);
    /*1*/
    var list1 = template('index-footer-Sellers', index[0]);
    //console.log(list);
    $("[data-type=index-footer-Sellers]").html(list1);
    /*2*/
    var list2 = template('index-footer-Arrivals', index[1]);
    //console.log(list2);
    $("[data-type=index-footer-Arrivals]").html(list2);
}

var timeout = false; // 启动及关闭按钮
var timerEndTime;

function timer() {

    if (timeout) {
        show_date_time()
    }
    setTimeout(timer, 1000); // time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
}

function show_date_time() {
    // 计算目标时间与当前时间间隔(毫秒数)
    var timeold = timerEndTime - new Date().getTime();
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
        timeout = false;
        initSuperDeals();
    } else {
        $("[data-role=hour]").html(formatTime(hrsold));
        $("[data-role=minute]").html(formatTime(minsold));
        $("[data-role=second]").html(formatTime(seconds));
    }
}

function initSuperDeals() {
    $.ajax({
        type: "get",
        url: RTTMALL_API.URL_INDEX_SUPERDEALS,
        dataType: "json",
        async: true,
        cache: false,
        data: {},
        success: function (data) {
            if (data != null) {
                console.log(data);
                if (data.data.productList != null && data.data.productList.length > 0) {
                    if (data.data.isNow) {
                        $("#deit").text("Deal ends in:");
                        startTimer(data.data.endTime);
                    } else {
                        $("#deit").text("New deal starts in:");
                        startTimer(data.data.beginTime);
                    }
                    var html = template('superDealsTemplate', data.data);
                    $("[data-type=superDealsMain]").html(html);
                }
            }
        }
    });
}

function startTimer(endTime) {
    timerEndTime = endTime;
    timeout = true;
}

function formatTime(timeStr) {
    if (timeStr < 10)
        timeStr = "0" + timeStr;
    return timeStr;
}

//login 状态
function login_status() {
    var token = getCookie("token"),
        username = getCookie("userName"),
        loginName = getCookie("loginName"),
        imagePath = getCookie("imagePath"),
        user_login = $('#user_login'),
        index_chart = $('#index_chart'),
        tpl;
    //console.log(username);

    if (token == "") {
        //console.log(username);
        //console.log(imagePath);
        setCookie("login_status", "false");
        href_check();
        tpl = '<img class="mui-media-object mui-pull-left radius50" src="images/Default-Avatar.jpg">' +
            '<div class="mui-media-body margin-t20">' +
            '<p class="font14 font-weight font-color-3">' +
            '<a class="font16 font-color-9" href="containers/login/login.html">Login in</a>' +
            '<a class="font16" href="javascript:void(0)"> | </a>' +
            '<a class="font16 font-color-9" href="containers/login/register.html">Register</a>' +
            '</p>' +
            '</div>';
        //console.log(tpl);
        user_login.html(null);
        user_login.html(tpl);
    } else {
        if (imagePath == "null") {
            imagePath = "images/Default-Avatar.jpg";
        }
        tpl = '<a href="containers/mine/account.html">' +
            '<img class="mui-media-object mui-pull-left radius50" src="' + imagePath + '">' +
            '<div class="mui-media-body">' +
            '<p class="font14 font-weight font-color-3">' + username + '</p>' +
            '<p class="mui-ellipsis font-color-6 font12">' + loginName + '</p>' +
            '<p class="iconfont icon-vip ">' +
            '<span data-type="role" class="font10 font-color-9"></span>' +
            '</p>' +
            '</div>' +
            '<s class="mui-navigate-right font18"></s>' +
            '</a>';
        //console.log(tpl);
        user_login.html(null);
        user_login.html(tpl);
        is_membership();
    }
}



