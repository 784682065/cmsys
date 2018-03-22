$(function () {
    firearms.init();
});


out.business = '/firearms';

var firearms = {

    //页面初始化
    init: function () {

        out.initdata = firearms.initdata;
        out.init();
    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        //基础信息初始化

        if("01"==data.info[0].SBZ){

            $("#dwsq").hide();
            $('#sbr').val(data.info[0].SBR);
            $('#sbr_idcard').val(data.info[0].SBR_IDCARD);
        }else if("02"==data.info[0].SBZ){

            $("#grsq").hide();
            $('#sbdw').val(data.info[0].SBDW);
            $('#typeInfo').val(data.info[0].TYPEINFO);
            $('#fddbr').val(data.info[0].FDDBR);
        }
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");
        $('#sbxmmc').val(data.info[0].SBXMMC);
        $('#xmdm').val(data.info[0].XMDM);
        $('#sbsl').val(data.info[0].SBSL);
        $('#lxr_name').val(data.info[0].LXR_NAME);
        $('#lxr_pho').val(data.info[0].LXR_PHO);
        $('#lxr_idcard').val(data.info[0].LXR_IDCARD);
        $('#lxr_tel').val(data.info[0].LXR_TEL);
        $('#txdz').val(data.info[0].TXDZ);
    }

};