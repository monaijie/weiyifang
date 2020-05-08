/*******清除表单数据*********/
function ClearForm() {
    $('input').val('');
    $('select').val('');
    window.location.reload();
}

//触发事件
function setfromModom(title,id,url,callback){
    var that = this;
    var areas = [];
    layer.open({
        type: 2, //此处以iframe举例
        title: title,
        area: ['600px', '450px'],
        shade: 0.5,
        maxmin: true,
        resize: false,
        id:id,
        offset: [ //为了演示，随机坐标
                //Math.random() * ($(window).height() - 300)
                //, Math.random() * ($(window).width() - 390)
        ],
        content: url,
        btn: ['保存', '关闭'], //只是为了演示
        yes: function (index,layero) {
            callback(index,layero)
            //var body = layer.getChildFrame('body', index).contents().serialize(); //巧妙的地方在这里哦
            //update(body, table, _cur_page, index);
        },
        btn2: function () {
            layer.closeAll();
        },
        zIndex: layer.zIndex, //重点1
        success: function (layero, index) {
          
            //layer.iframeAuto(index);
            layer.setTop(layero); //重点2
        }
    });
}

/*******保存表单，局部表格刷新*********/
function SaveModal(index, layero, url, tableIns) {
    var iframeWindow = window['layui-layer-iframe' + index], submitID = 'LAY-user-front-submit'
        , submit = layero.find('iframe').contents().find('#' + submitID);
    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
        var field = data.field; //获取提交的字段
        console.log(field)
        $.ajax({
            type: "POST",
            url: url,
            data: field,
            success: function (data) {
                layer.msg(data.message);
                if (data.resultType == 0) {
                    ReloadDataTable(tableIns);
                }
            }
        });
        //window.location.reload();
        layer.close(index); //关闭弹层
    });
    submit.trigger('click');
}

/*******表格数据修改弹窗*********/
function SaveTableModalShow(obj, layer, tableIns, callback) {
    layer.open({
        type: 1,
        resize: false,
        title: '温馨提示',
        closeBtn: false,
        area: '335px;',
        shade: 0.4,
        id: 'LAY_TipShow',
        btn: ['确定', '取消'],
        moveType: 1,
        content: '<div style="padding: 20px 0; line-height: 22px;text-align: center;">' +
            '是否修改当前数据为<span style="color:red;font-weight: 700;">' + obj.value + '</span>' + '?' + '</div>',
        yes: function (layer) {
            callback();
        },
        btn2: function () {
            //window.location.reload();
            ReloadDataTable(tableIns);
            layer.closeAll();
        }
    });
}

/*******表格数据开关修改弹窗*********/
function SaveSwitchModalShow(id, checked, layer, tableIns, callback) {
    var CheckedName;
    if (checked) {
        CheckedName = "开启";
    } else {
        CheckedName = "关闭";
    }
    layer.open({
        type: 1,
        resize: false,
        title: '温馨提示',
        closeBtn: false,
        area: '335px;',
        shade: 0.4,
        id: 'LAY_TipShow',
        btn: ['确定', '取消'],
        moveType: 1,
        content: '<div style="padding: 20px 0; line-height: 22px;text-align: center;">是否<span style="color:red;font-weight: 700;">' + CheckedName+'</span>' + '?' + '</div>',
        yes: function (layer) {
            callback();
        },
        btn2: function () {
            // window.location.reload();
            ReloadDataTable(tableIns)
            layer.closeAll();
        }
    });
}

/*******刷新表格*********/
function ReloadDataTable(tableIns) {
    try {
        tableIns.reload();  
    } catch (e) {
        console.log("未实例化");
    }
}

/*******表格数据修改保存*********/
function SaveTableModal(data, url, tableIns, layero) {
    if (data.Enabled === '是') {
        data.Enabled = true;
    } else if (data.Enabled === '否') {
        data.Enabled = false;
    }
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
            if (data.resultType == 0) {
                ReloadDataTable(tableIns);
            } else {
                layer.msg(data.message);
                return false;
            }
        }
    });
    layer.closeAll();
}

/*******批量修改提交*********/
function saveSwitch(data, url, tableIns) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
            ReloadDataTable(tableIns);
            layer.msg('修改成功', {
                time: 2000, //2s后自动关闭
            });
        }
    });
}


