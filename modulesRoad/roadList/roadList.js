/**
 * Created by zc on 2018/4/11.
 */
define(["require",
        "lib/layerUtil",
        "lib/util",
        "lib/coorUtil",
        "json!./data/data.json",
        "json!./data/road_jilin_lx_z_gcj02.json",
        "modulesRoad/searchControl/searchcontrol",
        'text!./html/roadList.html!strip',
        "css!./css/road"],
    function (require, layerUtil, util, coorUtil, shigulist, dataRoadlist, searchControl, tmpRoad) {
        var temp = function (optUser) {
            var self = this;
            var opt = {
                map: "",  //必填
                container: "",    //容器对象
                get moduleUrl() {
                    //todo：下面的self为什么不可以替换为this？
                    return self.getModuleUrl()
                }
            };
            $.extend(opt, optUser);
            $(opt.container).append($(tmpRoad));
            var seaCon = new searchControl({
                container: $("#selector")
            });
            $(".show-filtrate").click(function () {
                $(".selector-div").toggle();
            });
            opt.map.addLayer(layerUtil.createRegionLayer());

            loadRoad();

            function creatCompany(res) {
                var str = '';
                var local = "/" + location.pathname.split("/")[1];

                //添加两个桥梁和轨道的测试数据；

                var bridgeStr = '<li class="clear " data-type="bridge">';
                bridgeStr += '<img src="' + opt.moduleUrl + '/img/patrol-01.jpg" class="company_img">';
                bridgeStr += '<div class="item"> <p class="item_brief">';
                bridgeStr += ' <img src="' + opt.moduleUrl + '/img/wushui_blue.png" alt="" class="item_img"><span class="name">亚复大桥</span><span class="roadstate" style="color:#4ebe6b">现役桥梁</span></p>';
                bridgeStr += ' <p class="item_brief"> <span class="hangye">一类</span> </p>';
                bridgeStr += '<p class="item_brief item_des"> 建设进度： <span>已经完成</span></p>';
                bridgeStr += ' <p class="item_brief"> <span class="hangye">吉林市龙潭区</span> </p> </div> </li>';

                //隧道；
                bridgeStr += '<li class="clear " data-type="tunnel">';
                bridgeStr += '<img src="' + opt.moduleUrl + '/img/patrol-01.jpg" class="company_img">';
                bridgeStr += '<div class="item"> <p class="item_brief">';
                bridgeStr += ' <img src="' + opt.moduleUrl + '/img/wushui_blue.png" alt="" class="item_img"><span class="name">老爷岭隧道</span><span class="roadstate" style="color:#4ebe6b">现役隧道</span></p>';
                bridgeStr += ' <p class="item_brief"> <span class="hangye">中隧道</span> </p>';
                bridgeStr += '<p class="item_brief item_des"> 建设进度： <span> 已经完成</span></p>';
                bridgeStr += ' <p class="item_brief"> <span class="hangye">吉林市蛟河市</span> </p> </div> </li>';


                str += bridgeStr;
                for (var k = 0; k < res.length; k++) {
                    // var mark=k>1?"mark":"";
                    var conditionDictionary = {
                        1: "优",
                        2: "良",
                        3: "中",
                        4: "次",
                        5: "差"
                    };
                    var typeDictionary = {
                        1: "国道",
                        2: "省道",
                        3: "县道",
                        4: "乡道",
                        5: "村道",
                        6: "城镇道路",
                        7: "专业公路"
                    };
                    var mark = "";
                    var color, state, item_des;
                    switch (res[k].state) {
                        case 1:
                            color = "#faac3e";
                            break;
                        case 2:
                            color = "#4ebe6b";
                            break;
                        case 3:
                            color = "#479df6";
                            break;
                    }
                    switch (res[k].state) {
                        case 1:
                            state = "规划公路";
                            item_des = ' <p class="item_brief item_des"> 规划年份： <span "> ' + res[k].planyear + '</span></p>';
                            break;
                        case 2:
                            state = "现役公路";
                            item_des = ' <p class="item_brief item_des"> 公路质量： <span> ' + conditionDictionary[res[k].condition] + '</span></p>';
                            break;
                        case 3:
                            state = "建设公路";
                            item_des = ' <p class="item_brief item_des"> 建设进度： <span > ' + res[k].progressname + '</span></p>';
                            break;
                    }

                    var nearStr = res[k].roadname == "大官地路" ? "<span class='curing'>临近养护</span>" : "";

                    str += ' <li class="clear ' + mark + '"  data-type="road">' +
                        '<!--[if IE]><div class="filter"></div><![endif]-->' +
                        '<img src="' + res[k].imgpath + '" class="company_img">' +
                        //  '<svg> <image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+local+res[k].tupian+'" x="0" y="0" width="80" height="80" filter="url(\'#grayscale\')"></image> </svg>'+
                        '<div class="item">' +
                        ' <p class="item_brief"><img src="' + opt.moduleUrl + '/img/wushui_blue.png" alt="" class="item_img"><span class="name">' + res[k].roadname + '</span><span class="roadstate"  style="color:' + color + '">' + state + '</span></p>' +
                        '   <p class="item_brief"> <span class="hangye">' + typeDictionary[res[k].type] + '</span>' + nearStr + ' </p>' +
                        item_des +
                        '   <p class="item_brief"> <span class="hangye">' + res[k].district + '</span> </p>' +
                        ' </div></li></div>';
                }
                $(".companys ul").empty().append(str);
                $(".companys li").not(".mark").click(function () {
                    var type = $(this).attr("data-type");
                    if (type == "bridge") {
                        var y = 44.07449158;
                        var x = 126.51596284;
                        var point = ol.proj.fromLonLat([parseFloat(x), parseFloat(y)]);
                        map.getView().setCenter(point);
                        map.getView().setZoom(13);
                        self.bridgeWindown(point, " 桥梁管理标准卡片", "bridge.html");
                        // map.getView().setCenter(ol.proj.fromLonLat([parseFloat(x)+0.0390611623,parseFloat(y)+0.034534362]));
                    } else if (type == "tunnel") {
                        var y = 43.94872492;
                        var x = 127.16453439;
                        var point = ol.proj.fromLonLat([parseFloat(x), parseFloat(y)]);
                        map.getView().setCenter(point);
                        map.getView().setZoom(13);
                        self.bridgeWindown(point, " 隧道管理标准卡片", "tunnel.html");

                        // map.getView().setCenter(ol.proj.fromLonLat([parseFloat(x)+0.0390611623,parseFloat(y)+0.034534362]));

                    } else {

                        //添加了两个固定数据index-2;
                        var index = $(this).index() - 2;
                        var item = dataRoadlist[index];
                        var y = item.mposb;
                        var x = item.mposl;
                        var point = ol.proj.fromLonLat([parseFloat(x), parseFloat(y)]);
                        $("#popup-closer").text(item.name);
                        if (item.state === 2) {

                            roadfunction(point, "road_completed.html", item);
                        } else {
                            roadfunction(point, "road_engineering.html", item);
                        }
                        map.getView().setCenter(point);
                        // map.getView().setCenter(ol.proj.fromLonLat([parseFloat(x)+0.0390611623,parseFloat(y)+0.034534362]));
                        map.getView().setZoom(13);
                        slide.init(item);
                    }

                })
            };

            function bridgeWindown(point, title, url) {
                //弹窗插件；
                map.getView().setCenter(point);
                var jk_layer = new Jk_layer('map');
                jk_layer.setPosition(point);
                jk_layer.open({
                    title: title,
                    url: url,
                    area: ["450px", "600px"],
                    // area:["460px","520px"],
                    success: function () {

                    },
                    cancel: function () {

                    }
                });
            };

            function mapclear() {
                var img = document.getElementById("roadSee");
                if (img.alt == "图层可见") {
                    //E:\code\fupin\daping\page\road\js\road.js
                    img.src = "./assets/event/bukejian1.png";
                    img.alt = "图层不可见";
                    map.removeLayer(layerUtil.getTreeLayer("roadLayer"));
                }
                else {
                    img.src = "./assets/event/kejian3.png";
                    img.alt = "图层可见";
                    map.addLayer(layerUtil.createDemoRoadLayer("roadLayer", dataRoadlist));
                }
            };

            //加载道路数据
            function loadRoad_old() {
                util.getData(window.Config.Url.getRoadData, null, function (data) {
                    var dataRoadlistIn = data.result.list;
                    creatCompany(dataRoadlistIn);
                    map.addLayer(layerUtil.createDemoRoadLayer("roadLayer", dataRoadlistIn));
                });
            }

            function loadRoad() {
                console.log(self);
                creatCompany(dataRoadlist);
                map.addLayer(layerUtil.createDemoRoadLayer("roadLayer", dataRoadlist));
            }

            function loadRoad_geoserver() {
                util.getDataByget(window.Config.Url.roadLineUrl, "", function (data) {
                    layerUtil.createPolyLineLayer(data, "zc_roadLineLayer", false, true, true);
                });
            }

            //加载桥梁点数据
            function loadbridgePoint() {
                util.getDataByget(window.Config.Url.bridgePointUrl, "", function (data) {
                    layerUtil.readGeoJsonPoint(data, "bridgePointLayer", false);
                });
                util.getDataByget(window.Config.Url.tunnelPointUrl, "", function (data) {
                    layerUtil.readGeoJsonPoint(data, "tunnelPointLayer", false);
                })
            };

            //加载桥梁和隧道——线图层
            function loadbridgeLine() {
                util.getDataByget(window.Config.Url.bridgeLineUrl, "", function (data) {
                    layerUtil.createPolyLineLayer(data, "bridgeLineLayer", true, true);
                });
                util.getDataByget(window.Config.Url.tunnelLineUrl, "", function (data) {
                    layerUtil.createPolyLineLayer(data, "tunnelLineLayer", true, true);
                });

            }
        };
        temp.prototype.getModuleUrl = function () {
            var url = require.toUrl(".");
            //输出结果
            ///leafletYJ/zcNewFramework/./modulesYJ/basicresource
            return url;
        };
        return temp;
    });