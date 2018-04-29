/**
 * Created by zc on 2018/4/18.
 */
define(["require",
    "text!./html/roadListVue.vue!strip",
    "deps/vue/vue-2.5.16.js",
    "lib/layerUtil",
    "css!./css/road.css"
], function (require, tmpRoadList, Vue, layerUtil) {
    var temp = function (optUser) {
        var self = this;
        var opt = {
            container: "",   //必填
            map: "",
            get moduleUrl() {
                return self.getModuleUrl()
            }
        };
        $.extend(opt, optUser);
        var $tmp = $(tmpRoadList);
        window.$tmp = $tmp;
        var test = $(opt.container).append($tmp);
        $.ajax({
            url: opt.moduleUrl + "./data/roadList.json",
            success: function (result) {
                new Vue({
                    el: $tmp[0],
                    data: {
                        arrRoads: result,
                        moduleUrl: opt.moduleUrl
                    },
                    methods: {
                        liClick: function (oneRoad) {
                            var sqlWhere = " where lxbm='" + oneRoad.code + "'";
                            this.flashFeature(sqlWhere);
                        },
                        aRoadStatusClick: function (event) {
                            event.cancelBubble = true;
                        },
                        flashFeature: function (sqlWhere) {
                            var url_old = "http://localhost:4112/queryroadbyattribute?where=" + sqlWhere;
                            var url = opt.moduleUrl + "/data/getRoadByAttribute2.json";
                            $.ajax({
                                url: url,
                                success: function (result) {
                                    var hlLyr = layerUtil.getTheHighlightLayer(opt.map);
                                    var srcVec = hlLyr.getSource();
                                    srcVec.clear();
                                    var features = (new ol.format.GeoJSON()).readFeatures(result);
                                    srcVec.addFeatures(features);
                                    opt.map.getView().fit(srcVec.getExtent(), opt.map.getSize(), {
                                        padding: [1, 1, 1, 1],
                                        constrainResolution: false
                                    });

                                }
                            })
                        }
                    }
                });
            }
        });
    };
    temp.prototype.getModuleUrl = function () {
        var url = require.toUrl(".");
        //输出结果
        ///leafletYJ/zcNewFramework/./modulesYJ/basicresource
        return url;
    };
    return temp;
});