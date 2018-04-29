/**
 * Created by zc on 2018/4/11.
 * 图例控件
 */

define(['text!./html/tmpLegend.html!strip',
    'css!./targetbuttonview'], function (tmpLegend) {
    var $tmp=$(tmpLegend);
    $tmp.find("#legendSwi").click(function () {
        $("#legend").toggle();
        $(this).toggleClass("legendActive");
    });
    $(body).append($tmp);

});

