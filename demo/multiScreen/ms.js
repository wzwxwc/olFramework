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
    var lyrOSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var map1 = ol.Map({
        target: "map1",
        view: view1,
        layers: [
            lyrGoogle
        ],
        controls: ol.control.defaults({attribution: false, zoom: false, dragAble: false}),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: false

    });

    // var map = new ol.Map({
    //     target: 'map1',
    //     layers: [lyrGoogle],
    //     view: view1,
    //     controls: ol.control.defaults({attribution: false, zoom: false, dragAble: false}),
    //     loadTilesWhileAnimating: true,
    //     loadTilesWhileInteracting: false
    // });
};
