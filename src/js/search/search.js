/**
 * Created by zhangjianan on 2017/7/28.
 */

/*keyword日后可以做实时查询*/
var keyword = document.querySelector("#input_keyword").addEventListener("input",function(){
    console.log(this.value);
    return this.value;
},true);


/* keyword查询 */
var productSearch = {},
    input_type = false,
    input_cancel = $("#input_cancel"),
    input_in = $("#input_keyword"),
    input_search = $("#input_search"),
    content_list = $("#content_list"),
    search_popular = document.querySelector("#search_popular"),
    content_loading = $("#loading");

window.location.hash="";

if(window.location.hash == ""){
    input_cancel.hide();
}

/* 事件状态绑定 */
input_cancel.on("tap",function () {
    input_cancel.hide();
    input_search.hide();
});

/*hash监听*/
var hashchanges = document.addEventListener('hashchange',function () {
    return prohash;
});

/* 文字输入事件绑定 */
input_in.on("tap",function () {
    if(window.location.hash != ""){
        input_cancel.show();
    }
    window.location.hash = "";
    input_search.show();
    content_loading.show();
});

/*输入*/
input_in.on("search", function() {
    keywords = input_in.val();
    window.location.hash = keywords;
    input_search.show();
    search(keywords);
});

//页面自定义事件绑定
bindEvent(search_popular,'tap','a',function () {
    //console.log(this);
    var index = this.getAttribute('data-name');
    window.location.hash = index;
    input_in.val(index);
    content_loading.show();
    search(index);
    //console.log(index);
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
            pagenum = data.data.page.nextPage;
            content_loading.hide();
        }
    });
}

/* 排序 */
function init_hotkeyword() {
    $.ajax({
        type:"get",
        url: RTTMALL_API.URL_INDEX_HOTKEYWORDS,
        dataType:"json",
        async:true,
        cache:false,
        data:{},
        success:function (data) {
            //console.log(data);
            var html = template('search_populer',data);
            $("[data-type=search_populer]").html(html);
        }
    });
}


/*函数加载*/
init_hotkeyword();
