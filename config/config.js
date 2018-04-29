// var baseUrl = "http://182.48.115.38:7880/dcms/";
window.Config = function () {
    // var baseUrl = "182.48.115.38:7885";
    // var baseUrl = "localhost:8080";
    var baseUrl = "219.149.226.180:7884";
    var geoServer="http://219.149.226.180:8060/geoserver/";
    var geoServer_me="http://localhost:8080/geoserver/";
    return {
        Url: {
            baseUrl:baseUrl,
            // getRoadData: "http://" + baseUrl + "/fupin/roadData/getRoadPage.do",
            getRoadData: "./modulesRoad/roadList/data/road.json",
            getRoadDataByQuery:"http://" + baseUrl + "/fupin/roadData/getRoadPageByQuery.do",
            getRoadProgress: "http://" + baseUrl + "/fupin/roadProgress/getRoadProgressPage.do",
            getCommentList: "http://" + baseUrl + "/fupin/complains/getByRoadId.do",
            getCaseList: "http://" + baseUrl + "/fupin/case/getCaseByRoadId.do",
            // getImage:'http://182.48.115.38:7883/get',
            getImage:'http://219.149.226.179:7883/get',
            deleltComment:"http://"+baseUrl+"/fupin/complains/deleteByRoadId.do",
            deleteCase:"http://"+baseUrl+"/fupin/case/deleteByCaseId.do",
            supervise:"http://"+baseUrl+"/fupin/case/supervise.do",
            getCaseHistory:"http://"+baseUrl+"/fupin/case/getHistoryByCaseid.do",
            bridgePointUrl:geoServer+"test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test:bridgepoint&maxFeatures=50&outputFormat=application%2Fjson",
            bridgeLineUrl:geoServer+"test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test:bridgeline&maxFeatures=50&outputFormat=application%2Fjson ",
            tunnelPointUrl:geoServer+"test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test:tunnelpoint&maxFeatures=50&outputFormat=application%2Fjson",
            tunnelLineUrl:geoServer+"test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test:tunnelline&maxFeatures=50&outputFormat=application%2Fjson",
            roadLineUrl:geoServer_me+"zc_jinlin_raod/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=zc_jinlin_raod:LX_C&maxFeatures=50&outputFormat=application%2Fjson",
            luzhangUrl:"http://"+ baseUrl+"/fupin/roadManager/getRoadManagerByRordId.do"
        },
        Timer: {}
    }

}();