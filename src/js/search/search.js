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
    content_list = $("#contentlist"),
    content_loading = $("#loading");

content_loading.hide();
/*
* 事件状态绑定*/
input_cancel.on("tap",function () {
    input_cancel.hide();
    input_search.hide();
});

input_in.bind("keyup",function () {
    input_cancel.show();
    input_search.show();
    content_loading.hide();
});

input_in.bind("search", function() {
    keywords = input_in.val();
    content_loading.show();
    setInterval(search(keywords));
});


/*搜索*/
function search(keywords) {
    var token = getCookie("token");
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
            console.log(data);
            input_cancel.hide();
            input_search.hide();
            var input = $("#input_keyword");
            input.blur();
            var html = template('search_list',data.data);
            $("[data-type=search_list]").html(html);
            getdetail();
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


/*得到details*/
function getdetail() {
    var details = document.querySelectorAll("detail");

}

init_hotkeyword();
