$(function () {

    passport.init();

});

out.business = '/passport';

var passport = {

    init: function () {

        out.initdata = passport.initdata;
        out.init();
    },


    initdata: function (data) {
        debugger;
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#deptname").html(data.info[0].DEPTNAME);

        $('#sbr').val(data.info[0].SBR);
        $('#sbr_idcard').val(data.info[0].SBR_IDCARD);
        $('#xmdm').val(data.info[0].XMDM);
        $('#sbsl').val(data.info[0].SBSL);
        $('#sbxmmc').val(data.info[0].SBXMMC);
        $('#sbdw').val(data.info[0].SBDW);
        $('#typeInfo').val(data.info[0].TYPEINFO);
        $('#fddbr').val(data.info[0].FDDBR);
        $('#lxr_name').val(data.info[0].LXR_NAME);
        $('#lxr_pho').val(data.info[0].LXR_PHO);
        $('#lxr_idcard').val(data.info[0].LXR_IDCARD);
        $('#lxr_tel').val(data.info[0].LXR_TEL);
        $('#txdz').val(data.info[0].TXDZ);
        $('#lxr_tel').val(data.info[0].LXR_TEL);
        $('#txdz').val(data.info[0].TXDZ);
        if ("01"== data.info[0].GENDER) {
            $("#gender").val("男");
        }else if ("02"== data.info[0].GENDER){
            $("#gender").val("女");
        }
        $('#birth_date').val(data.info[0].BIRTH_DATE);
        $('#jg').val(data.info[0].JG);
        $('#gzdw').val(data.info[0].GZDW);
        $('#duty').val(data.info[0].DUTY);
        $('#hjdz').val(data.info[0].HJDZ);
        $('#xjzdz').val(data.info[0].XJZDZ);
        $('#sqly').val(data.info[0].SQLY);
        $('#qwdd').val(data.info[0].QWDD);
        $('#qsrq').val(data.info[0].QSRQ);
        $('#zzrq').val(data.info[0].ZZRQ);
        $('#brjl').val(data.info[0].BRJL);
        $('#jtcy').val(data.info[0].JTCY);
    }

};