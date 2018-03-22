$(function () {
    outDriver.init();
});

out.business = "/outDriver";

var outDriver = {

    init: function () {
        out.initdata = outDriver.initdata;
        out.init();
    },

    initdata: function (data) {

        var sbz = "input[name='sbz'][value='" + data.mainInfo.SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.mainInfo.SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#xmdm").val(data.mainInfo.XMDM);
        $("#sbsl").val(data.mainInfo.SBSL);
        $("#sbr").val(data.mainInfo.SBR);
        $("#sbr_idcard").val(data.mainInfo.SBR_IDCARD);
        $("#lxr_name").val(data.mainInfo.LXR_NAME);
        $("#lxr_pho").val(data.mainInfo.LXR_PHO);
        $("#lxr_idcard").val(data.mainInfo.LXR_IDCARD);
        $("#lxr_tel").val(data.mainInfo.LXR_TEL);
        $("#txdz").val(data.mainInfo.TXDZ);
    }
};