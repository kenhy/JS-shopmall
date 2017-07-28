/**
 * Created by zhangjianan on 2017/7/28.
 */

var productSearch = {}

$(document)
    .ready(
        function() {
            initProductSearch();
            search();
            getBrowsing();
            getRecommend();
            // 设置搜索框内的关键字
            $("#search-key").val(productSearch.keyword);
            // 初始化选中view按钮
            $("#arrangement p").each(function(index) {
                $(this).click(function() {
                    $("#arrangement p").removeClass("selected");
                    $("#arrangement p").eq(index).addClass("selected");
                });
            });
            // 初始化点击事件：点击显示和隐藏各种排列类型的商品
            $(".icon-fenlei1").click(function() {
                productSearch.view = 1;
                showProduct();
                $("[data-type=product_view_rectangle]").show();
                $("[data-type=product_view_square]").hide();
            });
            $(".icon-fenlei2").click(function() {
                productSearch.view = 2;
                showProduct();
                $("[data-type=product_view_square]").show();
                $("[data-type=product_view_rectangle]").hide();
            });
            // Sort by
            $("[data-type=order_by_ul] li")
                .click(
                    function() {
                        if ($(this).attr("data-orderName") == "price") {
                            if (productSearch.orderName == "price") {
                                if (productSearch.orderType == 1) {
                                    productSearch.orderType = 0;
                                    $(this).find(".top").css(
                                        "border-bottom",
                                        "5px #666 solid");
                                    $(this)
                                        .find(".down")
                                        .css("border-top",
                                            "5px #C08D64 solid");
                                } else {
                                    productSearch.orderType = 1;
                                    $(this)
                                        .find(".top")
                                        .css(
                                            "border-bottom",
                                            "5px #C08D64 solid");
                                    $(this).find(".down").css(
                                        "border-top",
                                        "5px #666 solid");
                                }
                            } else {
                                productSearch.orderType = 1;
                                $(this).find(".top").css(
                                    "border-bottom",
                                    "5px #C08D64 solid");
                                $(this).find(".down").css(
                                    "border-top",
                                    "5px #666 solid");
                            }
                        } else {
                            $("[data-type=order_by_ul]").find(
                                ".top").css(
                                "border-bottom",
                                "5px #666 solid");
                            $("[data-type=order_by_ul]").find(
                                ".down").css("border-top",
                                "5px #666 solid");
                        }
                        productSearch.orderName = $(this).attr(
                            "data-orderName");
                        $("[data-type=order_by_ul] .selected")
                            .attr("class", "");
                        $(this).attr("class", "selected");
                        order();
                    });

            $("[data-type=limit-price] input").on(
                "focus blur",
                function(event) {
                    if (event.type == "focus") {// 获得焦点
                        $("[data-type=limit-price]").addClass(
                            "bd-c");
                        $("[data-type=price-ok]").show();
                        $("[data-type=limit-price]").css("width",
                            "277px");
                        $("#transparent2").show();
                    } /*
                     * else if (event.type == "blur") {// 失去焦点
                     * $("[data-type=limit-price]").removeClass("bd-c");
                     * $("[data-type=price-ok]").hide(); var
                     * beginPrice = $("#beginPrice").val();
                     * order(); }
                     */
                })
            $("#transparent2").click(function() {
                $("[data-type=limit-price]").removeClass("bd-c");
                $("[data-type=price-ok]").hide();
                $("[data-type=limit-price]").css("width", "");
                $("#transparent2").hide();
            });
            $("[data-type=btn-goPage]")
                .click(
                    function() {
                        productSearch.pageNum = $("#pageNum")
                            .val();
                        if (parseFloat(productSearch.pageNum) > parseFloat(productSearch.totalPage))
                            productSearch.pageNum = productSearch.totalPage;
                        $('html,body').animate({
                            scrollTop : 0
                        }, 1);
                        order();
                    });
            //facebook追踪网站上的搜索
            try {
                fbq('track', 'Search');
            } catch (e) {
            }
        });

function initProductSearch() {
    var cProductSearch = {};
    cProductSearch.keyword = getKeyword();
    cProductSearch.category = getUrlParam("category");
    cProductSearch.brandsId = getUrlParam("brandsId");
    cProductSearch.pageNum = 1;
    cProductSearch.pageSize = 40;
    cProductSearch.view = 2;
    cProductSearch.orderName = "none";
    cProductSearch.orderType = 1;
    cProductSearch.searchData;
    cProductSearch.totalPage = 0;
    productSearch = cProductSearch;
    // setCookie("productSearch", JSON.stringify(cProductSearch));
}

