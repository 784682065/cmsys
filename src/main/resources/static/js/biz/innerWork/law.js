$(function () {
    //选择文书期限
    $('#deadline').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        autoclose: 1,
        startDate: new Date()
    }).on('hide', function (e) {
        $('form').data('bootstrapValidator')
            .updateStatus('deadline', 'NOT_VALIDATED', null)
            .validateField('deadline');
    });
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
                        message: '申请人不能为空'
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
            caseType: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '办案类别不能为空'
                    }
                }
            },
            itemsType: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '事项类型不能为空'
                    }
                }
            },
            actuality: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '实现现状不能为空'
                    }
                }
            },
            deadline: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '文书期限不能为空'
                    }
                }
            },
            skssOpinion: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '市看守所审批意见不能为空'
                    }
                }
            }
        }
    });


    law.init();
});

serviceOA.business = "/law";


var law = {
    //过于存放表单数据 根据自己业务自定义
    data: {},

    //设置data数据
    set: function (key, val) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;

        return this;
    },
    //表单初始化
    //将需要覆盖的方法全部覆盖
    init: function () {

        //初始化数据
        serviceOA.initdata = law.initdata;
        serviceOA.getInfo = law.getInfo;
        //控件锁定 必须继承 防止流转过程中数据显示问题
        serviceOA.lock = law.lock;
        //保存业务数据 必须继承
        serviceOA.saveData = law.saveData;
        serviceOA.checkData = law.checkData;
        //判断该流程是否已经发起 必须调用
        serviceOA.initTask();
    },

    //表单保存方法
    saveData: function () {
        law.set('applyName').set('idCard').set('caseType').set('itemsType')
            .set('actuality').set('deadline').set('business');


        serviceOA.business_data = law.data;

    },

    lock: function () {
        //锁定控件 表单业务控件
        $(".row").find("input").attr("disabled", "disabled");
    },

    initdata: function (data) {
        //初始化数据
        //获取当前页面的business（获取业务数据） 及task（启动流程节点）


        $('#applyName').val(data.initInfo[0].APPLYNAME);
        $('#idCard').val(data.initInfo[0].IDCARD);
        $('#caseType').val(data.initInfo[0].CASETYPE);
        $('#itemsType').val(data.initInfo[0].ITEMSTYPE);
        $('#actuality').val(data.initInfo[0].ACTUALITY);
        $('#deadline').val(data.initInfo[0].DEADLINE);
        $('#skssOpinion').val(data.initInfo[0].SKSSOPINION);
        $('#receiveOpinion').val(data.initInfo[0].RECEIVEOPINION);


    },
    getInfo: function (data) {
        $("#applyName").val(data.name);
        $("#idCard").val(data.account);
        $("#applyName").attr("disabled", "disabled");
        $("#idCard").attr("disabled", "disabled");
    },

    checkData: function () {
        if (law.check()) return true;
        return false;
    },

    check: function () {


        if ($.trim($('#applyName').val()).length == 0) {
            toastr.warning("请填写申请人姓名", "友情提示!");
            return true;
        }
        var regexp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        if (!regexp.test($('#idCard').val())) {
            toastr.warning("身份证号码不对", "友情提示!");
            return true;
        }
        if ($.trim($('#caseType').val()).length == 0) {
            toastr.warning("请填写办案类别", "友情提示!");
            return true;
        }

        if ($.trim($('#itemsType').val()).length == 0) {
            toastr.warning("请填写事项类型", "友情提示!");
            return true;
        }
        if ($.trim($('#actuality').val()).length == 0) {
            toastr.warning("请填写实现现状", "友情提示!");
            return true;
        }
        if ($.trim($('#deadline').val()).length == 0) {
            toastr.warning("请选择文书期限", "友情提示!");
            return true;
        }
    }


};

