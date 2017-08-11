/**
 * Created by zhangjianan on 2017/7/28.
 */
var url_message_id = window.location.search;
console.log(url_message_id);
var a_id = '';
function details_show(a_id) {

        var proId = escapeHtml(a_id);
        $.ajax({
            type : "get",
            url : RTTMALL_API.URL_PRODUCT_GETSKU,
            dataType : "json",
            async : true,
            cache : false,
            data : {
                proId : proId
            },
            success : function(data) {
                console.log(data);
            }
        });

}
