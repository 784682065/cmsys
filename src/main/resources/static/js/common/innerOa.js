/**
 * OA 前端框架JS
 * @type {string}
 */

/**
 * 附件使用的JSON对象
 * @type {string}
 */

var opinionFlag = false;

var lockFlag = false;

var rollbackFlag = true;

var nodeName;

var title;

var isWrite = false;

var isEnd = false;

var error = false;

$(function () {
    serviceOA.GetRequest();
    serviceOA.addCtx(Feng.ctxPath);
    //消息提示框 属性设置
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "200",
        "hideDuration": "500",
        "timeOut": "2000",
        "extendedTimeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $('#listatt').bootstrapTable({
        editable: true,//开启编辑模式
        clickToSelect: false,
        showToggle: false, //显示切换按钮来切换列表/卡片视图
        showPaginationSwitch: false, //显示分页切换按钮
        pagination: true,  //是否分页
        pageList: [10],
        pageSize: 10,
        pageNumber: 1,
        uniqueId: 'xh', //将index列设为唯一索引
        striped: true,
        search: false,  //显示检索框
        showRefresh: false,  //显示刷新按钮
        columns: [
            {
                field: "xh", title: "序号", align: "center", edit: false, formatter: function (value, row, index) {
                    return row.xh = index + 1;
                }
            },
            {
                field: "FILENAME", title: "已上传文件名", align: "center", sortable: true
            },
            {
                field: "FILEID", title: "文件ID", align: "center", sortable: true
            },
            {
                field: "FILEURL", title: "文件URL", align: "center", sortable: true
            },
            {
                field: "CONTROL",
                title: "操作",
                align: "center",
                sortable: true,
                formatter: function (value, row, index) {
                    return '<button onclick="serviceOA.deleAttach(\'' + row.FILEID + '|' + row.FILEURL + '\')" class="btn-xs btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</button>';
                }
            }
        ]
    });

    $('#listatt').bootstrapTable('hideColumn', 'FILEID');
    $('#listatt').bootstrapTable('hideColumn', 'FILEURL');


});


