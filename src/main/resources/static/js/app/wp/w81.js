single = {    init: function () {        tableType = "employDriver";        wps.initDetail();    },    //页面数据渲染    wpView: function (data) {        var itemHtml = "";        if (data.info && data.info != "") {            var value = data.info[0];            $("#SBZ").text(numToContent.sbzText(value.SBZ));            if (value.SBZ == "01") {                $("#SBRTitle").text("申报人");                $("#SBR").text(value.SBR);                $("#SBR_IDCARD").text(value.SBR_IDCARD);            } else if (value.SBZ == "02") {                $("#SBRTitle").text("申报单位");                $("#SBR").text(value.SBDW);                $("#SBR_IDCARD").parent().remove();            }            $("#XMDM").text(value.XMDM);            $("#SBSL").text(value.SBSL);            $("#FDDBR").text(value.FDDBR);            $("#TYPEINFO").text(value.TYPEINFO);            $("#SFKD").text(numToContent.sfkdText(value.SFKD));            $("#LXR_NAME").text(value.LXR_NAME);            $("#LXR_IDCARD").text(value.LXR_IDCARD);            $("#LXR_PHO").text(value.LXR_PHO);            $("#LXR_TEL").text(value.LXR_TEL);            $("#TXDZ").text(value.TXDZ);        }    }};single.init();