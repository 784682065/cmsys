/**
 * 外跑OA 前端框架
 * @author：meihw
 * @type {{}}
 */


$(function () {
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

var end = false;

var pick = false;
var out = {


    data: {},

    business: "",

    next: Feng.ctxPath + "/OA/complete",

    suspended: Feng.ctxPath + "/OA/suspended",

    end: Feng.ctxPath + "/OA/endProcess",

    inittask: Feng.ctxPath + "/OA/init",

    authority: Feng.ctxPath + "/OA/getAuthority",

    out_person: Feng.ctxPath + "/OA/person",

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
                $('#group1').css('display', 'none');
                $('#group2').css('display', '');
                $('#opinionarea').css('display', '');
                var control = data.authority;

                for (var i = 0; i < control.length; i++) {
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
        getAttach();
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
        if (_type != "") {
            //意见校验
            if (out.opinion_check()) return;
        }
        //执行方法
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
                out.opinion('2');

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
                out.opinion('1');

            } else {
                toastr.error(data.errorMessage, '操作提示')
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
            opinion: $('#user_opinion').val(),
            node: nodeName,
            business: business,
            issync: 'N',
            aljc: 'Y',
            flag: end ? 'Y' : 'N'
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
        $.post(out.business + "/opinionList", {business: business, aljc: 'Y'}, function (data) {
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
    var node;
    for (var i = 0, l = nodes.length; i < l; i++) {
        node = nodes[i];
        debugger;
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
        message: "<h3 style=' font-size: 16px; margin: 20px auto;color: black'>" + "是否发送给：" + selNames + "</h3>",
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
                pickFinal();
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
            debugger;
            if (data.rtnCode == '2000') {
                debugger;
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

    debugger;
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