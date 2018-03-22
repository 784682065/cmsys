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
    $("#brjl").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'GRJL_QSNY',
                    title: '起始年月',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'GRJL_ZZNY',
                    title: '终止年月',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'GRJL_GZJL',
                    title: '在何地何部门工作（学习）、任何职',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'GRJL_ZMR',
                    title: '证明人',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    //初始化
    secBranch.init();

});


out.business = '/secBranch';

var secBranch = {

    //表单初始化
    init: function () {
        //初始化数据
        out.initdata = secBranch.initdata;
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

        $("#gsdz").val(data.info[0].GSDZ);
        $("#zip_code1").val(data.info[0].ZIP_CODE);
        $("#education").val(data.info[0].EDUCATION);
        $("#fgs_zip_code").val(data.info[0].FGS_ZIP_CODE);
        $("#fgsdz").val(data.info[0].FGSDZ);
        $("#qfddbr").val(data.info[0].QFDDBR);
        $("#fddbr_legal_tel").val(data.info[0].FDDBR_LEGAL_TEL);
        $("#fddbr_legal_pho").val(data.info[0].FDDBR_LEGAL_PHO);
        $("#badjb_fgfzr").val(data.info[0].BADJB_FGFZR);
        $("#fgfzr_legal_tel").val(data.info[0].FGFZR_LEGAL_TEL);
        $("#fgfzr_legal_pho").val(data.info[0].FGFZR_LEGAL_PHO);
        $("#bayrs").val(data.info[0].BAYRS);

        $("#fzr_name").val(data.info[0].FZR_NAME);

        if ("01"== data.info[0].FZR_GENDER) {
            $("#fzr_gender").val("男");
        }else if ("02"== data.info[0].FZR_GENDER){
            $("#fzr_gender").val("女");
        }
        $("#fzr_birth").val(data.info[0].FZR_BIRTH);
        $("#fzr_gjdq").val(data.info[0].FZR_GJDQ);
        $("#native").val(data.info[0].NATIVE);
        $("#whcd").val(data.info[0].WHCD);
        $("#nation").val(data.info[0].NATION);
        $("#zzmm").val(data.info[0].ZZMM);
        $("#jszc").val(data.info[0].JSZC);
        $("#zip_code").val(data.info[0].DWFZR_ZIP_CODE);
        $("#dwmc").val(data.info[0].DWMC);
        if ("01"== data.info[0].DRHZW) {
            $("#drhzw").val("法定代表人");
        }else if ("02"== data.info[0].DRHZW){
            $("#drhzw").val("主要负责人");
        }else if ("03" == data.info[0].DRHZW){
            $("#drhzw").val("分管负责人");
        }else if ("04" == data.info[0].DRHZW){
            $("#drhzw").val("分公司负责人");
        }else if ("05" == data.info[0].DRHZW){
            $("#drhzw").val("总经理");
        }else if ("06" == data.info[0].DRHZW){
            $("#drhzw").val("副总经理");
        }else {
            $("#drhzw").val("其他职务");
        }
        $("#dwfzr_id_card").val(data.info[0].DWFZR_ID_CARD);
        $("#legal_tel").val(data.info[0].LEGAL_TEL);
        $("#legal_pho").val(data.info[0].LEGAL_PHO);
        $("#hjdz").val(data.info[0].HJDZ);
        $("#xzdz").val(data.info[0].XZXZ);
        $("#remark").val(data.info[0].REMARK);
        if (data.tb != null) {
            //将个人简历表通过bootstrap直接显示在页面上
            $("#brjl").bootstrapTable('load', data.tb);
        }


    }

};