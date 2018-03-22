$(function () {
    $("#jtzycyjk").bootstrapTable({
        dataType: "json",
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'CALLED',
                    title: "称谓",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'NAME',
                    title: '姓名',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'BIRTH',
                    title: '出生年月',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'JOB',
                    title: '职业',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'IDCARD',
                    title: '身份证号码',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    boater.init();
});

out.business = '/boater';

var boater = {
    //页面初始化
    init: function () {
        out.initdata = boater.initdata;
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
        $('#sbr').val(data.info[0].SBR);
        $('#sbr_idcard').val(data.info[0].SBR_IDCARD);
        $('#lxr_name').val(data.info[0].LXR_NAME);
        $('#lxr_pho').val(data.info[0].LXR_PHO);
        $('#lxr_idcard').val(data.info[0].LXR_IDCARD);
        $('#lxr_tel').val(data.info[0].LXR_TEL);
        $('#txdz').val(data.info[0].TXDZ);

        //业务信息初始化
        if ("01"== data.info[0].GENDER) {
            $("#gender").val("男");
        }else if ("02"== data.info[0].GENDER){
            $("#gender").val("女");
        }
        $('#birthplace').val(data.info[0].BIRTHPLACE);
        $('#whcd').val(data.info[0].WHCD);
        $('#zzmm').val(data.info[0].ZZMM);
        $('#czhkdz').val(data.info[0].CZHKDZ);
        $('#zzdz').val(data.info[0].ZZDZ);
        $('#zzzh').val(data.info[0].ZZZH);
        $('#fwcb').val(data.info[0].FWCB);
        $('#cszw').val(data.info[0].CSZW);
        $('#remark').val(data.info[0].REMARK);
        $('#nation').val(data.info[0].NATION);

        //附表初始化
        if (data.tbInfo != null) {
            $("#jtzycyjk").bootstrapTable('load', data.tbInfo);
        }

    }

};