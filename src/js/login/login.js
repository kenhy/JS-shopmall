/**
 * Created by JonathanZhang on 2017/6/19.
 */

/*MUI操作*/

/*登录状态*/
var submit_login = $("#submit_login"),
    btn_code = $("#btn_code"),
    submit_reset_password = $("#submit_reset_password"),
    count = 60, // 初始秒数
    counts, // 在按钮上显示出的秒数
    Timer, // 时间定时器
    Login_status = false;
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
            var opwd=$.md5(userNo.concat(pwd)).toUpperCase(),
                client = "web",
                version = "1.0";
            pwd = $.md5(pwd).toUpperCase();
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
                            console.log(data);
                            showLoginTip(data.msg);
                        }else {
                            setCookie("token", data.data.token,1);
                            setCookie("loginName", data.data.loginName,1);
                            setCookie("userName", data.data.userName,1);
                            setCookie("customerId", data.data.customerId,1);
                            setCookie("pwd", data.data.pwd,1);
                            if(data.data.imagePath != null || data.data.imagePath != "" || data.data.imagePath != "null"){
                                setCookie("imagePath", data.data.imagePath,1);
                            }
                            setCookie("role", data.data.role,1);
                            Login_status = true;
                            location.href = "../../index.html";
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
            userNo  = $("#userNo").val(),
            code = $("#tel_code").val();
        if(userNo == ""){
            return showLoginTip("Please fill in the username");
        }else if (code == "") {
            showLoginTip("Verification code is required.");
            return false;
        }else if (code.length != 6) {
            showLoginTip("6-digit number");
            return false;
        }else if (pwd1 && pwd2 == ""){
            return showLoginTip("Password is required.");
        }else if(pwd1 != pwd2) {
            return showLoginTip("Password are not the same");
        }else{
            if(login.forget_reset_code(userNo,code)){
                login.forget_reset(userNo,code,pwd1);
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
    forget_reset_code:function (userNo,code) {
        var flag = false;
        $.ajax({
            type:"POST",
            url: RTTMALL_API.URL_PWD_FORGET_CODE_VERIFY,
            dataType:"JSON",
            async: false,
            cache: false,
            data:{
                loginName:userNo,
                code:code
            },
            success:function (data) {
                if (data != null){
                    //console.log(data);
                    if(data.code != "1"){
                        showLoginTip(data.msg);
                        //console.log(flag);
                        flag = false;
                    }else{
                        flag = true;
                    }
                }
            }
        });
        return flag;
    },

    /*忘记密码更改*/
    forget_reset:function (userNo,code,pwd1) {
        var pwd = $.md5(pwd1).toUpperCase();
        $.ajax({
            type:"POST",
            url: RTTMALL_API.URL_PWD_RESET,
            dataType:"JSON",
            async: false,
            cache: false,
            data:{
                loginName:userNo,
                pwd:pwd,
                code:code
            },
            success:function (data) {
                if (data != null){
                    console.log(data);
                    if(data.code != "1"){
                        showLoginTip(data.msg);
                    }else{
                        console.log('ok');
                        window.location.href = "login.html";
                    }
                }
            }
        });
    }
};


/*登录错误提醒*/
function showLoginTip(msg) {
        var error_msg = $("#error_msg");
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
submit_reset_password.on('click',login.login_forget);
