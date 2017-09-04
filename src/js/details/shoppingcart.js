/**
 * Created by zhangjianan on 2017/9/1.
 */

var shopping_cart = {
    /*初始化购物车*/
    init_cart:function () {
        var token = getCookie('token'),
            saleArea = '1';
        $.post(RTTMALL_API.URL_CART,{

        },function () {

        },"json");
    },
    /*加入购物车*/
    cart_add:function () {
        $.post(RTTMALL_API.URL_CART_ADD,{

        },function () {

        },"json");
    },
    /*购物车选择单个*/
    cart_checked:function () {
        $.post(RTTMALL_API.URL_CART_CHECKED,{

        },function () {

        },"json");
    },
    /*购物车选择多个*/
    cart_checked_list:function () {
        $.post(RTTMALL_API.URL_CART_CHECKED_LIST,{

        },function () {

        },"json");
    },
    /*购物车数量*/
    cart_count:function () {
        $.post(RTTMALL_API.URL_CART_COUNT,{

        },function () {

        },"json");
    },
    /*删除购物车单个*/
    cart_remove:function () {
        $.post(RTTMALL_API.URL_CART_REMOVE,{

        },function () {

        },"json");
    },
    /*删除购物车多个*/
    cart_remove_list:function () {
        $.post(RTTMALL_API.URL_CART_REMOVE_LIST,{

        },function () {

        },"json");
    }
};

shopping_cart.init_cart();
