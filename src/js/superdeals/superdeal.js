/**
 * Created by zhangjianan on 2017/7/31.
 */


/*折扣初始化*/
function initSuperDeals() {
    $.ajax({
        type: 'POST',
        data: {},
        async: false,
        url: RTTMALL_API.URL_SUPERDEALS,
        success: function (data) {
            //console.log(data);
            var list_header = template("dealsindex", data.data);
            $("[data-type=dealsindex]").html(list_header);
            var list_body = template("superdealslist", data.data);
            $("[data-type=superdealslist]").html(list_body);
            timer();
        }
    });
}

/*添加提醒*/
function addRemind(index) {
    var token = getCookie("token");
    $.ajax({
        url: RTTMALL_API.URL_INDEX_SUPERDEALES_REMIND_ADD,
        async: true,
        data: {
            client_token: token,
            superDealProductId: index
        },
        success: function (data) {
            //console.log(data);
            alert(data.msg);
        }
    });
}

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

