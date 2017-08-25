/**
 * Created by zhangjianan on 2017/7/31.
 */

/*折扣初始化*/
function initSuperDeals() {
    $.ajax({
        type: 'POST',
        data: {},
        async: false,
        url: RTTMALL_API.URL_SUPERDEALS,
        success: function (data) {
            //console.log(data);
            var list_header = template("dealsindex", data.data);
            $("[data-type=dealsindex]").html(list_header);
            var list_body = template("superdealslist", data.data);
            $("[data-type=superdealslist]").html(list_body);
            timer();
        }
    });
}

/*添加提醒*/
function addRemind(index) {
    var token = getCookie("token");
    $.ajax({
        url: RTTMALL_API.URL_INDEX_SUPERDEALES_REMIND_ADD,
        type:"POST",
        async: true,
        data: {
            client_token: token,
            superDealProductId: index
        },
        success: function (data) {
            //console.log(data);
            alert(data.msg);
        }
    });
}




