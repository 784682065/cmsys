single = {    init: function () {        tableType = "secBranch";        wps.initDetail();    },    //页面数据渲染    wpView: function (data) {        var tableHtml = "";        if (data.info && data.info != "") {            var value = data.info[0];            $("#SBZ").text(numToContent.sbzText(value.SBZ));            if (value.SBZ == "01") {                $("#SBRTitle").text("申报人");                $("#SBR").text(value.SBR);            } else if (value.SBZ == "02") {                $("#SBRTitle").text("申报单位");                $("#SBR").text(value.SBDW);            }            $("#SBXMMC").text(value.SBXMMC);            $("#XMDM").text(value.XMDM);            $("#SBSL").text(value.SBSL);            $("#FDDBR").text(value.FDDBR);            $("#TYPEINFO").text(value.TYPEINFO);            $("#SFKD").text(numToContent.sfkdText(value.SFKD));            $("#LXR_NAME").text(value.LXR_NAME);            $("#LXR_IDCARD").text(value.LXR_IDCARD);            $("#LXR_PHO").text(value.LXR_PHO);            $("#LXR_TEL").text(value.LXR_TEL);            $("#TXDZ").text(value.TXDZ);            $("#GSDZ").text(value.GSDZ);            $("#ZIP_CODE").text(value.ZIP_CODE);            $("#EDUCATION").text(value.EDUCATION);            $("#FGS_ZIP_CODE").text(value.FGS_ZIP_CODE);            $("#FGSDZ").text(value.FGSDZ);            $("#QFDDBR").text(value.QFDDBR);            $("#FDDBR_LEGAL_TEL").text(value.FDDBR_LEGAL_TEL);            $("#FDDBR_LEGAL_PHO").text(value.FDDBR_LEGAL_PHO);            $("#FGFZR_LEGAL_IDCARD").text(value.DWFZR_ID_CARD);            $("#FGFZR_LEGAL_TEL").text(value.FGFZR_LEGAL_TEL);            $("#FGFZR_LEGAL_PHO").text(value.FGFZR_LEGAL_PHO);            $("#BAYRS").text(value.BAYRS);            $("#BADJB_FGFZR").text(value.BADJB_FGFZR);            $("#FZR_NAME").text(value.FZR_NAME);            $("#FZR_GENDER").text(numToContent.sexContent(value.FZR_GENDER));            $("#FZR_BIRTH").text(value.FZR_BIRTH);            $("#FZR_GJDQ").text(value.FZR_GJDQ);            $("#NATIVE").text(value.NATIVE);            $("#WHCD").text(value.WHCD);            $("#NATION").text(value.NATION);            $("#ZZMM").text(value.ZZMM);            $("#JSZC").text(value.JSZC);            $("#DWFZR_ZIP_CODE").text(value.DWFZR_ZIP_CODE);            $("#DWMC").text(value.DWMC);            $("#DRHZW").text(value.DRHZW);            $("#LEGAL_TEL").text(value.LEGAL_TEL);            $("#LEGAL_PHO").text(value.LEGAL_PHO);            $("#HJDZ").text(value.HJDZ);            $("#XZXZ").text(value.XZXZ);            $("#REMARK").text(value.REMARK);        }        if (data.tb && data.tb != "") {            var table = data.tb;            $(table).each(function (i, d) {                tableHtml += '<tr><td>' + d.GRJL_QSNY + '</td><td>' + d.GRJL_ZZNY + '</td>' +                '<td>' + d.GRJL_GZJL + '</td><td>' + d.GRJL_ZMR + '</td></tr>';            });            tableHtml = '<tr><th>起始年月</th><th>终止年月</th><th>经历</th><th>证明人</th></tr>' + tableHtml;            $("#tbInfo").html(tableHtml);        }    }};single.init();