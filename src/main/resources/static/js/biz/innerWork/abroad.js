$(function () {
    $('#startoff').datetimepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        startDate: new Date()
    }).on('hide', function (e) {
        $('form').data('bootstrapValidator')
            .updateStatus('startoff', 'NOT_VALIDATED', null)
            .validateField('startoff');
    }).on(
        'changeDate', function (ev) {
            $('#endoff').datetimepicker('setStartDate', $('#startoff').val());
        });
    $('#endoff').datetimepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        startDate: new Date()
    }).on('hide', function (e) {
        $('form').data('bootstrapValidator')
            .updateStatus('endoff', 'NOT_VALIDATED', null)
            .validateField('endoff');
    }).on(
        'changeDate', function (ev) {
            $('#startoff').datetimepicker('setEndDate', $('#endoff').val());
        });


    //表单验证
    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
                }
            },
            duty: {
                validators: {
                    notEmpty: {
                        message: '所在单位及职务不能为空'
                    }
                }
            },
            id_card: {
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
            startoff: {
                validators: {
                    notEmpty: {
                        message: '起始时间不能为空'
                    }
                }
            },
            endoff: {
                validators: {
                    notEmpty: {
                        message: '截至时间不能为空'
                    }
                }
            },
            off_type: {
                validators: {
                    notEmpty: {
                        message: '请假类别不能为空'
                    }
                }
            },
            country: {
                validators: {
                    notEmpty: {
                        message: '去往国家(地区)不能为空'
                    }
                }
            },
            retinue: {
                validators: {
                    notEmpty: {
                        message: '随行人员不能为空'
                    }
                }
            },
            reasons: {
                validators: {
                    notEmpty: {
                        message: '前往事由不能为空'
                    }
                }
            }
        }
    });

    abroad.init();

});
serviceOA.business = "/abroad";


var abroad = {
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
        //控件锁定 必须继承 防止流转过程中数据显示问题
        serviceOA.lock = abroad.lock;
        //意见区域 如有需要继承
        //保存业务数据 必须继承
        serviceOA.saveData = abroad.saveData;
        //提交按钮验证
        serviceOA.checkData = abroad.checkData;
        serviceOA.initdata = abroad.initdata;
        serviceOA.getInfo = abroad.getInfo;
        //判断该流程是否已经发起 必须调用
        serviceOA.initTask();
    },

    //表单保存方法
    saveData: function () {
        debugger;
        abroad.set('applyname').set('sex').set('duty').set('id_card')
            .set('startoff').set('endoff').set('off_type')
            .set('country').set('retinue').set('cost_type').set('reasons').set('business').set('instance');


        /**
         * 根据自己业务的Mapping来配置
         * 发送数据格式自定义
         * @type {jQuery}
         */
        serviceOA.business_data = abroad.data;

    },

    lock: function () {
        //锁定控件 表单业务控件
        $(".row").find("input").attr("disabled", "disabled");
        $("#cost_type").attr("disabled", "disabled");
        $("#sex").attr("disabled", "disabled");

    },

    initdata: function (data) {
        //为页面控件赋值
        debugger;
        if (lockFlag){
            $('#sex').attr("disabled",true);
        }
        $('#applyname').val(data.initInfo[0].APPLYNAME);
        $('#sex').val(data.initInfo[0].SEX);
        $('#duty').val(data.initInfo[0].DUTY);
        $('#startoff').val(data.initInfo[0].STARTOFF);
        $('#endoff').val(data.initInfo[0].ENDOFF);
        $('#off_type').val(data.initInfo[0].OFF_TYPE);
        $('#id_card').val(data.initInfo[0].ID_CARD);
        $('#country').val(data.initInfo[0].COUNTRY);
        $('#cost_type').val(data.initInfo[0].COST_TYPE);
        $('#retinue').val(data.initInfo[0].RETINUE);
        $('#reasons').val(data.initInfo[0].REASONS);
    },

    getInfo: function (data) {
        $('#applyname').val(data.name);
        $('#duty').val(data.duty);
        $('#id_card').val(data.id);
        $('#sex').val(data.sex);

        $('#applyname').attr("disabled", "disabled");
        $('#id_card').attr("disabled", "disabled");

    },
    calculate: function () {
        //插件赋值
        $('#startoff').datetimepicker('setEndDate', $('#endoff').val());
        var s = $('#startoff').val();
        var e = $('#endoff').val();
        var s1 = new Date(s.replace(/-/g, "/"));
        var e1 = new Date(e.replace(/-/g, "/"));
        var days = e1.getTime() - s1.getTime();
        var time = parseInt(days / (1000 * 60 * 60 * 24) + 1);
        $('#offdays').val(time);
    },

    checkData: function () {
        if (abroad.check()) return true;
        return false;
    },
    check: function () {
        if ($.trim($('#applyname').val()).length == 0) {
            toastr.warning("请填写申请人姓名", "友情提示!");
            return true;
        }
        if ($.trim($('#duty').val()).length == 0) {
            toastr.warning("请填写所在单位及职务", "友情提示!");
            return true;
        }
        var regexp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        if (!regexp.test($('#id_card').val())) {
            toastr.warning("身份证号码不对", "友情提示!");
            return true;
        }
        if ($.trim($('#startoff').val()).length == 0) {
            toastr.warning("请选择起始时间", "友情提示!");
            return true;
        }
        if ($.trim($('#endoff').val()).length == 0) {
            toastr.warning("请选择截至时间", "友情提示!");
            return true;
        }
        if ($.trim($('#off_type').val()).length == 0) {
            toastr.warning("请填写请假类别", "友情提示!");
            return true;
        }
        if ($.trim($('#country').val()).length == 0) {
            toastr.warning("请填写去往国家(地区)", "友情提示!");
            return true;
        }
        if ($.trim($('#retinue').val()).length == 0) {
            toastr.warning("请填写随行人员", "友情提示!");
            return true;
        }
        if ($.trim($('#reasons').val()).length == 0) {
            toastr.warning("请填写前往事由", "友情提示!");
            return true;
        }
    }

};






