$(function () {
    $("#bpzyry").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        columns: [
            [
                {
                    field: 'AutoTable#bpzyry#zl',
                    title: '种类',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'AutoTable#bpzyry#name',
                    title: '姓名',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'AutoTable#bpzyry#xkzbh',
                    title: '许可证编号',
                    valign: "middle",
                    align: "center"
                },
                {
                    field: 'AutoTable#bpzyry#idcard',
                    title: '公民身份号码',
                    valign: "middle",
                    align: "center"
                }
            ]
        ]
    });
    blastingPerson.init();
});

out.business = "/blastingPerson";

var blastingPerson = {

    init: function () {
        out.initdata = blastingPerson.initdata;
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
        $("#sbr").val(data.mainInfo.SBR);
        $("#sbr_idcard").val(data.mainInfo.SBR_IDCARD);
        $("#lxr_name").val(data.mainInfo.LXR_NAME);
        $("#lxr_pho").val(data.mainInfo.LXR_PHO);
        $("#lxr_idcard").val(data.mainInfo.LXR_IDCARD);
        $("#lxr_tel").val(data.mainInfo.LXR_TEL);
        $("#txdz").val(data.mainInfo.TXDZ);

        //申报类别的radio赋值
        var sqlb = "input[name='sqlb'][value='" + data.mainInfo.SQLB + "']";
        //作业类别的radio赋值
        var zylb = "input[name='zylb'][value='" + data.mainInfo.ZYLB + "']";
        //技术人员的radio赋值
        // var jsry = "input[name='jsry'][value='" + data.mainInfo.JSRY + "']";

        $(sqlb).attr("checked", "true");
        $(zylb).attr("checked", "true");
        // $(jsry).attr("checked", "true");
        if ("01"== data.mainInfo.GENDER) {
            $("#gender").val("男");
        }else if ("02"== data.mainInfo.GENDER){
            $("#gender").val("女");
        }

        $("#nationality").val(data.mainInfo.NATIONALITY);
        $("#birth_date").val(data.mainInfo.BIRTH_DATE);
        $("#education").val(data.mainInfo.EDUCATION);
        $("#specialty").val(data.mainInfo.SPECIALTY);
        $("#jszc").val(data.mainInfo.JSZC);
        $("#gzdw").val(data.mainInfo.GZDW);
        $("#address").val(data.mainInfo.ADDRESS);
        $("#ccjzsj").val(data.mainInfo.CCJZSJ);
        $("#csbpgzdjl").val(data.mainInfo.CSBPGZDJL);
    }
};