/*******删除操作*********/
function DeleteRecord(url, Id, tableIns) {
    $.ajax({
        type: "POST",
        url: url,
        data: {"Id":Id},
        success: function (data) {
            layer.msg(data.message);
            if (data.resultType ==0) { 
                ReloadDataTable(tableIns); 
            }
        }
    });
}

/*******弹窗checkbox value值修改*********/
function Init() {
    layui.use(['form'], function () {
        var $ = layui.$
        , form = layui.form;
        form.on('switch', function (data) {
            if (data.value == 'true')
                $(data.elem).val(false);
            else
                $(data.elem).val(true);
        });
    })
}


/*******获取搜索表单数据*********/
function getFormData(id) {
    var formData = {};
    var formArray = $("#" + id).serializeArray();
    $.each(formArray, function () {
        if (formData[this.name] !== undefined) {
            if (!formData[this.name].push) {
                formData[this.name] = [formData[this.name]];
            }
            formData[this.name].push(this.value || '');
        } else {
            formData[this.name] = this.value || '';
        }
    });
    return formData;
}

/*******保存表单，全局刷新*********/
function SaveModalReload(index, layero, url) {
    var iframeWindow = window['layui-layer-iframe' + index], submitID = 'LAY-user-front-submit'
        , submit = layero.find('iframe').contents().find('#' + submitID);
    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
        var field = data.field; //获取提交的字段
        $.ajax({
            type: "POST",
            url: url,
            data: field,
            success: function (data) {
                layer.msg(data.message);
            }
        });
        window.location.reload();
        layer.close(index); //关闭弹层
    });
    submit.trigger('click');
}

/*******下拉框填充*********/

function getDataList(url, id,form) {
    $.ajax({
        type: 'post',
        url: url,
        success: function (data) {
            $('#' + id).empty();
            $('#' + id).append(new Option("全部", ""));
            $.each(data, function (index, item) {
                $('#' + id).append(new Option(item.text, item.value));// 下拉菜单里添加元素
            });
            form.render('select');// 再次渲染select
            //var t="";
            //$('#' + id).empty();
            //for (var j = 0; j < data.length; j++) {
            //    t += '<option value="' + data[j].value + '" selected="' + data[j].selected + '">' + data[j].text + '</option>'
            //}
            //$('#' + id).append(t);
            //form.render('select');
            //var select = 'dd[lay-value="0"]';// 设置value
            //$('#' + id).siblings("div.layui-form-select").find('dl').find(select).click();// 查找点击
           
        }
    })
}

/*******查询api接口*********/
function setData(index, layero, url, tableIns, callback) {
    var iframeWindow = window['layui-layer-iframe' + index],
        submitID = 'LAY-user-front-submit'
        , submit = layero.find('iframe').contents().find('#' + submitID);
    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
        var field = data.field; //获取提交的字段
        $.ajax({
            type: "POST",
            url: url,
            data: field,
            success: function (data) {
                ReloadDataTable(tableIns);
                callback(data);
            }
        });
        layer.close(index); //关闭弹层
    });
    submit.trigger('click');
}


/*********触发事件,自定义长度，宽度*********/
function setfromModom1(title, id, width,height,url,callback) {
    var that = this;
    var areas = [];
    layer.open({
        type: 2, //此处以iframe举例
        title: title,
        area: [width + 'px', height+'px'],
        shade: 0.5,
        maxmin: true,
        resize: false,
        id: id,
        offset: [ //为了演示，随机坐标
            //Math.random() * ($(window).height() - 300)
            //, Math.random() * ($(window).width() - 390)
        ],
        content: url,
        btn: ['保存', '关闭'], //只是为了演示
        yes: function (index, layero) {
            callback(index, layero)
            //var body = layer.getChildFrame('body', index).contents().serialize(); //巧妙的地方在这里哦
            //update(body, table, _cur_page, index);
        },
        btn2: function () {
            layer.closeAll();
        },
        zIndex: layer.zIndex, //重点1
        success: function (layero, index) {

            //layer.iframeAuto(index);
            layer.setTop(layero); //重点2
        }
    });
}

/*******判断平台设置表格高度*********/
function setHeight(val) {
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
        return 'full'
    } else {//pc端
        return val
    }
}
/**********获取URL参数*************/
function getUrlParameter(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}





