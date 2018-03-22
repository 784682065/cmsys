$(function () {
    check.init();
});

out.business = "/check";

var check = {

    init: function () {
        out.initdata = check.initdata;
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

        $("#gcmc").val(data.mainInfo.GCMC);
        $("#qqdjcd").val(data.mainInfo.QQDJCD);
        $("#dklks").val(data.mainInfo.DKLKS);
        $("#bzdm").val(data.mainInfo.BZDM);

    }
};