var serviceOA = {

    taskId: {},


    ctxPath: "",

    isSubmit: false,

    isAgree: false,

    isProcess: false,

    hasAttach: false,

    attach: {},

    business_data: {},

    opinion_data: {},

    business: "",

    process_initTask: Feng.ctxPath + "/OA/init",

    process_startFlow: Feng.ctxPath + "/OA/startFlow",

    process_completeTask: Feng.ctxPath + "/OA/complete",

    process_getAuthority: Feng.ctxPath + "/OA/getAuthority",

    process_rollbackTask: Feng.ctxPath + "/OA/rollback",

    process_cancelTask: Feng.ctxPath + "/OA/endProcess",

    attach_name: Feng.ctxPath + "/file/delete",

    attach_list: Feng.ctxPath + "/file/list",

    process: {},


    addCtx: function (ctx) {
        if (this.ctxPath == "") {
            this.ctxPath = ctx;
        }
    },


    GetRequest: function () {
        var url = window.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        //封装成JSON对象
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        $('#task').val(theRequest.task);
        $('#business').val(theRequest.business);
        $('#process').val(theRequest.process);
        $('#instance').val(theRequest.instanceid);
        $('#isCheck').val(theRequest.isCheck);
        nodeName = theRequest.nodeName;

    },


    read: function (business) {
        $('#businessno').html('单号：' + business);

        $.post(serviceOA.business + "/read", {business: business}, function (data) {
            serviceOA.initdata(data);


            //页面查看
            if ($('#isCheck').val() == "Y") {
                //锁定全部可编辑按钮
                //隐藏所有button按钮
                // $("table tr").unbind("click");
                //
                // $(".row").find("input").attr("disabled", "disabled");
                // $(".row").find("textarea").attr("disabled", "disabled");
                // $("button").css("display", "none");
                // $("#attach2").css("display", "");
                // $('#info').hide();


            }
        });

    },

    initdata: function (data) {

    },

    getInfo: function (data) {

    },


    init: function () {
        //初始化按钮组
        if (!serviceOA.isSubmit) {
            $("#oasubmit").css('display', '');
            $("#attach").css('display', '');

        } else {
            if (!lockFlag) {
                if (rollbackFlag) {
                    $("#oarollback").css('display', '');
                } else {
                    $("#oarollback").css('display', 'none');
                }
                $("#oaagree").css('display', '');
                $("#attach2").css('display', '');
            }

            serviceOA.opinionInit();

            getAttach();

        }


        //展示所有组件及内容 隐藏按钮
        if ($('#isCheck').val() == "Y") {
            $('.my-form-box.form-horizontal').css('display', '');
            serviceOA.opinionInit();
            $("button").css("display", "none");
            $("#attach2").css("display", "");
            getAttach();
        }

    },

    //页面初始化 均执行该方法
    initTask: function () {

        //解决路径冲突问题
        serviceOA.business = Feng.ctxPath + serviceOA.business;


        var task = $("#task").val();
        if (task == "") {
            if ($('#isCheck').val() == 'Y') {
                serviceOA.lock();
                serviceOA.read($('#business').val());
                serviceOA.SeeLock();
            } else {
                $.post(serviceOA.business + "/seq", function (data) {
                    $("#business").val(data.business);
                    $("#process").val(data.process);
                    $("#promoter").val(data.promoter);
                    $('#businessno').html('单号：' + data.business);

                });
                $.post(serviceOA.business + "/getInfo", function (data) {
                    serviceOA.getInfo(data);
                });
            }
            serviceOA.init();
        } else {
            $.post(serviceOA.process_initTask, {taskId: $("#task").val()}, function (data) {
                if (2000 == data.rtnCode) {
                    serviceOA.isSubmit = true;
                    serviceOA.taskId = {
                        TASKID: $("#task").val()
                    };
                    serviceOA.lock();
                    serviceOA.read($('#business').val());
                    serviceOA.SeeLock();
                    $.post(serviceOA.business + "/title", {nodeName: nodeName}, function (data) {
                        if (data.rtnCode == "2000") {
                            title = data.title;
                        }
                    });

                    $.post(serviceOA.business + "/isWrite", {
                        business: $('#business').val(),
                        node: nodeName
                    }, function (data) {
                        if (data) {
                            isWrite = true;
                        }
                    });


                }
                serviceOA.init();
            });

        }


    },


    saveData: function (data) {

    },


    checkData: function () {

    },

    submit: function () {

        if (serviceOA.checkData()) return;


        if (serviceOA.isSubmit) {
            toastr.warning("请勿重复提交", "温馨提示!");
            return;
        }


        bootbox.confirm({
            container: '.bootbox-container',
            size: "medium",
            title: "温馨提示",
            className: "my-modal",
            message: "<h3 style=' font-size: 16px; margin: 20px auto'>请确认内容是否无误？</h3>",
            buttons: {
                confirm: {
                    className: 'btn-info btn-md',
                    label: '<i class="fa fa-check"></i> 确认'
                },
                cancel: {
                    className: 'btn-danger btn-md',
                    label: '<i class="fa fa-times"></i> 取消'
                }
            },
            callback: function (res) {
                if (res) serviceOA.tmp_save();
            }
        });

    },

    resubmit: function () {


        if (isEnd) {
            toastr.error("该流程已作废！", "操作提示");
            return;
        }

        if (serviceOA.checkData()) return;

        serviceOA.saveData();
        serviceOA.saveAttach();
        $("#oaresubmit").attr("disabled", "disabled");
        $("#oastop").attr("disabled", "disabled");

        $.post(serviceOA.business + "/update", serviceOA.business_data, function (data) {

            if (data.rtnCode == '2000') {
                serviceOA.saveAttach();
                $.post(serviceOA.process_completeTask, {TASKID: $('#task').val()}, function (data) {
                    if ('2000' == data.rtnCode) {
                        toastr.info("重新提交完成！", "");
                        $(".row").find("input").attr("disabled", "disabled");
                        $(".row").find("textarea").attr("disabled", "disabled");
                        $(".row").find("select").attr("disabled", "disabled");
                        $("table tr").unbind("click");

                        //锁定上传控件 防止再次上传
                        $('.input-group.file-caption-main').css('display', 'none');
                        $('#listatt').find('button').attr("disabled", "disabled");
                    } else {
                        toastr.error(data.errorMessage, "");
                        $("#oaresubmit").attr("disabled", false);
                        $("#oastop").attr("disabled", false);

                    }
                });

            }
        });


    },

    rollback: function () {
        if ($('#user_opinion').length > 0) {

            if (isWrite && $('#user_opinion').val().trim() == "" && !opinionFlag) {
                toastr.warning('请输入您的审批意见！', '操作提示');
                return;
            }
        }
        if (serviceOA.speciaCheck()) {
            return;
        }
        $('#oaagree').attr('disabled', 'disabled');
        $('#oarollback').attr('disabled', 'disabled');

        if (!error) {
            serviceOA.opinion("2");
            serviceOA.otheropinion("2");
        }

        $.post(serviceOA.process_rollbackTask, {TASKID: $('#task').val()}, function (data) {
            if (data.rtnCode == 2000) {
                toastr.info('流程驳回成功！', '操作提示');
                $("#oaagree").css('display', 'none');
                $("table tr").unbind("click");
            } else {
                error = true;
                toastr.warning(data.errorMessage, "操作提示");
                $('#oaagree').attr('disabled', false);
                $('#oarollback').attr('disabled', false);
            }
        });
    },

    speciaCheck: function () {

    },

    goNext: function () {
        if ($('#user_opinion').length > 0) {

            if ($('#user_opinion').val().trim() == "" && !opinionFlag && isWrite) {
                toastr.warning('请输入您的审批意见！');
                return;
            }

        }


        if (serviceOA.speciaCheck()) {
            return;
        }
        $('#oarollback').attr('disabled', 'disabled');


        //防止重复审批
        if (serviceOA.isAgree) {
            toastr.warning("", "该任务已流转至下一节点，该操作已经无效！");
            return;
        }

        $('#oaagree').attr('disabled', 'disabled');
        if (!error) {
            serviceOA.opinion("1");
            serviceOA.otheropinion("1");
        }

        //提交至下一节点
        $.post(serviceOA.process_completeTask, serviceOA.taskId, function (data) {
            if ('2000' == data.rtnCode) {
                serviceOA.isAgree = true;
                toastr.info("审批完成！", "");
                $('#oarollback').css('display', 'none');
            } else {
                error = true;

                toastr.warning(data.errorMessage, "操作提示");

                $('#oarollback').attr('disabled', false);
                $('#oaagree').attr('disabled', false);
            }
        });

    },
    cancel: function () {
        bootbox.confirm({
            container: '.bootbox-container',
            size: "medium",
            title: "温馨提示",
            className: "my-modal",
            message: "<h3 style=' font-size: 16px; margin: 20px auto'>请确认是否需作废当前流程？</h3>",
            buttons: {
                confirm: {
                    className: 'btn-info btn-md',
                    label: '<i class="fa fa-check"></i> 确认'
                },
                cancel: {
                    className: 'btn-danger btn-md',
                    label: '<i class="fa fa-times"></i> 取消'
                }
            },
            callback: function (res) {
                if (!isEnd) {
                    if (res) serviceOA.close();
                } else {
                    toastr.warning('', '流程已作废请勿重复操作！');
                }
            }
        });
    },
    close: function () {
        $.post(serviceOA.process_cancelTask, {PROCESSINSTANCEID: $('#instance').val()}, function (data) {

            if (data.rtnCode == 2000) {
                toastr.info('流程作废成功！', '操作提示');
                isEnd = true;
            } else {
                toastr.error(data.errorMessage, "");
            }

        });


    },

    speciallock: function () {

    },
    tmp_save: function () {

        $('#oasubmit').attr("disabled", "disabled");

        //保存业务数据
        serviceOA.saveData();

        //保存业务数据并启动工作流

        $.post(serviceOA.business + "/save", serviceOA.business_data, function (data) {

            if (2000 == data.rtnCode) {

                //保存附件

                serviceOA.saveAttach();
                serviceOA.process = {
                    PROCESSID: $("#process").val(),
                    PROMOTER: $("#promoter").val(),
                    BUSINESSID: $("#business").val()
                };

                if (data.VARIABLES != undefined && data.VARIABLES != null && data.VARIABLES != "") {
                    serviceOA.process['VARIABLES'] = data.VARIABLES;
                }
                $.post(serviceOA.process_startFlow, serviceOA.process, function (data) {
                    if (data.rtnCode == 2000) {
                        $('#oasubmit').attr("disabled", false);
                        toastr.info("操作成功！", "");
                        serviceOA.SeeLock();
                        serviceOA.lock();
                        //锁定上传控件 防止再次上传
                        $('.input-group.file-caption-main').css('display', 'none');
                        $('#listatt').find('button').attr("disabled", "disabled");
                        serviceOA.isSubmit = true;
                    } else {
                        toastr.error(data.errorMessage, "操作提示");
                        $('#oasubmit').attr("disabled", false);
                    }
                });


            } else {
                toastr.error("业务系统异常，请联系管理员！", "操作提示");
                $('#oasubmit').attr("disabled", false);

            }
        });


    },

    deleAttach: function (data) {

        var o = data.split("|");
        var del = [];
        del.push(o[0]);
        $('#listatt').bootstrapTable('remove', {
            field: 'FILEID',
            values: del
        });

        $.post(serviceOA.attach_name, {
            fileid: o[0],
            process: $("#process").val(),
            business: $("#business").val(),
            fileurl: o[1] == "undefined" ? '' : o[1]
        }, function (data) {

            if (data.rtnCode == 2000) {
                toastr.info('文件删除成功！');
            }
        });

    },


    saveAttach: function () {


        var t = $('#listatt').bootstrapTable('getData');
        if (t.length > 0) {
            $.post('/file/save', {
                fileid: JSON.stringify(t),
                process: $("#process").val(),
                business: $("#business").val()
            }, function (data) {
            })
        }

    },

    //提供覆盖方法
    lock: function () {


    },
    SeeLock: function () {

        if ($('#task').val() == "") {


        } else {
            if ($('#isCheck').val() != "Y") {
                //获取组件权限的内容 进行前端展示 变更为同步方法
                $.ajax({
                    url: serviceOA.process_getAuthority,
                    async: false,
                    type: 'post',
                    data: {TASKID: $('#task').val()},
                    success: function (data) {
                        if (data.rtnCode == 2000) {
                            var control = data.authority;
                            for (var i = 0; i < control.length; i++) {
                                serviceOA.control(control[i].component, control[i].authority)
                            }
                        } else {
                            toastr.error(data.errorMessage, "");
                        }
                        serviceOA.afterinit();

                    }
                });

            }
        }


    },
    afterinit: function () {

    },
    opinion: function (type) {

        //刀枪 意见区域不存在即 不保存意见
        if ($('#user_opinion').length <= 0) return;

        if ((opinionFlag && !isWrite) || $('#user_opinion').val() == "") return;

        serviceOA.opinion_data = {
            type: type,
            title: title,
            node: nodeName,
            opinion: $('#user_opinion').val(),
            business: $('#business').val(),
            instance: $('#instance').val()
        };


        $.ajax({
            url: serviceOA.business + "/opinion",
            data: serviceOA.opinion_data,
            type: 'post',
            async: false,
            success: function (data) {
                if (data.rtnCode == 2000) {
                    $(".my-form-box.form-horizontal.opinion").find("textarea").attr("readonly", true);
                } else {
                    toastr.error('意见保存失败请联系管理员！');
                }
            }
        });


    },

    otheropinion: function (type) {

    },

    opinionInit: function () {

        if ($('#isCheck').val() == "Y" || lockFlag || opinionFlag) {
            $('#opinionarea').css('display', 'none');

        } else {

            $("#opinionarea").css('display', '');

        }


        $.post(serviceOA.business + "/opinionList", {business: $('#business').val()}, function (data) {
            if (data.rtnCode == 2000) {
                if (data.opinion.length > 0) $('#opinionhisarea').css('display', '');
                for (var i = 0; i < data.opinion.length; i++) {
                    var opinionType = '';
                    if (data.opinion[i].OPINIONTYPE == '通过') {
                        opinionType = '<span class="label label-info">' + data.opinion[i].OPINIONTYPE + '</span>'
                    } else if (data.opinion[i].OPINIONTYPE == '驳回') {
                        opinionType = '<span class="label label-danger">' + data.opinion[i].OPINIONTYPE + '</span>'
                    }

                    $('#opinionhis').append(
                        '<div style="overflow: hidden;color: #333333;"><div id="opinionname" class="fl" >  ' + data.opinion[i].OPINIONTITLE + '&nbsp;&nbsp;&nbsp;>>&nbsp;&nbsp;&nbsp;' + data.opinion[i].USERNAME + '&nbsp;&nbsp;&nbsp;>>&nbsp;&nbsp;&nbsp;' + opinionType + ' </div><div id="opiniondate" class="fr" >' + data.opinion[i].OPINIONDATE + '</div></div>\n' +
                        '    <textarea class="form-control"   rows="3"\n' +
                        '     style="resize: none;margin-top: 5px" readonly> ' + data.opinion[i].OPINION + ' </textarea> <hr>\n'
                    );


                }


            } else {

            }

        })


    },

    //设置data数据
    set: function (key, val) {
        this.business_data[key] = (typeof value == "undefined") ? $("#" + key).val() : val;
        return this;
    },
    //设置组件权限
    control: function (data, val) {

        if (data == 'lock') {

            //重新提交 删除页面提示
            $('#info').remove();


            $('#opinionarea').css('display', 'none');

            lockFlag = true;
            $(".row").find("input").attr("disabled", false);
            $(".row").find("select").attr("disabled", false);
            $(".row").find("textarea").attr("disabled", false);

            $("button").css("display", "none");

            $(".btn-content").show();


            $("#oaresubmit").css("display", "");
            $("#oastop").css("display", "");
            $("#attach").css("display", "");
            var z = {business: $('#business').val()};
            $.post('/file/init', z, function (res) {
                if (res.list.length != 0) {
                    $('#listatt').bootstrapTable('load', res.list);
                }
            });


            //驳回开启意见区域 展示各部门意见 只读
            // $('.my-form-box.form-horizontal.opinion').find('div').css("display", '');
            $('.my-form-box.form-horizontal.opinion').find('textarea').attr("readonly", true);
            return;
        }


        //根据读取的权限进行组件控制
        var p = data.substring(0, data.length - 3);
        if ("Hide" == val) {
            //对意见展示进行控制
            if (data == "opinion") {
                opinionFlag = true;
                $("#opinionarea").css('display', 'none');
            }
            $("#" + data).css('display', 'none');
            if ("oarollback" == data) {
                rollbackFlag = false;
            }
        } else if ("ReadAndWrite" == val) {
            $("#" + data).css('display', '');
            $("#" + p).attr('readonly', false);

        } else {
            if ($("#" + p).val() != "") {
                $("#" + data).css('display', '');
            }
            $("#" + p).attr('readonly', true);
        }


    }


};
//BOOTSTRAP FILEINPUT 初始化
$('#file-zh').fileinput({
    theme: 'fa',
    language: 'zh',
    uploadUrl: '/file/upload',
    uploadAsync: false,
    showPreview: false,
    uploadExtraData: function () {
        var updata = {process: $("#process").val(), business: $("#business").val()};
        return updata;
    },
    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'gif', 'docx', 'doc', 'xls', 'xlsx', 'zip', 'rar', 'txt', 'ppt', 'pptx']
});

