// wait for the DOM to be loaded
$(document).ready(function() {
    $('#fileUp').click(function(){
        var fd = new FormData();

        var file = $('input[name="file"]').get(0).files[0];
        fd.append("file", file);
        $.ajax({
            url: "/testupload1",
            type: "post",
            data: fd,
            processData: false,
            contentType: false,
            success: function (data) {
                alert("success");
                var res = confirm("上传成功");

                if(res == true){

                    document.write("确定");
                }else{

                    document.write("取消");
                }
            },
            error: function () {
            }
        });
    })

});
