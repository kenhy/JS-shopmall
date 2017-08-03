/**
 * Created by zhangjianan on 2017/8/1.
 */
$(document).ready(function () {
    init_reaming();
});


function init_reaming() {
    var token = getCookie('token');
    $.ajax({
        type:'post',
        url: RTTMALL_API.URL_INDEX_SUPERDEALES_REMIND_LIST,
        dataType: "json",
        data:{
            client_token:token
        },
        async:true,
        success:function (data) {
            console.log(data);
            var list_header = template("remind-tpl", data);
            console.log(list_header);
            $("[data-type=remind-tpl]").html(list_header);
        }
    });
}
