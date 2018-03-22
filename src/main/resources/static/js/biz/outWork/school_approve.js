$(function () {
    $("#xcjsr").bootstrapTable({
        dataType: "json",
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'XCJSR_NAME',
                    title: "姓名",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'TH_XCJSR_CARD',
                    title: '身份证号码',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'XCJSR_PHO',
                    title: '联系电话',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    school.init();

});


out.business = "/schoolApprove";

var school = {

    //表单初始化
    init: function () {
        //初始化数据
        out.initdata = school.initdata;
        out.init();
    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        //用来选择单选项
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");
        var hpzl = "input[name='hpzl'][value='" + data.info[0].HPZL + "']";
        $(hpzl).attr("checked", "true");
        var ywzl = "input[name='ywzl'][value='" + data.info[0].YWZL + "']";
        $(ywzl).attr("checked", "true");
        var syxz = "input[name='syxz'][value='" + data.info[0].SYXZ + "']";
        $(syxz).attr("checked", "true");
        var sylb = "input[name='sylb'][value='" + data.info[0].SYLB + "']";
        $(sylb).attr("checked", "true");
        var xcwgbs = "input[name='xcwgbs'][value='" + data.info[0].XCWGBS + "']";
        $(xcwgbs).attr("checked", "true");
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
        $("#hphm").val(data.info[0].HPHM);
        $("#zcdjsj").val(data.info[0].ZCDJSJ);
        $("#persons").val(data.info[0].PERSONS);
        $("#childrens").val(data.info[0].CHILDRENS);
        $("#xcsyr").val(data.info[0].XCSYR);
        $("#fwxx").val(data.info[0].FWXX);
        $("#kxsj").val(data.info[0].KXSJ);
        $("#xslx").val(data.info[0].XSLX);
        $("#tkzd").val(data.info[0].TKZD);
        if (data.tb != null) {
            //将校车驾驶人姓名表通过bootstrap直接显示在页面上
            $("#xcjsr").bootstrapTable('load', data.tb);
        }


    }

};