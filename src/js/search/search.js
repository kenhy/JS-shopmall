/**
 * Created by zhangjianan on 2017/7/28.
 */
init_hotkeyword();

var productSearch = {};

function initProductSearch() {
    var cProductSearch = {};
    cProductSearch.keyword = getKeyword();
    cProductSearch.category = getUrlParam("category");
    cProductSearch.brandsId = getUrlParam("brandsId");
    cProductSearch.pageNum = 1;
    cProductSearch.pageSize = 40;
    cProductSearch.view = 2;
    cProductSearch.orderName = "none";
    cProductSearch.orderType = 1;
    cProductSearch.searchData = [];
    cProductSearch.totalPage = 0;
    productSearch = cProductSearch;
}

function search() {
    var token = getCookie("token");
    $.ajax({
        type: "get",
        url: RTTMALL_API.URL_PRODUCT_SEARCH,
        dataType: "json",
        async: true,
        cache: false,
        data: {
            client_token: token,
            keywords: productSearch.keyword,
            category: productSearch.category,
            pageNum: productSearch.pageNum,
            pageSize: productSearch.pageSize,
            brandsId: productSearch.brandsId
        },
        success: function (data) {

        }
    });
}
/**
 * 排序
 */


function init_hotkeyword() {
    $.ajax({
        type:"get",
        url: RTTMALL_API.URL_INDEX_HOTKEYWORDS,
        dataType:"json",
        async:true,
        cache:false,
        data:{},
        success:function (data) {
            var html = template('search_populer',data);
            $("[data-type=search_populer]").html(html);
        }
    });
}

function getKeyword() {

}

