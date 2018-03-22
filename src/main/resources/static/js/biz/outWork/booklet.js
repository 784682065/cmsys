$(function () {
    $("#cszysb").bootstrapTable({
        dataType: "json",
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'SB_NAME',
                    title: '名称',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'SB_NUM',
                    title: '数量',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'SB_TYPE',
                    title: '品牌',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'SB_MODLE',
                    title: '型号',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'SB_MARK',
                    title: '备注',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    $("#cyjbqk").bootstrapTable({
        dataType: "json",
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'QK_NAME',
                    title: '姓名',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'QK_GENDER',
                    title: '性别',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'QK_BIRTH',
                    title: '出生年月',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'QK_CYZH',
                    title: '船员证号',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'QK_CSZW',
                    title: '船上职务',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'QK_HSSC',
                    title: '何时上船',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'QK_HSLC',
                    title: '何时离船',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    booklet.init();
});


out.business = "/booklet";

var booklet = {

    init: function () {
        out.initdata = booklet.initdata;
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


        //出海船舶信息
        $("#boat_name").val(data.mainInfo.BOAT_NAME);
        $("#boat_park").val(data.mainInfo.BOAT_PARK);
        $("#boat_nature").val(data.mainInfo.BOAT_NATURE);
        $("#boat_use").val(data.mainInfo.BOAT_USE);
        $("#boat_texture").val(data.mainInfo.BOAT_TEXTURE);
        $("#boat_weight").val(data.mainInfo.BOAT_WEIGHT);
        $("#ctgk").val(data.mainInfo.CTGK);
        $("#horsepower").val(data.mainInfo.HORSEPOWER);
        $("#speed").val(data.mainInfo.SPEED);
        $("#edcy").val(data.mainInfo.EDCY);
        $("#jzsj").val(data.mainInfo.JZSJ);
        $("#fssb").val(data.mainInfo.FSSB);
        $("#cbly").val(data.mainInfo.CBLY);
        $("#czdtbd").val(data.mainInfo.CZDTBD);
        $("#hszyq").val(data.mainInfo.HSZYQ);
        $("#czhssdw").val(data.mainInfo.CZHSSDW);
        $("#cbfzr").val(data.mainInfo.CBFZR);
        $("#czhssdw_add").val(data.mainInfo.CZHSSDW_ADD);
        $("#cbhxbbh").val(data.mainInfo.CBHXBBH);
        $("#cbjyzsbh").val(data.mainInfo.CBJYZSBH);
        $("#remark").val(data.mainInfo.REMARK);
        //船上主要设备
        if (data.tbSbInfo != null) {
            $("#cszysb").bootstrapTable('load', data.tbSbInfo);
        }

        //船员基本情况
        if (data.tbQkInfo != null) {
            $("#cyjbqk").bootstrapTable('load', data.tbQkInfo);
        }

    }
};


