/**
 * Created by zhangjianan on 2017/8/1.
 */
$(document).ready(function () {
    init_reaming();
    var Cancle_reminder = $(".cancle-reminder");
    Cancle_reminder.on('click',function () {
        var index = this.getAttribute("data-productid");
        console.log(index);
        del_reaming(index);
    });
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
            //console.log(list_header);
            $("[data-type=remind-tpl]").html(list_header);
        }
    });
}

function del_reaming(index) {
    var token = getCookie('token');
    $.ajax({
        type:'post',
        url:RTTMALL_API.URL_INDEX_SUPERDEALES_REMIND_DEl,
        dataType:"json",
        data:{
            client_token:token,
            superDealProductId:index
        },
        success:function () {
            window.location.reload();
            alert(data.msg);
        }
    });
}
