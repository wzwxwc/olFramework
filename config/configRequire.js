var configRequire = {
    baseUrl: "./",
    paths: {
        css: "./deps/requirejsPlugin/css",
        text: "./deps/requirejsPlugin/text",
        json: "./deps/requirejsPlugin/json",
        ol: "./deps/openlayers/v3.16.0/ol-debug",
        jquery: "./deps/jquery/jquery-3.2.1",
        jquery_ui: "./deps/jqueryPlugin/jquery-ui-1.12.1/jquery-ui",
        //指向文件夹
        deps: "./deps",
        lib: "./lib",
        modules: "./modules",
        modulesRoad: "./modulesRoad",
        ui: "./ui"
    },
    shim: {
        ol: {
            deps: ["css!./deps/openlayers/v3.16.0/ol.css"]
        }
    }
};
require.config(configRequire);