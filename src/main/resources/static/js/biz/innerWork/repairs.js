$(function () {
    //选择申请时间
    var o = new Date();
    $('#applyTime').val(o.getFullYear() + '-' + (o.getMonth() + 1) + '-' + o.getDate());
    $('#applyTime').datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: 1,
        minView: 2,
        startDate: new Date()
    }).on('hide', function (e) {
        $('form').data('bootstrapValidator')
            .updateStatus('applyTime', 'NOT_VALIDATED', null)
            .validateField('applyTime');
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
            unit: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '所在单位不能为空'
                    }
                }
            },
            applyTime: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '申请时间不能为空'
                    }
                }
            },
            applyAdd: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '申请地点不能为空'
                    }
                }
            },
            applyEnvet: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '申请事件不能为空'
                    }
                }
            },
            applyReason: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '申请原因不能为空'
                    }
                }
            }
        }
    });
    repairs.init();

});

serviceOA.business = "/repairs";

var repairs = {

    //过于存放表单数据 根据自己业务自定义
    data: {},
    //设置data数据
    set: function (key, val) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    },

    init: function () {
        serviceOA.getInfo = repairs.getInfo;
        serviceOA.saveData = repairs.saveData;
        serviceOA.initdata = repairs.initdata;
        //控件锁定
        serviceOA.lock = repairs.lock;
        serviceOA.checkData = repairs.checkData;
        //判断该流程是否已经发起
        serviceOA.initTask();
    },

    initdata: function (data) {

        $("#applyName").val(data.APPLYNAME);
        $("#unit").val(data.UNIT);
        $("#applyTime").val(data.APPLYTIME);
        $("#applyAdd").val(data.APPLYADD);
        $("#applyEvent").val(data.APPLYEVENT);
        $("#applyReason").val(data.APPLYREASON);
        $("#bzzxOpinion").val(data.BZZXOPINION);

    },

    getInfo: function (data) {
        $("#applyName").val(data.name);
        $("#unit").val(data.dept);
        $("#applyName").attr("disabled", "disabled");
        $("#unit").attr("disabled", "disabled");
    },
    saveData: function () {

        var applyName = $("#applyName").val();
        var unit = $("#unit").val();
        var applyTime = $("#applyTime").val();
        var applyAdd = $("#applyAdd").val();
        var applyEvent = $("#applyEvent").val();
        var applyReason = $("#applyReason").val();
        var bzzxOpinion = $("#bzzxOpinion").val();


        serviceOA.business_data = {
            applyName: applyName,
            unit: unit,
            applyTime: applyTime,
            applyAdd: applyAdd,
            applyEvent: applyEvent,
            applyReason: applyReason,
            bzzxOpinion: bzzxOpinion,
            business: $("#business").val()
        };


    },


    lock: function () {
        //锁定控件
        $(".row").find("input").attr("disabled", "disabled");

    },
    checkData: function () {
        if ($('#task').val() == "" || $('#task').val() == undefined) {
            if (repairs.check()) return true;
        }
        else {
            if (repairs.check()) return true;
            if (opinionFlag) return false;
        }
        return false;
    },


    check: function () {
        if ($.trim($('#applyName').val()).length == 0) {
            toastr.warning("请填写申请人", "友情提示!");
            return true;
        }
        if ($.trim($('#unit').val()).length == 0) {
            toastr.warning("请填写所在所在单位", "友情提示!");
            return true;
        }
        if ($.trim($('#applyTime').val()).length == 0) {
            toastr.warning("请选择申请时间", "友情提示!");
            return true;
        }
        if ($.trim($('#applyAdd').val()).length == 0) {
            toastr.warning("请选择申请地点", "友情提示!");
            return true;
        }
        if ($.trim($('#applyEvent').val()).length == 0) {
            toastr.warning("请选择申请事件", "友情提示!");
            return true;
        }
        if ($.trim($('#applyReason').val()).length == 0) {
            toastr.warning("请填写申请原因", "友情提示!");
            return true;
        }
    }

};