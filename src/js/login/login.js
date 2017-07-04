/**
 * Created by JonathanZhang on 2017/6/19.
 */
/*MUI操作*/

/*登录状态*/
var submit_login = $("#submit_login"),
     btn_code = $("#btn_code");
var count = 60;// 初始秒数
var counts;// 在按钮上显示出的秒数
var Timer;// 时间定时器
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
                //clientId = generateUUID();
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
                            setCookie("token", data.data.token);
                            setCookie("loginName", data.data.loginName);
                            setCookie("userName", encodeURIComponent(data.data.userName));
                            setCookie("customerId", data.data.customerId);
                            setCookie("pwd", data.data.pwd);
                            if(data.data.imagePath != null || data.data.imagePath != "" || data.data.imagePath != "null"){
                                setCookie("imagePath", data.data.imagePath);
                            }
                            setCookie("role", data.data.role);
                            var callback = getUrlParam("callback");
                        }
                    }
                }
            });
        }
    },

    /*找回密码*/
    login_forget:function () {
        var pwd1 = $("#pwd1").val(),
            pwd2 = $("#pwd2").val(),
            count  = $("#count").val(),
            tel_code = $("#tel_code").val();
        if(check == false){
            return show_register_tip("You must accept the Conditions of Use.");
        }else if(login.telVerify(tel)){
            var code = $("#tel-code").val();
            if (code == "") {
                show_register_tip("Verification code is required.");
                return false;
            }else if (code.length != 6) {
                show_register_tip("6-digit number");
                return false;
            }else if (pwd1 && pwd2 == ""){
                return show_register_tip("Password is required.");
            }
            else if(pwd1 != pwd2) {
                return show_register_tip("Password are not the same");
            }else if (login.forget_reset_code()){

            } else {
                show_register_tip("system error");
                return false;
            }
        }

    },

    /*忘记密码验证码发送*/
    send_msg_forget:function () {
        var userNo = $("#userNo").val();
        if(userNo == ""){
            showLoginTip("Please fill in the username");
        }else{
            $.ajax({
                type : "post",
                url : RTTMALL_API.URL_PWD_FORGET,
                dataType : "json",
                async : false,
                cache : false,
                data : {
                    loginName : userNo
                },
                success : function(data) {
                    if (data != null) {
                        // 对它赋值
                        counts = count;
                        // 点击按钮后按钮禁用
                        btn_code.attr("disabled");
                        // 点击按钮后背景颜色变化（亮灰）
                        btn_code.removeClass("button-h");
                        btn_code.addClass("button-g");
                        // 按钮上的文字改变
                        btn_code.val(counts + 's');
                        Timer = window.setInterval(timevode, 1000);// 设置定时函数
                        // timevode
                    }
                }
            });
        }

    },

    /*忘记密码验证码校验*/
    forget_reset_code:function () {

    },

    /*忘记密码更改*/
    forget_reset:function () {

    },

    /* 电话号码验证*/
    telVerify : function(tel) {
        if (tel == "") {
            show_register_tip("Phone NO. is required.");
            return false;
        }
        if (tel.length > 11) {
            show_register_tip("Phone NO. is too long.");
            return false;
        }
        var number = /^[0-9]*$/;
        if (number.test(tel)) {
            return true;
        }
        show_register_tip("Wrong phone NO.");
        return false;
    }
};


/*登录错误提醒*/
function showLoginTip(msg) {
        error_msg = $("#error_msg");
        error_msg.html(msg);
}

function timevode() {
    if (counts == 1) {// 当时秒数为0时
        // 按钮启用，颜色恢复，文字变成重新发送，计时器Timer清除
        window.clearInterval(Timer);
        btn_code.removeAttr("disabled");
        btn_code.removeClass("button-g");
        btn_code.addClass("button-h");
        btn_code.val("Send");
    } else {
        counts --;
        btn_code.val(counts + 's');
    }
}

/*登录按钮*/
submit_login.on('click',login.login_check);
/*发送验证码*/
btn_code.on('click',login.send_msg_forget);
/*密码找回更改*/

