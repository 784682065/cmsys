$(function () {
    // document.getElementById("conclusion").value = "根据公安部《仿真枪认定标准》之规定，认定：";
    //表单验证

    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, fields: {
            cyrName: {
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

    $('#feature').bootstrapTable({
        editable: true,//开启编辑模式
        clickToSelect: false,
        pagination: true,  //是否分页
        showToggle: false, //显示切换按钮来切换列表/卡片视图
        showPaginationSwitch: false, //显示分页切换按钮
        pageList: [10, 25, 50, 100],
        pageSize: 10,
        pageNumber: 1,
        uniqueId: 'xh', //将index列设为唯一索引
        striped: true,
        search: false,  //显示检索框
        showRefresh: false,  //显示刷新按钮
        columns: [
            {
                field: "XH", title: "序号", align: "center", edit: false, formatter: function (value, row, index) {
                return row.xh = index + 1; //返回行号
            }
            },
            {
                field: "GUNS_NUM", title: "送检编号", align: "center"
            },
            {
                field: "GUNS_FEATURE", title: "送检疑似仿真枪基本特征", align: "center"
            },
            {
                field: "CASE_NUM", title: "涉案数量", align: "center"
            },
            {
                field: "ISIDENTIFY", title: "是否鉴定", align: "center"
            },
            {
                checkbox: true
            }
        ],
        data: [{GUNS_NUM: '', GUNS_FEATURE: '', CASE_NUM: '', ISIDENTIFY: ''}]
    });

    var count = $('#feature').bootstrapTable('getData').length;
    // $("#counts").html(count);
    guns.init();

});
serviceOA.business = "/guns";

var guns = {

    //过于存放表单数据 根据自己业务自定义
    data: {},

    //设置data数据
    set: function (key, val) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;

        return this;
    },

    init: function () {
        serviceOA.initdata = guns.initdata;
        serviceOA.checkData = guns.checkData;
        serviceOA.lock = guns.lock;

        serviceOA.saveData = guns.saveData;
        serviceOA.afterinit = guns.afterinit;
        serviceOA.otheropinion = guns.saveConclusion;
        serviceOA.speciaCheck = guns.speciaCheck;
        serviceOA.initTask();
        guns.getCount();


    },

    initdata: function (data) {

        debugger;
        $("#cyrName").val(data.manMsg[0].CYRNAME);
        $("#gender").val(data.manMsg[0].GENDER);
        $("#age").val(data.manMsg[0].AGE);
        $("#address").val(data.manMsg[0].ADDRESS);
        $("#caseBrief").val(data.manMsg[0].CASEBRIEF);
        $("#businessId").val(data.manMsg[0].BUSINESSID);
        $("#dept").val(data.manMsg[0].PRE_DEPT);
        $("#num").val(data.manMsg[0].PRE_NUM);
        $("#counts").html(data.manMsg[0].COUNTS);
        if (nodeName != 'b') {
            $("#conclusion").val(data.manMsg[0].CONCLUSION);
        }
        if (data.gunsMsg != null) {
            $("#feature").bootstrapTable('load', data.gunsMsg);
            // $("#counts").html(data.gunsMsg.length);
        }
        //因为插件特殊，流转过程中锁定，重新提交时放开
        if (!lockFlag) {
            $("#feature tr").unbind("click");
        }

    },

    saveData: function () {
        var tableInfo = $("#feature").bootstrapTable('getData');
        var business_data = {
            cyrName: $("#cyrName").val(),
            gender: $("#gender").val(),
            age: $("#age").val(),
            address: $("#address").val(),
            caseBrief: $("#caseBrief").val(),
            counts: $("#counts").val(),
            business: $("#business").val(),
            conclusion: $("#conclusion").val(),
            counts:$("#counts").html(),
            tableInfo: JSON.stringify(tableInfo)
        };
        debugger;
        serviceOA.business_data = business_data;
    },


    lock: function () {

        //锁定控件 表单业务控件
        if (serviceOA.isSubmit) {
            $('.ibox-title h2').html("仿真枪认定报告书");
            $('#preifr').css("display","");
        }
        $("#cyrName").attr("disabled", "disabled");
        $("#gender").attr("disabled", "disabled");
        $("#age").attr("disabled", "disabled");
        $("#address").attr("disabled", "disabled");
        $("#caseBrief").attr("disabled", "disabled");
        $(".btn-content").hide();
        $("#feature tr").unbind("click");
    },

    afterinit: function () {
        if (lockFlag) {
            $('.ibox-title h2').html("仿真枪认定委托书");
            $('#conclusionifr').css("display", "");
            $('#conclusion').attr("disabled", "disabled");
            $('#dept').attr("disabled", "disabled");
            $('#num').attr("disabled", "disabled");
        }
    },

    saveConclusion: function (type) {
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
            $.post("/guns/saveConclusion", param, function (data) {

            });
        }
    },


    add: function () {

        var data = {};
        $('#feature').bootstrapTable('append', data);
        var count = $('#feature').bootstrapTable('getData').length;
        // $("#counts").html(count);

    },

    delete: function () {
        var del = [];
        var as = $('#feature').bootstrapTable('getSelections');
        for (var i = 0; i < as.length; i++) {
            del.push(as[i].xh);
        }
        $('#feature').bootstrapTable('remove', {
            field: 'xh',
            values: del
        });
        // var count = $('#feature').bootstrapTable('getData').length;
        // $("#counts").html(count);
        var counts = 0;
        var lens = $('#feature').bootstrapTable('getData').length;
        for (var i = 0; i < lens; i++) {
            var aaa = $("#feature").children("tbody").children("tr:eq(" + i + ")").children("td:eq(3)")/*.children().children("input").val()*/;

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
            if (guns.check()) return true;
        }
        else {
            if (guns.check()) return true;
            if (opinionFlag) return false;
            /* if (guns.control()) return true;*/
        }
        return false;
    },

    speciaCheck:function () {
        if ($.trim($('#dept').val()).length == 0 ) {
            toastr.warning("请填写仿真枪初次认定部门", "友情提示!");
            return true;
        }
        if ($.trim($('#num').val()).length == 0 ) {
            toastr.warning("请填写仿真枪认定报告书编号", "友情提示!");
            return true;
        }
        if ($.trim($('#conclusion').val()).length == 0 ){
            toastr.warning("请填写认定结论", "友情提示!");
            return true;
        }
        return false;
    },

    check: function () {
        if ($.trim($('#cyrName').val()).length == 0) {
            toastr.warning("请填写姓名", "友情提示!");
            return true;
        }
        if ($.trim($('#age').val()).length == 0 || $('#age').val()<=0) {
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
        var tableInfo = $("#feature").bootstrapTable('getData');
        var regex = /^[1-9]\d*$/;
        if (tableInfo.length != 0) {
            for (var i = 0; i < tableInfo.length; i++) {
                var case_num = tableInfo[i].CASE_NUM;
                var guns_num = tableInfo[i].GUNS_NUM;
                var guns_feature = tableInfo[i].GUNS_FEATURE;
                var isIdentify = tableInfo[i].ISIDENTIFY;

                if ($.trim(guns_num).length == 0) {
                    toastr.warning("基本特征送检编号不许为空", "友情提示!");
                    return true;
                }
                if ($.trim(guns_feature).length == 0) {
                    toastr.warning("基本特征不许为空", "友情提示!");
                    return true;
                }
                if (!regex.test(case_num)) {
                    toastr.warning("请填写正确的涉案数量", "友情提示!");
                    return true;
                }
                if ($.trim(isIdentify).length == 0) {
                    toastr.warning("是否鉴定不许为空", "友情提示!");
                    return true;
                }
            }
        } else {
            toastr.warning("请填写仿真枪支特征!", "友情提示!");
            return true;
        }

        return false;
    },
    getCount: function () {

        var counts = 0;
        $(document).on("change", function () {
            counts = 0;
            var lens = $('#feature').bootstrapTable('getData').length;
            for (var i = 0; i < lens; i++) {
                var aaa = $("#feature").children("tbody").children("tr:eq(" + i + ")").children("td:eq(3)")/*.children().children("input").val()*/;

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


/**
 * 角色详情对话框（可用于添加和修改对话框）
 */
var RolInfoDlg = {
    roleInfoData: {},
    deptZtree: null,
    pNameZtree: null,
    validateFields: {
        name: {
            validators: {
                notEmpty: {
                    message: '用户名不能为空'
                }
            }
        },
        tips: {
            validators: {
                notEmpty: {
                    message: '别名不能为空'
                }
            }
        },
        pName: {
            validators: {
                notEmpty: {
                    message: '父级名称不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
RolInfoDlg.clearData = function () {
    this.roleInfoData = {};
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
RolInfoDlg.set = function (key, val) {
    this.roleInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
RolInfoDlg.get = function (key) {
    return $("#" + key).val();
};

/**
 * 关闭此对话框
 */
RolInfoDlg.close = function () {
    parent.layer.close(window.parent.Role.layerIndex);
};

/**
 * 点击部门input框时
 *
 * @param e
 * @param treeId
 * @param treeNode
 * @returns
 */
RolInfoDlg.onClickDept = function (e, treeId, treeNode) {
    $("#dept").attr("value", RolInfoDlg.deptZtree.getSelectedVal());
    $("#deptid").attr("value", treeNode.id);
};
RolInfoDlg.onDblClickDept = function (e, treeId, treeNode) {
    $("#dept").attr("value", RolInfoDlg.deptZtree.getSelectedVal());
    $("#deptid").attr("value", treeNode.id);
    $("#deptContent").fadeOut("fast");
};

/**
 * 点击父级菜单input框时
 *
 * @param e
 * @param treeId
 * @param treeNode
 * @returns
 */
RolInfoDlg.onClickPName = function (e, treeId, treeNode) {
    $("#pName").attr("value", RolInfoDlg.pNameZtree.getSelectedVal());
    $("#pid").attr("value", treeNode.id);
};

/**
 * 显示部门选择的树
 *
 * @returns
 */
RolInfoDlg.showDeptSelectTree = function () {
    Feng.showInputTree("dept", "deptContent");
};

/**
 * 显示父级菜单的树
 *
 * @returns
 */
RolInfoDlg.showPNameSelectTree = function () {
    Feng.showInputTree("pName", "pNameContent");
};

/**
 * 收集数据
 */
RolInfoDlg.collectData = function () {
    this.set('id').set('name').set('pid').set('deptid').set('tips').set('num');
};

/**
 * 验证数据是否为空
 */
RolInfoDlg.validate = function () {
    $('#roleInfoForm').data("bootstrapValidator").resetForm();
    $('#roleInfoForm').bootstrapValidator('validate');
    return $("#roleInfoForm").data('bootstrapValidator').isValid();
};


$(function () {
/*    Feng.initValidator("roleInfoForm", RolInfoDlg.validateFields);

    var deptTree = new $ZTree("deptTree", "/dept/tree");
    deptTree.bindOnClick(RolInfoDlg.onClickDept);
    deptTree.bindOnDblClick(RolInfoDlg.onDblClickDept)
    deptTree.init();
    RolInfoDlg.deptZtree = deptTree;

    var pNameTree = new $ZTree("pNameTree", "/role/roleTreeList");
    pNameTree.bindOnClick(RolInfoDlg.onClickPName);
    pNameTree.init();
    RolInfoDlg.pNameZtree = pNameTree;*/
});




