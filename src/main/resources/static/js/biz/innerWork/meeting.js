$(function () {
    //表单验证

    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, fields: {
            meeting: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '会议活动名称不能为空'
                    }
                }
            },
            qjrName: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '请假人姓名不能为空'
                    }
                }
            },
            qjrDuty: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '请假人职务不能为空'
                    }
                }
            },
            tel: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '手机号码不能为空'
                    },
                    regexp:{
                        regexp: /^1\d{10}$/,
                        message: '请输入正确的手机号码'
                    }

                }
            },
            dhrName: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '代会负责人不能为空'
                    }
                }
            },
            dhrDuty: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '代会负责人职务不能为空'
                    }
                }
            },
            reasons: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '请假事由不能为空'
                    }
                }
            }
        }
    });
    meeting.init();
});

serviceOA.business = "/meeting";


var meeting = {
    //过于存放表单数据 根据自己业务自定义
    data: {},
    //设置data数据
    set: function (key, val) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    },

    get: function (key) {
        this.data[key];
    },
    //表单初始化
    //将需要覆盖的方法全部覆盖
    init: function () {
        //初始化数据

        //控件锁定 必须继承 防止流转过程中数据显示问题
        serviceOA.lock = meeting.lock;
        serviceOA.getInfo = meeting.getInfo;
        serviceOA.initdata = meeting.initdata;
        serviceOA.checkData = meeting.checkData;
        //保存业务数据 必须继承
        serviceOA.saveData = meeting.saveData;
        //判断该流程是否已经发起 必须调用
        serviceOA.initTask();
    },

    //调用表单保存方法
    saveData: function () {
        meeting.set('qjrName').set('qjrDuty').set('dhrName')
            .set('dhrDuty').set('reasons').set('tel').set('business');

        /**
         * 根据自己业务的Mapping来配置
         * 发送数据格式自定义
         * @type {jQuery}
         */

        meeting.data.meeting = $('#meeting').val();

        serviceOA.business_data = meeting.data;
    },


    lock: function () {

        $("select").attr("disabled", "disabled");
        $(".row").find("input").attr("disabled", "disabled");
    },

    initdata: function (data) {
        if (lockFlag) {
            $.ajax({
                url: serviceOA.business + "/getInfo",
                type: 'post',
                async: false,
                success: function (data) {
                    serviceOA.getInfo(data);
                }
            });
            debugger;
            $("option[value='"+ data.initName[0].text+"']").attr("selected","selected");
        }else {
            $('#meeting').append('<option value="'+ data.initName[0].text +'">'+data.initName[0].text+'</option>');
        }
        $('#qjrName').val(data.initInfo[0]./*USERNAME*/QJRNAME);
        $('#qjrDuty').val(data.initInfo[0].QJRDUTY);
        $('#tel').val(data.initInfo[0].TEL);
        $('#dhrName').val(data.initInfo[0].DHRNAME);
        $('#dhrDuty').val(data.initInfo[0].DHRDUTY);
        $('#reasons').val(data.initInfo[0].REASONS);
    },

    afterinit:function () {

    },

    getInfo: function (data) {

    var length = data.initName.length;
        $('#meeting').append('<option value="">'+'请选择'+'</option>');
    for (var i=0; i<length; i++){
        $('#meeting').append('<option value="'+ data.initName[i].text +'">'+data.initName[i].text+'</option>');
    }
        $('#qjrName').val(data.username);
        $('#qjrName').attr("disabled", "disabled");
    },

    //校验方法全部执行
    checkData: function () {

        if (meeting.check()) return true;
        return false;
    },

    //校验方法统一管理
    check: function () {

        if ($.trim($('#meeting').val()).length == 0) {
            toastr.warning("请选择会议活动名称", "友情提示!");
            return true;
        }

        if ($.trim($('#qjrName').val()).length == 0) {
            toastr.warning("请填写请假人姓名", "友情提示!");
            return true;
        }
        if ($.trim($('#qjrDuty').val()).length == 0) {
            toastr.warning("请填写请假人职务", "友情提示!");
            return true;
        }

        var regex = /^1\d{10}$/;
        if (!regex.test($('#tel').val())) {
            toastr.warning("请输入正确的手机号码", "友情提示!");
            return true;
        }

        if ($.trim($('#dhrName').val()).length == 0) {
            toastr.warning("请填写代会负责人姓名", "友情提示!");
            return true;
        }

        if ($.trim($('#dhrDuty').val()).length == 0) {
            toastr.warning("请填写代会负责人职务", "友情提示!");
            return true;
        }

        if ($.trim($('#reasons').val()).length == 0) {
            toastr.warning("请填写请假理由", "友情提示!");
            return true;
        }


    }


};