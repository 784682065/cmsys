$(function () {
    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            sgajOpinion: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '市公安局审核意见'
                    }
                }
            }

        }
    });

    shooting.init();
});

out.business = '/shootCommercial';

var shooting = {

    //表单初始化
    init: function () {
        out.initdata = shooting.initdata;
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

        //业务信息初始化
        $('#bws_gdb').val(data.info[0].BWS_GDB);
        $('#bws_ydb').val(data.info[0].BWS_YDB);
        $('#bws_xyb').val(data.info[0].BWS_XYB);
        $('#bws_hdb').val(data.info[0].BWS_HDB);
        $('#bws_fdb').val(data.info[0].BWS_FDB);
        $('#qzzl_gdb').val(data.info[0].QZZL_GDB);
        $('#qzzl_ydb').val(data.info[0].QZZL_YDB);
        $('#qzzl_xyb').val(data.info[0].QZZL_XYB);
        $('#qzzl_hdb').val(data.info[0].QZZL_HDB);
        $('#qzzl_fdb').val(data.info[0].QZZL_FDB);

        $('#sqdwmc').val(data.info[0].SQDWMC);
        $('#frzcxx').val(data.info[0].FRZCXX);
        $('#dwxxdz').val(data.info[0].DWXXDZ);
        $('#project_name').val(data.info[0].PROJECT_NAME);
        $('#address').val(data.info[0].ADDRESS);
        $('#tj').val(data.info[0].CONDITION);
        $('#sqrcs').val(data.info[0].SQRCS);

    }

};

