/**
 * Created by Administrator on 2017/7/3.
 */
var API_BASE_URL = "http://diy.rttshop.com/apipro";
var RTTMALL_API = {
    URL_IM_AUTH : API_BASE_URL + "/im/auth",
    URL_PRODUCT_DETAIL : API_BASE_URL + "/product/sku",
    URL_PRODUCT_REVIEW : API_BASE_URL + "/product/review",
    URL_PRODUCT_REVIEW_COUNT : API_BASE_URL + "/product/review/count",
    URL_PRODUCT_REVIEW_SCORE : API_BASE_URL + "/product/review/score",
    // 每周热销TOP10
    URL_PRODUCT_BESTSELLING_WEEKLY : API_BASE_URL
    + "/product/bestselling/weekly",
    // 品类热销TOP10
    URL_PRODUCT_BESTSELLING : API_BASE_URL + "/product/bestselling",
    // 品类点击TOP20
    URL_PRODUCT_HOTVIEW : API_BASE_URL + "/product/hotView",
    URL_PRODUCT_HOTVIEW_ADD : API_BASE_URL + "/product/hotView/add",
    URL_PRODUCT_GETSKU : API_BASE_URL + "/product/sku/get",
    URL_PRODUCT_SKU_CHANGE : API_BASE_URL + "/product/skuAttr/change",
    URL_PRODUCT_AD : API_BASE_URL + "/ad/recommend",
    URL_PRODUCT_SEARCH : API_BASE_URL + "/product/search",
    URL_PRODUCT_DELIVERY_3DAY : API_BASE_URL + "/product/3day",
    URL_PRODUCT_DELIVERY_3DAY_NEW : API_BASE_URL + "/product/3day/new",
    URL_FIND_ACTIVITY : API_BASE_URL + "/category/activity",
    URL_PRODUCT_BROWSING : API_BASE_URL + "/browsing/product",
    URL_PRODUCT_BROWSING_ADD : API_BASE_URL + "/browsing/product/add",

    URL_CART_ADD : API_BASE_URL + "/cart/add",
    URL_CART : API_BASE_URL + "/cart",
    URL_CART_CHECKED : API_BASE_URL + "/cart/checked",
    URL_CART_CHECKED_LIST : API_BASE_URL + "/cart/checked/list",
    URL_CART_QUANTITY : API_BASE_URL + "/cart/quantity",
    URL_INDEX_CART_COUNT : API_BASE_URL + "/cart/count",
    URL_CART_REMOVE : API_BASE_URL + "/cart/remove",
    URL_CART_REMOVE_LIST : API_BASE_URL + "/cart/remove/list",

    // 获取快递信息
    URL_SHIPPING : API_BASE_URL + "/shipping",

    // 登陆
    URL_LOGIN : API_BASE_URL + "/sign",
    // 注册
    URL_REGISTER_SENDEMAIL : API_BASE_URL + "/register/sendEmail",
    URL_REGISTER_SENDCODE : API_BASE_URL + "/register/code/send",
    URL_REGISTER_CODE_VERIFY : API_BASE_URL + "/register/code/verify",
    URL_REGISTER : API_BASE_URL + "/register/app",
    URL_REGISTER_LOGINNAME_VERIFY : API_BASE_URL + "/register/loginName/verify",
    // 忘记密码
    URL_PWD_FORGET : API_BASE_URL + "/sign/pwd/forget",
    URL_PWD_FORGET_CODE_VERIFY : API_BASE_URL + "/sign/pwd/forget/code/verify",
    URL_PWD_RESET : API_BASE_URL + "/sign/pwd/reset",
    // 修改密码
    URL_PWD_UPDATE : API_BASE_URL + "/sign/pwd/update",
    URL_PAY_PWD_UPDATE : API_BASE_URL + "/pay/pwd/update",

    // 语言列表
    URL_LANGUAGE : API_BASE_URL + "/language",
    // 国家列表
    URL_COUNTRY : API_BASE_URL + "/country/all",
    URL_COUNTRY_HEADER : API_BASE_URL + "/header/country/all",
    URL_COUNTRY_LIST : API_BASE_URL + "/country/list",
    // 货币列表
    URL_EXCHANGERATE : API_BASE_URL + "/exchangeRate",
    // 服务网点列表
    URL_SERVICE_NETWORK : API_BASE_URL + "/network/service",


    //APP分类页
    URL_CATEGORY: API_BASE_URL + "/category/all",
    // 搜索输入框备选分类
    URL_CATEGORY_HEADER_SEARCH : API_BASE_URL + "/category/header/search",
    // 获取某分类下子类以及子类的子类
    URL_CATEGORY_SON : API_BASE_URL + "/category/get",
    // 获取某分类下分类广告
    URL_CATEGORY_AD_CATEGORY : API_BASE_URL + "/category/ad/category",
    // 获取某分类下商品广告
    URL_CATEGORY_AD_RECOMMEND : API_BASE_URL + "/category/ad/recommend",
    // 获取sitemap的标题
    URL_CATEGORY_SITEMAP_TITLE : API_BASE_URL + "/category/sitemap/title",
    // 获取sitemap
    URL_CATEGORY_SITEMAP : API_BASE_URL + "/category/sitemap",
    URL_CATEGORY_SITEMAP_ADMIN : API_BASE_URL + "/category/sitemap/admin",

    // 首页自定义代码获取
    URL_INDEX_HTML : API_BASE_URL + "/index/html/get",
    // 首页轮播图
    URL_INDEX_BANNER : API_BASE_URL + "/ad/banner",
    // 获取广告
    URL_AD : API_BASE_URL + "/ad",
    // Super Deals
    URL_INDEX_SUPERDEALS : API_BASE_URL + "/super_deal/current",
    URL_INDEX_SUPERDEALES_REMIND_ADD : API_BASE_URL + "/super_deal/remind/add",
    URL_INDEX_SUPERDEALES_REMIND_LIST : API_BASE_URL + "/super_deal/remind/list",
    // 首页Super Deals
    URL_SUPERDEALS : API_BASE_URL + "/super_deal",
    // 首页系统公告
    URL_INDEX_SYSTEM_MESSAGE : API_BASE_URL + "/message/system",
    // 热门关键字
    URL_INDEX_HOTKEYWORDS : API_BASE_URL + "/product/hotKeywords",
    //主页底图
    URL_INDEX_FOOTER : API_BASE_URL + "/index_content",

    URL_BRANDS : API_BASE_URL + "/brands/app",

    URL_ORDER_COUNT : API_BASE_URL + "/order/count",
    URL_ORDER_LOGISTICS : API_BASE_URL + "/order/logistics/all",
    URL_ORDER_COUNT_STATUS : API_BASE_URL + "/order/count/statusStr",
    URL_ORDER : API_BASE_URL + "/order",
    URL_ORDER_SEARCH : API_BASE_URL + "/order/search",
    URL_ORDER_REMOVE : API_BASE_URL + "/order/remove",
    URL_ORDER_RECEIVED : API_BASE_URL + "/order/received",
    URL_ORDER_RETURN_IMAGE : API_BASE_URL + "/order/addReturnImage",
    URL_ORDER_RETURN : API_BASE_URL + "/order/returnOrder",
    URL_ORDER_RETURN_STATUS : API_BASE_URL + "/order/returnStatus",
    URL_ORDER_RETURN_SAVE : API_BASE_URL + "/order/saveReturnInfo",
    URL_ORDER_DETAIL : API_BASE_URL + "/order/detail",
    URL_ORDER_REVIEW : API_BASE_URL + "/order/review",
    URL_ORDER_REVIEW_GET : API_BASE_URL + "/order/review/get",
    URL_ORDER_REVIEW_UPLOADIMG : API_BASE_URL + "/order/review/uploadImg",
    URL_ORDER_CANCEL : API_BASE_URL + "/order/cancel",
    URL_ORDER_PREVIEW : API_BASE_URL + "/order/preview",
    URL_ORDER_CREATE : API_BASE_URL + "/order/create",
    URL_ORDER_PAY : API_BASE_URL + "/order/pay",
    URL_ORDER_PAY_LIST : API_BASE_URL + "/pay/order_pay_list",
    URL_ORDER_PAY_GET : API_BASE_URL + "/pay/get",
    URL_ORDER_PAY_PAYPAL : API_BASE_URL + "/paypal/prepay",

    // 到店付可用服务点
    URL_DDF_LIST : API_BASE_URL + "/pay/ddf_list",
    URL_ACCOUNT_GET : API_BASE_URL + "/account/get",
    URL_ACCOUNT_SET : API_BASE_URL + "/account/set",
    URL_ACCOUNT_SAFETYSETTING : API_BASE_URL + "/account/safetySetting",
    URL_ACCOUNT_UPLOADIMAGE : API_BASE_URL + "/account/uploadImage",
    URL_ACCOUNT_ROLE_APPLY : API_BASE_URL + "/role/apply",
    // 修改邮箱
    URL_ACCOUNT_EMAIL_GET : API_BASE_URL + "/account/getEmail",
    URL_ACCOUNT_EMAIL_BIND : API_BASE_URL + "/email/bind",
    URL_ACCOUNT_EMAIL_BIND_SENDEMAIL : API_BASE_URL + "/email/bind/sendEmail",
    URL_ACCOUNT_EMAIL_CHANGE_SENDEMAIL : API_BASE_URL
    + "/email/change/sendEmail",
    URL_ACCOUNT_EMAIL_CHANGE_CODE_VERIFY : API_BASE_URL
    + "/email/change/code/verify",
    URL_ACCOUNT_EMAIL_CHANGE : API_BASE_URL + "/email/change",
    // 修改手机号码
    URL_ACCOUNT_PHONE_GET : API_BASE_URL + "/account/getPhone",
    URL_ACCOUNT_PHONE_BIND : API_BASE_URL + "/phone/bind",
    URL_ACCOUNT_PHONE_BIND_CODE_SEND : API_BASE_URL + "/phone/bind/code/send",
    URL_ACCOUNT_PHONE_CHANGE_CODE_SEND : API_BASE_URL + "/phone/change/code/send",
    URL_ACCOUNT_PHONE_CHANGE_CODE_VERIFY : API_BASE_URL + "/phone/change/code/verify",
    URL_ACCOUNT_PHONE_CHANGE : API_BASE_URL + "/phone/change",

    URL_ADDRESS_GET : API_BASE_URL + "/address/get",
    URL_ADDRESS_SAVE : API_BASE_URL + "/address/saveOrUpdate",
    URL_ADDRESS_GET_ONE : API_BASE_URL + "/address/getAddress",
    URL_ADDRESS_DEL : API_BASE_URL + "/address/del",

    URL_MESSAGE_LIST : API_BASE_URL + "/message/list",
    URL_MESSAGE_STATUS_SET : API_BASE_URL + "/message/setStatus",

    URL_WISHLIST_CATEGORY : API_BASE_URL + "/my/userWishProductClasses",
    URL_WISHLIST : API_BASE_URL + "/my/wishList",
    URL_DEL_WISH : API_BASE_URL + "/my/delWish",

    URL_COLLECT_TOGGLE : API_BASE_URL + "/customer/collect/toggle",
    URL_PRODUCT_ALL_BELONGS_CATETORY : API_BASE_URL + "/category/allBelongsCatetory",
    URL_COUPON_FREE : API_BASE_URL + "/myCoupon/free",
    URL_COUPON : API_BASE_URL + "/coupon/list",
    URL_RECEIVE_COUPON : API_BASE_URL + "/myCoupon/receive",
    URL_COUPON_MINE : API_BASE_URL + "/myCoupon/list",
    URL_CUSTOMER_ADDBILL : API_BASE_URL + "/customer/addBill",
    // 支付
    URL_PAY_DHPAY_PREPAY : API_BASE_URL + "/dhpay/prepay",
    URL_PAY_WECHATPAYMENT : API_BASE_URL + "/weChatPayment",
    URL_PAY_WECHATPAYMENT_QUERY : API_BASE_URL + "/weChatPayment/checkPay",
    // URL_PAY_ONLINE_LIST : API_BASE_URL + "/pay/online/list",
    // 用户订阅
    URL_SUBSCRIBE : API_BASE_URL + "/subscribe",
    URL_HELP : API_BASE_URL + "/help"
};
