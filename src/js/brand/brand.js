/**
 * Created by Jonathan Zhang on 2017/7/7.
 */

var brand_list = {
    /*品牌列表*/
    init_brand:function () {
        $.ajax({
            type:"get",
            url:RTTMALL_API.URL_BRANDS,
            dataType:"json",
            async:true,
            cache:false,
            data:{},
            success:function (data) {
                //console.log(data)
                if(data.code != "1"){
                    alert(data.msg)
                }else{
                    //品牌列表
                    var list_Recommend = template('brand-list',data);
                    $("[data-type=brand_list]").html(list_Recommend);
                }
            }
        })
    },
    /*category*/
    init_category:function (index) {
        var arr = {};
        $.ajax({
            type:"POST",
            url:RTTMALL_API.URL_CATEGORY,
            async:false,
            cache:false,
            dataType:"JSON",
            data:{
                categoryId:index
            },
            success:function (data) {
                if (data != null){
                    arr = data.data;
                    //console.log(arr);
                }
            }
        });
        return arr;
    },
    /*category_left*/
    category_list_left:function () {
        var data = brand_list.init_category(0);
        console.log(data);
        var list = template('category-list-left',data);
        console.log(list)
        $("[data-type=category_ist_left]").html(list);
    }
};
