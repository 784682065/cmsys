$(function () {
    huntGround.init();
});


out.business = "/huntGround";

var huntGround = {

    init: function () {
        out.initdata = huntGround.initdata;

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

        $("#slc_address").val(data.mainInfo.SLC_ADDRESS);
        $("#qzglfzr").val(data.mainInfo.QZGLFZR);
        $("#qzglfzr_lxdh").val(data.mainInfo.QZGLFZR_LXDH);
        $("#bwjgfzr").val(data.mainInfo.BWJGFZR);
        $("#bwrysl").val(data.mainInfo.BWRYSL);
        $("#pqyt_sysmqy").val(data.mainInfo.PQYT_SYSMQY);
        $("#zl_sl_xh").val(data.mainInfo.ZL_SL_XH);
    }
};