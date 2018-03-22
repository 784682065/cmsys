$(function () {
    driveTrain.init();
});

out.business = "/driveTrain";

var driveTrain = {

    init: function () {
        out.initdata = driveTrain.initdata;
        out.init();

    },

    initdata: function (data) {

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

        $("#jxqc").val(data.mainInfo.JXQC);
        $("#jxjc").val(data.mainInfo.JXJC);
        $("#jxdm").val(data.mainInfo.JXDM);
        $("#jxdz").val(data.mainInfo.JXDZ);
        $("#zczj").val(data.mainInfo.ZCZJ);
        $("#jxjb").val(data.mainInfo.JXJB);
        $("#kpxcx").val(data.mainInfo.KPXCX);
    }
};