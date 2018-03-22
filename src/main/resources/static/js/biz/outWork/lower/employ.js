$(function () {
    $("#brjl").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'QSNY',
                    title: '起始年月',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'JZNY',
                    title: '终止年月',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'XXGZJL',
                    title: '在何地何部门工作（学习）、任何职',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'ZMR',
                    title: '证明人',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });

    employ.init();
});

out.business = "/employ";

var employ = {

    init: function () {
        out.initdata = employ.initdata;

        out.init();

    },

    saveData: function () {

    },

    initdata: function (data) {

        var sbz = "input[name='sbz'][value='" + data.mainInfo.SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.mainInfo.SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#deptname").html(data.mainInfo.DEPTNAME);

        $("#xmdm").val(data.mainInfo.XMDM);
        $("#sbsl").val(data.mainInfo.SBSL);
        $("#sbxmmc").val(data.mainInfo.SBXMMC);
        $("#sbdw").val(data.mainInfo.SBDW);
        $("#typeInfo").val(data.mainInfo.TYPEINFO);
        $("#fddbr").val(data.mainInfo.FDDBR);
        $("#lxr_name").val(data.mainInfo.LXR_NAME);
        $("#lxr_pho").val(data.mainInfo.LXR_PHO);
        $("#lxr_idcard").val(data.mainInfo.LXR_IDCARD);
        $("#lxr_tel").val(data.mainInfo.LXR_TEL);
        $("#txdz").val(data.mainInfo.TXDZ);

        $("#xxdz").val(data.mainInfo.XXDZ);
        $("#badjb_zip_code").val(data.mainInfo.BADJB_ZIP_CODE);
        $("#prefecture").val(data.mainInfo.PREFECTURE);
        $("#pcs").val(data.mainInfo.PCS);
        $("#jwh").val(data.mainInfo.JWH);
        $("#fddbr_legal_tel").val(data.mainInfo.FDDBR_LEGAL_TEL);
        $("#fddbr_fddbr_pho").val(data.mainInfo.FDDBR_FDDBR_PHO);
        $("#badjb_fgfzr").val(data.mainInfo.BADJB_FGFZR);
        $("#fgfzr_legal_tel").val(data.mainInfo.FGFZR_LEGAL_TEL);
        $("#bayrs").val(data.mainInfo.BAYRS);

        if ("01"== data.mainInfo.DWLX) {
            $("#dwlx").val("机关");
        }else if ("02"== data.mainInfo.DWLX){
            $("#dwlx").val("团体");
        }else if ("03" == data.mainInfo.DWLX){
            $("#dwlx").val("企业");
        }else if ("04" == data.mainInfo.DWLX){
            $("#dwlx").val("事业");
        }else if ("05" == data.mainInfo.DWLX){
            $("#dwlx").val("物业");
        }else {
            $("#drhzw").val("其他职务");
        }

        $("#badjb_legal_pho").val(data.mainInfo.BADJB_LEGAL_PHO);
        $("#fzr_name").val(data.mainInfo.NAME);
        if ("01"== data.mainInfo.GENDER) {
            $("#fzr_gender").val("男");
        }else if ("02"== data.mainInfo.GENDER){
            $("#fzr_gender").val("女");
        }

        $("#fzr_birth").val(data.mainInfo.BIRTH_DATE);
        $("#fzr_gjdq").val(data.mainInfo.GJDQ);
        $("#native").val(data.mainInfo.NATIVE);
        $("#whcd").val(data.mainInfo.WHCD);
        $("#nation").val(data.mainInfo.NATION);
        $("#zzmm").val(data.mainInfo.ZZMM);
        $("#jszc").val(data.mainInfo.JSZC);
        $("#zip_code").val(data.mainInfo.ZIP_CODE);
        $("#dwmc").val(data.mainInfo.DWMC);
        $("#drhzw").val(data.mainInfo.DRHZW);
        if ("01"== data.mainInfo.DRHZW) {
            $("#drhzw").val("法定代表人");
        }else if ("02"== data.mainInfo.DRHZW){
            $("#drhzw").val("主要负责人");
        }else if ("03" == data.mainInfo.DRHZW){
            $("#drhzw").val("分管负责人");
        }else if ("04" == data.mainInfo.DRHZW){
            $("#drhzw").val("分公司负责人");
        }else if ("05" == data.mainInfo.DRHZW){
            $("#drhzw").val("总经理");
        }else if ("06" == data.mainInfo.DRHZW){
            $("#drhzw").val("副总经理");
        }else {
            $("#drhzw").val("其他职务");
        }
        $("#dwfzr_id_card").val(data.mainInfo.DWFZRJBQK_ID_CARD);
        $("#legal_tel").val(data.mainInfo.LEGAL_TEL);
        $("#legal_pho").val(data.mainInfo.LEGAL_PHO);
        $("#hjdz").val(data.mainInfo.HJDZ);
        $("#xzdz").val(data.mainInfo.XZDZ);
        $("#remark").val(data.mainInfo.REMARK);

        employ.tableCopy(data.baQkInfo.length);
        for (var i=0;i<data.baQkInfo.length; i++){
            var tableBox = $(".bayqk:eq("+ i +")");
            tableBox.find("#bayqk_name").val(data.baQkInfo[i].BAYQK_NAME);
            if ("01"== data.baQkInfo[i].GENDER) {
                tableBox.find("#gender").val("男");
            }else if ("02"== data.baQkInfo[i].GENDER){
                tableBox.find("#gender").val("女");
            }
            tableBox.find("#bayqk_zzmm").val(data.baQkInfo[i].BAYQK_ZZMM);
            tableBox.find("#bayqk_gjdq").val(data.baQkInfo[i].BAYQK_GJDQ);
            tableBox.find("#bayqk_cym").val(data.baQkInfo[i].BAYQK_CYM);
            tableBox.find("#bayqk_mingz").val(data.baQkInfo[i].BAYQK_MINGZ);
            tableBox.find("#bayqk_hyzk").val(data.baQkInfo[i].BAYQK_HYZK);
            tableBox.find("#bayqk_bmch").val(data.baQkInfo[i].BAYQK_BMCH);
            tableBox.find("#bayqk_byzk").val(data.baQkInfo[i].BAYQK_BYZK);
            tableBox.find("#bayqk_csrq").val(data.baQkInfo[i].BAYQK_CSRQ);
            tableBox.find("#bayqk_jkzk").val(data.baQkInfo[i].BAYQK_JKZK);
            tableBox.find("#bayqk_whcd").val(data.baQkInfo[i].BAYQK_WHCD);
            tableBox.find("#bayqk_height").val(data.baQkInfo[i].BAYQK_HEIGHT);
            tableBox.find("#bayqk_blood").val(data.baQkInfo[i].BAYQK_BLOOD);
            tableBox.find("#bayqk_lxdh").val(data.baQkInfo[i].LXDH);
            tableBox.find("#bayqk_id_card").val(data.baQkInfo[i].ID_CARD);
            tableBox.find("#jg").val(data.baQkInfo[i].JG);
            tableBox.find("#hjdxz").val(data.baQkInfo[i].HJDXZ);
            tableBox.find("#xzdxz").val(data.baQkInfo[i].XZDXZ);
            tableBox.find("#xzdxq_area").val(data.baQkInfo[i].XZDXQ);
            tableBox.find("#xzdxq_pcs").val(data.baQkInfo[i].XZDXQ_PCS);
            tableBox.find("#xzdxq_jwh").val(data.baQkInfo[i].XZDXQ_JWH);
            tableBox.find("#bayqk_gzbm").val(data.baQkInfo[i].GZBM);
            tableBox.find("#bayqk_baygw").val(data.baQkInfo[i].BAYGW);
            tableBox.find("#bayqk_rzrq").val(data.baQkInfo[i].RZRQ);
            tableBox.find("#bayqk_lzrq").val(data.baQkInfo[i].LZRQ);
            tableBox.find("#bayqk_lzyy").val(data.baQkInfo[i].LZYY);
            tableBox.find("#bayqk_jzzh").val(data.baQkInfo[i].JZZH);
            if ("01"== data.baQkInfo[i].SFQDLDHT) {
                tableBox.find("#sfqdldht").val("是");
            }else if ("02"== data.baQkInfo[i].SFQDLDHT){
                tableBox.find("#sfqdldht").val("否");
            }
            if ("01"== data.baQkInfo[i].SFCJSB) {
                tableBox.find("#sfcjsb").val("是");
            }else if ("02"== data.baQkInfo[i].SFCJSB){
                tableBox.find("#sfcjsb").val("否");
            }

            tableBox.find("#bayqk_bayzbh").val(data.baQkInfo[i].BAYZBH);
            tableBox.find("#bayz_fzjg").val(data.baQkInfo[i].FZJG1);
            tableBox.find("#bayz_fzrq").val(data.baQkInfo[i].FZRQ1);

            tableBox.find("#bayqk_baydjks").val(data.baQkInfo[i].BAYDJKS);
            tableBox.find("#zydj_fzjg").val(data.baQkInfo[i].FZJG);
            tableBox.find("#zydj_fzrq").val(data.baQkInfo[i].FZRQ2);

            tableBox.find("#bayqk_jszh").val(data.baQkInfo[i].JSZH);
            tableBox.find("#zydj_zjcx").val(data.baQkInfo[i].ZJCX);
            tableBox.find("#jsz_fzrq").val(data.baQkInfo[i].FZRQ3);

            tableBox.find("#bayqk_cqzh").val(data.baQkInfo[i].CQZH);
            tableBox.find("#zydj_qx").val(data.baQkInfo[i].QX);
            tableBox.find("#cqz_fzrq").val(data.baQkInfo[i].FZRQ);
            tableBox.find("#zydj_yxqx").val(data.baQkInfo[i].YXQX);
            tableBox.find("#zydj_cqzfzjg").val(data.baQkInfo[i].CQZFZJG);
            tableBox.find("#zydj_baybh").val(data.baQkInfo[i].BAYBH);
            tableBox.find("#zydj_rylx").val(data.baQkInfo[i].RYLX);
            tableBox.find("#zydj_gsbh").val(data.baQkInfo[i].GSBH);
            tableBox.find("#zydj_gsmc").val(data.baQkInfo[i].GSMC);
        }

        if (data.tbRInfo != null) {
            $("#brjl").bootstrapTable('load', data.tbRInfo);
        }
    },

    getInfo: function () {

    },

    lock: function () {

    },

    tableCopy: function (autoRowNum) {
        debugger;
        var html = $(".bayqk").clone();
        for (var i = 1; i < autoRowNum; i++) {
            $(".table-box")
                .append('<div class="hr-line-dashed"></div>')
                .append(html);
        }
    }
};