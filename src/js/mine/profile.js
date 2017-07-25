/**
 * Created by zhangjianan on 2017/7/21.
 */

var country_flag = "css_cn";//getCookie("country");

/*用户*/
var account_index ={
    /*用户信息设置*/
    account_set:function () {
        var token = getCookie("token"),
            userName = $("#username").html(),
            sex = $("#sex").children().html();
        var sexs = 0;

            /*firstName = $("#names").attr("data-firstName"),
            lastName = $("#names").attr("data-lastName"),
            birthday = $("#result"),
            city = $("#city"),
            province = $("#province"),
            countryId = $("#country_type").attr("data-type"),
            imagePath = $("#imagePath"),*/

        /*firstName: firstName,
         birthday:birthday,
         city:city,
         province:province,
         countryId:countryId,
         imagePath:imagePath,*/
        if(sex == "Male"){
            sexs = 0;
        }else{
            sexs = 1;
        }
        $.ajax({
            type:"POST",
            url: RTTMALL_API.URL_ACCOUNT_SET,
            dataType:"json",
            async:true,
            cache:false,
            data:{
                client_token: token,
                userName: userName,
                sex:sexs

            },
            success:function () {
                alert('yes');
                window.location.reload();
            }
        });
    },
    account_get :function () {
        var token = getCookie("token");
        $.ajax({
            type:"GET",
            url: RTTMALL_API.URL_ACCOUNT_GET,
            dataType:"json",
            async: true,
            cache: false,
            data:{
                client_token:token
            },
            success:function (data) {
                //console.log(data);
                var list = template('my_msg',data);
                //console.log(list);
                $("[data-type=my_msg]").html(list);
                if(data.data.imagePath === undefined){
                    $("#imgPath").attr('src',"../../images/Default-Avatar.jpg")
                }else{
                    setCookie('imagePath',data.imagePath);
                }
                $("#country_type").addClass(country_flag);
                init_time();

            }
        });
    },
    /*国家列表*/
    initCountry : function(){
        var country = getCookie("country");
        if (country == "") {
            $.ajax({
                type: "GET",
                url: RTTMALL_API.URL_COUNTRY_HEADER,
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        if (data.code != "1") {
                            alert(data.msg);
                        } else {
                            // 国家列表
                            var list = template('countryAndPrefixTemplate',data);
                            $("[data-type=countryAndPrefix]").html(list);
                            country_list()
                        }
                    }
                }
            });
        }
        else {
            // 国家列表
            var html = template('countryAndPrefixTemplate', JSON.parse(country));
            $("[data-type=countryAndPrefix]").html(html);
            country_list()
        }
    }
};

/*国家列表*/
function country_list() {
    $("[data-type=countryAndPrefix] li").on('tap',function() {
        $("#country_type").removeClass(country_flag);
        var value = $(this).find("span").attr("data-type");
        country_flag = value;
        console.log(value);
        $("#country_type").addClass(value);
        $("#National-flag").removeClass("mui-active");
        $(".mui-backdrop").hide();
    });
}


/*选择时间*/
function init_time() {
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
}

function account_page_load() {

    /*save*/
    var save = $("#save_account");
    save.bind('tap',account_index.account_set);

    /*nickname*/
    $("#b-nickname").on('tap',function () {
        var list = $("#t-nickname").val();
        var userName = $("#username");
        userName.html(list);
    });

    /*sex*/
    var l_gender = $("#l-gender").children();
    console.log(l_gender);
    l_gender.bind('tap',function () {
        var list = $(this).html();
        var sex = $("#sex");
        sex.html(list);
    });

}


account_index.initCountry();
account_index.account_get();
account_page_load();
