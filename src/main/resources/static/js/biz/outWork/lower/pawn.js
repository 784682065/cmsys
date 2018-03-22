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
    pawn.init();

});

out.business = '/pawn';

var pawn = {

    //将需要覆盖的方法全部覆盖
    init: function () {
        out.initdata = pawn.initdata;
        out.init();
    },

    //表单初始化
    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#deptname").html(data.info[0].DEPTNAME);

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

        $("#ksdz").val(data.info[0].KSDZ);
        $("#legal_tel").val(data.info[0].LEGAL_TEL);
        $("#id_card").val(data.info[0].ID_CARD);
        $("#jjxz").val(data.info[0].JJXZ);
        $("#zgzs").val(data.info[0].ZGZS);
        $("#zgbm").val(data.info[0].ZGBM);
        $("#aqbwrs").val(data.info[0].AQBWRS);
        $("#abjgfzr").val(data.info[0].ABJGFZR);
        $("#ab_lxdh").val(data.info[0].AB_LXDH);
        $("#jyfw").val(data.info[0].JYFW);

        $("#fwjgaqss").val(data.info[0].FWJGAQSS);
        $("#zczj").val(data.info[0].ZCZJ);
        $("#qzgdzj").val(data.info[0].QZGDZJ);
        $("#ldzj").val(data.info[0].LDZJ);
        $("#shareholder").val(data.info[0].SHAREHOLDER);
        $("#glyrs").val(data.info[0].GLYRS);
        $("#ywrs").val(data.info[0].YWRS);
        $("#jymj").val(data.info[0].JYMJ);
        $("#other").val(data.info[0].OTHER);
    }
};