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
    cProductSearch.searchData;
    cProductSearch.totalPage = 0;
    productSearch = cProductSearch;
    // setCookie("productSearch", JSON.stringify(cProductSearch));
}

function search() {
    $("[data-type=scroll]").attr("src", $("[data-type=scroll]").attr("data-src") + "?id=" + Math.random());
    $("[data-type=scroll]").show();
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
function order() {
    var param = {};
    param.keywords = productSearch.keyword;
    param.category = productSearch.category;
    param.pageNum = productSearch.pageNum;
    param.pageSize = productSearch.pageSize;
    param.orderName = productSearch.orderName;
    param.orderType = forderType;
    param.brandsId = productSearch.brandsId;
    var beginPrice = $("#beginPrice").val();
    if (beginPrice != "") {
        param.beginPrice = beginPrice;
    }
    var endPrice = $("#endPrice").val();
    if (endPrice != "") {
        param.endPrice = endPrice;
    }
    var token = getCookie("token");
    param.client_token = token;
    $.ajax({
        type: "get",
        url: RTTMALL_API.URL_PRODUCT_SEARCH,
        dataType: "json",
        async: true,
        cache: false,
        data: param,
        success: function (data) {
            if (data != null) {
                data.data.domain = domain;
                productSearch.searchData = data.data;
                productSearch.totalPage = data.data.page.totalPage;
                initRelatedCategory();
                showProduct();
                var html = template('pageTemplate', data.data.page);
                $("[data-type=pageNumber]").html(html);
                $("[data-type=pageNumber]").find("[data-type=goPage]").each(
                    function (index) {
                        $(this).click(
                            function () {
                                productSearch.pageNum = $(this).attr("data-page");
                                $('html,body').animate({
                                    scrollTop: 0
                                }, 1);
                                order();
                            });
                    });
            }
        }
    });
}

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
