var Com={};

Com.appCommuntiy= function () {
    $.post("/applyCM",$("#applyForm").serialize(),function (data) {
        if (data.status == "成功"){
        Feng.success("申请成功");
        $(location).attr('href', '/createcm');
        }else {
            Feng.error("创建失败,该社团已经被"+ data.createuser+"创建");
            $(location).attr('href', '/createcm');
        }
    });
}

/**
 * 驳回社团申请
 */
Com.rejectApply = function () {

    $.ajax({
        type: "POST",
        url:  "/rejectApply",
        data: "mesId="+$("#mesId").text(),
        success: function(data){

            if (data.status == "成功"){
                Feng.success(data.status);
                $(location).attr('href', '/magapply');
            }else {
                Feng.error(data.status);
                $(location).attr('href', '/magapply');
            }
        }
    });
}


Com.applyjoinCommuntiy= function () {

        $.post("/applyjoinCM",$("#applyForm").serialize(),function (data) {
            if (data.status == "成功"){
                Feng.success("申请成功");
                $(location).attr('href', '/applyjoin');
            }else {
                Feng.error("你已经申请过该社团");
                $(location).attr('href', '/applyjoin');
            }
    });
}



/**
 * 驳回加入社团申请
 */
Com.rejectMyApply = function () {

    $.ajax({
        type: "POST",
        url:  "/rejectMyApply",
        data: "mesId="+$("#mesId").text(),
        success: function(data){

            if (data.status == "成功"){
                Feng.success(data.status);
                $(location).attr('href', '/magmy');
            }else {
                Feng.error(data.status);
                $(location).attr('href', '/magmy');
            }
        }
    });
}
/**
 * 更新社团信息
 */
Com.updateCM = function () {


        $.ajax({
        type: "POST",
        url:  "/updateMyCm",
        data: {id :$("#id").val() , cmdirection:$("#cmdirection").text() ,applyreason:$("#cmdirection").text() },
        success: function(data){
            if (data.status == "成功"){
                Feng.success(data.status);
                $(location).attr('href', '/mycm');
            }else {
                Feng.error(data.status);
                $(location).attr('href', '/mycm');
            }
        }
    });
}

/**
 * 打开活动编辑页面
 */
Com.inform =function () {
    $(location).attr('href', '/inform?id='+$("#id").val());
}