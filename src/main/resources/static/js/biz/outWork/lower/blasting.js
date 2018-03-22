$(function () {
    $("#bpzyry").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'P_TYPE',
                    title: '种类',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'P_NAME',
                    title: '姓名',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'P_NUM',
                    title: '许可证编号',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'P_IDCARD',
                    title: '公民身份号码',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });

    $("#warehouseInfo").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        data: [],
        columns: [
            [
                {
                    field: 'W_NUM',
                    title: '仓库编号',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'W_TYPE',
                    title: '储存品种',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'W_STORE',
                    title: '核定储存量',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    blasting.init();
});

out.business = "/blasting";

var blasting = {

    init: function () {
        out.initdata = blasting.initdata;

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

        $("#company_name").val(data.mainInfo.COMPANY_NAME);
        $("#company_add").val(data.mainInfo.COMPANY_ADD);
        $("#operation_place").val(data.mainInfo.OPERATION_PLACE);
        $("#legal_idcard").val(data.mainInfo.LEGAL_IDCARD);
        $("#legal_tel").val(data.mainInfo.LEGAL_TEL);
        $("#technology_lman").val(data.mainInfo.TECHNOLOGY_LMAN);
        $("#technology_idcard").val(data.mainInfo.TECHNOLOGY_IDCARD);
        $("#technology_tel").val(data.mainInfo.TECHNOLOGY_TEL);
        $("#security_lman").val(data.mainInfo.SECURITY_LMAN);
        $("#security_idcard").val(data.mainInfo.SECURITY_IDCARD);
        $("#security_tel").val(data.mainInfo.SECURITY_TEL);
        $("#reg_capital").val(data.mainInfo.REG_CAPITAL);
        $("#bank_account").val(data.mainInfo.BANK_ACCOUNT);
        $("#mining_permit_id").val(data.mainInfo.MINING_PERMIT_ID);
        $("#mining_permit_val").val(data.mainInfo.MINING_PERMIT_VAL);
        $("#safety_permit_id").val(data.mainInfo.SAFETY_PERMIT_ID);
        $("#safety_permit_val").val(data.mainInfo.SAFETY_PERMIT_VAL);
        $("#coal_permit_id").val(data.mainInfo.COAL_PERMIT_ID);
        $("#coal_permit_val").val(data.mainInfo.COAL_PERMIT_VAL);
        $("#bus_license_id").val(data.mainInfo.BUS_LICENSE_ID);
        $("#bus_license_val").val(data.mainInfo.BUS_LICENSE_VAL);
        $("#orientation1").val(data.mainInfo.ORIENTATION1);
        $("#bbhdx1").val(data.mainInfo.BBHDX1);
        $("#hdaqjl1").val(data.mainInfo.HDAQJL1);
        $("#orientation2").val(data.mainInfo.ORIENTATION2);
        $("#bbhdx2").val(data.mainInfo.BBHDX2);
        $("#hdaqjl2").val(data.mainInfo.HDAQJL2);
        $("#orientation3").val(data.mainInfo.ORIENTATION3);
        $("#bbhdx3").val(data.mainInfo.BBHDX3);
        $("#hdaqjl3").val(data.mainInfo.HDAQJL3);
        $("#orientation4").val(data.mainInfo.ORIENTATION4);
        $("#bbhdx4").val(data.mainInfo.BBHDX4);
        $("#hdaqjl4").val(data.mainInfo.HDAQJL4);


        if (data.tbPInfo != null) {
            $("#bpzyry").bootstrapTable('load', data.tbPInfo);
        }
        if (data.tbWInfo != null) {
            $("#warehouseInfo").bootstrapTable('load', data.tbWInfo);
        }


    },

    getInfo: function () {

    },

    lock: function () {

    }
}