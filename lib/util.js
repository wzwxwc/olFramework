/**
 * Created by fu on 2017/6/3.
 * 常用工具类
 */

define([], function () {
    var temp = {
        getData: function (url, data, callback) {
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                async: true,
                dataType: 'json',
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                }
            });

        },
        getDataByget: function (url, data, callback) {
            //此处获取地图坐标点；允许缓存
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                async: true,
                cache: true,
                dataType: 'json',
                success: function (data) {

                    if (typeof callback == "function") {
                        callback(data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                }
            });
        },
        GetUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        cloneObject: function (obj, deep) {
            if (obj === null) {
                return null;
            }
            var con = new obj.constructor();
            var name;
            for (name in obj) {
                if (!deep) {
                    con[name] = obj[name];
                } else {
                    if (typeof (obj[name]) == "object") {
                        con[name] = cloneObject(obj[name], deep);
                    } else {
                        con[name] = obj[name];
                    }
                }
            }
            return con;
        }
    };
    return temp;
});
