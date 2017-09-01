/**
 * Created by zhangjianan on 2017/9/1.
 */

var shoppingcart = {
    /*初始化购物车*/
    init_cart:function () {
        $.post(RTTMALL_API.URL_CART_ADD,{},function () {

        },"json");
    },
    /*加入购物车*/
    cart_add:function () {
        
    },
    /*购物车选择单个*/
    cart_checked:function () {

    },
    /*购物车选择多个*/
    cart_checked_list:function () {

    },
    /*购物车质量*/
    cart_count:function () {

    },
    /*删除购物车单个*/
    cart_remove:function () {

    },
    /*删除购物车多个*/
    cart_remove_list:function () {

    }
};
