/**
 * 角色管理的单例
 */
var Menu = {
    id: "menuTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Menu.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'ID', visible: false, align: 'center', valign: 'middle',width:'50px'},
        {title: '菜单名称', field: 'NAME', align: 'center', valign: 'middle', sortable: true,width:'17%'},
        {title: '菜单编号', field: 'CODE', align: 'center', valign: 'middle', sortable: true,width:'12%'},
        {title: '菜单父编号', field: 'PCODE', align: 'center', valign: 'middle', sortable: true},
        {title: '请求地址', field: 'URL', align: 'center', valign: 'middle', sortable: true,width:'15%'},
        {title: '排序', field: 'NUM', align: 'center', valign: 'middle', sortable: true},
        {title: '层级', field: 'LEVELS', align: 'center', valign: 'middle', sortable: true},
        {title: '是否是菜单', field: 'ISMENUNAME', align: 'center', valign: 'middle', sortable: true},
        {title: '状态', field: 'STATUSNAME', align: 'center', valign: 'middle', sortable: true}]
    return columns;
};


/**
 * 检查是否选中
 */
Menu.check = function () {
    var selected = $('#' + this.id).bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Menu.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加菜单
 */
Menu.openAddMenu = function () {
    var index = layer.open({
        type: 2,
        title: '添加菜单',
        area: ['830px', '450px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/menu/menu_add'
    });
    this.layerIndex = index;
};

/**
 * 点击修改
 */
Menu.openChangeMenu = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '修改菜单',
            area: ['800px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/menu/menu_edit/' + this.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
Menu.delMenu = function () {
    if (this.check()) {

        var operation = function(){
            var ajax = new $ax(Feng.ctxPath + "/menu/remove", function (data) {
                Feng.success("删除成功!");
                Menu.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("menuId", Menu.seItem.id);
            ajax.start();
        };

        Feng.confirm("是否刪除该菜单?", operation);
    }
};

/**
 * 搜索
 */
Menu.search = function () {
    var queryData = {};

    queryData['menuName'] = $("#menuName").val();
    queryData['level'] = $("#level").val();

    Menu.table.refresh({query: queryData});
}

$(function () {
    var defaultColunms = Menu.initColumn();
    var table = new BSTreeTable(Menu.id, "/menu/list", defaultColunms);
    table.setExpandColumn(2);
    table.setIdField("ID");
    table.setCodeField("CODE");
    table.setParentCodeField("PCODE");
    table.setExpandAll(false);
    table.init();
    Menu.table = table;
});