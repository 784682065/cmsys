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
    official.init();

});

out.business = '/official';

var official = {

    //将需要覆盖的方法全部覆盖
    init: function () {

        //初始化数据
        out.initdata = official.initdata;
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
        $("#whcd").val(data.info[0].WHCD);
        $("#aqbwrs").val(data.info[0].AQBWRS);
        $("#abjgfzr").val(data.info[0].ABJGFZR);
        $("#ab_lxdh").val(data.info[0].AB_LXDH);

        $("#jyfw").val(data.info[0].JYFW);
        $("#fwjgaqss").val(data.info[0].FWJGAQSS);
        $("#yzfzr").val(data.info[0].YZFZR);
        $("#gzbgr").val(data.info[0].GZBGR);
        $("#gzkzjsry").val(data.info[0].GZKZJSRY);
        $("#other").val(data.info[0].OTHER);
    }

};