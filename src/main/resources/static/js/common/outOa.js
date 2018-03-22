/**
 * 外跑OA 前端框架
 * @author：meihw
 * @type {{}}
 */



$(function () {

    //模态关闭触发事件

    $('#person').on('hide.bs.modal', function () {
        out.unlock();
    });


    //消息提示框 属性设置
    toastr.options = {
        "closeButton": false,
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
                field: "FILENAME", title: "下载文件名", align: "center", sortable: true
            },
            {
                field: "FILEID", title: "文件ID", align: "center", sortable: true, visible: false
            },
            {
                field: "FILEURL", title: "文件URL", align: "center", sortable: true, visible: false
            },
            {
                field: "CONTROL",
                title: "操作",
                align: "center",
                sortable: true,
                formatter: function (value, row, index) {
                    return '<button onclick="out.download(\'' + row.FILEID + '|' + row.FILEURL + '\')" class="btn-xs btn-danger"><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>下载</button>';
                }
            }
        ]
    });

    out.GetRequest();

});


var task;

var process;

var business;

var promoter;

var instance;

var isCheck;

var title;

var nodeName;

var isSync = 'Y';

var persons = "";

var selIds = [];//存放选中的id

var pick = false;

var end = false;

var out = {


    data: {},

    business: "",

    out_disagree: "/govern/disagree",

    out_accept: "/govern/accept",
    //办结
    out_reject: "/govern/end",

    out_patch: "/govern/patch",

    out_person: "/OA/person",

    next: "/OA/complete",

    rollback: "/OA/rollback",

    suspended: "/OA/suspended",

    end: "/OA/endProcess",

    inittask: "/OA/init",

    authority: Feng.ctxPath + "/OA/getAuthority",

    attach_list: Feng.ctxPath + "/file/list",

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
        task = theRequest.task;
        if (task != undefined) {
            $.post(out.inittask, {taskId: task}, function (data) {
                if (data.rtnCode != "2000") {
                    toastr.error("工作流程初始化异常，请联系管理员", "页面提示");
                }
            })
        }
        business = theRequest.business;
        process = theRequest.process;
        instance = theRequest.instanceid;
        isCheck = theRequest.isCheck;
        nodeName = theRequest.nodeName;


    },

    /**
     * 初始化方法
     */
    init: function () {

        if (business == undefined) return;

        if (isCheck == 'Y') {

            $('#group2').find('button').css('display', 'none');
            $('#opinionarea').css('display', 'none');
        }


        //初始化业务数据
        $.post(out.business + "/init", {business: business}, function (data) {

            if (data.rtnCode == "2000") {
                out.initdata(data);
                $('#businessno').html('单号：' + business);
            } else {
                toastr.warning('获取表单数据失败！', '页面提示')
            }
        });

        $.post(out.authority, {TASKID: task}, function (data) {

            if (data.rtnCode == "2000") {
                var control = data.authority;
                for (var i = 0; i < control.length; i++) {
                    // if (control[i].component == "approve") {
                    //
                    //     $('#group1').css('display', 'none');
                    //     $('#group2').css('display', '');
                    //     $('#opinionarea').css('display', '');
                    //
                    // } else if (control[i].component == "end") {
                    //
                    //     $('#group1').css('display', 'none');
                    //     $('#end').css('display', '');
                    //
                    //
                    // } else if (control[i].component == "pick") {
                    //     pick = true;
                    //
                    // }

                    if (control[i].component == "approve") {


                    } else if (control[i].component == "end") {
                        end = true;

                    } else if (control[i].component == "pick") {
                        pick = true;

                    }


                }
            }

        });
        $.post(out.business + "/title", {nodeName: nodeName}, function (data) {
            if (data.rtnCode == "2000") {
                title = data.title;
            } else {
                toastr.warning('获取审批意见失败！', '页面提示')
            }
        });

        //初始化意见列表
        out.opinionList();
        getAttach()
    },


    initdata: function (data) {


    },


    //设置data数据
    set: function (key, value) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    },

    /**
     * 意见内容校验
     */
    opinion_check: function () {
        if ($('#user_opinion').val().trim() == '') {
            out.unlock();
            toastr.warning("请输入审批意见", "温馨提示!");
            return true;
        }
        return false;
    },


    /**
     *  事务处理统一入口
     * @author meihw
     * @date 2017/11/13 15:22
     */

    deal: function (title, f, type, _type) {
        out.lockButton();
        //意见保存
        if (_type != "") {
            //意见校验
            if (out.opinion_check()) return;

        }
        //执行方法 事项完成后再保存意见
        out.confirm(title, f, type);
    },


    /**
     * 不予审批
     */
    disagree: function () {
        if (pick) {
            $('#pickperson').trigger('click');
            return;
        }
        $.post(out.next, {TASKID: task}, function (data) {
            if (data.rtnCode == "2000") {

                toastr.info('审批完成', '操作提示');
                $('#user_opinion').attr('disabled', true);
                out.opinion('2', isSync);

            } else {
                toastr.error(data.errorMessage, '操作提示');
                out.unlock();
            }
        })

    },
    /**
     * 审批
     */
    agree: function () {
        if (pick) {
            $('#pickperson').trigger('click');
            return;
        }
        $.post(out.next, {TASKID: task}, function (data) {
            if (data.rtnCode == "2000") {
                toastr.info('审批完成', '操作提示');
                $('#user_opinion').attr('disabled', true);
                out.opinion('1', isSync);
            } else {
                toastr.error(data.errorMessage, '操作提示');
                out.unlock();
            }
        })

    },


    /**
     * 选择处理人
     */


    pickPerson: function () {

        initZtree();
    },


    /**
     * 受理
     */
    accept: function () {

        $.post(out.next, {TASKID: task}, function (data) {
            if (data.rtnCode == "2000") {
                $.post(out.out_accept, function (data) {
                    if (data.rtnCode == "2000") {
                        toastr.info('受理成功', '操作提示');
                    }
                });
            } else {
                out.unlock();
            }
        })
    },

    /**
     * 不予受理
     */
    reject: function (type) {

        var a = $('#end_opinion').val();
        var b = $('#transaction_opinion').val();
        if (a == '' && type == "不予受理") {
            out.unlock();
            toastr.warning('请输入审批不通过的原因', '操作提示');
            return
        }
        if (b == '' && type == "2") {
            out.unlock();
            toastr.warning('请输入办结的原因', '操作提示');
            return
        }
        if (type == "2") {
            var c = $('.transact').find('input:radio:checked');
            type = $(c).val();
        }


        if (type == "不予受理") {
            $.post(out.end, {PROCESSINSTANCEID: instance}, function (data) {
                if (data.rtnCode == "2000") {
                    $.post(out.out_reject, {
                        opinion: a == '' ? b : a,
                        type: type, proid: business
                    }, function (data) {
                        if (data.rtnCode == "2000") {
                            toastr.info('审批不予通过完成', '操作提示');
                            $('#transact').modal("hide");
                            $('#transaction').modal("hide");
                        }
                    });
                } else {
                    out.unlock();
                }
            })
        } else {

            $.post(out.next, {TASKID: task}, function (data) {
                if (data.rtnCode == "2000") {
                    $.post(out.out_reject, {
                        opinion: a == '' ? b : a,
                        type: type, proid: business
                    }, function (data) {

                        if (data.rtnCode == "2000") {
                            toastr.info('办结完成', '操作提示');
                            $('#transact').modal("hide");
                            $('#transaction').modal("hide");
                        }
                    });
                } else {
                    out.unlock();
                }
            })


        }

    },

    /**
     * 补齐补正
     */
    patch: function () {

        var a = $('#limit').val();
        var b = $('#unit').val();
        var c = $('#patch_opinion').val();

        if (c == "") {
            toastr.warning('请输入补齐补正的原因', '操作提示');
            return
        }


        $.post(out.suspended, {TASKID: task}, function (data) {

            if (data.rtnCode == '2000') {
                $.post(out.out_patch, {
                    limit: a,
                    unit: b,
                    opinion: c,
                    proid: business

                }, function (data) {
                    if (data.rtnCode == "2000") {
                        toastr.info('补齐补正完成', '操作提示');

                    } else {
                        toastr.error('补齐补正信息发送异常', '操作提示');

                    }
                });
            } else {
                out.unlock();
                toastr.error('补齐补正内部流转异常，请联系管理员', '操作提示');

            }

        });


        $('#patch').modal("hide");
    },

    download: function () {


    },


    /**
     *  提交事务是否需要confirm
     *
     */

    confirm: function (title, f, type) {

        if (title == "") {
            f(type);
            return;
        }
        bootbox.confirm({
            container: '.bootbox-container',
            size: "medium",
            title: "温馨提示",
            className: "my-modal",
            message: "<h3 style=' font-size: 16px; margin: 20px auto;color: black'>" + title + "</h3>",
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
                if (res) {
                    f();
                }

            }
        });

    },


    opinion: function (type) {

        if ($('#user_opinion').val().trim() == "") return;


        var opinion_data = {
            type: type,
            title: title,
            node: nodeName,
            opinion: $('#user_opinion').val(),
            business: business
        };

        $.post(out.business + "/opinion", opinion_data, function (data) {
            if (data.rtnCode == 2000) {

                $(".my-form-box.form-horizontal").find("textarea").attr("readonly", true);
            } else {
                toastr.error('意见保存失败请联系管理员！');
            }

        });

    },

    /**
     * 加载意见列表
     */
    opinionList: function () {
        if ($('#isCheck').val() == 'Y') {
            $('#opinionhisarea').css('display', 'none');
        }
        $.post(out.business + "/opinionList", {business: business}, function (data) {
            if (data.rtnCode == 2000) {
                if (data.opinion.length > 0) $('#opinionhisarea').css('display', '');
                for (var i = 0; i < data.opinion.length; i++) {
                    var opinionType = '';
                    if (data.opinion[i].OPINIONTYPE == '通过') {
                        opinionType = '<span class="label label-info">' + data.opinion[i].OPINIONTYPE + '</span>'
                    } else if (data.opinion[i].OPINIONTYPE == '驳回') {
                        opinionType = '<span class="label label-danger">' + '审批不通过' + '</span>'
                    }
                    $('#opinionhis').append(
                        '<div style="overflow: hidden;color: #333333;"><div id="opinionname" class="fl" >  ' + data.opinion[i].OPINIONTITLE + '&nbsp;&nbsp;&nbsp;>>&nbsp;&nbsp;&nbsp;' + data.opinion[i].USERNAME + '&nbsp;&nbsp;&nbsp;>>&nbsp;&nbsp;&nbsp;' + opinionType + ' </div><div id="opiniondate" class="fr" >' + data.opinion[i].OPINIONDATE + '</div></div>\n' +
                        '    <textarea class="form-control"   rows="3"\n' +
                        '     style="resize: none;margin-top: 5px" readonly> ' + data.opinion[i].OPINIONTEXT + ' </textarea> <hr>\n'
                    );

                }
            }
        })


    },

    /**
     * 加载附件
     */
    attlist: function () {

    },
    lockButton: function () {
        $('#agree').attr("disabled", "disabled");
        $('#disagree').attr("disabled", "disabled");

    },
    unlock: function () {
        $('button').attr("disabled", false);

    }

};

