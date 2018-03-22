$(function () {
    $("#zjjgry").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'NAME',
                    title: "姓名",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: "CSRQ",
                    title: '出生日期',
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
                    field: 'EDUCATION',
                    title: '学历',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'DUTY',
                    title: '职务',
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
    abroadStaff.init();
});

out.business = '/abroadStaff';

var abroadStaff = {
    //页面初始化
    init: function () {
        out.initdata = abroadStaff.initdata;
        out.init();
    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        //基础信息初始化
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");
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

        //附表初始化
        if (data.tbInfo != null) {
            $("#zjjgry").bootstrapTable('load', data.tbInfo);
        }

    }
}