$(function () {
    /**
     * 成稿 选项卡效果切换
     */
    $(".btn-box button").click(function(){
       $(this).addClass("btn-active").siblings().removeClass("btn-active");
    });
    /**
     * 设置blackboard背景
     */
    $("body").addClass("gray-bg").addClass("blackboard");

    // blackboard.init();
});

var blackboard = {
    init: function () {
        getAll();
    },


    /**
     * 我的稿件点击效果
     */
    myreleasectbt: function () {

        $.post("/blackboard/getReleasectbt", function (data) {

            $("#Notice_ModalLabel").html("我的成稿栏");

            createHtml(data.rs, 'releasectbt',6);

        });

    },

    /**
     * 全部稿件点击效果
     */
    allreleasectbt: function () {

        $.post("/blackboard/getALLReleasectbt", function (data) {

            $("#Notice_ModalLabel").html("全部成稿栏");

            createHtml(data.rs, 'releasectbt',7);

        });
    }


};


/**
 * 获得所有首页数据
 */
function getAll() {

    $.post("/blackboard/getAll", function (data) {
        var allrs =data.rs;


        //1获取公告
        createHtml(allrs[0], 'announcement', 1);

        //2获取通知
        createHtml(allrs[1], 'notices', 2);

        //3 代表类型为待审稿件
        createHtml(allrs[2], 'rm', 3);

        //4.类型 为我的稿件
        createHtml(allrs[3], 'ctbt', 4);

        //5类型为初稿
        createHtml(allrs[4], 'initalctbt', 5);

        //6类型为我的成稿
        createHtml(allrs[5], 'releasectbt', 6);

    });
}


/**
 * 创建除了通知与公告
 * @param data 传回的jsonobject
 * @param selector id选择器
 * @param type 传回的类型
 */
function createHtml(data, selector, type) {
    var result = data;
    var total;
    var size = data.length;

    if(size ===0){
        total =0 ;
    }else {
        total=result[0].TOTAL;
    }
    var html = '';

    for (var i = 0; i < size; i++) {
        html += '<li>\n' +
            '<a  onclick="menuItem(this)" data-url ="/blackboard/check/' + type + '/' + result[i].UUID + '">' +
            '<span>[' + result[i].CREATE_DATE+']'+"-"+'['+ result[i].AREA + ']-</span><span>' + result[i].TITLE + '</span></a>\n' +
            '</li>';
    }
    $('#' + selector).html(html);

    //没有更多稿件或通知隐藏更多按钮
    if( selector == 'announcement' || selector == 'notices'){
        if( total <= 3 ){
            $('#' + selector).parent().parent().find("h5").hide();
        }
    }else if(selector == 'rm' || selector == 'ctbt' || selector == 'initalctbt' || selector == 'releasectbt'){
        if( total <= 6 ){
            $('#' + selector).parent().parent().parent().find("a.more").hide();
        }
    }
}



//打开选项卡
function menuItem(val) {

    // 获取标识数据
    var dataUrl = $(val).attr('data-url'),
        dataIndex = $(val).data('index'),
        menuName = $.trim($(val).text().substr($(val).text().indexOf(')')+1)),
        flag = true;

    if (dataUrl == undefined || $.trim(dataUrl).length == 0) {return false;}

    //选项卡存在的时候
    parent.$('.J_menuTab').each(function () {
        if ($(this).data('id') == dataUrl) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.J_menuTab').removeClass('active');

                // 显示tab对应的内容区
                parent.$('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == dataUrl) {
                        $(this).show().siblings('.J_iframe').hide();
                        $(this).attr('src', $(this).attr('src'));
                        return false;
                    }
                });
            }
            flag = false;
            return false;
        }
    });

    // 选项卡菜单不存在
    if (flag) {
        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        parent.$('.J_menuTab').removeClass('active');

        // 添加选项卡对应的iframe
        var str1 = '<iframe class="J_iframe" name="iframeTodo' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
        parent.$('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

        // 添加选项卡
        parent.$('.J_menuTabs .page-tabs-content').append(str);
    }

    return false;
}