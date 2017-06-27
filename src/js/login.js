/**
 * Created by JonathanZhang on 2017/6/19.
 */

/*登录状态*/
var Logined = false;
/*页面默认设置*/
var defaultCountry = "TT",
    defaultUserNo;

/*登录*/
function logincheck() {
    var userNo = $("#userNo").val(),
        pwd = $("#pwd").val();
    //值判断
    if (userNo == "") {
        return showLoginTip("login Name is required.");

    } else if (pwd == "") {
        return showLoginTip("Login Password is required");
    }
    else {
        var opwd = $.md5(userNo.concat(pwd)).toUpperCase();
        $.ajax({
            type: "POST",
            url: RTTMALL_API.URL_LOGIN,
            dataType: "json",
            async: true,
            cache: false,
            data: {
                loginName: userNo,
                pwd: pwd,
                opwd: opwd
            },
            success: function (data) {
                if (data != null) {
                    return("login");
                }
            }
        });
    }
}

/**
 * 登录错误提醒
 *
 * @param msg
 */
function showLoginTip(msg) {
    $("#tip_login").html(msg);
}

