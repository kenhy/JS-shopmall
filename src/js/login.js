/**
 * Created by JonathanZhang on 2017/6/19.
 */

var Logined = false;/*登录状态*/

var logincheck = {
    /*登录*/
    login : function () {
        //登录页面值获取
        var userNo = $("#userNo").val(),
             pwd = $("#pwd").val();
        //值判断
        if(userNo == ""){
            alert("login Name is required.");
            return
        }else if(pwd == ""){
            alert("Login Password is required");
        }
        else {
            var opwd = $.md5(userNo.concat(pwd)).toUpperCase();
            $.ajax({
                type:"POST",
                url: RTTMALL_API.URL_LOGIN,
                dataType:"json",
                async:true,
                cache:false,
                data:{
                    loginName:userNo,
                    pwd:pwd,
                    opwd:opwd
                },
                success:function (data) {
                    if(data != null){

                    }
                }
            });
        }
    }
};

/*登录错误提醒*/
function showLoginTip(msg) {
    
}

