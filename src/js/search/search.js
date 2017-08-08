/**
 * Created by zhangjianan on 2017/7/28.
 */

/*keyword日后可以做实时查询*/
var keyword = document.querySelector("#input_keyword").addEventListener("input",function(){
    console.log(this.value);
    return this.value;
},true);

var productSearch = {},
    input_type = false,
    input_cancel = document.querySelector("#input_cancel"),
    input_in = document.querySelector("#input_keyword"),
    input_search = document.querySelector("#input_search");

input_cancel.addEventListener("tap",function () {
    input_cancel.setAttribute("class",".mui-hidden");
    input_search.setAttribute("class",".mui-hidden");
});

input_in.addEventListener("input",function () {
    input_cancel.removeAttribute("class",".mui-hidden");
    input_search.removeAttribute("class",".mui-hidden");
});


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
            keywords: productSearch.keywords,
            category: productSearch.category,
            pageNum: productSearch.pageNum,
            pageSize: productSearch.pageSize,
            brandsId: productSearch.brandsId
        },
        success: function (data) {
            console.log(data);
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

init_hotkeyword();



/*获取keyword*/
function getKeyword() {
    var keyword = document.querySelector("#keyword").value;
}

