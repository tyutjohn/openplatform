/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-11 09:56:04
 * @lastTime: 2019-04-11 10:34:12
 */
$("#button").click(function () {
    var arry = $("#form").serializeArray();
    var obj = {};
    for (let i = 0; i < arry.length; i++) {
        obj[arry[i].name] = arry[i]['value'];
    }
    let formdata = JSON.stringify(obj);
    console.log(obj);
    $.ajax({
        url: "http://localhost:8080/admin/login",
        contentType : 'application/json',
        data: formdata,
        type: 'POST',
        method:"post",
        success: function(data){
            if(!data.code==0) {
                new $.zui.Messager('错误信息:'+JSON.stringify(data),{
                    type:'danger',
                    placement:'bottom',
                    icon:'icon-exclamation-sign'
                }).show();
                //alert(JSON.stringify(data));
            }
            if(data.code==0) {
                new $.zui.Messager('登陆成功，正在为您跳转',{
                    type:'success',
                    placement:'center',
                    icon:'icon-ok-sign'
                }).show();
                let token=data.data.accessToken;
                document.cookie=token;
                window.location.href="index.html"
            }
        },
        error:function(){
            new $.zui.Messager('网络错误或找不到服务器,错误信息',{
                type:'danger',
                placement:'bottom',
                icon:'icon-exclamation-sign'
            }).show();
            //alert('网络错误或找不到服务器');
        }
    })
    return false;
})