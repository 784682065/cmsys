$(function () {
    school.init();
});


out.business = '/school';

var school = {
    //表单初始化
    init: function () {
        out.initdata = school.initdata;
        out.init();

    },

    //流转过程，页面初始化带出申请数据
    initdata: function (data) {
        //基础信息初始化
        var sbz = "input[name='sbz'][value='" + data.info[0].SBZ + "']";
        var sfkd = "input[name='sfkd'][value='" + data.info[0].SFKD + "']";
        $(sbz).attr("checked", "true");
        $(sfkd).attr("checked", "true");

        $('#xmdm').val(data.info[0].XMDM);
        $('#sbsl').val(data.info[0].SBSL);
        $('#sbxmmc').val(data.info[0].SBXMMC);
        $('#sbdw').val(data.info[0].SBDW);
        $('#typeInfo').val(data.info[0].TYPEINFO);
        $('#fddbr').val(data.info[0].FDDBR);
        $('#lxr_name').val(data.info[0].LXR_NAME);
        $('#lxr_pho').val(data.info[0].LXR_PHO);
        $('#lxr_idcard').val(data.info[0].LXR_IDCARD);
        $('#lxr_tel').val(data.info[0].LXR_TEL);
        $('#txdz').val(data.info[0].TXDZ);
        $('#lxr_tel').val(data.info[0].LXR_TEL);
        $('#txdz').val(data.info[0].TXDZ);

        //业务信息初始化
        if ("01"== data.info[0].GENDER) {
            $("#gender").val("男");
        }else if ("02"== data.info[0].GENDER){
            $("#gender").val("女");
        }
        $('#birth_date').val(data.info[0].BIRTH_DATE);
        $('#native').val(data.info[0].SNATIVE);
        $('#address').val(data.info[0].ADDRESS);
        $('#lxdz').val(data.info[0].LXDZ);
        $('#zip_code').val(data.info[0].ZIP_CODE);
        $('#email').val(data.info[0].EMAIL);
        $('#dabh').val(data.info[0].DABH);

        $('#zjcx').val(data.info[0].ZJCX);
        $('#qsrq').val(data.info[0].QSRQ);
        $('#jzrq').val(data.info[0].JZRQ);
        $('#cclzrq').val(data.info[0].CCLZRQ);

        //根据业务种类的值来判断初始化(申请校车驾驶资格或者住校驾驶资格)
        debugger;
        if ('01' == data.info[0].YWZL) {
            $('#ywzl1').attr('checked', true);
            $('#sqzjcx').val(data.info[0].SQZJCX);
        } else {
            $('#ywzl2').attr('checked', true);
            $('#zxsq').val(data.info[0].ZXSQ);
            var checks = data.info[0].ZXSQ;
            var opinions = checks.split(',');
            var check;
            for (var i = 0; i < opinions.length; i++) {
                check = "input[name='zxsq'][value='" + opinions[i] + "']";
                $(check).attr('checked', 'true');
            }
        }

    }

};