/**
 * Created by JonathanZhang on 2017/7/11.
 */
$(document).ready(
    function () {
        initBanner();
    }
);
//
function initHome() {

}
//初始化首页轮播图
function initBanner() {
    $.ajax({
        type : "get",
        url : RTTMALL_API.URL_INDEX_BANNER,
        dataType : "json",
        async : true,
        cache : false,
        data : {
            client : "web"
        },
        success : function(data) {
            console.log(data);
        }
    });
}
