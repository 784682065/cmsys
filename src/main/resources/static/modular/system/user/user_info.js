/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var UserInfoDlg = {
    userInfoData: {},
    validateFields: {
        account: {
            validators: {
                notEmpty: {
                    message: '账户不能为空'
                }
            }
        },
        name: {
            validators: {
                notEmpty: {
                    message: '姓名不能为空'
                }
            }
        },
        citySel: {
            validators: {
                notEmpty: {
                    message: '部门不能为空'
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: '密码不能为空'
                },
                identical: {
                    field: 'rePassword',
                    message: '两次密码不一致'
                },
            }
        },
        rePassword: {
            validators: {
                notEmpty: {
                    message: '密码不能为空'
                },
                identical: {
                    field: 'password',
                    message: '两次密码不一致'
                },
            }
        }
    }
};

/**
 * 验证两个密码是否一致
 */
UserInfoDlg.validatePwd = function () {
    var password = this.get("password");
    var rePassword = this.get("rePassword");
    if (password == rePassword) {
        return true;
    } else {
        return false;
    }
};

/**
 * 修改密码
 */
UserInfoDlg.chPwd = function () {
    var ajax = new $ax("/changePwd", function (data) {
        Feng.success("修改成功!");
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set("oldPwd");
    ajax.set("newPwd");
    ajax.set("rePwd");
    ajax.start();

};


$(function () {
    // Feng.initValidator("userInfoForm", UserInfoDlg.validateFields);
    //
    // var ztree = new $ZTree("treeDemo", "/dept/tree");
    // ztree.bindOnClick(UserInfoDlg.onClickDept);
    // ztree.init();
    // instance = ztree;

    //初始化性别选项
    // $("#sex").val($("#sexValue").val());

    // 初始化头像上传
    // var avatarUp = new $WebUpload("avatar");
    // avatarUp.setUploadBarId("progressBar");
    // avatarUp.init();

    //用户管理页面 所有input select 不可编辑
    // $("#userInfoForm").find("input,select").attr("disabled","disabled");


});
