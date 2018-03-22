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
    huntGun.init();

});

out.business = '/huntGun';

var huntGun = {

    //将需要覆盖的方法全部覆盖
    init: function () {
        //初始化数据
        out.initdata = huntGun.initdata;
        out.init();
    },

    //表单初始化
    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");
        $("#xmdm").val(data.info[0].XMDM);
        $("#sbsl").val(data.info[0].SBSL);
        $("#sbr").val(data.info[0].SBR);
        $("#sbr_idcard").val(data.info[0].SBR_IDCARD);
        $('#sbxmmc').val(data.info[0].SBXMMC);
        $('#sbdw').val(data.info[0].SBDW);
        $('#typeInfo').val(data.info[0].TYPEINFO);
        $('#fddbr').val(data.info[0].FDDBR);
        $('#lxr_name').val(data.info[0].LXR_NAME);
        $('#lxr_pho').val(data.info[0].LXR_PHO);
        $("#lxr_idcard").val(data.info[0].LXR_IDCARD);
        $("#lxr_tel").val(data.info[0].LXR_TEL);
        $("#txdz").val(data.info[0].TXDZ);

        if ("01"== data.info[0].GENDER) {
            $("#gender").val("男");
        }else if ("02"== data.info[0].GENDER){
            $("#gender").val("女");
        }
        $("#age").val(data.info[0].AGE);
        $("#nationality").val(data.info[0].NATIONALITY);
        $("#native_place").val(data.info[0].NATIVE_PLACE);
        $("#szxzc").val(data.info[0].SZXZC);
        $("#szslc").val(data.info[0].SZSLC);
        $("#jkzk").val(data.info[0].JKZK);
        $("#ywjsbs").val(data.info[0].YWJSBS);
        $("#qzzl").val(data.info[0].QZZL);
        $("#qzmh").val(data.info[0].QZHM);
        $("#qzkj").val(data.info[0].QZKJ);
        $("#qzly").val(data.info[0].QZLY);
    }

};