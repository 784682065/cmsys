$(function () {
    $("#cybgjl").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'CYBGXM',
                    title: "查验变更项目",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'CYBGNR',
                    title: '查验、变更内容',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'ZZDJ',
                    title: '资质等级',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    $("#cfdj").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'CFNR',
                    title: "处罚内容",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'CFYY',
                    title: '处罚原因',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'REMARK',
                    title: '备注',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    moreFirearms.init();
});

out.business = '/moreFirearms';

var moreFirearms = {

    //表单初始化
    init: function () {

        //初始化数据
        out.initdata = moreFirearms.initdata;
        out.init();
    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {


        //如果p_sbz不为null则为个人,带出个人页面数据
        if (data.personInfo.P_SBZ != null) {

            //是否快递与申报者
            var sbz = "input[name='p_sbz'][value='" + data.personInfo.P_SBZ + "']";
            var sfkd = "input[name='p_sfkd'][value='" + data.personInfo.P_SFKD + "']";
            $(sbz).attr("checked", "true");
            $(sfkd).attr("checked", "true");

            $("#p_xmdm").val(data.personInfo.P_XMDM);
            $("#p_sbsl").val(data.personInfo.P_SBSL);
            $("#sbr").val(data.personInfo.SBR);
            $("#sbr_idcard").val(data.personInfo.SBR_IDCARD);
            $("#p_lxr_name").val(data.personInfo.P_LXR_NAME);
            $("#p_lxr_pho").val(data.personInfo.P_LXR_PHO);
            $("#p_lxr_idcard").val(data.personInfo.P_LXR_IDCARD);
            $("#p_lxr_tel").val(data.personInfo.P_LXR_TEL);
            $("#p_txdz").val(data.personInfo.P_TXDZ);
            $("#former_name").val(data.personInfo.FORMER_NAME);
            $("#gender").val(data.personInfo.GENDER);
            $("#native_place").val(data.personInfo.NATIVE_PLACE);
            $("#nationality").val(data.personInfo.NATIONALITY);
            $("#csrq").val(data.personInfo.CSRQ);
            $("#whcd").val(data.personInfo.WHCD);


            $("#guns_kinds").val(data.personInfo.GUNS_KINDS);
            $("#guns_type").val(data.personInfo.GUNS_TYPE);
            $("#guns_num").val(data.personInfo.GUNS_NUM);
            $("#sccj").val(data.personInfo.SCCJ);
            $("#gmsj").val(data.personInfo.GMSJ);
            $("#pzdgajg").val(data.personInfo.PZDGAJG);

        } else {
            //p_sbz为null则进入单位页面初始化
            var sbz = "input[name='d_sbz'][value='" + data.deptInfo.D_SBZ + "']";
            var sfkd = "input[name='d_sfkd'][value='" + data.deptInfo.D_SFKD + "']";
            $(sbz).attr("checked", "true");
            $(sfkd).attr("checked", "true");
            $("#d_xmdm").val(data.deptInfo.D_XMDM);
            $("#d_sbsl").val(data.deptInfo.D_SBSL);
            $("#sbxmmc").val(data.deptInfo.SBXMMC);
            $("#sbdw").val(data.deptInfo.SBDW);
            $("#typeinfo").val(data.deptInfo.TYPEINFO);
            $("#fddbr").val(data.deptInfo.FDDBR);
            $("#d_lxr_name").val(data.deptInfo.D_LXR_NAME);
            $("#d_lxr_pho").val(data.deptInfo.D_LXR_PHO);
            $("#d_lxr_idcard").val(data.deptInfo.D_LXR_IDCARD);
            $("#d_lxr_tel").val(data.deptInfo.D_LXR_TEL);
            $("#d_txdz").val(data.deptInfo.D_TXDZ);
            $("#dwlb").val(data.deptInfo.DWLB);
            $("#fddbr_name").val(data.deptInfo.FDDBR_NAME);
            $("#dwdz").val(data.deptInfo.DWDZ);
            $("#qzglfzr").val(data.deptInfo.QZGLFZR);
            $("#dwsq_yyjytsm").val(data.deptInfo.DWSQ_YYJYTSM);

            $("#guns_kinds").val(data.deptInfo.GUNS_KINDS);
            $("#guns_type").val(data.deptInfo.GUNS_TYPE);
            $("#guns_num").val(data.deptInfo.GUNS_NUM);
            $("#sccj").val(data.deptInfo.SCCJ);
            $("#gmsj").val(data.deptInfo.GMSJ);
            $("#pzdgajg").val(data.deptInfo.PZDGAJG);
        }


        //初始化查验出查副表
        if (data.tbInfo != null) {
            $("#cybgjl").bootstrapTable('load', data.tbInfo);
        }

        //初始化处罚副表
        if (data.tbInfo1 != null) {
            $("#cfdj").bootstrapTable('load', data.tbInfo1);
        }
    }


};