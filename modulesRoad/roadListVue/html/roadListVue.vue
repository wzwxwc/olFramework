<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>roadListVue模板</title>
</head>
<body>
<div class="companys">
    <ul>
        <li class="clear " data-type="bridge" v-for="oneRoad in arrRoads" v-on:click="liClick(oneRoad)">
            <img :src="moduleUrl+'/img/patrol-01.jpg'" class="company_img">
            <div class="item">
                <p class="item_brief">
                    <img :src="moduleUrl+'/img/wushui_blue.png'" alt="" class="item_img">
                    <span class="name">{{oneRoad.name}}</span>
                </p>
                <p class="item_brief">
                    <span class="hangye">{{oneRoad.roadtypename}}</span>
                </p>
                <p class="item_brief">
                    <a data-roadstatus="01" v-if="oneRoad.roadstatus&&oneRoad.roadstatus.indexOf('01')>=0" @click="aRoadStatusClick">
                        <img :src="moduleUrl+'/img/roadstatus_guihua.png'" alt="" class="item_img">
                        <span class="name">规划</span>
                    </a>
                    <a data-roadstatus="02" v-if="oneRoad.roadstatus&&oneRoad.roadstatus.indexOf('02')>=0" @click="aRoadStatusClick">
                        <img :src="moduleUrl+'/img/roadstatus_jianshe.png'" alt="" class="item_img">
                        <span class="name">建设</span>
                    </a>
                    <a data-roadstatus="03" v-if="oneRoad.roadstatus&&oneRoad.roadstatus.indexOf('03')>=0" @click="aRoadStatusClick">
                        <img :src="moduleUrl+'/img/roadstatus_xianyi.png'" alt="" class="item_img">
                        <span class="name">现役</span>
                    </a>
                </p>
            </div>
        </li>
    </ul>
</div>
</body>
</html>