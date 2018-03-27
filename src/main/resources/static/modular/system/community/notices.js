
var notices = {
//保存信息
    publish: function () {

        $("form").bootstrapValidator('validate'); //提交验证

        if ($("form").data('bootstrapValidator').isValid()) { //判断通过后 执行下面代码

            /*先进行标题判断，之后再保存*/
            var params = {
                "informType": $.trim($("#informType").val()),
                "informTitle": $.trim($("#informTitle").val()),
                "informContent": $.trim($("#informContent").val())
            };

            $.post("/noticessave", params, function (data) {
                if ("成功" == data.status) {
                    Feng.success("成功");
                    //直接查看全部公告
                    // $(location).attr('href', '/allnotices');
                } else {
                    Feng.error("失败");
                    //失败跳转
                    }
                    });
        }


    },
    /*清空内容*/
    delete: function () {
        $("#informTitle").val("");
        $("#informContent").val("");
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