//导入文件上传完成之后的事件
$("#file-zh").on("filebatchuploadsuccess", function (event, data) {
    if (data.response.rtnCode == 2000) {
        toastr.info("", "附件上传成功!");
        serviceOA.hasAttach = true;
        for (var i = 0; i < data.response.list.length; i++) {
            //文件上传成功返回的文件名，可返回自定义文件名
            var text = data.response.list[i].text;
            var id = data.response.list[i].id;
            var o = {
                FILENAME: text,
                FILEID: id
            };
            $('#listatt').bootstrapTable('append', o);

        }
        $("#listatt tr").unbind("click");

    } else if (data.response.rtnCode == 3000) {
        toastr.error("流程已经提交，附件无法再次上传！", "");
    } else {
        toastr.error("附件上传失败!请联系管理员！", "");
    }

});


function getAttach() {

    $.post(serviceOA.attach_list, {businessId: $('#business').val()}, function (data) {
        //在流程中获取上传的附件
        $('#attlist').bootstrapTable('load', data);
        if (data.length != 0) {
            $('#info').html('<p style="text-align: center;font-weight: bold"><strong>温馨提示 ：该流程存在附件，请点击下载查看!</strong></p> ');
        } else {
            $('#info').html('<p style="text-align: center;font-weight: bold"><strong>温馨提示 ：该流程未上传附件!</strong></p> ');
        }
        //因为插件版本冲突bootstrap table 必须加入该方法
        //请勿修改 谢谢
        $("#attlist tr").unbind("click");

    });

}
