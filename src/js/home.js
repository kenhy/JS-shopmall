function setCookie(name, value) {
    var expdate = new Date(); // 初始化时间
    expdate.setTime(expdate.getTime() + 30 * 24 * 60 * 60 * 1000); // 时间
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString()
        + ";path=/";
}
/**
 * 添加cookie并设置过期时间
 * @param name
 * @param value
 * @param date 过期时间,毫秒
 */
function setCookieAndTime(name, value, date) {
    var expdate = new Date(); // 初始化时间
    expdate.setTime(expdate.getTime() + date); // 时间
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString()
        + ";path=/";
}

function getCookie(name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=")
        if (c_start != -1) {
            c_start = c_start + name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1)
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function role(code, name) {
    this.code = code;
    this.name = name;
}

function getCustomerRole() {
    var customerRole = [ new role("NOT_CERTIFIED", "Unauthenticated"),
        new role("UNDER_REVIEW", "Pending"),
        new role("VERIFIED", "Certified") ];
    return customerRole;
}

function generateUUID() {
    var uuid = getCookie("uuid");
    if (uuid == "") {
        var d = new Date().getTime();
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        setCookie("uuid", uuid);
    }
    return uuid;
};
