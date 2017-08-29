/**
 * Created by JonathanZhang on 2017/7/18.
 */
$(document).ready(function () {
    account_msg();
});

var init_account = {
    /*用户信息获取*/
    account_list_init:function (){
        var list;
        var token = getCookie("token");
        $.ajax({
            type: "get",
            url: RTTMALL_API.URL_ACCOUNT_GET,
            dataType: "json",
            async: false,
            cache: false,
            data: {
                client_token: token
            },
            success: function (data) {
                if(data.code == "1"){
                    list = data.data;
                }else{
                    //console.log(data.msg);
                    confirm(data.msg);
                }
            }
        });
        return list;
    }
};

/*account用户载入*/
function account_msg() {
    var username = getCookie('userName'),
        loginName = getCookie('loginName'),
        imagePath = getCookie('imagePath'),
        user_login = $('#user_msg'),
        tpl;
    if (username != ""){
        //console.log(username);
        console.log(imagePath);
        if(imagePath == "" || imagePath == undefined){
            imagePath = "../../images/Default-Avatar.jpg";
        }
        tpl = '<a href="profile.html">'+
            '<img class="mui-media-object mui-pull-left radius50" src="'+ imagePath +'">'+
            '<div class="mui-media-body">'+
            '<p class="font14 font-weight font-color-3">'+ username +'</p>'+
            '<p class="mui-ellipsis font-color-6 font12">'+ loginName +'</p>'+
            '<p class="iconfont icon-vip ">'+
            '<span id="member_role" data-type="role" class="font10 font-color-9"></span>'+
            '</p>'+
            '</div>'+
            '<s class="mui-navigate-right font18"></s>'+
            '</a>';
        user_login.html(null);
        user_login.html(tpl);
        is_membership();
    }else{
        alert('not login');
        location.href = "/index.html";
    }
}

/*登出*/
function login_out() {
    delCookie("token");
    delCookie("loginName");
    delCookie("userName");
    delCookie("customerId");
    delCookie("pwd");
    delCookie("imagePath");
    delCookie("role");
    location.href = "/index.html";
}
