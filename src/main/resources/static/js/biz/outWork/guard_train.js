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
                    field: 'GZJL',
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
    guardTrain.init();
});


out.business = "/guardTrain";

var guardTrain = {

    init: function () {
        out.initdata = guardTrain.initdata;
        out.init();

    },

    initdata: function (data) {

        //获取sbz与sfkd的数据库值,给页面的radio赋值
        var sbz = "input[name='sbz'][value='" + data.mainInfo.SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.mainInfo.SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

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

        //pxnr 的checkbox的赋值
        var pxnr = data.mainInfo.PXNR;
        var checkBoxArray = pxnr.split(",");
        for (var i = 0; i < checkBoxArray.length; i++) {
            $("input[name='pxnr']").each(function () {
                if ($(this).val() == checkBoxArray[i]) {
                    $(this).attr("checked", "true");
                }
            });
        }

        //担任任何职务的赋值
        var drhzw = "input[name='drhzw'][value='" + data.mainInfo.DRHZW + "']";
        $(drhzw).attr("checked", "true");


        $("#sqdw_address").val(data.mainInfo.SQDW_ADDRESS);
        $("#bapxdw_name").val(data.mainInfo.BAPXDW_NAME);
        $("#bapxdw_address").val(data.mainInfo.BAPXDW_ADDRESS);
        $("#slbapxdwsqb_zip_code").val(data.mainInfo.SLBAPXDWSQB_ZIP_CODE);
        $("#dwfzr_id_card").val(data.mainInfo.DWFZR_ID_CARD);
        $("#xz_tel").val(data.mainInfo.XZ_TEL);
        $("#xz_mobilephone").val(data.mainInfo.XZ_MOBILEPHONE);
        $("#fddbr1").val(data.mainInfo.FDDBR1);
        $("#fddbr_tel").val(data.mainInfo.FDDBR_TEL);
        $("#fddbr_mobilephone").val(data.mainInfo.FDDBR_MOBILEPHONE);
        $("#szrs").val(data.mainInfo.SZRS);
        $("#zzszrs").val(data.mainInfo.ZZSZRS);
        $("#xymj").val(data.mainInfo.XYMJ);
        $("#xsmj").val(data.mainInfo.XSMJ);
        $("#name1").val(data.mainInfo.NAME1);
        if ("01"== data.mainInfo.GANDER) {
            $("#gander").val("男");
        }else if ("02"== data.mainInfo.GANDER){
            $("#gander").val("女");
        }
        $("#birth_date").val(data.mainInfo.BIRTH_DATE);
        $("#gjdq").val(data.mainInfo.GJDQ);
        $("#native1").val(data.mainInfo.NATIVE1);
        $("#whcd").val(data.mainInfo.WHCD);
        $("#nation").val(data.mainInfo.NATION);
        $("#zzmm").val(data.mainInfo.ZZMM);
        $("#jszc").val(data.mainInfo.JSZC);
        $("#dwmc").val(data.mainInfo.DWMC);
        $("#zip_code").val(data.mainInfo.ZIP_CODE);
        $("#hjdz").val(data.mainInfo.HJDZ);
        $("#xzdz").val(data.mainInfo.XZDZ);
        $("#remark").val(data.mainInfo.REMARK);

        //本人简历副表的页面初始化
        if (data.tbInfo != null) {
            $("#brjl").bootstrapTable('load', data.tbInfo);
        }
    }
};