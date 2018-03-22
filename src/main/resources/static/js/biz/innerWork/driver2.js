/**
 * 车驾管业务
 */
$(function () {
    driver.init();

    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, fields: {
            applyName: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
                }
            },
            tel: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '手机号不能为空'
                    },
                    regexp:{
                        regexp: /^1\d{10}$/,
                        message: '请输入正确的手机号码'
                    }
                }
            },
            idCard: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '身份证号码不能为空'
                    },
                    regexp: {
                        regexp: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
                        message: '身份证号码格式不正确'
                    }
                }
            },
            items: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '申请事项不能为空'
                    }
                }
            },
            reasons: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '申请理由不能为空'
                    }
                }
            }
        }
    });
});

serviceOA.business = "/driver2";

var driver = {

    data: {},
    //过于存放表单数据 根据自己业务自定义
    //设置data数据
    set: function (key, val) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    },
    init: function () {
        //控件锁定
        serviceOA.initdata = driver.initdata;
        serviceOA.getInfo = driver.getInfo;
        serviceOA.checkData = driver.checkData;
        serviceOA.saveData = driver.saveData;
        serviceOA.lock = driver.lock;
        //判断该流程是否已经发起
        serviceOA.initTask();

    },
    initdata: function (data) {

        $("#applyName").val(data.APPLYNAME);
        $("#businessId").val(data.BUSINESSID);
        $("#idCard").val(data.IDCARD);
        $("#items").val(data.ITEMS);
        $("#tel").val(data.TEL);
        $("#reasons").val(data.REASONS);
        $("#unitOpinion").val(data.UNITOPINION);
    },


    getInfo: function (data) {
        $("#applyName").val(data.name);
        $("#idCard").val(data.id);
        $("#applyName").attr("disabled", "disabled");
        $("#idCard").attr("disabled", "disabled");
    },

    saveData: function () {
        var name = $("#applyName").val();
        var mobile = $("#tel").val();
        var idCard = $("#idCard").val();
        var item = $("#items").val();
        var reason = $("#reasons").val();

        serviceOA.business_data = {
            applyName: name,
            tel: mobile,
            idCard: idCard,
            items: item,
            reasons: reason,
            business: $('#business').val()
        };
    },


    lock: function () {
        $(".row").find("input").attr("disabled", "disabled");
    },

    checkData: function () {

            if (driver.check()) return true;

        return false;

    }
    ,
    check: function () {
        if ($.trim($('#applyName').val()).length == 0) {
            toastr.warning("请填写申请人姓名", "友情提示!");
            return true;
        }
        var regex = /^1\d{10}$/;
        if (!regex.test($('#tel').val())) {
            toastr.warning("请输入正确的手机号码", "友情提示!");
            return true;
        }
        var regexp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        if (!regexp.test($('#idCard').val())) {
            toastr.warning("请输入正确的身份证号码", "友情提示!");
            return true;
        }
        if ($.trim($('#items').val()).length == 0) {
            toastr.warning("请填写申请事项", "友情提示!");
            return true;
        }
        if ($.trim($('#reasons').val()).length == 0) {
            toastr.warning("请填写申请理由", "友情提示");
            return true;
        }
    }


};






