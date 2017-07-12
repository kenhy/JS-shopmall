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
            async: true,
            cache: false,
            data: {
                client: "ios"
            },
            success: function (data) {
                var list = template('brand-list',data);

            }
        });
    }
}

init_index.initBanner();
