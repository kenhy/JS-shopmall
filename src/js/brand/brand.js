/**
 * Created by Jonathan Zhang on 2017/7/7.
 */
var default_category = "0";
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
        var data = brand_list.init_category(default_category);
        //console.log(data);
        var list = template('category-list-left',data);
        //console.log(list);
        $("[data-type=category_list_left]").html(list);
    },

    /*category_right*/
    category_list_right:function (index) {
        var data = brand_list.init_category(index);
        console.log(data);
        var init = [];
        init = data.listCategory;
        /*var cate = init.listSon;
        console.log(cate);*/
        var list = template('category-list-right',data);
        //console.log(list);
        /*category_right_in*/
        $("[data-type=category_list_right]").html(list);
        init.forEach(function (value) {
            console.log(value);
            var list = template('category-list-right',value);

        });
    }
};

/*页面动态加载器*/
function init_category_right(index) {
    brand_list.category_list_right(index);
}

/*页面静态加载器*/
function init_category() {
    //brand
    brand_list.init_brand();
    //category
    brand_list.category_list_left();
}

function init_menu() {
    var category_list;
    category_list = controls.querySelector('.mui-active').getAttribute("id");
    //console.log(category_list);
    init_category_right(category_list);
}
