/**
 * Created by zhangjianan on 2017/7/18.
 */
var init_account = {
    account_msg:function () {
        var username = getCookie('userName'),
            loginName = getCookie('loginName'),
            imagePath = getCookie('imagePath'),
            user_login = $('#user_msg'),
            tpl;
        if (username != ""){
            //console.log(username);
            //console.log(imagePath);
            if(imagePath == "null"){
                imagePath = "../../images/Default-Avatar.jpg";
            }
            tpl = '<a href="profile.html">'+
                '<img class="mui-media-object mui-pull-left radius50" src="'+ imagePath +'">'+
                '<div class="mui-media-body">'+
                '<p class="font14 font-weight font-color-3">'+ username +'</p>'+
                '<p class="mui-ellipsis font-color-6 font12">'+ loginName +'</p>'+
                '<p class="iconfont icon-vip ">'+
                '<span class="font10 font-color-9">Membership</span>'+
                '</p>'+
                '</div>'+
                '<s class="mui-navigate-right font18"></s>'+
                '</a>';

            user_login.html(null);
            user_login.html(tpl);
        }else{
            alert('未登录');
        }
    }
};
