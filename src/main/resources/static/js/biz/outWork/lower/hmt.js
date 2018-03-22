$(function () {
    $("#fgqzbary").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'BARYNAME',
                    title: "姓名",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'GENDER',
                    title: '性别',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'IDCARD',
                    title: '身份证号',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'ZW',
                    title: '职务',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'HKSZD',
                    title: '户口所在地',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'QZYXQ',
                    title: '预申请的签注有效期',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });

    //初始化
    hmt.init();
});

out.business = '/hmt';

var hmt = {

    //表单初始化
    init: function () {
        //初始化数据
        out.initdata = hmt.initdata;
        out.init();
    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");
        $("#xmdm").val(data.info[0].XMDM);
        $("#sbsl").val(data.info[0].SBSL);
        $('#sbxmmc').val(data.info[0].SBXMMC);
        $('#sbdw').val(data.info[0].SBDW);
        $('#typeInfo').val(data.info[0].TYPEINFO);
        $('#fddbr').val(data.info[0].FDDBR);
        $('#lxr_name').val(data.info[0].LXR_NAME);
        $('#lxr_pho').val(data.info[0].LXR_PHO);
        $("#lxr_idcard").val(data.info[0].LXR_IDCARD);
        $("#lxr_tel").val(data.info[0].LXR_TEL);
        $("#txdz").val(data.info[0].TXDZ);

        $("#dwxz").val(data.info[0].DWXZ);
        $("#zgbm").val(data.info[0].ZGBM);
        $("#city").val(data.info[0].CITY);
        $("#area").val(data.info[0].AREA);
        $("#dwdz").val(data.info[0].DWDZ);
        $("#dsz").val(data.info[0].DSZ);
        $("#zjl").val(data.info[0].ZJL);

        $("#sxdb").val(data.info[0].SXDB);
        $("#yyzzbh").val(data.info[0].YYZZBH);
        $("#zcsj").val(data.info[0].ZCSJ);
        $("#yyzzyxq").val(data.info[0].YYZZYXQ);
        $("#zczj").val(data.info[0].ZCZJ);
        $("#sndyye").val(data.info[0].SNDYYE);
        $("#sndnse").val(data.info[0].SNDNSE);
        $("#sndjke").val(data.info[0].SNDJKE);

        if (data.tb != null) {
            //将备案名单表通过bootstrap直接显示在页面上
            $("#fgqzbary").bootstrapTable('load', data.tb);
        }
    }

};