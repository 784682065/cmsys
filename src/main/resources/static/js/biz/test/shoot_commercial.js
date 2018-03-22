$(function(){

    //表单验证
    $("#shootType").bootstrapTable({
        dataType: "json",
        method: 'get',
        contentType: "",
        cache: false,
        data:[
            {"shootType":"靶位数"},
            {"shootType":"枪支种类"}
        ],
        columns:[
            [
                {
                    field: 'shootType',
                    title: "射击方式",
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'fix',
                    title: '固定靶',
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'move',
                    title: '移动靶',
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'haide',
                    title: '显隐靶',
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'active',
                    title: '活动靶',
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'fly',
                    title: '飞碟靶',
                    valign:"middle",
                    align:"center"
                }
            ]
        ]
    });
    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            sgajOpinion: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '市公安局审核意见'
                    }
                }
            }

        }
    });
    //初始化
    shooting.init();

});


serviceOA.business='/test/shootCommercial';

var shooting={

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
        serviceOA.initdata = shooting.initdata;
        //申请初始化
        serviceOA.getInfo = shooting.getInfo;
        //控件锁定 必须重写
        serviceOA.lock = shooting.lock;
        //保存业务数据 必须重写
        serviceOA.saveData = shooting.saveData;
        //业务数据校验必须重写
        serviceOA.checkData = shooting.checkData;
        //判断该流程是否已经发起 必须调用
        serviceOA.initTask();
    },

    //表单保存 获取数据方法
    saveData: function () {

        // cutter.set('ownerName').set('ownerGender').set('age').set('address').set('business').set('caseBrief');
        // var tableInfo = $("#cutterTable").bootstrapTable('getData');
        //将table内的数据以json字符串形式传回后台
        // cutter.data.tableData = JSON.stringify(tableInfo);
        // 赋值给serviceOA.business_data  该方法在改公用 暂时用这个逻辑
        // serviceOA.business_data = cutter.data;

    },


    //锁定方法 根据页面上的控件来写
    lock: function () {
        //锁定控件 表单业务控件
        $(".row").find("input").attr("disabled", "disabled");
    },


    //流转过程，页面初始化带出申请数据
    initdata: function (data) {


    },

    //申请时表单带出申请人基本信息 若无不需要重写
    getInfo: function (data) {
        $("#applyName").val(data.name);
        $("#idCard").val(data.account);
    },


    //框架调用 校验方法
    checkData: function () {
        if (shooting.check()) return true;
        return false;
    },


    //校验表单数据方法 自定义
    check: function () {

    }






};