/**
 * 加载用户树
 */

function initZtree() {

    var setting = {
        view: {
            selectedMulti: false
        },
        check: {
            enable: true,
            checkboxType: {
                "Y": "s",
                "N": "s"
            }
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {

            onAsyncSuccess: zTreeOnAsyncSuccess
        },
        async: {
            enable: true,
            autoParam: ["id"],
            url: "/dept/allTree",
            dataType: "json",
            dataFilter: ajaxDataFilter
        }
    };
    var zTree = new $ZTree("zTree", "/dept/allTree");
    zTree.setSettings(setting);
    zTree.init();
}

function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {

}

function ajaxDataFilter(treeId, parentNode, childNodes) {
    return childNodes;
}

function savePerson() {

    selIds = "";
    var selNames = "";
    var zTree = $.fn.zTree.getZTreeObj('zTree');
    var nodes = zTree.getCheckedNodes();
    if (nodes.length == 0) {
        toastr.error('请至少选择一个发送人员', '操作提示');
        out.unlock();
        return;
    }
    var node;
    for (var i = 0, l = nodes.length; i < l; i++) {
        node = nodes[i];
        if (!node.isParent) {
            selIds += node.id + ",";
            selNames += node.name + "，";
        }
        if (i === (l - 1)) {
            selIds = selIds.substring(0, selIds.length - 1);
            selNames = selNames.substring(0, selNames.length - 1);
        }
    }


    bootbox.confirm({
        container: '.bootbox-container',
        size: "medium",
        title: "温馨提示",
        className: "my-modal",
        message: "<h3 style=' font-size: 16px; margin: 20px auto;color: black'>" + "事项将发送给以下人员：" + selNames + "</h3>",
        buttons: {
            confirm: {
                className: 'btn-info btn-md',
                label: '<i class="fa fa-check"></i>&nbsp;发送'
            },
            cancel: {
                className: 'btn-danger btn-md',
                label: '<i class="fa fa-times" ></i>&nbsp;取消'
            }
        },
        callback: function (res) {
            if (res) {
                out.lockButton();
                pickFinal();
                out.opinion('1', isSync);
            } else {
                $('button').attr("disabled", false);
            }

        }
    });

    return;
}

function expand(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj('deptTree');
    var nodes = zTree.getChangeCheckedNodes();
    for (var i = 0, l = nodes.length; i < l; i++) {
        zTree.reAsyncChildNodes(treeNode, 'refresh', false);
    }

}


function pickFinal() {

    $.ajax({
        url: out.out_person,
        data: {PROCESSINSTANCEID: instance, PERSONS: selIds},
        async: false,
        success: function (data) {
            if (data.rtnCode == '2000') {
                $.post(out.next, {TASKID: task}, function (data) {
                    if (data.rtnCode == "2000") {
                        $('#user_opinion').attr('disabled', true);
                        toastr.info('已将流程发送给指定人员', '操作提示！');
                    } else {
                        toastr.error(data.errorMessage, '操作提示');
                        out.unlock();
                    }
                })

            } else {
                toastr.error(data.errorMessage, '操作提示');
            }
        }

    });


}

function getAttach() {

    $.post(out.attach_list, {businessId: business}, function (data) {
        //在流程中获取上传的附件
        $('#attlist').bootstrapTable('load', data);
        if (data.length != 0) {
            $('#info').html('<p style="text-align: center;font-weight: bold"><strong>温馨提示 ：该流程存在附件，请点击下载查看!</strong></p> ');
        } else {
            $('#info').html('<p style="text-align: center;font-weight: bold"><strong>温馨提示 ：该流程未上传附件!</strong></p> ');
        }

    });

}
