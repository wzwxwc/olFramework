(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require());
    } else {
        // 浏览器全局变量(root 即 window)
        root.layerUtil = factory(root.jQuery);
    }
}(this, function ($) {
    var temp = {

        //得到或创建高亮图层(相对于某个地图图层而言)
        getTheHighlightLayer: function (map) {
            var layerId = "vectorlyr-highlight";
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#d6ff14',
                    width: 5
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.6)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ddff0b',
                        width: 5
                    })
                })
            });
            var highLightLyr = this.getALayerById(map, layerId);
            if (!highLightLyr) {
                var vectorSource = new ol.source.Vector({
                    features: null
                });
                highLightLyr = new ol.layer.Vector({
                    id: layerId,
                    source: vectorSource
                });
                map.addLayer(highLightLyr);
            }
            highLightLyr.setStyle(style);
            return highLightLyr;
        },

        // 根据id获取vertor图层
        getALayerById: function (map, lyrId) {
            var rtValue = undefined;
            var layers = map.getLayers().getArray();
            for (var key in layers) {
                var layerId = layers[key].get("id");
                if (layerId === lyrId)
                    rtValue = layers[key];
            }
            return rtValue;
        },


        tile: function (params) {
            var url = this.chinaProvider(params);
            var layer = new ol.layer.Tile({
                id: params && params["id"] || "tileMap",
                source: new ol.source.XYZ({
                    url: url
                })
            });
            return layer;
        },
        chinaProvider: function (params) {
            var layers = {
                TianDiTu: {
                    Normal: {
                        Map: "http://t{0-7}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}",
                        Annotion: "http://t{0-7}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}",
                    },
                    Satellite: {
                        Map: "http://t{0-7}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
                        Annotion: "http://t{0-7}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}",
                    },
                    Terrain: {
                        Map: "http://t{0-7}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}",
                        Annotion: "http://t{0-7}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}",
                    }
                },
                MapABC: {
                    Normal: {
                        Map: 'http://emap{0-3}.mapabc.com/mapabc/maptile?&x={x}&y={y}&z={z}'
                    }
                },
                GaoDe: {
                    Normal: {
                        Map: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                    },
                    Satellite: {
                        Map: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                        Annotion: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
                    }
                },
                Google: {
                    Normal: {
                        Map: 'http://mt{0-3}.google.cn/vt/lyrs=p@258000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Ga'
                    },
                    Satellite: {
                        Map: 'http://mt{0-3}.google.cn/vt/lyrs=y@258000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Ga'
                    }
                }
            };
            var server = params && params.server || 'Google';
            var source = params && params.source || 'Normal';
            var type = params && params.type || 'Map';
            return layers[server][source][type];
        },
        removeAllLayer: function (map) {
            var layers = map.getLayers().getArray();
            for (var i = 0; i < layers.length; i++) {
                map.removeLayer(layers[i]);
                i--;
            }
        },
        //创建行政区图层
        createRegionLayer: function () {
            var url = "http://219.149.226.180:6080/arcgis/rest/services/fupin/jilinCityDistrict/MapServer";
            var layer = new ol.layer.Tile({
                id: "xzqLayer",
                source: new ol.source.TileArcGISRest({
                    url: url
                })
            });
            layer.setZIndex(10);
            return layer;
        },

        //扶贫公路Demo图层
        createDemoRoadLayer: function (layerId, roads, type) {
            var roadColorWidth = {
                "1": {color: "#C82824", width: 4},//1国道，2省道，3县道，4乡道，5村道，6专用公路
                "2": {color: "#06772E", width: 3},
                "3": {color: "#6C482D", width: 3},
                "4": {color: "#756F5A", width: 2},
                "5": {color: "#756F5A", width: 2},
                "6": {color: "#756F5A", width: 2}
            };
            var o = {
                "completed": {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "condition"
                },
                "plan": {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [255, 144, 0],
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "planyear1"
                },
                'construct': {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [255, 144, 0],
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "progress"
                },
                'all': {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#8CC43B',
                            lineDash: [10, 10],
                            lineDashOffset: 100,
                            width: 4
                        })
                    }),//规划公路
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#F75639',
                            width: 4
                        })
                    }),//建成公路
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "#C47167",
                            lineDash: [5, 10],
                            lineDashOffset: 100,
                            width: 4
                        })
                    }),//在建公路
                    condition: "state"
                }
            }
            type = type || "all";
            var features = new Array();

            for (var i = 0; i < roads.length; i++) {
                var obj = roads[i];
                // var p = new ol.geom.Point(ol.proj.fromLonLat([obj.mposl, obj.mposb]));
                //遍历线坐标，将数据转成3857坐标系
                var coordinates = new Array();
                if (!obj.geom) continue;
                if (typeof obj.geom === "string") obj.geom = JSON.parse(obj.geom);
                //to do zc写死
                var oneLineOfMultiline = obj.geom.coordinates[0];
                for (var j = 0; j < oneLineOfMultiline.length; j++) {
                    var point = oneLineOfMultiline[j];
                    point = ol.proj.transform([parseFloat(point[0]), point[1]], 'EPSG:4326', 'EPSG:3857')
                    coordinates.push(point);
                }
                var line = new ol.geom.LineString(coordinates);
                var feature = new ol.Feature({geometry: line});
                //获取线中间点坐标
                roads[i].mposl = oneLineOfMultiline[parseInt(oneLineOfMultiline.length / 2)][0];
                roads[i].mposb = oneLineOfMultiline[parseInt(oneLineOfMultiline.length / 2)][1];
                roads[i].road = 1;
                feature.setId(obj.gid);
                feature.setProperties(obj);
                /*            var lineStyle0 = o[type].style0;

                            var lineStyle1 = o[type].style1;
                            var lineStyle2 = o[type].style2;
                           switch (obj[o[type].condition]+""){
                                case "1":
                                    feature.setStyle(lineStyle0);
                                    break;
                                case "2":
                                    feature.setStyle(lineStyle1);
                                    break;
                                case "3":
                                    feature.setStyle(lineStyle2);
                                    break;
                            }*/
                feature.setStyle(this.getRoadSymbol(obj.state, type, obj.type));
                features.push(feature);

            }

            var vectorSource = new ol.source.Vector({
                features: features
            });
            // console.log(clusterSource);
            var vectorLayer = new ol.layer.Vector({
                id: layerId,
                // style: lineStyle
            });
            // 这里结束
            // vectorLayer.setSource(null);
            vectorLayer.setSource(vectorSource);
            //地图9级以下不显示
            // if (map.getView().getZoom() < 9) vectorLayer.setVisible(false);
            vectorLayer.setZIndex(11);
            return vectorLayer;
        },

        //对数据进行高亮和闪烁（重载一个，来实现对一般gis数据的支持，类似rows格式的支持）
        highlightAndFlashData: function (objFeatureCollection, type) {
            var roadColorWidth = {
                "1": {color: "#C82824", width: 4},//1国道，2省道，3县道，4乡道，5村道，6专用公路
                "2": {color: "#06772E", width: 3},
                "3": {color: "#6C482D", width: 3},
                "4": {color: "#756F5A", width: 2},
                "5": {color: "#756F5A", width: 2},
                "6": {color: "#756F5A", width: 2}
            };
            var o = {
                "completed": {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "condition"
                },
                "plan": {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [255, 144, 0],
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "planyear1"
                },
                'construct': {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [255, 144, 0],
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "progress"
                },
                'all': {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#8CC43B',
                            lineDash: [10, 10],
                            lineDashOffset: 100,
                            width: 4
                        })
                    }),//规划公路
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#F75639',
                            width: 4
                        })
                    }),//建成公路
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "#C47167",
                            lineDash: [5, 10],
                            lineDashOffset: 100,
                            width: 4
                        })
                    }),//在建公路
                    condition: "state"
                }
            };
            type = type || "all";
            var features = (new ol.format.GeoJSON()).readFeatures(objFeatureCollection)
            var highlightLayer = this.getTheHighlightLayer();
            var source = highlightLayer.getSource();
            source.setFeatures(features);
        },
        //地理信息格式的数据；
        readGeoJsonPoint: function (geoJson, layerId, isShow) {
            var layer = this.getALayerById(layerId);
            if (layer) {
                map.removeLayer(layer);
            }
            var features = (new ol.format.GeoJSON()).readFeatures(geoJson);
            var pl1 = new ol.proj.Projection({code: "EPSG:4326"});
            var pl2 = new ol.proj.Projection({code: "EPSG:3857"});
            for (var i = 0; i < features.length; i++) {
                features[i].getGeometry().transform(pl1, pl2);
                var id = features[i].getId();
                var name = features[i].getProperties()['NAME'];
                var event_url = "assets/event/tunnel.png";
                if (id.indexOf('bridgepoint') > -1) {
                    event_url = "assets/event/bridge.png";
                }
                var icon = new ol.style.Icon({
                    anchor: [0.5, 0.5],
                    src: event_url,
                });
                var style = new ol.style.Style({
                    image: icon,
                    // text: new ol.style.Text({
                    //     text: name,
                    //     fill: new ol.style.Fill({
                    //         color: "#007cff",
                    //         width: 3
                    //     }),
                    //     stroke: new ol.style.Stroke({ //边界样式
                    //         color: "#fff",
                    //         width: 1,
                    //         // lineCap:"square",
                    //     }),
                    //     textAlign:"right",
                    //     offsetX: -8,
                    //     offsetY: 0,
                    //     font: "14px Microsoft YaHei bold"
                    // }),
                });
                var t = features[i].getProperties()['TYPE'];
                features[i].setStyle(style);
            }
            var vectorSource = new ol.source.Vector({
                features: features
            });
            var vectorLayer = new ol.layer.Vector({
                id: layerId,
                source: vectorSource
            });
            vectorLayer.setZIndex(12);
            map.addLayer(vectorLayer);
            vectorLayer.setVisible(isShow);
        },
        createPolyLineLayer: function (geoJson, layerId, isJw, isShow, isHuoxing) {
            var layer = this.getALayerById(layerId);
            if (layer) {
                map.removeLayer(layer);
            }
            var pl1 = new ol.proj.Projection({code: "EPSG:4326"});
            var pl2 = new ol.proj.Projection({code: "EPSG:3857"});

            var features = (new ol.format.GeoJSON()).readFeatures(geoJson);
            if (isJw) {
                //4326需要转
                for (var i = 0; i < features.length; i++) {
                    features[i].getGeometry().transform(pl1, pl2);
                }
            }
            if (isHuoxing) {
                //4326转火星作弊哦系
                for (var i = 0; i < features.length; i++) {
                    coorUtil.wgs84togcj02()
                    features[i].getGeometry().transform(pl1, pl2);
                }
            }
            var vectorSource = new ol.source.Vector({
                features: features
            });

            var vectorLayer = new ol.layer.Vector({
                id: layerId,
                source: vectorSource,
                style: function (feature) {
                    var code = feature.getId();
                    var name = feature.getProperties().name;
                    var color = code.indexOf("tunnelline") > -1 ? "#0892FB" : "#1CA261";
                    var lastNum = code.substr(code.length - 1);
                    var style = new ol.style.Style({
                        stroke: new ol.style.Stroke({ //边界样式
                            color: color,
                            width: 5
                        })
                    });

                    return style;
                }
            });
            vectorLayer.setZIndex(12);
            map.addLayer(vectorLayer);
            vectorLayer.setVisible(isShow);
        },
        getRoadSymbol: function (state, paramType, roadType) {
            var roadColorWidth = {
                "1": {color: "#C82824", width: 4},//1国道，2省道，3县道，4乡道，5村道，6专用公路7高速 //ok
                "2": {color: "#06772E", width: 3}, //ok
                "3": {color: "#6C482D", width: 3},
                "4": {color: "#B47C4E", width: 2},
                "5": {color: "#9A9A9A", width: 3},
                "6": {color: "#479df6", width: 2},
                "7": {color: "#FFF200", width: 4}, //ok
            }
            var o = {
                "completed": {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "condition"
                },
                "plan": {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [255, 144, 0],
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "planyear1"
                },
                'construct': {
                    style0: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 4
                        })
                    }),
                    style1: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [255, 144, 0],
                            width: 4
                        })
                    }),
                    style2: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "green",
                            width: 4
                        })
                    }),
                    condition: "progress"
                },
                'all': {
                    "1": new ol.style.Style({
                        //规划公路
                        stroke: new ol.style.Stroke({
                            // colorOld: roadColorWidth[roadType].color || "#9A9A9A",
                            color: "#9A9A9A",
                            lineDash: [1, 5],
                            lineDashOffset: 10,
                            // width: roadColorWidth[roadType].width
                            width: 3
                        })
                    }),
                    //建成公路
                    "2": new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            // color: roadColorWidth[roadType].color,
                            color: "#9A9A9A",
                            // width: roadColorWidth[roadType].width
                            width: 3
                        })
                    }),
                    //在建公路
                    "3": new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            // color: roadColorWidth[roadType].color,
                            color: "#9A9A9A",
                            lineDash: [6, 5],
                            lineDashOffset: 10,
                            // width: roadColorWidth[roadType].width
                            width: 3
                        })
                    }),
                    condition: "state"
                }
            };
            return o[paramType + ""][state + ""];
        },

        //画一个路段
        drawARoadSection: function (oneGeojsonFeature) {

        }
    };
    return temp;
}));