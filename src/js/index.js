/**
 * Created by JonathanZhang on 2017/7/11.
 */


function init_index_all() {
    init_index.initBanner();
    var data = init_index_detail();
    //console.log(data);
    index_footer_model(data);
    index_footer_superDeal(data);
    login_status();
}

var init_index = {
    //初始化首页轮播图
    initBanner: function () {
        $.ajax({
            type: "get",
            url: RTTMALL_API.URL_INDEX_BANNER,
            dataType: "json",
            async: false,
            cache: false,
            data: {
                client: "ios"
            },
            success: function (data) {
                //console.log(data);
                var list = template('index-banner', data);
                //console.log(list);
                $("[data-type=home-banner]").html(list);

            }
        });
    }

};

//初始化首页底部
function init_index_detail() {
    var index;
    $.ajax({
        type:"get",
        url:RTTMALL_API.URL_INDEX_FOOTER,
        dataType:"json",
        async:false,
        cache:false,
        data:{},
        success:function (data) {
            index = data.data;
        }
    });
    return index;
}

//model
function index_footer_model(data) {
    var index = data.models;
    //console.log(index);
    /*1*/
    var list1 = template('index-footer-Sellers',index[0]);
    //console.log(list);
    $("[data-type=index-footer-Sellers]").html(list1);
    /*2*/
    var list2 = template('index-footer-Arrivals',index[1]);
    //console.log(list2);
    $("[data-type=index-footer-Arrivals]").html(list2);
}

//superDeal
function index_footer_superDeal(data) {
    var index = data.superDeal;
    //console.log(index);
}

//login 状态
function login_status() {
    var username = getCookie('userName'),
        loginName = getCookie('loginName'),
        imagePath = getCookie('imagePath'),
        user_login = $('#user_login'),
        tpl;
    //console.log(username);
    if (username != ""){
        //console.log(username);
        //console.log(imagePath);
        if(imagePath == "null"){
            imagePath = "images/Default-Avatar.jpg";
        }
        tpl = '<a href="containers/mine/account.html">'+
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
        //console.log(tpl);
        user_login.html(null);
        user_login.html(tpl);
    }else{
        tpl = '<img class="mui-media-object mui-pull-left radius50" src="images/Default-Avatar.jpg">'+
            '<div class="mui-media-body margin-t20">'+
            '<p class="font14 font-weight font-color-3">'+
            '<a class="font16 font-color-9" href="containers/login/login.html">Login in</a>'+
            '<a class="font16" href="javascript:void(0)"> | </a>'+
            '<a class="font16 font-color-9" href="containers/login/register.html">Register</a>'+
            '</p>'+
            '</div>';
        //console.log(tpl);
        user_login.html(null);
        user_login.html(tpl);
    }
}



