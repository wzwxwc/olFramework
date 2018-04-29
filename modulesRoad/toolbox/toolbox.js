/**
 * Created by zc on 2018/4/12.
 * 工具箱
 */
define([
    "text!./html/toolbox.html!strip",
    "css!./css/toolbox"

], function (tmpTooltip) {
    var temp = function (optUser) {
        var opt = {
            container: ""    //父窗体
        };
        $.extend(opt, optUser);
        var $tmp=$(tmpTooltip);
        $(opt.container).append($tmp);

        //todo  下述方法就不行
        //$(tmpTooltip).find("div.gis-toolbox li")
        $tmp.find("li").click(function () {
            OpenLayerHandle.closePopup();
            var type = $(this).attr("type");
            if (type == "home") {// 返回首页
                window.location.href = "../main.html";
                return;
            } else if (type == "screen") {// 全屏
                requestFullScreen(document.documentElement);
                return;
            } else if (type == "exit") {// 退出
                return;
            } else if (type == "admin") {// 加载管理员界面
                $(".leftNav").load("page/admin/admin.html");
            } else if (type == "event") {// 加载事件浏览界面
                $(".leftNav").load("page/event/event.html");
            } else if (type == "lawer") {// 加载执法局人员界面
                $(".leftNav").load("page/lawer/lawer.html");
            } else if (type == "eventquery") {// 加载事件查询界面
                $(".leftNav").load("page/eventquery/eventquery.html");
            } else if (type == "partquery") {// 加载部件查询界面
                $(".leftNav").load("page/partquery/partquery.html");
            } else if (type == "construct_road") {// 加载在建公路列表
                $(".leftNav").load("page/road/road.html");
            } else if (type == "road") {// 加载现有公路列表
                $(".leftNav").load("page/completedroad/completedroad.html");
            } else if (type == "plan_road") {// 加载规划公路列表
                $(".leftNav").load("page/planroad/planroad.html");
            } else if (type == "statistics") {// 加载统计列表
                $(".leftNav").load("page/tongji/tongji.html");
            }
            /* OpenLayerHandle.removeAllLayer(); */
        })
    };
    return temp;
});