function updateProductSearch() {
    setCookie("productSearch", JSON.stringify(productSearch));
}

function limitPrice() {
    var beginPrice = $("#beginPrice").val();
    $("[data-type=limit-price]").removeClass("bd-c");
    $("[data-type=price-ok]").hide();
    $("[data-type=limit-price]").css("width", "");
    if (beginPrice != "" && endPrice != "") {
        order();
    }
}

function search() {
    $("[data-type=scroll]").attr("src",
        $("[data-type=scroll]").attr("data-src") + "?id=" + Math.random());
    $("[data-type=scroll]").show();
    var token = getCookie("token");
    $.ajax({
        type : "get",
        url : RTTMALL_API.URL_PRODUCT_SEARCH,
        dataType : "json",
        async : true,
        cache : false,
        data : {
            client_token : token,
            keywords : productSearch.keyword,
            category : productSearch.category,
            pageNum : productSearch.pageNum,
            pageSize : productSearch.pageSize,
            brandsId : productSearch.brandsId
        },
        success : function(data) {
            if (data != null) {
                // console.info(data);
                data.data.domain = domain;
                productSearch.searchData = data.data;
                productSearch.totalPage = data.data.page.totalPage;
                /*
                 * $("[data-type=result_div]").html("Home > All Categories > " +
                 * keyword + " 867,071 Results ");
                 */
                if (productSearch.keyword != null) {
                    $("[data-type=keyword]").html(
                        "\"" + productSearch.keyword + "\"");
                }
                $("[data-type=result_num]").html(
                    productSearch.searchData.totalElement);
                initRelatedCategory();
                showProduct();
                var html = template('pageTemplate', data.data.page);
                $("[data-type=pageNumber]").html(html);
                $("[data-type=pageNumber]").find("[data-type=goPage]").each(
                    function(index) {
                        $(this).click(
                            function() {
                                var targetPage = $(this).attr(
                                    "data-page");
                                if (targetPage > 0) {
                                    productSearch.pageNum = $(this)
                                        .attr("data-page");
                                    $('html,body').animate({
                                        scrollTop : 0
                                    }, 1);
                                    order();
                                }
                            });
                    });
            }
        }
    });
}
/**
 * 排序
 */
function order() {
    $("[data-type=scroll]").attr("src",
        $("[data-type=scroll]").attr("data-src") + "?id=" + Math.random());
    $("[data-type=scroll]").show();
    var forderType = 0;
    if (productSearch.orderName == "price") {
        forderType = productSearch.orderType;
    }
    var param = {};
    param.keywords = productSearch.keyword;
    param.category = productSearch.category;
    param.pageNum = productSearch.pageNum;
    param.pageSize = productSearch.pageSize;
    param.orderName = productSearch.orderName;
    param.orderType = forderType;
    param.brandsId = productSearch.brandsId;
    var beginPrice = $("#beginPrice").val();
    if (beginPrice != "") {
        param.beginPrice = beginPrice;
    }
    var endPrice = $("#endPrice").val();
    if (endPrice != "") {
        param.endPrice = endPrice;
    }
    var token = getCookie("token");
    param.client_token = token;
    $.ajax({
        type : "get",
        url : RTTMALL_API.URL_PRODUCT_SEARCH,
        dataType : "json",
        async : true,
        cache : false,
        data : param,
        success : function(data) {
            if (data != null) {
                data.data.domain = domain;
                productSearch.searchData = data.data;
                productSearch.totalPage = data.data.page.totalPage;
                initRelatedCategory();
                showProduct();
                var html = template('pageTemplate', data.data.page);
                $("[data-type=pageNumber]").html(html);

                $("[data-type=pageNumber]").find("[data-type=goPage]").each(
                    function(index) {
                        $(this).click(
                            function() {
                                productSearch.pageNum = $(this).attr(
                                    "data-page");
                                $('html,body').animate({
                                    scrollTop : 0
                                }, 1);
                                order();
                            });
                    });
            }
        }
    });
}

