/**
 * Created by zhangjianan on 2017/7/21.
 */
/*选择时间*/
(function($) {
    $.init();
    var result = $('#result')[0];
    var btns = $('.btn');
    btns.each(function(i, btn) {
        btn.addEventListener('tap', function() {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = JSON.parse(optionsJson);
            var id = this.getAttribute('id');
            /*
             * 首次显示时实例化组件
             * 示例为了简洁，将 options 放在了按钮的 dom 上
             * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
             */
            var picker = new $.DtPicker(options);
            picker.show(function(rs) {
                /*
                 * rs.value 拼合后的 value
                 * rs.text 拼合后的 text
                 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                 * rs.m 月，用法同年
                 * rs.d 日，用法同年
                 * rs.h 时，用法同年
                 * rs.i 分（minutes 的第二个字母），用法同年
                 */
                result.innerText = rs.text;
                /*
                 * 返回 false 可以阻止选择框的关闭
                 * return false;
                 */
                /*
                 * 释放组件资源，释放后将将不能再操作组件
                 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                 */
                picker.dispose();
            });
        }, false);
    });
})(mui);

(function($) {
    $('.Cancellation-list').scroll({
        indicators: true //是否显示滚动条
    });
})(mui);

/*用户*/
var set_account ={
    /*用户信息设置*/
    account_set:function () {
        var token = getCookie("token"),
            userName = $("#userName"),
            firstName = $("#firstName"),
            birthday = $("#birthday"),
            city = $("#city"),
            province = $("#province"),
            countryId = $("#countryId"),
            imagePath = $("#imagePath"),
            sex = $("#sex");
        $.ajax({
            type:"POST",
            url: RTTMALL_API,
            dataType:"json",
            async:false,
            cache:false,
            data:{
                client_token: token,
                userName: username,
                firstName: firstName,
                birthday:birthday,
                city:city,
                province:province,
                countryId:countryId,
                imagePath:imagePath,
                sex:sex
            }
        });
    },
    /*国家列表*/
    initCountry : function(){
        var country = getCookie("country");
        if (country == "") {
            $.ajax({
                type: "get",
                url: RTTMALL_API.URL_COUNTRY_HEADER,
                dataType: "json",
                async: true,
                cache: false,
                data: {},
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        if (data.code != "1") {
                            alert(data.msg);
                        } else {
                            // 注册填写电话号码国家列表
                            var list = template('countryAndPrefixTemplate',data);
                            $("[data-type=countryAndPrefix]").html(list);
                        }
                    }
                }
            });
        }
        else {
            // 注册填写电话号码国家列表
            var html = template('countryAndPrefixTemplate', JSON.parse(country));
            $("[data-type=countryAndPrefix]").html(html);
        }

        //赋值给页面
        $("[data-type=countryAndPrefix] li").on('tap',function() {
            var value = $(this).find("em").attr("data-type");
            console.log(value);
            $("#country_type").addclass(value);
            $(".mui-backdrop").hide();
        })
    }
};

set_account.initCountry();
