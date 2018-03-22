$(function () {
    var o = new Date();
    $('#startoff').val(o.getFullYear() + '-' + (o.getMonth() + 1) + '-' + o.getDate());
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
    });

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
    }).on(
        'changeDate', function (ev) {
            header_out.calculate();
            $('#endoff').datetimepicker('setStartDate', $('#startoff').val()).on(
                'changeDate', function (ev) {
                    header_out.calculate();
                });
        }).on('hide', function (e) {
        $('form').data('bootstrapValidator')
            .updateStatus('startoff', 'NOT_VALIDATED', null)
            .validateField('startoff');
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
            applyname: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
                }
            },
            duty: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '所在单位及职务不能为空'
                    }
                }
            },
            startoff: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '起始时间不能为空'
                    }
                }
            },
            endoff: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '截至时间不能为空'
                    }
                }
            },
            off_type: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '请假类别不能为空'
                    }
                }
            },
            destination: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '外出地点不能为空'
                    }
                }
            },
            reasons: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '前往事由不能为空'
                    }
                }
            }
        }
    });


    header_out.init();

    // $("#duty").focus(function(){
    //     $("#tree").show();
    // })
});


serviceOA.business = "/main";


var header_out = {
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
//初始化数据
        serviceOA.initdata = header_out.initdata;
        serviceOA.getInfo = header_out.getInfo;
        serviceOA.checkData = header_out.checkData;
        //控件锁定 必须继承 防止流转过程中数据显示问题
        serviceOA.lock = header_out.lock;
        //保存业务数据 必须继承
        serviceOA.saveData = header_out.saveData;

        //判断该流程是否已经发起 必须调用
        serviceOA.initTask();
    },


    //表单保存方法
    saveData: function () {
        header_out.set('applyname').set('duty').set('startoff').set('endoff')
            .set('off_type').set('offdays').set('destination').set('reasons').set('business');

        /**
         * 根据自己业务的Mapping来配置
         * 发送数据格式自定义
         * @type {jQuery}
         */
        serviceOA.business_data = header_out.data;

    },

    lock: function () {
        //锁定控件 表单业务控件
        $(".row").find("input").attr("disabled", "disabled");
    },

    initdata: function (data) {

        //为页面控件赋值
        $('#applyname').val(data.initInfo[0].APPLYNAME);
        $('#duty').val(data.initInfo[0].DUTY);
        $('#startoff').val(data.initInfo[0].STARTOFF);
        $('#endoff').val(data.initInfo[0].ENDOFF);
        $('#off_type').val(data.initInfo[0].OFF_TYPE);
        $('#offdays').val(data.initInfo[0].OFFDAYS);
        $('#destination').val(data.initInfo[0].DESTINATION);
        $('#reasons').val(data.initInfo[0].REASONS);
    },


    getInfo: function (data) {
        $("#applyname").val(data.name);
        $("#duty").val(data.dept);
        $("#applyname").attr("disabled", "disabled");
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

        if ($('#task').val() == "" || $('#task').val() == undefined) {
            if (header_out.check()) return true;
        } else {
            if (header_out.check()) return true;
            if (opinionFlag) return false;
        }
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
        if ($.trim($('#endoff').val()).length == 0) {
            toastr.warning("请选择截至时间", "友情提示!");
            return true;
        }
        if ($.trim($('#off_type').val()).length == 0) {
            toastr.warning("请填写假类别", "友情提示!");
            return true;
        }

        if ($.trim($('#destination').val()).length == 0) {
            toastr.warning("请填写外出地点", "友情提示!");
            return true;
        }
        if ($.trim($('#reasons').val()).length == 0) {
            toastr.warning("请填写外出事由", "友情提示");
            return true;
        }
    }


};

