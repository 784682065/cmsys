single = {    init: function () {        tableType = "huntGround";        wps.initDetail();    },    //页面数据渲染    wpView: function (data) {        var itemHtml = "";        var tableHtml = "";        if (data.mainInfo && data.mainInfo != "") {            var value = data.mainInfo;            $("#SBZ").text(numToContent.sbzText(value.SBZ));            if (value.SBZ == "01") {                $("#SBRTitle").text("申报人");                $("#SBR").text(value.SBR);            } else if (value.SBZ == "02") {                $("#SBRTitle").text("申报单位");                $("#SBR").text(value.SBDW);            }            $("#XMDM").text(value.XMDM);            $("#SBSL").text(value.SBSL);            $("#TYPEINFO").text(value.TYPEINFO);            $("#FDDBR").text(value.FDDBR);            $("#SFKD").text(numToContent.sfkdText(value.SFKD));            $("#LXR_NAME").text(value.LXR_NAME);            $("#LXR_IDCARD").text(value.LXR_IDCARD);            $("#LXR_PHO").text(value.LXR_PHO);            $("#TXDZ").text(value.TXDZ);            $("#SLC_ADDRESS").text(value.SLC_ADDRESS);            $("#QZGLFZR").text(value.QZGLFZR);            $("#QZGLFZR_LXDH").text(value.QZGLFZR_LXDH);            $("#BWJGFZR").text(value.BWJGFZR);            $("#BWRYSL").text(value.BWRYSL);            $("#PQYT_SYSMQY").text(value.PQYT_SYSMQY);            $("#ZL_SL_XH").text(value.ZL_SL_XH);        }    }};single.init();