var  condition="";
var url ="/applyjoin/?currentPage=1&pageSize=5&condition=";


var applyJion={

};


/**
 * 模糊查询社团
 */
applyJion.search= function () {

    condition = $('#cmname').val();
    window.location.href=''+url+condition;

}