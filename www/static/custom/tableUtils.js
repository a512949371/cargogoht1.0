
//单条删除
function deleteById(id) {
    layer.confirm('确认删除该条记录吗?', {
        btn: ['确认','取消'] //按钮
    }, function(){
        $.ajax({
            type:'POST',
            url: "delete",
            data: {id:id},
            async:true,
            success:function(data){
                var result = data;
                console.log(result);
                if(result.status=="0") {
                    layer.msg('操作成功!');
                    window.setTimeout("refreshPage()",2000);
                } else {
                    layer.msg('操作失败!');
                }
            }
        });
    }, function(){

    });
}

  //单条激活
  function activateById(id) {
    layer.confirm('确认激活该条记录吗?', {
        btn: ['确认','取消'] //按钮
    }, function(){
        $.ajax({
            type:'POST',
            url: "activate",
            data: {id:id},
            async:true,
            success:function(data){
                var result = data;
                console.log(result);
                if(result.status=="0") {
                    layer.msg('操作成功!');
                    window.setTimeout("refreshPage()",2000);
                } else {
                    layer.msg('操作失败!');
                }
            }
        });
    }, function(){

    });
}

function submitSearch() {
    document.forms[0].submit();
}

function refreshPage()
{
    document.forms[0].submit();
}

function cancle(id) {
    layer.confirm('确认取消该条记录吗?', {
        btn: ['确认','取消'] //按钮
    }, function(){
        $.ajax({
            type:'POST',
            url: "cancle",
            data: {id:id},
            async:true,
            success:function(data){
                var result = data;
                console.log(result.status);
                if(result.status=="0") {
                    layer.msg('操作成功!');
                    window.setTimeout("refreshPage()",2000);
                } else {
                    layer.msg('操作失败!');
                }
            }
        });
    }, function(){

    });

}

function complete(id) {
    layer.confirm('确认完成该条记录吗?', {
        btn: ['确认','取消'] //按钮
    }, function(){
        $.ajax({
            type:'POST',
            url: "complete",
            data: {id:id},
            async:true,
            success:function(data){
                var result = data;
                console.log(result.status);
                if(result.status=="0") {
                    layer.msg('操作成功!');
                    window.setTimeout("refreshPage()",2000);
                } else {
                    layer.msg('操作失败!');
                }
            }
        });
    }, function(){

    });

};

//批量删除选择的记录
function submitDeleteIDs(obj,tip){
    console.log("submitDeleteIDs...");
    if ($("input:checked").size() == 0) {
        alert("请先选择要操作的内容！");
        return false;
    }
    if(confirm(tip)){
        var _form = $("#form0");
        _form.attr("action",$(obj).attr("method"));
        _form.submit();
    }
}

//更改角色状态
function changeStatus(id) {
    $.ajax({
        type:'POST',
        url: "changeStatus",
        data: {"id":id},
        async:true,
        success:function(data){
            var result = data;
            console.log(result.status);
            if(result.status=="0") {
                layer.msg('操作成功!');
                window.setTimeout("refreshPage()",2000);
            } else {
                layer.msg('操作失败!');
            }
        }
    });
}