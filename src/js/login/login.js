/**
 * Created by JonathanZhang on 2017/6/19.
 */
/*MUI操作*/

/*登录状态*/
var submit_login = $("#submit_login");

var Login_status = false;
/*页面默认设置*/
var defaultCountry = "TT",
    defaultUserNo;

/*登录方法封裝*/
var login = {
    /*用户登录*/
    login_check:function () {
        var userNo = $("#userNo").val(),
             pwd = $("#pwd").val();
        //值判断
        if (userNo == "") {
            return showLoginTip("login Name is required");
        } else if (pwd == "") {
            return showLoginTip("Login Password is required");
        }
        else {
            var opwd = $.md5(userNo.concat(pwd)).toUpperCase(),
                client = "web",
                version = "1.0";
            $.ajax({
                type: "POST",
                url: RTTMALL_API.URL_LOGIN,
                dataType: "json",
                async: true,
                cache: false,
                data: {
                    loginName: userNo,
                    pwd: pwd,
                    opwd: opwd,
                    client : client,
                    version : version
                },
                success: function (data) {
                    if (data != null) {
                        if(data.code !="1"){
                            showLoginTip(data.msg);
                        }else{
                            console.log(data);
                            showLoginTip("");
                            alert("sign in");
                        }
                    }
                }
            });
        }
    }

};


/**
 * 登录错误提醒
 *
 * @param msg
 */
function showLoginTip(msg) {
        error_msg = $("#error_msg");
        error_msg.html(msg);
}

submit_login.on('click',login.login_check);
