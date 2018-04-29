/**
 * Created by zc on 2018/4/12.
 * 底图切换控件
 */
define([
    "text!./html/baseLayerSwitch.html!strip",
    "css!./css/baseLayerSwitch"
], function (template) {
    var temp = function (optUser) {
        var opt = {
            container: ""
        };
        $.extend(opt, optUser);
        var $tmp = $(template);
        $(opt.container || "body").append($tmp);
        bindEvent();

        function bindEvent() {
            //底图选择；
            var only = 1;
            $tmp.find("li").eq(only).css("display", "block");
            $tmp.find("li").eq(only).siblings().css("display", "none");
            $tmp.find("li").each(function () {
                $(this).click(function () {
                    var mapName = $(this).find(".map_name span").text();
                    $(this).siblings().css("display", "none");
                    only = $(this).index();
                    layerSelect(mapName);
                });
            });
            $tmp.hover(function () {
                $("#map_select li").css("display", "block");
            }, function () {
                $("#map_select li").css("display", "none");
                $("#map_select li").eq(only).css("display", "block");
            });
        }

    };
    return temp;
});