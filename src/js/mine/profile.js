/**
 * Created by zhangjianan on 2017/7/21.
 */

var country_flag = "css_cn";//getCookie("country");

/*用户*/
var account_index ={
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
                userName: userName,
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
                console.log(data);
                var list = template('my_msg',data);
                console.log(list);
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
/**/
function pushImg(obj) {
    debugger;
    var url = "upload/"; //访问控制器是upload，后面必须加'/'否则会报错"org.apache.catalina.connector.RequestFacade cannot be cast to org.springframework.web.multipart.Mult...",但是如果是多级的URL【例如XX/XXX/00/upload/0】又没问题了.
    var param = $("#errorParameter").val();

    var files = $("#imageFile").get(0).files[0]; //获取file控件中的内容

    var fd = new FormData();
    fd.append("userID", "1");
    fd.append("errDeviceType", "001");
    fd.append("errDeviceID", "11761b4a-57bf-11e5-aee9-005056ad65af");
    fd.append("errType", "001");
    fd.append("errContent", "XXXXXX");
    fd.append("errPic", files);
    $.ajax({
        type: "POST",
        contentType:false, //必须false才会避开jQuery对 formdata 的默认处理 , XMLHttpRequest会对 formdata 进行正确的处理
        processData: false, //必须false才会自动加上正确的Content-Type
        url: url,
        data: fd,
        success: function (msg) {
            debugger;
            var jsonString = JSON.stringify(msg);
            $("#txtTd").text(jsonString);
            alert(jsonString);
        },
        error: function (msg) {
            debugger;
            alert("error");
        }
    });
}

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

/*图片上传*/
/*$(document).ready(function() {
    $('#filer_input').filer({
        uploadFile: {
            url: "./php/ajax_upload_file.php",
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            synchron: true,
            beforeSend: function(){},
            success: function(data, itemEl, listEl, boxEl, newInputEl, inputEl, id){
                var parent = itemEl.find(".jFiler-jProgressBar").parent(),
                    new_file_name = JSON.parse(data),
                    filerKit = inputEl.prop("jFiler");

                filerKit.files_list[id].name = new_file_name;

                itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                    $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            error: function(el){
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: null,
            onComplete: null
        },
        captions: {
            button: "Choose Files",
            feedback: "Choose files To Upload",
            feedback2: "files were chosen",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
                filesType: "Only Images are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
            }
        }
    });
});*/

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
