$(function () {
    $("#CV").bootstrapTable({
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
    secCompany.init();
});

out.business = '/secCompany';

var secCompany = {

    //表单初始化
    init: function () {
        //初始化数据
        out.initdata = secCompany.initdata;
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


        $("#bafwgs_address").val(data.info[0].BAFWGS_ADDRESS);
        $("#bafwgs_zip_code").val(data.info[0].BAFWGS_ZIP_CODE);
        $("#fddbr_tel").val(data.info[0].FDDBR_TEL);
        $("#fddbr_mobilephone").val(data.info[0].FDDBR_MOBILEPHONE);
        $("#zczb").val(data.info[0].ZCZB);
        $("#gdjcze").val(data.info[0].GDJCZE);
        //选择多选项
        var pxnr = data.info[0].PXNR;

        var checkBoxArray = pxnr.split(",");
        for (var i = 0; i < checkBoxArray.length; i++) {
            $("input[name='fwfw']").each(function () {
                if ($(this).val() == checkBoxArray[i]) {
                    $(this).attr("checked", "true");
                }
            });
        }

        $("#fzr_name").val(data.info[0].FZR_NAME);
        if ("01"== data.info[0].FZR_GENDER) {
            $("#fzr_gender").val("男");
        }else if ("02"== data.info[0].FZR_GENDER){
            $("#fzr_gender").val("女");
        }
        $("#fzr_birth").val(data.info[0].FZR_BIRTH);
        $("#fzr_gjdq").val(data.info[0].FZR_GJDQ);
        $("#fnative").val(data.info[0].FNATIVE);
        $("#whcd").val(data.info[0].WHCD);
        $("#mnation").val(data.info[0].MNATION);
        $("#zzmm").val(data.info[0].ZZMM);
        $("#jszc").val(data.info[0].JSZC);
        $("#zip_code").val(data.info[0].ZIP_CODE);
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
        $("#bayqk_byzk").val(data.info[0].BAYQK_BYZK);
        $("#legal_tel").val(data.info[0].LEGAL_TEL);
        $("#legal_pho").val(data.info[0].LEGAL_PHO);
        $("#hjdz").val(data.info[0].HJDZ);
        $("#xzdz").val(data.info[0].XZDZ);
        $("#remark").val(data.info[0].REMARK);


        if (data.tb != null) {
            $("#CV").bootstrapTable('load', data.tb);
        }


    }

};