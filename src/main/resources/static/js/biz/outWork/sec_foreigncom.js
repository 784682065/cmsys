$(function () {
    secForeigncom.init();
});


out.business = "/secForeignCom";

var secForeigncom = {

    init: function () {
        out.initdata = secForeigncom.initdata;
        out.init();
    },

    saveData: function () {

    },

    initdata: function (data) {

        //sbz与sfkd 的radio赋值
        var sbz = "input[name='sbz'][value='" + data.mainInfo.SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.mainInfo.SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#xmdm").val(data.mainInfo.XMDM);
        $("#sbsl").val(data.mainInfo.SBSL);
        $("#sbxmmc").val(data.mainInfo.SBXMMC);
        $("#sbdw").val(data.mainInfo.SBDW);
        $("#typeInfo").val(data.mainInfo.TYPEINFO);
        $("#fddbr").val(data.mainInfo.FDDBR);
        $("#lxr_name").val(data.mainInfo.LXR_NAME);
        $("#lxr_pho").val(data.mainInfo.LXR_PHO);
        $("#lxr_idcard").val(data.mainInfo.LXR_IDCARD);
        $("#lxr_tel").val(data.mainInfo.LXR_TEL);
        $("#txdz").val(data.mainInfo.TXDZ);
    }

};