function initRelatedCategory() {
    if (productSearch.searchData.category != null
        && productSearch.searchData.category.length > 0) {
        $("[data-type=category-name]")
            .html(
                productSearch.searchData.category[productSearch.searchData.category.length - 1].typeName);
    }
    // 展示相关分类
    productSearch.searchData.categoryId = productSearch.category;
    productSearch.searchData.keyword = productSearch.keyword;
    showRelatedCategory(productSearch.searchData);
    var existResult = productSearch.searchData.existResult;
    // 如果没有搜索到商品
    if (!existResult) {
        $("[data-type=result-all]").show();
        $("[data-type=result-none]").hide();
    } else {
        var html = template('searchCategoryTemplate', productSearch.searchData);
        $("[data-type=search-category]").html(html);
    }
}

function showProduct() {
    if (productSearch.searchData.list.length == 0) {
        $("[data-type=result-all]").hide();
        $("[data-type=result-none]").show();
    } else {
        if (productSearch.view == 1) {
            html = template('productViewRectangleTemplate',
                productSearch.searchData);
            $("[data-type=product_view_rectangle]").html(html);

            $("[data-type=product_view_rectangle] .column-img img").each(
                function(index) {
                    $(this).mouseover(
                        function() {
                            $(this).closest(".product").find(
                                ".image img").attr("src",
                                $(this).attr("src"));
                        });
                });
        } else {
            html = template('productViewSquareTemplate',
                productSearch.searchData);
            $("[data-type=product_view_square]").html(html);
            var temp = $("[data-type=product_view_square] .small-img img");
            $("[data-type=product_view_square] .small-img img").each(
                function(index) {
                    $(this).mouseover(
                        function() {
                            $(this).closest(".synopsis").find(
                                ".image img").attr("src",
                                $(this).attr("src"));
                        });
                });
        }
    }
    $("[data-type=scroll]").hide();
    $(".loadingimg").hide();
    $(".category-main [data-type=btn-customer-service]").click(
        function() {
            if ($("#customer-service-iframe").attr("src") == "") {
                $("#customer-service-iframe").attr("src",
                    domain + "/chat.jsp?iframe=w_440_h_440");
            }
            $(".customer-service").show();
        });
    // updateProductSearch();
}

function showRelatedCategory(searchData) {
    html = template('relatedCategoryTemplate', searchData);
    $("[data-type=related-category]").html(html);
    $(".me-menu-header").unbind("click");
    $(".me-menu-header").click(function() {
        var header = $(this).closest(".me-menu-header");
        var className = header.attr("class");
        if (className == "me-menu-header me-menu-close") {
            header.attr("class", "me-menu-header me-menu-open");
            header.next().show(500);
        } else {
            header.attr("class", "me-menu-header me-menu-close");
            header.next().hide(500);
        }
    })
    $("[data-type=current]").unbind("click");
    $("[data-type=current]").each(
        function(index) {
            $(this).css("color", "#CCA77A");
            var level = $(this).attr("data-level");
            if (level == 1) {
                $(this).click();
            } else {
                // $(this).closest(".me-menu-header").find(".small-icon").click();
                $(this).closest(".grid-col-container").find(
                    ".me-menu-header .small-icon").click();
            }
        });
}

function getBrowsing() {
    var token = getCookie("token");
    var uuid = generateUUID();
    $.ajax({
        type : "get",
        url : RTTMALL_API.URL_PRODUCT_BROWSING,
        dataType : "json",
        async : true,
        cache : false,
        data : {
            client_token : token,
            client : uuid
        },
        success : function(data) {
            if (data != null) {
                if (data.code != "1") {
                    return;
                }
                data.domain = domain;
                var html = template('browsingTemplate', data);
                $("[data-type=browsing]").html(html);
            }
        }
    });
}

function getRecommend() {
    // console.info("getRecommend");
    $.ajax({
        type : "get",
        url : RTTMALL_API.URL_PRODUCT_AD,
        dataType : "json",
        async : true,
        cache : false,
        data : {
            client : "PC",
            position : "PRODUCT_SEARCH"
        },
        success : function(data) {
            if (data != null) {
                if (data.code != "1") {
                    return;
                }
                // console.info(data);
                var html = template('recommendTemplate', data);
                $("[data-type=recommend]").html(html);
            }
        }
    });
}

function getKeyword() {
    var name = "keyword";
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) {
        var parameter = decodeURI(r[2]);
        return replaceSpecialCharReverse(parameter);
    }
    return null; // 返回参数值
}
