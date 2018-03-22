// var deptId;

var number = 0;
var selIds = [];//存放选中的id
var selIndex; // 选中的节点在area span数组中的下标
$(function () {

    $('#funds').val('0');
    $('#funds').attr('disabled', true);


    //选择会议时间
    $('#meetingTime').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        autoclose: 1,
        startDate: new Date()
    }).on('hide', function (e) {
        $('form').data('bootstrapValidator')
            .updateStatus('meetingTime', 'NOT_VALIDATED', null)
            .validateField('meetingTime');
    });
    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, fields: {
            meetingName: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '会议名称不能为空'
                    }
                }
            },
            meetingDiscuss: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '会议议题不能为空'
                    }
                }
            },
            meetingTime: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '会议时间不能为空'
                    }
                }
            },
            meetingAdd: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '会议地点不能为空'
                    }
                }
            },
            objects: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '参加对象不能为空'
                    }
                }
            },
            funds: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '经费核算不能为空'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '经费核算需大于0'
                    }
                }
            }
        }
    });
    conference.init();

    $("#btn_save").on("click", function () {
        $("#objectsArea div").each(function () {
            selIds.push($(this).attr('id'));
        });
        var num = 0;
        var zTree = $.fn.zTree.getZTreeObj('zTree');
        //获取zTree的选中值
        var nodes = zTree.getCheckedNodes(true);
        //先把objectsArea全部删除一遍
        $("#objectsArea div.spanAdd").remove();
        number = 0;
        num = 0;
        for(var i = 0 ,  l = nodes.length; i < l; i++){
            if(!nodes[i].isParent){
                var span = '<div id="' + nodes[i].id + '" name="' + nodes[i].name + '"class="spanAdd" style="display: inline-block; padding: 2px 6px; background-color: #d9edf7;margin: 5px;">' +
                    nodes[i].name +
                    '&nbsp;' +
                    '<i class="fa fa-close" data-id="' + nodes[i].id + '" onclick="deletePerson(event)" aria-hidden="true" style="cursor: pointer;"><span class="hidden">close</span></i>' +
                    '</div>';
                $("#objectsArea").append(span);
                num++;
            }
        }

        var node;
       /* for (var i = 0, l = nodes.length; i < l; i++) {
            node = nodes[i];

            //这里是div的zTree填充
            if (!node.isParent) {
                selIndex = $.inArray(node.id + "", selIds);
                if (selIndex == -1) {
                    var span = '<div id="' + node.id + '"  name="' + node.name + '" style="display: inline-block; padding: 2px 6px; background-color: #d9edf7;margin: 5px;">' +
                        node.name +
                        '&nbsp;' +
                        '<i class="fa fa-close" data-id="' + node.id + '" onclick="deletePerson(event)" aria-hidden="true" style="cursor: pointer;"><span class="hidden">close</span></i>' +
                        '</div>';
                    $("#objectsArea").append(span);
                    num++;
                }
            }
        }*/
        if (number == 0) {
            $('#meetingNumbers').val(num);
            number = num;
        } else {
            number += num;
            $('#meetingNumbers').val(number);
        }


    });

    initZtree();

});


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
            onExpand: savePerson,
            onCheck: savePerson,
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

function savePerson(event, treeId, treeNode) {

}


function expand(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj('deptTree');
    var nodes = zTree.getChangeCheckedNodes();
    for (var i = 0, l = nodes.length; i < l; i++) {
        zTree.reAsyncChildNodes(treeNode, 'refresh', false);
    }

}


serviceOA.business = "/conference";

var init = false;

