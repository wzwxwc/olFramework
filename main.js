require([
    "jquery",
    "lib/layerUtil",
    "modulesRoad/roadListVue/roadListVue",
    "modulesRoad/toolbox/toolbox",
    "config/config",
    "ol"], function ($, layerUtil, roadListVue, toolbox) {
    var view1 = new ol.View({
        // center: [126.7255, 43.686841],
        center: ol.proj.fromLonLat([126.7255, 43.686841]),
        zoom: 8,
        // projection: "EPSG:4326"
    });
    var format = 'image/png';
    var LX_C = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_C',
            }
        })
    });
    var LX_G = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_G',
            }
        })
    });
    var LX_S = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_S',
            }
        })
    });
    var LX_X = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_X',
            }
        })
    });
    var LX_Y = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_Y',
            }
        })
    });
    var LX_Z = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_Z',
            }
        })
    });


    var LX_C_3857 = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_C',
            }
        })
    });
    var LX_G_3857 = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_G',
            }
        })
    });
    var LX_S_3857 = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_S',
            }
        })
    });
    var LX_X_3857 = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_X',
            }
        })
    });
    var LX_Y_3857 = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_Y',
            }
        })
    });
    var LX_Z_3857 = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_Z',
            }
        })
    });

    var LX_group_3857 = new ol.layer.Tile({
        visible: true,
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                tiled: true,
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_3857',
                tilesOrigin: 13986821.127759833 + "," + 5248734.499999997
            }
        })
    });

    var LX_group_gcj02_3857 = new ol.layer.Tile({
        visible: true,
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/zc_jinlin_raod/wms',
            params: {'FORMAT': format,
                'VERSION': '1.1.1',
                tiled: true,
                STYLES: '',
                LAYERS: 'zc_jinlin_raod:LX_gcj02_3857',
                tilesOrigin: 13986821.127759833 + "," + 5248760.799973022
            }
        })
    });


    var arrLyrs = [
        layerUtil.tile({
            server: "Google",
            source: "Satellite",
            type: "Map"
        }),
        // layerUtil.tile({
        //     server: "TianDiTu",
        //     source: "Normal",
        //     type: "Annotion"
        // }),
        // LX_group_gcj02_3857,
        // LX_G,
        // LX_S,
        // LX_X,
        // LX_Y,
        // LX_Z
    ];

    map = new ol.Map({
        layers: arrLyrs,
        controls: ol.control.defaults({attribution: false, zoom: false, dragAble: false}),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: false,
        target: 'map',
        view: view1
    });

    new roadListVue({
        container: ".leftNav",
        map: map
    });
    new toolbox({
        container: "body"
    });
});
