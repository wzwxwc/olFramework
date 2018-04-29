/**
 * Created by zc on 2018/4/29.
 */

window.onload = function () {
    var view1 = new ol.View({
        center: ol.proj.fromLonLat([126.7255, 43.686841]),
        zoom: 8,
    });

    var lyrGoogle = layerUtil.tile({
        server: "Google",
        source: "Satellite",
        type: "Map"
    });
    var lyrGaoDe = layerUtil.tile({
        server: "GaoDe",
        source: "Satellite",
        type: "Map"
    });
    var lyrGaoDeAnno = layerUtil.tile({
        server: "GaoDe",
        source: "Satellite",
        type: "Annotion"
    });
    var lyrMapABC = layerUtil.tile({
        server: "Google",
        source: "Normal",
        type: "Map"
    });

    var lyrOSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    //对map进行初始化的时候，不加new为啥会报错？
    var map1 = new ol.Map({
        target: "map1",
        view: view1,
        layers: [
            lyrGoogle
        ],
        controls: ol.control.defaults({attribution: false, zoom: false, dragAble: false}),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: false

    });
    var map2 = new ol.Map({
        target: "map2",
        view: view1,
        layers: [
            lyrGaoDe,
            lyrGaoDeAnno
        ],
        controls: ol.control.defaults({attribution: false, zoom: false, dragAble: false}),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: false

    });
    var map3 = new ol.Map({
        target: "map3",
        view: view1,
        layers: [
            lyrMapABC
        ],
        controls: ol.control.defaults({attribution: false, zoom: false, dragAble: false}),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: false

    });
    var map4 = new ol.Map({
        target: "map4",
        view: view1,
        layers: [
            lyrOSM
        ],
        controls: ol.control.defaults({attribution: false, zoom: false, dragAble: false}),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: false

    });

};
