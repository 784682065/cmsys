/**
 *待办初始化
 */

/**
 * 1.内跑
 * 2.政务网
 * 3.预受理
 * 默认内跑
 * @type {number}
 */
var todoType = 1;


var BlackBoard = {
    id: "todo",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};


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
/**
 * 初始化表格的列
 */
BlackBoard.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {
            title: '流程任务名称',
            field: 'TASK_NAME_',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: BlackBoard.url
        },
        {title: '发起人', field: 'PROMOTER_', align: 'center', valign: 'middle', sortable: true},
        {title: '节点名称', field: 'NODE_NAME_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {title: '当前处理人', field: 'ASSIGNEE_', align: 'center', valign: 'middle', sortable: true},
        {title: '创建时间', field: 'CREATE_DATE_', align: 'center', valign: 'middle', sortable: true},
        {
            title: '流程查看',
            field: 'PROCESS',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: BlackBoard.diagram
        },


        {title: '业务主键', field: 'BUSINESS_ID_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {title: '流程ID', field: 'PROCESS_ID_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {title: 'URL', field: 'URL_', align: 'center', valign: 'middle', sortable: true, visible: false}
    ];
};


BlackBoard.initColumn_2 = function () {
    return [
        {field: 'selectItem', radio: true},
        {
            title: '流程任务名称',
            field: 'TASK_NAME_',
            align: 'center',
            valign: 'middle',
            sortable: true
        },
        {title: '发起人', field: 'PROMOTER_', align: 'center', valign: 'middle', sortable: true},
        // {title: '节点名称', field: 'NODE_NAME_', align: 'center', valign: 'middle', sortable: true, visible: false},

        {title: '流程完成人', field: 'ASSIGNEE_', align: 'center', valign: 'middle', sortable: true},
        {title: '创建时间', field: 'CREATE_DATE_', align: 'center', valign: 'middle', sortable: true},
        {
            title: '流程查看',
            field: 'PROCESS',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: BlackBoard.diagram
        },
        {title: '业务主键', field: 'BUSINESS_ID_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {title: 'URL', field: 'URL_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {
            title: 'PROCESS_INSTANCE_ID_',
            field: 'PROCESS_INSTANCE_ID_',
            align: 'center',
            valign: 'middle',
            sortable: true,
            visible: false
        }
    ];
};

BlackBoard.initColumn_3 = function () {
    return [
        {field: 'selectItem', radio: true},
        {
            title: '事项名称',
            field: 'PROCESS_NAME',
            align: 'center',
            valign: 'middle',
            sortable: true

        },
        {title: '申请人', field: 'PROMOTER_', align: 'center', valign: 'middle', sortable: true},
        {title: '当前处理人', field: 'ASSIGNEE_', align: 'center', valign: 'middle', sortable: true},
        {title: '节点名称', field: 'NODE_NAME_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {title: '当前流转状态', field: 'STATUS', align: 'center', valign: 'middle', sortable: true},
        {title: '申请时间', field: 'CREATE_DATE_', align: 'center', valign: 'middle', sortable: true},
        {title: '结束时间', field: 'END_DATE_', align: 'center', valign: 'middle', sortable: true},
        {
            title: '流程查看',
            field: 'PROCESS',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: BlackBoard.diagram
        },
        {title: '业务主键', field: 'BUSINESS_ID_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {title: '任务ID', field: 'ID_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {title: 'URL', field: 'URL_', align: 'center', valign: 'middle', sortable: true, visible: false},
        {
            title: 'PROCESS_INSTANCE_ID_',
            field: 'PROCESS_INSTANCE_ID_',
            align: 'center',
            valign: 'middle',
            sortable: true,
            visible: false
        }
    ];
};


BlackBoard.url = function (value, row, index) {

    var para = "";
    if (row.URL_.indexOf('aljc') != -1) {
        para = "&task=" + row.ID_ + "&business=" + row.BUSINESS_ID_ + "&instanceid=" + row.PROCESS_INSTANCE_ID_ + "&process=" + row.PROCESS_ID_ + "&nodeName=" + row.NODE_NAME_;
    } else {
        para = "?task=" + row.ID_ + "&business=" + row.BUSINESS_ID_ + "&instanceid=" + row.PROCESS_INSTANCE_ID_ + "&process=" + row.PROCESS_ID_ + "&nodeName=" + row.NODE_NAME_;
    }

    var task_url = Feng.ctxPath + row.URL_;
    var r = '<a class="J_menuItem" data-index="' + index + '" name="tabMenuItem" onclick="menuItem(this,' + row.ASSIGNEE_ID + ',' + row.ID_ + ')"  data-url="' + task_url + para + '"  >' + value + '</a> ';
    return r;
};


BlackBoard.url2 = function (value, row, index) {
    var task_url = Feng.ctxPath + row.URL_ + "?task=" + row.TASK_ID_ + "&business=" + row.BUSINESS_ID_;
    var r = '<a class="J_menuItem" data-index="' + index + '" name="tabMenuItem" onclick="menuItem(this)"  data-url="' + task_url + '"  >' + value + '</a> ';
    return r;
};


BlackBoard.Status = function (value, row, index) {


};


BlackBoard.diagram = function (value, row, index) {
    var url = Feng.ctxPath + row.URL_ + "?processInstanceId=" + row.PROCESS_INSTANCE_ID_ + "&business=" + row.BUSINESS_ID_ + "&isCheck=Y";
    var r = '<button type="button" class="btn btn-success btn-xs" onclick="BlackBoard.openDiagram(' + row.PROCESS_INSTANCE_ID_ + ')" data-toggle="modal" ' +
        'data-target="#myModal"><span class="glyphicon glyphicon-search" aria-hidden="true" ></span>流程图</button>&nbsp;&nbsp;' +
        '<button type="button" id="' + row.ID_ + '" class="btn btn-warning btn-xs" onclick="BlackBoard.openDiagram2(\'' + url + '\')" data-toggle="modal" ' +
        'data-target="#myModal2"><span class="glyphicon glyphicon-list-alt" aria-hidden="true" ></span>业务表单</button>';

    return r;
};


//查看流程图
BlackBoard.openDiagram = function (val) {
    var url = $('#digarmUrl').val() + "?processInstanceId=";
    $('#digarm').attr('src', url + val);
};
//查看业务表单
BlackBoard.openDiagram2 = function (val) {
    $('#digarm2').attr('src', val);
};

BlackBoard.refresh = function (value) {
    // BlackBoard.table.refresh();
};

/**
 * 检查是否选中
 */
BlackBoard.check = function () {
    var selected = $('#' + this.id).bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        BlackBoard.seItem = selected[0];
        return true;
    }
};

BlackBoard.init = function (val) {
    $('#todo').bootstrapTable('destroy');
    var defaultColunms;
    var table;
    todoType = val;
    if (val == 1) {
        defaultColunms = BlackBoard.initColumn();
        table = new BSTable(BlackBoard.id, "/Todo/list", defaultColunms);
    } else if (val == 2) {
        defaultColunms = BlackBoard.initColumn_2();
        table = new BSTable(BlackBoard.id, "/Todo/done", defaultColunms);
    } else {
        defaultColunms = BlackBoard.initColumn_3();
        table = new BSTable(BlackBoard.id, "/Todo/my", defaultColunms);
    }
    table.init();
    BlackBoard.table = table;
};


BlackBoard.spec_init = function (flag, business) {
    $('#todo').bootstrapTable('destroy');
    var url = "";
    if (business != '' || business != undefined) {
        url = "&business=" + business;
    }
    var defaultColunms;
    var table;
    if (todoType == 1) {
        defaultColunms = BlackBoard.initColumn();
        table = new BSTable(BlackBoard.id, "/Todo/list?flag=" + flag + url, defaultColunms);
    } else if (todoType == 2) {
        defaultColunms = BlackBoard.initColumn_2();
        table = new BSTable(BlackBoard.id, "/Todo/done?flag=" + flag + url, defaultColunms);
    } else {
        defaultColunms = BlackBoard.initColumn_3();
        table = new BSTable(BlackBoard.id, "/Todo/my?flag=" + flag + url, defaultColunms);
    }
    table.init();
    BlackBoard.table = table;


};


$(function () {

    var defaultColunms = BlackBoard.initColumn();
    var table = new BSTable(BlackBoard.id, "/Todo/list", defaultColunms);
    // table.setPaginationType('cilent')
    table.init();
    BlackBoard.table = table;

    //按钮样式变化
    $("#todotool").on("click", ".btn", function () {
        $(this).removeClass("btn-success")
            .addClass("btn-warning")
            .siblings().removeClass("btn-warning")
            .addClass("btn-success");
    });
});


/**
 * 重写tab加载方法
 * @param val
 * @returns {boolean}
 */
function menuItem(val, a, b) {

    var open = false;
    if (undefined == a || 'undefined' == a) {

        bootbox.confirm({
            container: '.bootbox-container',
            size: "medium",
            title: "友情提示",
            className: "my-modal",
            closeButton: false,
            message: "<h3 style=' font-size: 16px; margin: 20px auto;color: black'>" + "该任务尚未被领取，点击查看进行表单预览，点击领取进行流程办理" + "</h3>",
            buttons: {
                confirm: {
                    className: 'btn-info btn-md',
                    label: '<i class="fa fa-check"></i>&nbsp;领取'
                },
                cancel: {
                    className: 'btn-danger btn-md',
                    label: '<i class="fa fa-desktop" ></i>&nbsp;查看'
                }
            },
            callback: function (res) {
                if (res) {
                    $.ajax({
                        url: '/OA/claimTask',
                        type: 'post',
                        async: false,
                        data: {TASKID: b},
                        success: function (data) {
                            if (data.rtnCode != '2000') {
                                toastr.error('该流程任务已经被领取!', "操作提示");
                                open = true;
                            } else {

                            }
                        }
                    });
                    // 获取标识数据
                    var dataUrl = $(val).attr('data-url'),
                        dataIndex = $(val).data('index'),
                        menuName = $.trim($(val).text()),
                        flag = true;

                    if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;

                    // 选项卡菜单不存在
                    if (flag) {
                        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
                        parent.$('.J_menuTab').removeClass('active');

                        // 添加选项卡对应的iframe
                        var str1 = '<iframe class="J_iframe" name="iframeTodo' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                        parent.$('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

                        // 添加选项卡
                        parent.$('.J_menuTabs .page-tabs-content').append(str);
                        scrollToTab($('.J_menuTab.active'));
                    }
                    return;
                } else {

                    $("#" + b).trigger('click');

                }

            }
        });
        return;

    }
    // 获取标识数据
    var dataUrl = $(val).attr('data-url'),
        dataIndex = $(val).data('index'),
        menuName = $.trim($(val).text()),
        flag = true;
    if (open) {
        BlackBoard.init(1);
        return;
    }
    if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;

    // 选项卡菜单不存在
    if (flag) {
        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        parent.$('.J_menuTab').removeClass('active');

        // 添加选项卡对应的iframe
        var str1 = '<iframe class="J_iframe" name="iframeTodo' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
        parent.$('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

        // 添加选项卡
        parent.$('.J_menuTabs .page-tabs-content').append(str);
        scrollToTab($('.J_menuTab.active'));
    }
    return false;
}

//计算元素集合的总宽度
function calSumWidth(elements) {
    var width = 0;
    $(elements).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
}

function scrollToTab(element) {
    var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidth(parent.$(".content-tabs").children().not(".J_menuTabs"));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    //实际滚动宽度
    var scrollVal = 0;
    if (parent.$(".page-tabs-content").outerWidth() < visibleWidth) {
        scrollVal = 0;
    } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
            scrollVal = marginLeftVal;
            var tabElement = element;
            while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                scrollVal -= $(tabElement).prev().outerWidth();
                tabElement = $(tabElement).prev();
            }
        }
    } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
    }
    parent.$('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
}

