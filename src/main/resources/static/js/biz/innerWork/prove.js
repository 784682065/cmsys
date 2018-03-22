/**
 * 民警出入境出具证明
 * @type {{idcard: string, idname: string, getData: prove.getData, checkData: prove.checkData}}
 */
$(function () {

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
            idCard: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '身份证号码不能为空'
                    },
                    regexp: {
                        regexp: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
                        message: '身份证号码不对'
                    }
                }
            }
        }
    });
    prove.init();

});

serviceOA.business = "/prove";


var prove = {

    //过于存放表单数据 根据自己业务自定义
    data: {},

    //设置data数据
    set: function (key, val) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    },

    //表单初始化
    init: function () {

        serviceOA.initdata = prove.initdata;
        serviceOA.getInfo = prove.getInfo;
        serviceOA.checkData = prove.checkData;
        serviceOA.lock = prove.lock;
        serviceOA.saveData = prove.saveData;
        //判断该流程是否已经发起
        serviceOA.initTask();

    },

    //调用表单保存方法
    saveData: function () {
        prove.set('applyName').set('idCard').set('business');
        serviceOA.business_data = prove.data;
    },

    initdata: function (data) {
        $('#applyName').val(data.businessData.APPLYNAME);
        $('#idCard').val(data.businessData.IDCARD);
    },

    getInfo: function (data) {
        $("#applyName").val(data.name);
        $("#idCard").val(data.account);
        $("#applyName").attr("disabled", "disabled");
        $("#idCard").attr("disabled", "disabled");
    },

    //业务表单控件锁定方法
    //自定义方法名称但须传递给serviceOA.lock
    lock: function () {
        //锁定控件 CSD
        $(".row").find("input").attr("disabled", "disabled");
    },


    checkData: function () {
        var p = false;
        if ($.trim($('#applyName').val()).length == 0) {
            toastr.warning("请填写申请人姓名", "友情提示!");
            p = true;
        }
        var regexp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        if (!regexp.test($('#idCard').val())) {
            toastr.warning("身份证号码不对", "友情提示!");
            p = true;
        }
        return p;
    }
};