var conference = {

    data: {},
    //过于存放表单数据 根据自己业务自定义
    //设置data数据
    set: function (key, val) {
        this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    },

    init: function () {
        serviceOA.initdata = conference.initdata;
        serviceOA.getInfo = conference.getInfo;
        serviceOA.lock = conference.lock;
        serviceOA.checkData = conference.checkData;
        serviceOA.saveData = conference.saveData;
        serviceOA.afterinit = conference.afterinit;

        serviceOA.initTask();
    },

    initdata: function (data) {
        //初始化数据

        $('#meetingName').val(data.initInfo[0].MEETING_NAME);
        $('#meetingDiscuss').val(data.initInfo[0].MEETING_DISCUSS);
        $('#meetingTime').val(data.initInfo[0].MEETING_TIME);
        $('#meetingAdd').val(data.initInfo[0].MEETING_ADD);

        var persons = data.persons;

        for (var i = 0; i < persons.length; i++) {
            selIds.push(persons[i].ID);
            var span = '<div id="' + persons[i].ID + '"  name="' + persons[i].NAME + '" style="display: inline-block; padding: 2px 6px; background-color: #d9edf7;margin: 5px;">' +
                persons[i].NAME +
                '&nbsp;' +
                '<i class="fa fa-close" data-id="' + persons[i].ID + '" onclick="deletePerson(event)" aria-hidden="true" style="cursor: pointer;"><span class="hidden">close</span></i>' +
                '</div>';
            $("#objectsArea").append(span);
            number++;
        }


        $('#meetingNumbers').val(data.initInfo[0].MEETING_NUMBERS);
        $('#funds').val(data.initInfo[0].FUNDS);
        if ($('#funds').val() > 0) {
            $('#is').val('Y');
        } else {
            $('#is').val('N');
        }
        if (lockFlag) {
            if ($('#is').val() == "N") {
                $('#funds').attr('disabled', 'disabled');
            }
        }
        if (('Y' == $('#isCheck').val() || $('#task').val() != "") && !lockFlag) {
            $('#persons').attr('class', 'col-md-10');
            $('.hasHide').hide();
        }

        init = false;
    },

    getInfo: function (data) {

    },
    saveData: function () {
        conference.set('meetingName').set('meetingDiscuss').set('meetingTime').set('meetingAdd').set('meetingNumbers').set('funds').set('business').set('instance');
        var objsAndid = "";
        $('#objectsArea div').each(function () {
            objsAndid += $(this).attr('id') + ",";
        });
        objsAndid = objsAndid.substring(0, objsAndid.length - 1);
        conference.data["objects"] = objsAndid;
        serviceOA.business_data = conference.data;
    },

    lock: function () {
        $(".row").find("input").attr("disabled", "disabled");
        $(".row").find("select").attr("disabled", true);
    },

    checkData: function () {

        if ($('#task').val() == "" || $('#task').val() == undefined) {
            if (conference.check()) return true;
        } else {
            if (conference.check()) return true;
            if (opinionFlag) return false;
        }
        return false;
    },

    check: function () {
        if ($.trim($('#meetingName').val()).length == 0) {
            toastr.warning("请输入会议活动名称", "友情提示!");
            return true;
        }

        if ($.trim($('#meetingDiscuss').val()).length == 0) {
            toastr.warning("请输入会议议题", "友情提示!");
            return true;
        }
        if ($.trim($('#meetingTime').val()).length == 0) {
            toastr.warning("请选择会议时间", "友情提示!");
            return true;
        }

        if ($.trim($('#meetingAdd').val()).length == 0) {
            toastr.warning("请输入会议地点", "友情提示!");
            return true;
        }


        if ($.trim($('#meetingNumbers').val()).length == 0 || $('#meetingNumbers').val() <= 0) {
            toastr.warning("请选择参加会议人员", "友情提示!");
            return true;
        }
        if ($('#is').val() == "Y") {
            if ($.trim($('#funds').val()).length == 0 || $.trim($('#funds').val()) <= 0) {
                toastr.warning("请输入正确经费核算", "友情提示!");
                return true;
            }
        }

        if ($.trim($('#is').val()).length == 0) {
            toastr.warning("请选择是否有经费", "友情提示!");
            return true;
        }

    },

    afterinit: function () {
        $("#pick").css('display', '');
        $("#btn_save").css('display', '');
        if (!lockFlag) {
            $('#is').parent().css("display", "none");
            $('.hasfunds').hide();
            $('#pick').attr('disabled', true);
            $('#funds').attr('disabled', true);
            $('#meetingNumbers').attr('disabled', true);
        }
    }
};

function deletePerson(event) {
    if (!lockFlag && init) return;

    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    var $obj = $(obj);
    //这时obj就是触发事件的对象，可以使用它的各个属性
    //还可以将obj转换成jquery对象，方便选用其他元素
    var id = $obj.attr('data-id');
    selIds.remove(id);
    $obj.parent().remove();
    number--;
    $('#meetingNumbers').val(number);
}


Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function checkMoney(obj) {
    $("small[data-bv-for=\"funds\"]").hide();
    $("i[data-bv-icon-for=\"funds\"]").hide();
    if ($(obj).val() == "Y") {
        $("#funds").removeAttr("disabled").val("");
    } else if ($(obj).val() == "N") {
        $("#funds").attr("disabled", "true").val(0);
    }
}
