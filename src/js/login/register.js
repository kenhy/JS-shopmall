/**
 * Created by Administrator on 2017/7/3.
 */
var r_way, //注册方式
    submit_register_email = $("#submit_register_email"),
    submit_register_phone = $("#submit_register_phone"),
    code_btn = $("#code_btn"),
    counts,
    count = 60;
/*页面默认设置*/
var default_countriesCode = "TT",
    coutry_data;
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
        else if(r_pwd != r_pwd2) {
            return show_register_tip("Password are not the same");
        }
        else{
            $.ajax({
                type:"POST",
                url:RTTMALL_API.URL_REGISTER_LOGINNAME_VERIFY,
                dataType:"json",
                async:false,
                cache:false,
                data:{
                    loginName : r_email
                },
                success:function (data) {
                    if (data != null) {
                        //console.log(data);
                        if (data.data.exists) {
                            return show_register_tip("User already exists.");
                        }
                        else{
                            var pwd = $.md5(r_pwd).toUpperCase();
                            r_way = "email";
                            //console.log(r_way);
                            var data = [r_email,pwd];
                            register.register_in(data,r_way);
                        }
                    }
                }
            })
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
        var prefix = $("#prefix").text();
        if(check == false){
            return show_register_tip("You must accept the Conditions of Use.");
        }else if(register.telVerify(tel)){
            var code = $("#tel-code").val();
            var p_pwd = $("#p_pwd").val();
            if (code == "") {
                show_register_tip("Verification code is required.");
                return false;
            }else if (code.length != 6) {
                show_register_tip("6-digit number");
                return false;
            }else if(pwd == ""){
                show_register_tip("Password is required");
                return false;
            }
            else if (register.registerCodeVerify(tel,code)) {
                r_way = "phone";
                //console.log(r_way);
                var list = country_id(coutry_data,prefix);
                //console.log(list);
                var pwd = $.md5(p_pwd).toUpperCase();
                var data = [tel,pwd,code,list];
                //console.log(data);
                register.register_in(data,r_way);
            } else {
                return false;
            }
        }
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
    },

    /*发送验证信息*/
    sendMessage : function() {
        var tel = $("#tel").val();
        var prefix = $("#prefix").text();
        //console.log(prefix);
        if (register.telVerify(tel)) {
            if (tel & prefix  == "") {
                show_register_tip("Please fill in the phone number");
            } else {
                $.ajax({
                    type: "get",
                    url: RTTMALL_API.URL_REGISTER_SENDCODE,
                    dataType: "json",
                    async: true,
                    cache: false,
                    data: {
                        loginName: tel,
                        prefix: prefix
                    },
                    success: function (data) {
                        console.log(data);
                        if (data != null) {
                            //console.info(data);
                            if (data.code != "1") {
                                show_register_tip(data.msg);
                            } else {
                                // 对它赋值
                                counts = count;
                                // 点击按钮后按钮禁用
                                code_btn.attr("disabled");
                                // 点击按钮后背景颜色变化（亮灰）
                                code_btn.removeClass("button-h");
                                code_btn.addClass("button-g");
                                // 按钮上的文字改变
                                code_btn.val(counts + 's');
                                Timer = window.setInterval(timevode, 1000);// 设置定时函数
                                // timevode
                                //registerPrefix = prefix;
                            }
                        }
                    }
                });
            }
            return;
        }
    },

    /*注册验证码验证*/
    registerCodeVerify : function(userNo, code) {
        var flag = false;
        $.ajax({
            type : "post",
            url : RTTMALL_API.URL_REGISTER_CODE_VERIFY,
            dataType : "json",
            async : false,
            cache : false,
            data : {
                loginName : userNo,
                code : code
            },
            success : function(data) {
                if (data != null) {
                    console.info(data);
                    if (data.code != "1") {
                        flag = false;
                        show_register_tip(data.msg);
                    } else {
                        // registerCode = code;
                        flag = true;
                    }
                }
            }
        });
        return flag;
    },

    /*国家列表*/
    initCountry : function(){
        var country = "";// = getCookie("country");
        if (country == "") {
            $.ajax({
                type: "get",
                url: RTTMALL_API.URL_COUNTRY_HEADER,
                dataType: "json",
                async: false,
                cache: false,
                data: {},
                success: function (data) {
                  console.log(data);
                    if (data != null) {
                        if (data.code != "1") {
                            alert(data.msg);
                        } else {
                            // 注册填写电话号码国家列表
                            coutry_data = data.data.list;
                            var arr = data.data.list;
                            var index = tel_loading(arr);
                            //console.log(index);
                            $("#prefix").html(index);
                            var list = template('countryAndPrefixTemplate',data);
                            $("[data-type=countryAndPrefix]").html(list);
                        }
                    }
                }
            });
        }
        else {
                // 注册填写电话号码国家列表
                var html = template('countryAndPrefixTemplate', JSON.parse(country));
                $("[data-type=countryAndPrefix]").html(html);
        }
        //赋值给文本框
        $("[data-type=countryAndPrefix] li").on('tap',function() {
            var value = $(this).find("em").attr("data-type");
            $("#prefix").html(value);
            $("#Areacode-phone").removeClass("mui-active");
            $(".mui-backdrop").hide();
        })
    },

    /*提交注册*/
    register_in:function (data,r_way) {
        var client = "web",
            version = "1.0";
        if(r_way == "email"){
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
                        alert("successed_1");
                    }
                }
            });
        }else if(r_way == "phone"){
            $.ajax({
                type : "POST",
                url : RTTMALL_API.URL_REGISTER,
                dataType : "json",
                async : true,
                cache : false,
                data : {
                    loginName:data[0],
                    pwd:data[1],
                    code:data[2],
                    countryId:data[3],
                    client:client,
                    version:version
                },
                success:function (data) {
                    if (data.data != null){
                        show_register_tip(data.msg);
                    }else{
                        alert("successed_2");
                    }
                }
            });
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

//文本框初始化
function tel_loading(data) {
    var arr = [];
    arr = data.filter(function (item) {
        if(item.countriesCode == default_countriesCode){
            return true;
        }
    });
    return arr[0].prefix;
}

//查找国家ID
function country_id(data,admin) {
    var arr = [];
    arr = data.filter(function (item,index) {
        if(item.prefix == admin){
            return true;
        }
    });
    return arr[0].id;
}

function timevode() {
    if (counts == 1) {// 当时秒数为0时
        // 按钮启用，颜色恢复，文字变成重新发送，计时器Timer清除
        window.clearInterval(Timer);
        code_btn.removeAttr("disabled");
        code_btn.removeClass("button-g");
        code_btn.addClass("button-h");
        code_btn.val("Send");
    } else {
        counts --;
        code_btn.val(counts + 's');
    }
}

/*邮箱注册确认*/
submit_register_email.on('click',register.emailRegister);
/*手机注册确认*/
submit_register_phone.on('click',register.phoneRegister);
/*注册接收验证码*/
code_btn.on('click',register.sendMessage);
