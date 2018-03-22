$(function () {
    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, fields: {
            ownerName: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
                }
            },
            age: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '年龄不能为空'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '年龄不能小于0'
                    }
                }
            },
            address: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '住址不能为空'
                    }
                }
            },
            caseBrief: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '简要案情不能为空'
                    }
                }
            }
        }
    });

    //cutterTable 初始化
    $('#cutterTable').bootstrapTable({
        method: 'get',
        editable: true,//开启编辑模式
        clickToSelect: false,
        pagination: true,  //是否分页
        showToggle: false, //显示切换按钮来切换列表/卡片视图
        showPaginationSwitch: false, //显示分页切换按钮
        pageList: [5],
        pageSize: 10,
        pageNumber: 1,
        uniqueId: 'index', //将index列设为唯一索引
        striped: true,
        search: false,  //显示检索框
        showRefresh: false,  //显示刷新按钮
        columns: [
            {
                field: "XH", title: "序号", align: "center", edit: false, formatter: function (value, row, index) {
                    return row.XH = index + 1; //返回行号
                }
            },
            {
                field: "KNIFENAME", title: "名称", align: "center"
            },
            {
                field: "KNIFENUM", title: "涉案数量", align: "center"
            },
            {
                field: "KNIFEFEATURE", title: "特征", align: "center", width: 400
            },
            {
                field: "ISIDENTIFY", title: "是否鉴定", align: "center"
            },
            {
                checkbox: true
            }
        ],
        data: [{KNIFENAME: '', KNIFENUM: '', KNIFEFEATURE: '', ISIDENTIFY: ''}]
    });
    var count = $('#cutterTable').bootstrapTable('getData').length;
    // $("#counts").html(count);
    cutter.init();
});
serviceOA.business = "/knife";

