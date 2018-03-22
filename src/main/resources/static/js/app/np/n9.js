single = {    init: function () {        tableType = "knife";        inputType = "text,checkTable";        needUserInfo = 0;        addOrView = getCookie("addOrView");        single.bind();        if (addOrView == "add") {            $(".back").attr("data", "add");            nps.initAdd();        } else if (addOrView == "view") {            $(".back").attr("data", "detail");            nps.initDetail();            $(".tdAdd").hide().remove();        }    },    npsView: function (data) {        var itemHtml = "", conclusionText = "", perifrHtml = "", tableHtml = "";        if (data.manMsg && data.manMsg != "") {            var value = data.manMsg[0];            if (value && value != "") {                $("#ownerNamep").html(value.OWNERNAME);                $("#sexp").html(numToContent.sexContent(value.OWNERGENDER));                $("#agep").html(value.AGE);                $("#addressp").html(value.ADDRESS);                $("#caseBriefp").html(value.CASEBRIEF);                //0：隐藏、1：只读 ，2.可读写                //结论：CONCLUSION  报告编号：PRE_NUM  初次认定部门：PRE_DEPT                // gunPreifr gunNumifr gunDeptifr conclusionifr                if (conclusionifr == "1" && value.CONCLUSION) {                    $("#conclusionp").html(value.CONCLUSION);                } else if (conclusionifr == "2") {                    $("#conclusion").text(value.CONCLUSION);                } else if (conclusionifr == "" || conclusionifr == "0") {                    $(".conclusion,.preifr").hide().remove();                }                if (gunPreifr == "1" || gunPreifr == "2") {                    var reportNum = "", deptNum = "";                    if (value.PRE_NUM) {                        reportNum = value.PRE_NUM;                    }                    if (value.PRE_DEPT) {                        deptNum = value.PRE_DEPT;                    }                    if (gunNumifr == "1" || gunPreifr == "1") {                        $("#numifrp").html(reportNum);                    } else {                        if (gunNumifr == "2" || gunPreifr == "2") {                            $("#numifr").text(reportNum);                        }                    }                    if (gunDeptifr == "1" || gunPreifr == "1") {                        $("#deptifrp").html(deptNum);                    } else {                        if (gunDeptifr == "2" || gunPreifr == "2") {                            $("#deptifr").text(deptNum);                        }                    }                }                if (data.knifeMsg && data.knifeMsg != "") {                    var tableData = data.knifeMsg;                    var knifeCount = 0;                    $(tableData).each(function (i, d) {                        knifeCount += parseInt(d.KNIFENUM);                        tableHtml += '<tr><td>' + d.KNIFENAME + '</td><td>' + d.KNIFEFEATURE + '</td>' +                        '<td>' + d.ISIDENTIFY + '</td><td>' + d.KNIFENUM + '</td></tr>'                    });                    tableHtml = '<tbody>' +                    '<tr><th>物品名称</th><th>基本特征</th><th>是否鉴定</th><th>涉案数量</th></tr>' + tableHtml + '</tbody>';                    $("#tbInfo1").html(tableHtml);                    $("#knifeCount").text(knifeCount);                }            }        }        if (gunPreifr == "1" || gunPreifr == "2") {            $(".preifr,.conclusion").css('display', 'inline-block');        } else {            $(".conclusion,.preifr").hide().remove();        }    },    resaveNps: function (data) {//重新发起时，可以查看和修改之前的数据        var tableHtml = "";        $(".conclusion,.preifr").hide().remove();        if (data.manMsg && data.manMsg != "") {            var value = data.manMsg[0];            if (value && value != "") {                $("#ownerName").val(value.OWNERNAME);                $("#age").val(value.AGE);                $("#address").text(value.ADDRESS);                $("#caseBrief").text(value.CASEBRIEF);                if(value.OWNERGENDER=="02"){                    $("#woman").attr("checked","checked");                    $("#man").removeAttr("checked");                }else{                    $("#man").attr("checked","checked");                    $("#woman").removeAttr("checked");                }            }        }        if (data.knifeMsg && data.knifeMsg != "") {            var tableData = data.knifeMsg;            var knifeCount = 0;            $(tableData).each(function (i, d) {      //' + d.USABLE + '                knifeCount += parseInt(d.KNIFENUM);                tableHtml += '<tr class="gunTds" ' +                'data-no="' + d.KNIFENAME + '" data-jd="'+ d.ISIDENTIFY+'" data-des="' + d.KNIFEFEATURE + '" data-num="' + d.KNIFENUM + '">' +                '<td>' + d.KNIFENAME + '</td><td>' + d.KNIFEFEATURE + '</td>' +                '<td>' + d.ISIDENTIFY + '</td><td class="tdDel">' + d.KNIFENUM + '<span class="del"></span></td></tr>'            });            tableHtml = '<tbody>' +            '<tr><th>物品名称</th><th>基本特征</th><th>是否鉴定</th><th>涉案数量</th></tr>' + tableHtml + '</tbody>';            $("#tbInfo1").html(tableHtml);            $("#knifeCount").text(knifeCount);        }    },    bind: function () {        var that = this;        //table加数格式不正确颜色提示取消        $(".tdContent").on("change", "input,textarea", function () {            if ($(this).val() != "") {                $(this).removeClass("red");            }        }).blur(function () {            if ($(this).val() != "") {                $(this).removeClass("red");            }        });        //管制刀具页面点击弹出添加枪支信息弹窗        $(".tdBtn").click(function () {            var obj = $(this).prev().attr("id");            $(".modalBg").show();            $(".tdModal").attr("data", obj).show();        });        $("#business").on("click", ".del", function () {            $(this).parent().parent().hide().remove();        });        //管制刀具添加一条数据临时取消按钮        $("#gunCancel").click(function () {            $(".tdModal,.modalBg").fadeOut();            $(".addGunNo,.addGunNum,.addGunDes").val("");        });        //管制刀具添加一条数据临时保存按钮        $("#gunSaveSub").click(function () {            $("#tableData").val("1").parent().parent().removeClass("red");            var itemHtml = "";            var gunno = $(".addGunNo").val();            var gunnum = $(".addGunNum").val();            var gundes = $(".addGunDes").val();            var nowNum = $("#knifeCount").text();            var selectVal=$("#ISIDENTIFY").val();            var selectText=$("#ISIDENTIFY").find("option:selected").text();            if (gunno == "") {                $(".addGunNo").addClass("red");            }            if (gunnum == "") {                $(".addGunNum").addClass("red");            }            if (gundes == "") {                $(".addGunDes").addClass("red");            }            if(selectVal==""){                $("#ISIDENTIFY").addClass("red");            }            if (gundes != "" && gunnum != "" && gunno != ""&&selectVal!="") {                $("#knifeCount").text(parseInt(nowNum) + parseInt(gunnum));                $(".tdModal,.modalBg").fadeOut();                itemHtml = '<tr class="gunTds" data-no="' + gunno + '" data-jd="'+selectText+'" data-des="' + gundes + '" data-num="' + gunnum + '">' +                '<td>' + gunno + '</td><td>' + gundes + '</td>' +'<td>' + selectText + '</td>'+                '<td class="tdDel"><span class="num">' + gunnum + '</span><span class="del"></span></td></tr>';                $("#table2").append(itemHtml).on("click", ".del", function () {                    var that = this;                    var prevClass = $(this).parent().parent().prev().attr("class");                    if (prevClass != "gunTds") {                        $("#tableData").val("");                    } else if (prevClass == "gunTds") {                        $("#tableData").val("1");                    }                    var nowCount = $("#knifeCount").text();                    var delNum = $(this).prev().text();                    if (parseInt(nowCount) > 0) {                        $("#knifeCount").text(parseInt(nowCount) - parseInt(delNum));                    } else {                        $("#knifeCount").text(0);                    }                    $(this).parent().parent().hide().remove();                });                $(".addGunNo,.addGunNum,.addGunDes,#ISIDENTIFY").val("");                var scrollNum = $(document).height() - $(window).height();                $('html, body').animate({                    scrollTop: scrollNum                }, 1000);            }        });        $("#ISIDENTIFY").change(function(){            if($(this).val()!=""){                $("#ISIDENTIFY").removeClass("red");            }        });    },    addCheck: function () {  //发起业务时各表单需验证的情况略不相同        commons.alertMsg(formats.checkFormat());    },add:function() { //表单提交        var tableInfo = [];        $(".gunTds").each(function (i, d) {            tableInfo.push({                "KNIFENAME": $(this).data("no"),                "KNIFEFEATURE": $(this).data("des"),                "KNIFENUM": $(this).data("num"),                "XH": i,                "ISIDENTIFY":$(this).data("jd")            });        });        var datas = {            "ownerName": $("#ownerName").val(),            "age": $("#age").val(),            "business": businessId,            "caseBrief": $("#caseBrief").val(),            "ownerGender": $('input:radio[name="sex"]:checked').val(),            "address": $("#address").val(),            "tableData": JSON.stringify(tableInfo)        };        $(".locked").fadeIn();        $(".modalBg").hide();        commons.saveData(datas);    }};single.init();