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
    //初始化
    purchase.init();

});


out.business = '/purchase';

var purchase = {

    //表单初始化
    init: function () {

        //初始化数据
        out.initdata = purchase.initdata;
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

        $("#jbr").val(data.info[0].JBR);
        $("#jbr_lxdh").val(data.info[0].JBR_LXDH);
        $("#jbr_id_card").val(data.info[0].JBR_ID_CARD);
        $("#pgsj").val(data.info[0].PGSJ);
        $("#pgyy").val(data.info[0].PGYY);
        $("#pgr").val(data.info[0].PGR);
        $("#pgr_lxdh").val(data.info[0].PGR_LXDH);
        $("#pgr_id_card").val(data.info[0].PGR_ID_CARD);
        $("#psqy").val(data.info[0].PSQY);
        $("#gmxhjsl").val(data.info[0].GMXHJSL);


    }

};