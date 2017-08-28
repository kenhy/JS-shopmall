/**
 * Created by zhangjianan on 2017/7/28.
 */

/*keyword日后可以做实时查询*/
// var keyword = document.querySelector("#input_keyword").addEventListener("input",function(){
//     console.log(this.value);
//     return this.value;
// },true);

var geturl = window.location.href,
    url = escapeHtml(geturl),
    reg = /^(http?:)\/\/([^\/]+)(\/[^\?]*)(\?[^#]*)?(#.*)?/,
    arr = url.match(reg),
    url_message_id = getMessage(arr[4]),
    content_loading = $("#loading");

function getMessage(url_message) {
    var index = url_message;
    if (index.indexOf("?") != -1) {
        var str = index.substr(1),
            strs = str.split("&"),
            key = new Array(strs.length),
            value = new Array(strs.length);
        for (var i = 0; i < strs.length; i++) {
            key[i] = strs[i].split("=")[0];
            value[i] = strs[i].split("=")[1];
        }
    }
    return value[0];
}


/*搜索*/
(function search(url_message_id) {
        var token = getCookie("token");
        $.ajax({
            type: "get",
            url: RTTMALL_API.URL_PRODUCT_SEARCH,
            dataType: "json",
            async: true,
            cache: false,
            data: {
                client_token: token,
                keywords: url_message_id,
                pageSize: '7'
            },
            success: function (data) {
                //console.log(data);
                var html = template('search_list',data.data);
                $("[data-type=search_list]").html(html);
                pagenum = data.data.page.nextPage;
                content_loading.hide();
            }
        });
    }
)(url_message_id);

