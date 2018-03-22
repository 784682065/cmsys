$(function () {
    $("#cybgjl").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'CHANGEPRO',
                    title: "查验变更项目",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'CHANGECONTENT',
                    title: '查验、变更内容',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'ZJLEVL',
                    title: '资质等级',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    $("#cfdj").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'CFNR',
                    title: "处罚内容",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'CFYY',
                    title: '处罚原因',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'REMARK',
                    title: '备注',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    firearms_his.init();
});


out.business = '/firearmsHis';

var firearms_his = {

    //页面初始化
    init: function () {
        out.initdata = firearms_his.initdata;
        out.init();
    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        //基础信息初始化
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");
        $('#sbxmmc').val(data.info[0].SBXMMC);
        $('#sbdw').val(data.info[0].SBDW);
        $('#typeInfo').val(data.info[0].TYPEINFO);
        $('#fddbr').val(data.info[0].FDDBR);
        $('#xmdm').val(data.info[0].XMDM);
        $('#sbsl').val(data.info[0].SBSL);
        $('#sbr').val(data.info[0].SBR);
        $('#sbr_idcard').val(data.info[0].SBR_IDCARD);
        $('#lxr_name').val(data.info[0].LXR_NAME);
        $('#lxr_pho').val(data.info[0].LXR_PHO);
        $('#lxr_idcard').val(data.info[0].LXR_IDCARD);
        $('#lxr_tel').val(data.info[0].LXR_TEL);
        $('#txdz').val(data.info[0].TXDZ);

        //业务信息初始化
        $('#dwlb').val(data.info[0].DWLB);
        $('#fddbr_name').val(data.info[0].FDDBR_NAME);
        $('#dwdz').val(data.info[0].DWDZ);
        $('#qzglfzr').val(data.info[0].QZGLRZR);
        $('#dwsq_yyjytsm').val(data.info[0].DWSQ_YYJYTSM);
        $('#guns_kinds').val(data.info[0].GUNS_KINDS);
        $('#guns_type').val(data.info[0].GUNS_TYPE);
        $('#guns_num').val(data.info[0].GUNS_NUM);
        $('#sccj').val(data.info[0].SCCJ);
        $('#gmsj').val(data.info[0].GMSJ);
        $('#pzdgajg').val(data.info[0].PZDGAJG);
        $('#qzglfzr').val(data.info[0].QZGLFZR);

        //附表初始化
        if (data.tbInfo != null) {
            $("#cybgjl").bootstrapTable('load', data.tbInfo);
        }

        if (data.tbInfo1 != null) {
            $("#cfdj").bootstrapTable('load', data.tbInfo1);
        }

    }

};