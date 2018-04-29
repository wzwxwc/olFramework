define(["require", "jquery",
    "text!./html/searchControl.html!strip",
    "css!./css/searchControl.css"], function (require, $, tmpSearchControl) {
    var temp = function (optUser) {
        var self = this;
        var opt = {
            container: "",    //父容器，必填
            get moduleUrl() {
                //todo：下面的self为什么不可以替换为this？
                return self.getModuleUrl()
            },
            $tmp: $(tmpSearchControl),
            params: {},
            nextTabListFlag: false,
            bgObj: {},
        };
        $.extend(opt, optUser);
        this.opt = opt;
        this.init();
    };
    //初始化执行
    temp.prototype.init = function () {
        var self = this;
        self.opt.container.append(self.opt.$tmp);
        var url = self.opt.moduleUrl + "/data/xzqh.json";
        $.get(url, function (data) {
            var arrXzqh = data;
            self.addBuxian(arrXzqh);
            //初始加载
            var initLevel = 1;
            self.addList(arrXzqh, initLevel);
            self.addEvent(arrXzqh);
        });
    };
    //行政区划数组中，所有son不为空的，都在son的第一个位置添加一个“不限”
    temp.prototype.addBuxian = function (arrXzqh) {
        for (var i = 0; i < arrXzqh.length; i++) {
            var oneXzqh = arrXzqh[i];
            var arrXzqhSon = oneXzqh.son;
            if (arrXzqhSon && arrXzqhSon.length > 0) {
                arrXzqhSon.splice(0, 0, {
                    BGNAME: "不限",
                    BGPARENTNAME: oneXzqh.BGNAME,
                    ID: oneXzqh.ID,
                    LEVEL: arrXzqhSon[0].LEVEL,
                    PARENT: arrXzqhSon[0].PARENT,
                    x: oneXzqh.x,
                    y: oneXzqh.y,
                    son: []
                });
                this.addBuxian(arrXzqhSon);
            }
        }
    };
    //根据level的数值，在不同的div上初始arrSons中的对象
    temp.prototype.addList = function (arrSons, level) {
        var source = [];
        var thisLev = this.opt.$tmp.find(".tabList[data-level='" + level + "']")[0];
        for (i in arrSons) {
            source.push(
                '<a class="param" id="' + arrSons[i].ID + '" parent-id="' + arrSons[i].PARENT + '">' + arrSons[i].BGNAME + '</a>'
            )
        }
        $(thisLev).html(source.join(''));
    };
    //绑定事件
    temp.prototype.addEvent = function (arrXzqh) {
        var self = this;
        self.opt.$tmp.find(".search_condition").click(function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass("selected");
                if ($(this).children(".checkbox-img").attr("value") === "0") {
                    $(this).siblings().removeClass("selected");
                } else {
                    $(this).siblings().each(function () {
                        if ($(this).children(".checkbox-img").attr("value") === "0") {
                            $(this).removeClass("selected");
                        }
                    })
                }
            } else {
                $(this).addClass("selected");
                if ($(this).children(".checkbox-img").attr("value") === "0") {
                    $(this).siblings().each(function () {
                        if (!$(this).hasClass("selected")) {
                            $(this).addClass("selected");
                        }
                    })
                }
            }
            self.addSelectedCondition();
        });
        //取消选择条件
        $(document).on('click', '.cancel-selected', function () {
            // debugger;
            var typename = $(this).prev().prev().text(), name = $(this).prev().text();
            if (typename === "区域:") {
                self.opt.params.distirct = null;
                self.addSelectedCondition();
                $('.tab:first-child').text("请选择").siblings("li").hide();
            } else {
                var conditionArray = $(this).parent().attr('condition').split("、");
                for (var i in conditionArray) {
                    $($(".listIndex :contains('" + typename + "')").next().find(":contains('" + conditionArray[i] + "')")[0]).trigger("click");
                }

            }

        });
        $('.tab').on('click', function (e) {
            var $selfIn = $(this);
            var level = $selfIn.attr('tab-level');
            if (!$selfIn.hasClass('currentTab')) {
                $selfIn.siblings().removeClass('currentTab');
                $selfIn.addClass('currentTab');
            }
            $(".currentTab").nextAll('li').hide();
            $($selfIn.parent()).siblings().not('[data-level=' + level + ']').hide();
            $($selfIn.parent()).siblings('[data-level=' + level + ']').not().show();
        });
        $(document).on('click', '.param', function () {
            self.opt.nextTabListFlag = true;
            var $selfIn = $(this);
            var val = $selfIn.text(),
                list = $selfIn.parent(),
                lev = list.attr('data-level'),
                type = list.attr('ctype'),
                t = list.parent().attr('id'),
                pid = $selfIn.attr('id'),
                pname = $selfIn.attr('parent-name');
            // 把查询参数添加到全局参数变量里
            // ConditionHandle.paramDispatcher(type, pid);

            // 进行列表筛选
            // ConditionHandle.listFilter(ConditionHandle.mapParam);
            if (val === "不限") {
                list.siblings('.mulTabs').find('[tab-level=' + lev + ']').text(val);
                list.hide();
                $('.qCondition[type=' + type + ']').removeClass('conditionActive');
                $('.qCondition[type=' + type + ']').text(val);
                self.opt.params.distirct = {
                    name: $(".currentTab").prev().text(),
                    value: pid
                };
                $('[tab-level=' + lev + ']').removeClass('currentTab');
                self.addSelectedCondition();
            } else {
                // 有下级菜单
                if (lev && lev < 4) {
                    var clickLevTab = list.siblings('.mulTabs').find('[tab-level=' + lev + ']');
                    list.nextAll().html('<a class="param" stlye="display:none;">请选择</a><br>');
                    self.opt.params.distirct = {
                        name: val,
                        value: pid
                    };
                    self.addSelectedCondition();
                    if (3 == type) {
                        self.findDataList(arrXzqh, lev, t, pid);
                    }
                    list.hide();
                    if (self.opt.nextTabListFlag) {
                        clickLevTab.removeClass('currentTab').text(val).next().addClass('currentTab').show();
                        list.next().show();
                        $('.qCondition[type=' + type + ']').text(val);
                    } else {
                        list.siblings('.mulTabs').find('[tab-level=' + lev + ']').text(val);
                        list.hide();
                        $('[tab-level=' + lev + ']').removeClass('currentTab');
                        $('.qCondition[type=' + type + ']').removeClass('conditionActive');
                        $('.qCondition[type=' + type + ']').text(val);
                    }
                    // 当前为第四级菜单
                } else if (lev && lev == 4) {
                    list.siblings('.mulTabs').find('[tab-level=' + lev + ']').text(val);
                    list.hide();
                    $('.qCondition[type=' + type + ']').removeClass('conditionActive');
                    $('.qCondition[type=' + type + ']').text(val);
                    if (3 == type) {
                        $selfIn.findDataList(arrXzqh, lev, t, pid);
                    }
                    $selfIn.opt.params.distirct = {
                        name: val,
                        value: pid
                    };
                    $('[tab-level=' + lev + ']').removeClass('currentTab');
                    $selfIn.addSelectedCondition();
                }
            }

            // ConditionHandle.mapParam.bgcode=$(this).attr("id");
            console.log(self.opt.bgObj);
            /* var view = map.getView();
             if(bgObj&&bgObj.x){
             view.setCenter(ol.proj.transform([bgObj.x, bgObj.y], 'EPSG:4326', 'EPSG:3857'));
             switch (lev){
             case '1':
             view.setZoom(8);
             break;
             case '2':
             view.setZoom(9);
             break;
             case '3':
             view.setZoom(14);
             break;
             case '4':
             view.setZoom(15);
             break;
             }

             }
             */
            // loadData(ConditionHandle.mapParam);
        });
        //点击确定事件
        $(".button-container .submit").click(function (e) {
            self.submit();
        });
        //点击取消事件
        $(".button-container .cancel").click(function (e) {
            $(this).parent().parent().hide();
        });
    };

    temp.prototype.findDataList = function (array, lev, type, pid) {
        var _that = this;
        for (var i = 0; i < array.length; i++) {
            // 点击层未当前数据层
            if (pid == array[i].ID) {
                _that.opt.bgObj = array[i];
                if (array[i].son.length > 0) {
                    _that.addList(array[i].son, parseInt(lev) + 1, type);
                    _that.opt.nextTabListFlag = true;
                } else {
                    _that.opt.nextTabListFlag = false;
                    break;
                }
            } else {
                this.findDataList(array[i].son, lev, type, pid);
            }
        }
    };

    temp.prototype.addSelectedCondition = function () {
        this.opt.params.conditions = [];
        var self = this;
        $(".search_condition").each(function () {
            if ($(this).hasClass("selected") && $(this).children(".checkbox-img").attr("value") != "0") {
                var oneDl = $(this).parentsUntil(".listIndex").parent();
                var conditionType = oneDl.attr("searchtype");
                var typename = oneDl.find("dt").text();
                var name = $(this).children("a").html();
                var value = $(this).children(".checkbox-img").attr("value");
                typename = typename.substring(0, typename.length - 1);
                self.opt.params.conditions.push({type: conditionType, typename: typename, name: name, value: value});
            }
        });
        var infor = "";
        if (self.opt.params.distirct) {
            infor += '<div class=\"selectedInfor selectedShow\"><span class="selected-typename">' + '区域' + ':</span><label class="selected-name">' + this.opt.params.distirct.name + '</label><img class="cancel-selected" src="assets/fupin/img/close-blue.png"></div>';
        }
        var conditions = {};
        for (var i = 0; i < self.opt.params.conditions.length; i++) {
            if (!conditions[self.opt.params.conditions[i].typename]) {
                conditions[self.opt.params.conditions[i].typename] = "";
            }
            conditions[self.opt.params.conditions[i].typename] += "" + self.opt.params.conditions[i].name + "、";
        }
        for (var j in conditions) {
            var conditionName = conditions[j].substring(0, conditions[j].length - 1);
            if (conditions[j].length > 6) {
                conditions[j] = conditions[j].substring(0, 6) + "...";
            } else {
                conditions[j] = conditions[j].substring(0, conditions[j].length - 1);
            }
            infor += '<div class=\"selectedInfor selectedShow\" condition=\"' + conditionName + '\"><span class="selected-typename">' + j + ':</span><label class="selected-name">' + conditions[j] + '</label><img class="cancel-selected" src="assets/fupin/img/close-blue.png"></div>';

        }
        $(".clearList").html(infor);
    };
    temp.prototype.submit = function () {
        var self = this;
        var sendData = {};
        if (self.opt.params.distirct && self.opt.params.distirct.value) {
            sendData.bgcode = self.opt.params.distirct.value;
        }
        var a = "", c = "", p = "", r = "";
        self.opt.params.conditions && self.opt.params.conditions.forEach(function (val) {
            switch (val.type) {
                case "active_road":
                    //现役公路质量
                    a += val.value + ",";
                    break;
                case "construction_road":
                    //建设公路状态
                    c += val.value + ",";
                    break;
                case "plan_road":
                    //规划公路年份
                    p += val.value + ",";
                    break;
                case "road_level":
                    //公路等级
                    r += val.value + ",";
                    break;
            }
        });
        if (a.length > 0) sendData.condition = a.substring(0, a.length - 1);
        if (c.length > 0) sendData.progress = c.substring(0, c.length - 1);
        if (p.length > 0) sendData.planyear = p.substring(0, p.length - 1);
        if (r.length > 0) sendData.type = r.substring(0, r.length - 1);

        $("#selector").hide();
        var len = (function () {
            var i = 0;
            for (var item in sendData) {
                i++
            }
            return i;
        })();
        var getDataUrl = window.Config.Url.getRoadDataByQuery;
        if (len <= 0) {
            getDataUrl = window.Config.Url.getRoadData;
        }

        getData(getDataUrl, sendData, function (data) {
            roadlist = data.result.list;
            creatCompany(roadlist);
            OpenLayerHandle.removeLayer("roadLayer");
            map.addLayer(OpenLayerHandle.createDemoRoadLayer("roadLayer", roadlist));
        });
    };
    //得到当前模块的地址
    temp.prototype.getModuleUrl = function () {
        var url = require.toUrl(".");
        return url;
    };

    return temp;
});



