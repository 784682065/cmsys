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
    secProvince.init();

});


out.business = '/secProvince';

var secProvince = {

    //表单初始化
    init: function () {

        //初始化数据
        out.initdata = secProvince.initdata;
        out.init();


    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {

        var sbz = "input[name='sbz'][value='" + data.info.SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info.SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#xmdm").val(data.info.XMDM);
        $("#sbsl").val(data.info.SBSL);
        $('#sbxmmc').val(data.info.SBXMMC);
        $('#sbdw').val(data.info.SBDW);
        $('#typeInfo').val(data.info.TYPEINFO);
        $('#fddbr').val(data.info.FDDBR);
        $('#lxr_name').val(data.info.LXR_NAME);
        $('#lxr_pho').val(data.info.LXR_PHO);
        $("#lxr_idcard").val(data.info.LXR_IDCARD);
        $("#lxr_tel").val(data.info.LXR_TEL);
        $("#txdz").val(data.info.TXDZ);

        debugger;
        secProvince.tableCopy(data.baQkInfo.length);
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

        $("#gsdz").val(data.info.GSDZ);
        $("#zip_code").val(data.info.ZIP_CODE);
        $("#fddbr_legal_tel").val(data.info.FDDBR_LEGAL_TEL);
        $("#fddbr_legal_pho").val(data.info.FDDBR_LEGAL_PHO);
        $("#fwdw").val(data.info.FWDW);
        $("#fwdxz").val(data.info.FWDXZ);
        $("#fwd_zip_code").val(data.info.FWD_ZIP_CODE);
        $("#fwxmfzr").val(data.info.FWXMFZR);
        $("#fwxmfzr_id_card").val(data.info.FWXMFZR_ID_CARD);
        $("#fwxmfzr_legal_tel").val(data.info.FWXMFZR_LEGAL_TEL);
        $("#fwxmfzr_legal_pho").val(data.info.FWXMFZR_LEGAL_PHO);
        $("#fwfw").val(data.info.FWFW);
        $("#fwdbars").val(data.info.FWDBARS);

        $("#bazzscyjs_gsdz").val(data.info.BAZZSCYJS_GSDZ);
        $("#bazzscyjs_zip_code").val(data.info.BAZZSCYJS_ZIP_CODE);
        $("#nsfgsmc").val(data.info.NSFGSMC);
        $("#nsfgsxz").val(data.info.NSFGSXZ);
        $("#fgs_zip_code").val(data.info.FGS_ZIP_CODE);
        $("#fddbr_tel").val(data.info.FDDBR_TEL);
        $("#fddbr_pho").val(data.info.FDDBR_PHO);
        $("#fgsfzr").val(data.info.FGSFZR);
        $("#fgsfzr_legal_tel").val(data.info.FGSFZR_LEGAL_TEL);
        $("#fgsfzr_legal_pho").val(data.info.FGSFZR_LEGAL_PHO);
        $("#reason").val(data.info.REASON);

        //设置主表的多选框(单位类型)
        var fwxms=[];//存放数据清洗后的数据
        var fwxmArray=data.info.FWXM.split(',');
        var fwxm="";
        for(var i=0,l=fwxmArray.length;i<l;i++){
            fwxm=fwxmArray[i].replace("[","").replace("]","").replace('"',"").replace('"',"");
            fwxms.push(fwxm);
        }
        var fwxmVal="";
        for(var j=0,m=fwxms.length;j<m;j++){
            fwxmVal="input[name='fwxm'][value='"+fwxms[j]+"']";
            $(fwxmVal).attr("checked",true);
        }
    },

    tableCopy: function (autoRowNum) {
        var html = $(".bayqk").clone();
        for (var i = 1; i < autoRowNum; i++) {
            $(".table-box")
                .append('<div class="hr-line-dashed"></div>')
                .append(html);
        }
    }

};