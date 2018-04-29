/**
 * Created by zc on 2018/4/11.
 */
define(["jquery"], function () {
    var temp = {
        element: '<div id="popup" class="ol-popup"><a href="#" id="popup-closer" class="ol-popup-closer"></a><div id="popup-content"></div></div>',
        init: function () {
            var popupElement = $(this.element);
            this.addEvent(popupElement);
            return popupElement[0];
        },
        addEvent: function (ele) {
            var closed = ele.find("a[id='popup-closed']");//le.find["a[id='popup-closed']"];
            closed.click(function (e) {
                OpenLayerHandle.closePopup();
                e.target.blur();
                return false;
            });
            var moreInfo = ele.find("div[id='popup-footer']");
            moreInfo.click(function (e) {
                if ($("#book").css("bottom") === "0px" && $("#scrollPanel").css("bottom") === "0px") {
                    ScrollHandle.updateScroll(1);
                }
                else if ($("#book").css("bottom") === "0px" && $("#scrollPanel").css("bottom") != "0px") {
                    ScrollHandle.scrollTip($("#scrollTip")[0]);
                } else if ($("#book").css("bottom") != "0px" && $("#scrollPanel").css("bottom") === "0px") {
                    Handle.elementBottomAnimate("book", true, document.body.clientHeight, 1.0, 1);
                } else {
                    Handle.elementBottomAnimate("book", true, document.body.clientHeight, 1.0, 1);
                    ScrollHandle.scrollTip($("#scrollTip")[0]);
                }
                OpenLayerHandle.closePopup();
            });
        }
    };
    return temp;
});