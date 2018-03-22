/**
 *
 */
$(function () {

    //表单内容初始化设定
    $("#divorceormarry").datetimepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        initialDate: new Date()
    }).on('hide',function(e) {
        $('form').data('bootstrapValidator')
            .updateStatus('divorceormarry', 'NOT_VALIDATED',null)
            .validateField('divorceormarry');
    });
    $("#job").datetimepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        initialDate: new Date()
    }).on('hide',function(e) {
        $('form').data('bootstrapValidator')
            .updateStatus('job', 'NOT_VALIDATED',null)
            .validateField('job');
    });
    $("#lastapply").datetimepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        initialDate: new Date()
    }).on('hide',function(e) {
        $('form').data('bootstrapValidator')
            .updateStatus('lastapply', 'NOT_VALIDATED',null)
            .validateField('lastapply');
    });
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
        startDate:new Date()
    }).on('hide',function(e) {
        $('form').data('bootstrapValidator')
            .updateStatus('endoff', 'NOT_VALIDATED',null)
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
        startDate:new Date()
    }).on(
        'changeDate', function (ev) {
            dayoff.calculate();
            $('#endoff').datetimepicker('setStartDate', $('#startoff').val()).on(
                'changeDate', function (ev) {
                    dayoff.calculate();
                }
            );
    }).on('hide',function(e) {
        $('form').data('bootstrapValidator')
            .updateStatus('startoff', 'NOT_VALIDATED',null)
            .validateField('startoff');
    });
    //表单验证
    $('form').bootstrapValidator({
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
            divorceormarry: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '结（离）婚年份不能为空'
                    }
                }
            },
            job: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '参加工作年月不能为空'
                    }
                }
            },
            roleinorg: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '单位及职务不能为空'
                    }
                }
            },
            destination: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '请假期间去向不能为空'
                    }
                }
            },
            object: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '探亲对象不能为空'
                    }
                }
            },
            locateforrelation: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '父母或配偶户籍地不能为空'
                    }
                }
            },
            lastapply: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '上次探亲或休年休假年月不能为空'
                    }
                }
            },
            reason: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '请假原因不能为空'
                    }
                }
            },
            roaddays: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '路程假天数不能为空'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                            message: '路程假天数不能为负'
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
            partner: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '请假期间工作主持人员不能为空'
                    }
                }
            },
            remark: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '备注信息不能为空'
                    }
                }
            },
            unitOpinionTxt: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '所在单位意见不能为空'
                    }
                }
            },
            auditOpinionTxt: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '审核意见不能为空'
                    }
                }
            },
            zzbOpinionTxt: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '政治部意见不能为空'
                    }
                }
            },
            fgjOpinionTxt: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '联系(分管)局领导意见不能为空'
                    }
                }
            },
            jzOpinionTxt: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '局长意见不能为空'
                    }
                }
            }
        }
    });

    //业务初始化
    dayoff.init();
});

serviceOA.business_name = "/dayoff/save";

