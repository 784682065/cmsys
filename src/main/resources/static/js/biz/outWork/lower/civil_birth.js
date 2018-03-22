$(function () {
    civilBirth.init();
});

out.data.business = "1";
    out.business = "/civilBirth";

var civilBirth = {

    init: function () {
        out.initdata = civilBirth.initdata;

        out.init();
    },

    saveData: function () {

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

        // $("#name").val(data.mainInfo.NAME);
        // var gender = data.mainInfo.GENDER;
        // if (gender == '01'){
        //     gender = '男';
        // }else if (gender == '02'){
        //     gender = '女';
        // }
        // $("#gender").val(gender);
        //
        // $("#birth_date").val(data.mainInfo.BIRTH_DATE);
        // $("#bgqmz").val(data.mainInfo.BGQMZ);
        // $("#bghmz").val(data.mainInfo.BGHMZ);
        // $("#xxhdw").val(data.mainInfo.XXHDW);
        // $("#hjdz").val(data.mainInfo.HJDZ);
        // $("#fater_name").val(data.mainInfo.FATER_NAME);
        // $("#fater_mz").val(data.mainInfo.FATER_MZ);
        // $("#fater_lxdh").val(data.mainInfo.FATER_LXDH);
        // $("#fater_id_card").val(data.mainInfo.FATER_ID_CARD);
        // $("#fater_gzdw").val(data.mainInfo.FATER_GZDW);
        // $("#fater_hjdz").val(data.mainInfo.FATER_HJDZ);
        // $("#mather_name").val(data.mainInfo.MATHER_NAME);
        // $("#mather_mz").val(data.mainInfo.MATHER_MZ);
        // $("#mather_lxdh").val(data.mainInfo.MATHER_LXDH);
        // $("#mather_id_card").val(data.mainInfo.MATHER_ID_CARD);
        // $("#mather_gzdw").val(data.mainInfo.MATHER_GZDW);
        // $("#mather_hjdz").val(data.mainInfo.MATHER_HJDZ);
        // $("#sqyj").val(data.mainInfo.SQYJ);
        // $("#bgrnl").val(data.mainInfo.BGRNL);
    },

    getInfo: function () {

    },

    lock: function () {

    }
}