$(function () {

    /**
     * 设置blackboard背景
     */
    $("body").addClass("gray-bg").addClass("blackboard");

    blackboard.init();
});

var blackboard = {
    init: function () {
        getAll();
    }


};


/**
 * 获得所有首页数据
 */
function getAll() {

    $.post("/blackboard/getAll", function (data) {
        var allrs =data.rs;


        //1获取活动
        createHtml(allrs[0], 'inform');

        //2获取通知
        createHtml(allrs[1], 'notice');


    });
}


/**
 *
 * @param data 传回的jsonobject
 * @param selector id选择器
 */
function createHtml(data, selector) {
    var result = data;
    var size = data.length;


    var html = '';

    for (var i = 0; i < size; i++) {
        html += '<li>\n' +
            '<a  onclick="menuItem(this)" data-url ="/checkInform?id='+ result[i].id + '">' +
            '<span>[' + result[i].createtime+']'+"-"+'['+ result[i].cmid + ']-</span><span>' + result[i].informTitle + '</span></a>\n' +
            '</li>';
    }
    $('#' + selector).html(html);


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