var dayoff = {


    //意见方法
    opinion_name: "/dayoff/opinion",

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
        dayoff.initdata();

        // dayoff.select2();
        //控件锁定 必须继承 防止流转过程中数据显示问题
        serviceOA.lock = dayoff.lock;
        //意见区域 如有需要继承
        serviceOA.opinion = dayoff.opinion;
        //保存业务数据 必须继承
        serviceOA.saveData = dayoff.saveData;
        //判断该流程是否已经发起 必须调用
        serviceOA.initTask();
    },

    //调用表单保存方法
    saveData: function () {
        dayoff.set('applyname').set('divorceormarry').set('job').set('roleinorg')
            .set('locateforrelation').set('lastapply').set('reason').set('offdays')
            .set('roaddays').set('startoff').set('endoff').set('partner').set('remark')
            .set('lastapply').set('married').set('offtype').set('destination').set('object');
        /**
         * 根据自己业务的Mapping来配置
         * 发送数据格式自定义
         * @type {jQuery}
         */
        serviceOA.business_data = dayoff.data;
    },

    checkData: function () {


    },


    check:function () {

    },
    control:function () {

    },



    calculate: function () {
        $('#startoff').datetimepicker('setEndDate', $('#endoff').val());
        var s = $('#startoff').val();
        var e = $('#endoff').val();
        var s1 = new Date(s.replace(/-/g, "/"));
        var e1 = new Date(e.replace(/-/g, "/"));
        var days = e1.getTime() - s1.getTime();
        var time = parseInt(days / (1000 * 60 * 60 * 24) + 1);
        $('#offdays').val(time);
    },
    //业务表单控件锁定方法
    //自定义方法名称但须传递给serviceOA.lock
    lock: function () {

    },

    initdata:function () {
        //初始化数据
        //获取当前页面的business（获取业务数据） 及task（启动流程节点）
        var businessid = $("#business").val();
        var task = $("#task").val();

        if (businessid != "") {
            $.post("/dayoff/init", {businessid: businessid, task: task}, function (data) {
                //为页面控件赋值
                $('#applyname').val(data.initInfo[0].APPLYNAME);
                $('#divorceormarry').val(data.initInfo[0].DIVORCEORMARRY);
                $('#marriedinit').val(data.initInfo[0].MARRIED);
                $('#offtype').val(data.initInfo[0].OFFTYPE);
                $('#job').val(data.initInfo[0].JOB);
                $('#roleinorg').val(data.initInfo[0].ROLEINORG);
                $('#destination').val(data.initInfo[0].DESTINATION);
                $('#object').val(data.initInfo[0].OBJECT);
                $('#locateforrelation').val(data.initInfo[0].LOCATEFORRELATION);
                $('#lastapply').val(data.initInfo[0].LASTAPPLY);
                $('#reason').val(data.initInfo[0].REASON);
                $('#offdays').val(data.initInfo[0].OFFDAYS);
                $('#roaddays').val(data.initInfo[0].ROADDAYS);
                $('#startoff').val(data.initInfo[0].STARTOFF);
                $('#endoff').val(data.initInfo[0].ENDOFF);
                $('#partner').val(data.initInfo[0].PARTNER);
                $('#remark').val(data.initInfo[0].REMARK);
                $('#unitOpinionTxt').val(data.initInfo[0].ORGOPINION);
                $('#auditOpiTxt').val(data.initInfo[0].VERIFYOPINION);
                $('#zzbOpinionTxt').val(data.initInfo[0].POLITICSOPINION);
                $('#fgjOpinionTxt').val(data.initInfo[0].DEPUTYOPINION);
                $('#jzOpinionTxt').val(data.initInfo[0].DIRECTOROPINION);

                //页面查看
                if ($('#isCheck').val() == "Y") {
                    //锁定全部可编辑按钮
                    //隐藏所有button按钮
                    $(".row").find("input").attr("disabled", "disabled");
                    $(".row").find("textarea").attr("disabled", "disabled");
                    $("button").css("display", "none");
                }
            });
        }else {
            $.post('/dayoff/seq', function (data) {
                $("#business").val(data.business);
                $("#process").val(data.process);
            });
        }
    },
    //业务意见区域
    opinion: function () {
        dayoff.set('directoropinion').set('deputyopinion').set('politicsopinion').set('verifyopinion').set('orgopinion');
        serviceOA.business_name = "/dayoff/opinion";
        serviceOA.business_data = {};
        $(serviceOA.business_name, serviceOA.business_data, function (date) {
            toastr.success("", "保存审批意见成功！");
        });
    },


    initdata: function () {


    },

    select2: function () {
        $('#offtype').select2('val', $('#offtypeinit').val());
        $('#married').select2('val', $('#marriedinit').val());
    },

    offType: function () {
        if( $("#offtype").val() == '02' ) {
            $("#object").attr('readonly','readonly').val('普通假，无探亲对象');
        }else{
            $("#object").removeAttr('readonly').val('');
        }
    }
};


