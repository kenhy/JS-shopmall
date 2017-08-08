/**
 * Created by zhangjianan on 2017/7/28.
 */

/*keyword日后可以做实时查询*/
var keyword = document.querySelector("#input_keyword").addEventListener("input",function(){
    console.log(this.value);
    return this.value;
},true);

/*keyword查询*/
var productSearch = {},
    input_type = false,
    input_cancel = $("#input_cancel"),
    input_in = $("#input_keyword"),
    input_search = $("#input_search"),
    content_list = $("#contentlist");

input_cancel.hide();
input_search.hide();

input_cancel.on("tap",function () {
    input_cancel.hide();
    input_search.hide();
});

input_in.bind("keyup",function () {
    input_cancel.show();
    input_search.show();
});

input_in.bind("search", function() {
    search();
});

/*搜索*/
function search(pageNum,pageSize) {
    var token = getCookie("token"),
        keywords = input_in.val();
    $.ajax({
        type: "get",
        url: RTTMALL_API.URL_PRODUCT_SEARCH,
        dataType: "json",
        async: true,
        cache: false,
        data: {
            client_token: token,
            keywords: keywords,
            pageSize: '7'
        },
        success: function (data) {
            input_cancel.hide();
            input_search.hide();
            console.log(data);
            var html = template('search_list',data.data);
            $("[data-type=search_list]").html(html);
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

