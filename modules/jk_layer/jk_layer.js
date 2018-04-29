/**
 * Created by DR16 on 2017/6/29.
 */
define([], function () {
    var Jk_layer = function (container) {
        this.con = container;
        //创建pop;
        this.createPop(this.con);
    };
    Jk_layer.prototype = {
        open: function (options) {
            var defaluts = {
                title: '',
                url: '',
                area: ['280px', 'auto'],
                bindData: function () {

                },
                success: function () {

                },
                cancel: function () {

                }
            };
            var opts = $.extend({}, defaluts, options);
            this.opts = opts;
            this.init();
        },
        init: function (container) {
            var that = this;
            that.createDom();
            var iframe = document.getElementById("jk_pop-iframe");
            if (iframe.attachEvent) {
                iframe.attachEvent("onload", function () {
                    //iframe加载完成后你需要进行的操作
                    that.success();
                });
            } else {
                iframe.onload = function () {
                    //iframe加载完成后你需要进行的操作
                    that.success();
                };
            }
        },
        createPop: function (container) {
            var m = document.getElementById(container);
            var con = document.getElementById('jk_popup');
            //创建弹窗专用的popupDom;
            if (!con) {
                var popStr = '<div id="jk_popup" class="jk_ol-popup"><a href="#" id="jk_popup-closer" class="jk_ol-popup-closer"></a>' +
                    ' <div id="jk_popup-content"></div></div></div>';
                var jk_popup = new ol.Overlay({
                    element: $(popStr)[0],
                    id: 'jk_overLayer',
                    positioning: 'bottom-center',
                    autoPan: false,
                    stopEvent: false,
                    offset: [22, 300]
                });
                map.addOverlay(jk_popup);
                var jk_closer = document.getElementById('jk_popup-closer');
                jk_closer.onclick = function () {
                    jk_popup.setPosition(undefined);
                    jk_closer.blur();
                    return false;
                };

            }
        },
        createDom: function () {
            var str = '<div class="jk_layer-title">' + this.opts.title + '</div><div class="toMax"></div><div class="min-swi"></div><div class="jk_layer-container"><iframe class="notFullHeight" src="' + this.opts.url + '" frameborder="0" id="jk_pop-iframe"  name="pop-iframe"  scrolling="no" ></iframe> </div><div href="#" class="jk_layer-max" id="jk_layer-max">查看详情</div>';
            $("#jk_popup-content").html(str);
            this.resetStyle();
            var iframe = document.getElementById("jk_pop-iframe");
            this.bindEvent();
            this.bindData(iframe);
            this.bindEvent();
        },
        resetStyle: function () {
            $("#jk_popup").css({"width": this.opts.area[0], "height": this.opts.area[1]});
            //更改pop的offset；
            this.overLayer = map.getOverlayById("jk_overLayer");
            var offset = [22, parseInt(this.opts.area[1]) / 2];
            this.overLayer.setOffset(offset);
            $("#jk_popup #jk_layer-max").show();
            $("#jk_pop-iframe").removeClass("fullHeight");
        },
        bindData: function (iframe) {
            if (typeof this.opts.bindData == 'function') {
                this.opts.bindData(iframe);
            }

        },
        setPosition: function (point) {
            if (!this.overLayer) {
                this.overLayer = map.getOverlayById("jk_overLayer");
            }
            this.overLayer.setPosition(point)

        },
        bindEvent: function () {
            var that = this;
            $("#jk_popup-closer").off().click(function () {
                $("#jk_popup-content").html('');
                $("#jk_popup").removeClass("max");
                $("#jk_layer-max").removeClass("jk_layer-min").addClass("jk_layer-max");
                var pop = map.getOverlayById('overlayer');
                pop.setPosition(undefined);
                that.cancel();
            });
            $("#jk_layer-max,.toMax").off().click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                if ($('#jk_layer-max').hasClass("jk_layer-max")) {
                    $("#jk_popup").removeAttr("style");
                    $("#jk_popup").addClass("max");
                    $("#jk_pop-iframe").addClass("fullHeight");
                    $("#jk_layer-max").removeClass("jk_layer-max").addClass("jk_layer-min");
                    $('#jk_layer-max').hide();
                    $(".toMax").addClass('toSmall');
                } else {
                    $('.toMax').removeClass('toSmall');
                    $("#jk_popup").removeClass("max");
                    $("#jk_layer-max").removeClass("jk_layer-min").addClass("jk_layer-max");
                    that.resetStyle();
                }
            });
        },
        success: function () {
            if (typeof this.opts.success == 'function') {
                this.opts.success()
            }
        },
        cancel: function () {
            if (typeof this.opts.cancel == 'function') {
                this.opts.cancel();
            }
        }
    };
    return Jk_layer;
});