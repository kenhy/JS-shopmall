/**
 * Created by zhangjianan on 2017/7/28.
 */
var geturl = window.location.href,
    url = escapeHtml(geturl),
    reg = /^(http?:)\/\/([^\/]+)(\/[^\?]*)(\?[^#]*)?(#.*)?/,
    arr = url.match(reg),
    url_message_id = getMessage(arr[4]);

function getMessage(url_message) {
    var index = url_message;
    if(index.indexOf("?") != -1){
        var str = index.substr(1),
            strs = str.split("&"),
            key = new Array(strs.length),
            value = new Array(strs.length);
        for(var i=0;i<strs.length;i++){
            key[i]=strs[i].split("=")[0];
            value[i]=strs[i].split("=")[1];
        }
    }
    return value[0];
}

(function details_show(url_message_id) {
        var skuId = url_message_id,
            client = "web";
        $.ajax({
            type : "post",
            url : RTTMALL_API.URL_PRODUCT_GETSKU,
            dataType : "json",
            async : true,
            cache : false,
            data : {
                skuId : skuId,
                client : client
            },
            success : function(data) {
                console.log(data);
                var list = template('details',data.data);
                $("[data-type=details]").html(list);
                $("#productDes").html(data.data.productDetail.productDes)
            }
        });
    }
)(url_message_id);

(function pinglun_show(url_message_id) {
    var skuid = url_message_id,

    }
)(url_message_id);
