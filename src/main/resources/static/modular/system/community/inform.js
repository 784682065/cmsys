var id1="";
var inform = {
//保存信息
    publish: function () {

        id1 =$.trim($("#cmid").val());
        console.log($.trim($("#cmid").val()));
        $("form").bootstrapValidator('validate'); //提交验证

        if ($("form").data('bootstrapValidator').isValid()) { //判断通过后 执行下面代码

            /*先进行标题判断，之后再保存*/
            var params = {
                "id": $.trim($("#cmid").val()),
                "informType": $.trim($("#informType").val()),
                "informTitle": $.trim($("#informTitle").val()),
                "informContent": $.trim($("#informContent").val())
            };

            $.post("/informsave", params, function (data) {
                if ("成功" == data.status) {
                    Feng.success("成功");
                    $(location).attr('href', '/cminform?cmid='+id1);
                } else {
                    Feng.error("失败");
                    //失败跳转
                    $(location).attr('href', '/cminform?cmid='+id1);
                    }
                    });
        }


    },
    /*清空内容*/
    delete: function () {
        $("#informTitle").val("");
        $("#informContent").val("");
    },


    back : function () {
        $(location).attr('href', '/allinform');
    }

};

$(function(){
    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            informTitle: {
                validators: {
                    notEmpty: {
                        message: '通知标题不能为空'
                    }
                }
            },
            informContent: {
                validators: {
                    notEmpty: {
                        message: '通知内容不能为空'
                    }
                }
            }
        }
    });
});
