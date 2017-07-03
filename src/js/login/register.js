/**
 * Created by Administrator on 2017/7/3.
 */
/*注册方式*/
var r_way,
    submit_register_email = $("#submit_register_email"),
    submit_register_phone = $("#submit_register_phone");

var register = {
        /*邮箱登录验证*/
    emailRegister: function () {
        var check = $("#agreement_email").is(":checked");
        if(check == false){
            return show_register_tip("You must accept the Conditions of Use.");
        }
        var r_email = $("#r_email").val(),
            r_pwd = $("#r_pwd").val(),
            r_pwd2 = $("#r_pwd2").val();
        if (r_email == ""){
            return show_register_tip("Email address is required.");
        }else if (r_email.length > 60){
            return show_register_tip("Email address is too long.");
        }else if (!register.emailVerify(r_email)){
            return show_register_tip("Email address error.");
        }else if (r_pwd && r_pwd2 == ""){
            return show_register_tip("Password is required.");
        }
        else if(r_pwd == r_pwd2) {
            $.ajax({
                type:"POST",
                url:RTTMALL_API.URL_REGISTER_LOGINNAME_VERIFY,
                datatype:"json",
                async:false,
                cache:false,
                data:{
                    loginName : r_email
                },
                success:function (data) {
                    if (data != null) {
                        console.log(data);
                        if (data.data.exists) {
                            return show_register_tip("User already exists.");
                        }
                        else{
                            r_way = "email";
                            console.log(r_way);
                            var data = [r_email,r_pwd];
                            register.register_in(data,r_way);
                        }
                    }
                }
            })
        }
        else{
            return show_register_tip("");
        }
    },
    /*邮箱验证*/
    emailVerify : function(email) {
        var filter = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        var flag = filter.test(email);
        return flag;
    },

    /*手机验证*/
    phoneRegister: function() {
        var check = $("#agreement_phone").is(":checked"),
            tel = $("#tel").val();
        if(check == false){
            return show_register_tip("You must accept the Conditions of Use.");
        }else if(register.telVerify(tel)){
            var code = $("#tel-code").val();
            if (code == "") {
                show_register_tip("Verification code is required.");
                return false;
            }
            if (code.length != 6) {
                $(".register-error-tel-code").show();
                $(".register-error-tel-code .notice-descript").html(
                    "6-digit number");
                return false;
            }
            if (loginConfig.registerCodeVerify(tel, code)) {
                loginConfig.registerStep2(tel);
            } else {
                return false;
            }
        }
    },

    /**
     * 电话号码验证
     *
     * @param tel
     *            电话号码
     * @returns {Boolean} 是否合法
     */
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
    },

    /*发送验证信息*/
    sendMessage : function() {
        var tel = $("#tel").val();
        var prefix = $("[data-type=tel-country-text]").find("em").text();
        if (register.telVerify(tel)) {
            if (!isVerifySucc) {
                $(".register-error-email-verify").css("display", "inherit");
                return false;
            }
            $.ajax({
                type : "get",
                url : RTTMALL_API.URL_REGISTER_SENDCODE,
                dataType : "json",
                async : true,
                cache : false,
                data : {
                    loginName : tel,
                    prefix : prefix
                },
                success : function(data) {
                    if (data != null) {
                         console.info(data);
                        /*if (data.code != "1") {
                            show_register_tip(data.msg);
                        } else {
                            counts = count;// 对它赋值
                            var btn = $("#code-btn");
                            // 点击按钮后按钮禁用
                            btn.disabled = "disabled";
                            // 点击按钮后背景颜色变化（亮灰）
                            btn.style.background = "Gainsboro";
                            // 按钮上的文字改变
                            btn.value = counts + "s";
                            Timer = window.setInterval(timevode, 1000);// 设置定时函数
                            // timevode
                            registerPrefix = prefix;
                        }*/
                    }
                }
            });

        }
        return;
    },

    /*提交注册*/
    register_in:function (data,r_way) {
        //console.log(data);
        //
        var client = "web",
            version = "1.0";
        if(r_way == "email"){
            console.log(data[0]);
            $.ajax({
                type : "POST",
                url : RTTMALL_API.URL_REGISTER,
                dataType : "json",
                async : true,
                cache : false,
                data : {
                    loginName:data[0],
                    pwd:data[1],
                    client:client,
                    version:version
                },
                success:function (data) {
                    if (data.data != null){
                        show_register_tip(data.msg);
                    }else{
                        console.log(data.data);
                        alert("successed");
                    }
                }
            });
        }else if(r_way == "phone"){

        }else{
            return show_register_tip("system error");
        }
    }
};

/*信息提示*/
function show_register_tip(msg) {
    error_msg = $("#error_msg");
    error_msg.html(msg);
}

/*国家列表*/
function coutry_list(index) {

}

/*邮箱注册确认*/
submit_register_email.on('click',register.emailRegister);
/*手机注册确认*/
submit_register_phone.on('click',register.phoneRegister);
