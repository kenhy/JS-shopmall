/**
 * Created by zhangjianan on 2017/7/31.
 */

$(document).ready(function () {
    /*右上角菜单显示*/
    mui.init();
    mui.plusReady(function () {
    });
    mui('.mui-scroll-wrapper').scroll();
    mui('body').on('shown', '.mui-popover', function (e) {
        //console.log('shown', e.detail.id);//detail为当前popover元素
    });
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });
    initMyCoupon();
});

function initMyCoupon() {
    var token = getCookie("token");
    $.post(RTTMALL_API.URL_COUPON_MINE, {
            client_token : token
        },
        function(data) {
        console.log(data);
            if (data != null) {
                if (data.code != "1") {
                    return;
                }
                var couponData = data.data;
                var item1 = template('Unused',couponData);
                $("[data-type=Unused]").html(item1);
            }
        }, "json");
}

var unixTimestamp = new Date( 1477386005*1000 ) ;
commonTime = unixTimestamp.toLocaleString();
alert(commonTime);
