$(function () {
    guard.init();
});

out.business = "/guard";

var guard = {

    init: function () {
        out.initdata = guard.initdata;
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

        if ("01"== data.mainInfo.GENDER) {
            $("#gender").val("男");
        }else if ("02"== data.mainInfo.GENDER){
            $("#gender").val("女");
        }
        $("#zip_code").val(data.mainInfo.ZIP_CODE);
        $("#birth_date").val(data.mainInfo.BIRTH_DATE);
        $("#nation").val(data.mainInfo.NATION);
        $("#zzmm").val(data.mainInfo.ZZMM);
        $("#whcd").val(data.mainInfo.WHCD);
        $("#hjdz").val(data.mainInfo.HJDZ);
        $("#xzdz").val(data.mainInfo.XZDZ);
        $("#jtzycy").val(data.mainInfo.JTZYCY);
        $("#jyjl").val(data.mainInfo.JYJL);
        $("#gzjl").val(data.mainInfo.GZJL);
    },

    getInfo: function () {

    },

    lock: function () {

    }
}