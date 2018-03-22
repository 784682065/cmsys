$(function () {
    $("#jtzycyjk").bootstrapTable({
        dataType: "json",
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'CW',
                    title: "称谓",
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'XM',
                    title: '姓名',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'CSNY',
                    title: '出生年月',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'ZY',
                    title: '职业',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'IDCARD',
                    title: '身份证号码',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    joint.init();

});

out.business = '/joint';

var joint = {

    init: function () {
        out.initdata = joint.initdata;
        out.init();
    },
    initdata: function (data) {

        var sbz = "input[name='sbz'][value='" + data.mainInfo.SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.mainInfo.SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $("#xmdm").val(data.mainInfo.XMDM);
        $("#sbsl").val(data.mainInfo.SBSL);
        $("#sbr").val(data.mainInfo.SBR);
        $("#sbr_idcard").val(data.mainInfo.SBR_IDCARD);
        $("#lxr_name").val(data.mainInfo.LXR_NAME);
        $("#lxr_pho").val(data.mainInfo.LXR_PHO);
        $("#lxr_idcard").val(data.mainInfo.LXR_IDCARD);
        $("#lxr_tel").val(data.mainInfo.LXR_TEL);
        $("#txdz").val(data.mainInfo.TXDZ);

        //预留寸照字段，按具体需求来存取数据
        // $("#ycz").val(data.mainInfo.YCZ);
        if ("01"== data.mainInfo.GENDER) {
            $("#gender").val("男");
        }else if ("02"== data.mainInfo.GENDER){
            $("#gender").val("女");
        }
        $("#birthplace").val(data.mainInfo.BIRTHPLACE);
        $("#nation").val(data.mainInfo.NATION);
        $("#whcd").val(data.mainInfo.WHCD);
        $("#zzmm").val(data.mainInfo.ZZMM);
        $("#czhkdz").val(data.mainInfo.CZHKDZ);
        $("#zzdz").val(data.mainInfo.ZZDZ);
        $("#zzzh").val(data.mainInfo.ZZZH);
        $("#fwcb").val(data.mainInfo.FWCB);
        $("#cszw").val(data.mainInfo.CSZW);
        $("#jtzycyjk").val(data.mainInfo.JTZYCYJK);
        $("#remark").val(data.mainInfo.REMARK);
        $("#xmdm").val(data.mainInfo.XMDM);

        if (data.tbInfo != null) {
            $("#jtzycyjk").bootstrapTable('load', data.tbInfo);
        }
    }

};