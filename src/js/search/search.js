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
    content_list = $("#content_list"),
    content_loading = $("#loading");

/*
* 事件状态绑定*/
input_cancel.on("tap",function () {
    input_cancel.hide();
    input_search.hide();
});

input_in.bind("textInput",function () {
    input_cancel.show();
    input_search.show();
    content_loading.show();
});

input_in.on("search", function() {
    keywords = input_in.val();
    search(keywords);
});


/*搜索*/
function search(keywords) {
    var token = getCookie("token");
    input_cancel.hide();
    input_search.hide();
    var input = $("#input_keyword");
    input.blur();
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
            var html = template('search_list',data.data);
            $("[data-type=search_list]").html(html);
            content_loading.hide();
            get_detail();
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
function get_detail() {
    // 获取父节点，并为它添加一个click事件
    var index = document.getElementsByClassName('.mui-table-view.border-t.nmg');
    index.addEventListener("click",function(e) {
        // 检查事件源e.targe是否为Li
        if(e.target && e.target.nodeName.toUpperCase == "LI") {
            // 真正的处理过程在这里
            console.log(this);
        }
    });
    console.log(index);
}

init_hotkeyword();
