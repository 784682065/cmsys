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