var cutter = {

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

    initdata: function (data) {

        debugger;
        $('#ownerName').val(data.manMsg[0].OWNERNAME);
        $('#ownerGender').val(data.manMsg[0].OWNERGENDER);
        $('#age').val(data.manMsg[0].AGE);
        $('#address').val(data.manMsg[0].ADDRESS);
        $('#caseBrief').val(data.manMsg[0].CASEBRIEF);
        $("#counts").html(data.manMsg[0].COUNTS);
        if (lockFlag) {
            $('#conclusionifr').css("display", "");
            $('#conclusion').attr("disabled", "disabled");
            $('#conclusion').val(data.manMsg[0].CONCLUSION);
            if (($('#conclusion').val()).length != 0) {
                $('#dept').attr("disabled", "disabled");
                $('#num').attr("disabled", "disabled");
            } else {
                $('#preifr').css("display", "none");
                $('#conclusionifr').css("display", "none");
            }
        }
        $("#dept").val(data.manMsg[0].PRE_DEPT);
        $("#num").val(data.manMsg[0].PRE_NUM);
        if (nodeName != 'c') {
            $('#conclusion').val(data.manMsg[0].CONCLUSION);
        }
        if (data.knifeMsg != null) {
            $("#cutterTable").bootstrapTable('load', data.knifeMsg);
            // $("#counts").html($("#cutterTable").bootstrapTable('getData').length);
        }

        if (!lockFlag) {
            $("#cutterTable tr").unbind("click");
        }
    },


    init: function () {

        //初始化数据
        serviceOA.initdata = cutter.initdata;
        //控件锁定 必须继承 防止流转过程中数据显示问题
        serviceOA.lock = cutter.lock;
        //保存业务数据 必须继承
        serviceOA.saveData = cutter.saveData;
        serviceOA.afterinit = cutter.afterinit;
        serviceOA.checkData = cutter.checkData;
        serviceOA.otheropinion = cutter.saveConclusion;
        serviceOA.speciaCheck = cutter.speciaCheck;
        //判断该流程是否已经发起 必须调用
        serviceOA.initTask();
        cutter.getCount();

    },

    saveData: function () {
        cutter.set('ownerName').set('ownerGender').set('age').set('address').set('business').set('caseBrief').set('conclusion');

        var tableInfo = $("#cutterTable").bootstrapTable('getData');
        cutter.data.counts=$("#counts").html();
        cutter.data.tableData = JSON.stringify(tableInfo);
        serviceOA.business_data = cutter.data;
    },

    lock: function () {
        $("#ownerGender").attr("disabled", "disabled");
        $("#ownerName").attr("disabled", "disabled");
        $("#age").attr("disabled", "disabled");
        $("#address").attr("disabled", "disabled");
        $("#caseBrief").attr("disabled", "disabled");
        if (serviceOA.isSubmit) {
            $('.ibox-title h2').html("管制刀具复检书");
            $('#preifr').css("display", "");
        }
        $(".btn-content").hide();
        $("#cutterTable tr").unbind("click");
    },

    afterinit: function () {
        if (lockFlag) {
            $('.ibox-title h2').html("管制刀具认定委托书");
        }
    },

    saveConclusion: function (type) {
        /*        if ($('#conclusion').val() == "" && !opinionFlag && isWrite) {
                    toastr.warning('请输入您的审批意见！');
                    return;
                }*/
        var param = {
            business: $('#business').val(),
            conclusion: $('#conclusion').val(),
            preDept: $('#dept').val(),
            preNum: $('#num').val()
        }
        $('#conclusion').attr('disabled', 'disabled');
        $('#dept').attr('disabled', true);
        $('#num').attr('disabled', true);

        if ($('#conclusionifr').css('display') != 'none') {
            $.post("/knife/saveConclusion", param, function (data) {

            });
        }
    },


    add: function () {
        var data = {};
        $('#cutterTable').bootstrapTable('append', data);
        var count = $('#cutterTable').bootstrapTable('getData').length;
        // $("#counts").html(count);

    },

    delete: function () {
        var del = [];
        var as = $('#cutterTable').bootstrapTable('getSelections');
        for (var i = 0; i < as.length; i++) {
            del.push(as[i].XH);
        }
        $('#cutterTable').bootstrapTable('remove', {
            field: 'XH',
            values: del
        });
        // var count = $('#cutterTable').bootstrapTable('getData').length;
        // $("#counts").html(count);
        var counts = 0;
        var lens = $('#cutterTable').bootstrapTable('getData').length;
        for (var i = 0; i < lens; i++) {
            var aaa = $("#cutterTable").children("tbody").children("tr:eq(" + i + ")").children("td:eq(2)")/*.children().children("input").val()*/;

            if (aaa.children().find("input").length > 0) {

                counts += parseInt(aaa.children().find("input").val());
            } else {
                if (aaa.html() == '') {
                    counts += 0;
                } else {
                    counts += parseInt(aaa.html());
                }
            }
        }
        $("#counts").html(counts);

    },
    checkData: function () {
        if ($('#task').val() == "" || $('#task').val() == undefined) {
            if (cutter.check()) return true;
        }
        else {
            if (cutter.check()) return true;
            if (opinionFlag) return false;
        }
        return false;
    },
    check: function () {
        if ($.trim($('#ownerName').val()).length == 0) {
            toastr.warning("请填写姓名", "友情提示!");
            return true;
        }
        if ($.trim($('#age').val()).length == 0 || $('#age').val() <= 0) {
            toastr.warning("请填写正确的年龄", "友情提示!");
            return true;
        }

        if ($.trim($('#address').val()).length == 0) {
            toastr.warning("请填写住址", "友情提示!");
            return true;
        }

        if ($.trim($('#caseBrief').val()).length == 0) {
            toastr.warning("请填写简要案情", "友情提示!");
            return true;
        }

        var tableInfo = $("#cutterTable").bootstrapTable('getData');
        var regex = /^[1-9]\d*$/;
        if (tableInfo.length != 0) {
            for (var i = 0; i < tableInfo.length; i++) {
                var knifename = tableInfo[i].KNIFENAME;
                var knifenum = tableInfo[i].KNIFENUM;
                var knifefeature = tableInfo[i].KNIFEFEATURE;
                var isIdentify = tableInfo[i].ISIDENTIFY;

                if (knifename.length == 0) {
                    toastr.warning("请填写送检刀具名称", "友情提示!");
                    return true;
                }
                if (!regex.test(knifenum)) {
                    toastr.warning("请填写正确的涉案数量", "友情提示!");
                    return true;
                }
                if (knifefeature.length == 0) {
                    toastr.warning("请填写送检刀具特征", "友情提示!");
                    return true;
                }
                if ($.trim(isIdentify).length == 0) {
                    toastr.warning("是否鉴定不许为空", "友情提示!");
                    return true;
                }
            }
        } else {
            toastr.warning("请在表格内录入送检疑似刀具特征", "友情提示!");
            return true;
        }
    },
    speciaCheck: function () {
        if ($.trim($('#dept').val()).length == 0 && $('#preifr').css('display') != 'none') {
            toastr.warning("请填写仿真枪初次认定部门", "友情提示!");
            return true;
        }
        if ($.trim($('#num').val()).length == 0 && $('#preifr').css('display') != 'none') {
            toastr.warning("请填写仿真枪认定报告书编号", "友情提示!");
            return true;
        }
        if ($.trim($('#conclusion').val()).length == 0 && $('#conclusionifr').css('display') != 'none') {
            toastr.warning("请填写认定结论", "友情提示!");
            return true;
        }
        return false;
    },
    getCount: function () {

        var counts = 0;
        $(document).on("change", function () {
            counts = 0;
            var lens = $('#cutterTable').bootstrapTable('getData').length;
            for (var i = 0; i < lens; i++) {
                var aaa = $("#cutterTable").children("tbody").children("tr:eq(" + i + ")").children("td:eq(2)")/*.children().children("input").val()*/;

                debugger;
                if (aaa.children().find("input").length > 0) {
                    if (aaa.children().find("input").val() == "") {
                        counts += 0;
                    }else {
                        counts += parseInt(aaa.children().find("input").val());
                    }
                } else {
                    if (aaa.html() == '') {
                        counts += 0;
                    } else {
                        counts += parseInt(aaa.html());
                    }
                }
            }
            $("#counts").html(counts);

        });

    }


};








