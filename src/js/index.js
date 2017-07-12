/**
 * Created by JonathanZhang on 2017/7/11.
 */
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
                console.log(data);
                var list = template('index-banner', data);
                console.log(list);
                $("[data-type=home-banner]").html(list);

            }
        });
    },
    //初始化首页底部
    initFooter:function () {
        $.ajax({
            type:"get",
            url:RTTMALL_API.URL_INDEX_FOOTER,
            dataType:"json",
            async:false,
            cache:false,
            data:{},
            success:function (data) {
                console.log(data);
            }
        })
    }
};


function init_index_detail(data) {

}


