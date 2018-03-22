$(function () {
    civilGender.init();
});

out.business = "/civilGender";

var civilGender = {

    init: function () {
        out.initdata = civilGender.initdata;
        out.init();
    },

    saveData: function () {

    },

    initdata: function (data) {

        var sbz = "input[name='sbz'][value='" + data.mainInfo.SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.mainInfo.SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#deptname").html(data.mainInfo.DEPTNAME);

        $("#xmdm").val(data.mainInfo.XMDM);
        $("#sbsl").val(data.mainInfo.SBSL);
        $("#sbr").val(data.mainInfo.SBR);
        $("#sbr_idcard").val(data.mainInfo.SBR_IDCARD);
        $("#lxr_name").val(data.mainInfo.LXR_NAME);
        $("#lxr_pho").val(data.mainInfo.LXR_PHO);
        $("#lxr_idcard").val(data.mainInfo.LXR_IDCARD);
        $("#lxr_tel").val(data.mainInfo.LXR_TEL);
        $("#txdz").val(data.mainInfo.TXDZ);
        //
        // $("#changed_name").val(data.mainInfo.CHANGED_NAME);
        // $("#change_id_card").val(data.mainInfo.CHANGE_IDCARD);
        // $("#xhjdz").val(data.mainInfo.XHJDZ);
        // $("#before_gender").val(data.mainInfo.BEFORE_GENDER);
        // $("#after_gender").val(data.mainInfo.AFTER_GENDER);
        // $("#reasons").val(data.mainInfo.REASONS);
    },

    getInfo: function () {

    },

    lock: function () {

    }
}