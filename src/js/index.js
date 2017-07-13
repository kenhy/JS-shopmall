/**
 * Created by JonathanZhang on 2017/7/11.
 */

function init_index_all() {
    init_index.initBanner();
    var data = init_index_detail();
    console.log(data);
    index_footer_model(data);
    index_footer_superDeal(data);
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
                console.log(data);
                var list = template('index-banner', data);
                console.log(list);
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
    console.log(list2);
    $("[data-type=index-footer-Arrivals]").html(list2);
}
//superDeal
function index_footer_superDeal(data) {
    var index = data.superDeal;
    //console.log(index);
}




