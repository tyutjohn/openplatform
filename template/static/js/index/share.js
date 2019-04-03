/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-02 22:43:25
 * @lastTime: 2019-04-03 23:44:47
 */
$(function () {
    //超过一定高度导航添加类名
    var nav = $("header"); //得到导航对象  
    var win = $(window); //得到窗口对象  
    var sc = $(document); //得到document文档对象。  
    win.scroll(function () {
        if (sc.scrollTop() >= 100) {
            nav.addClass("on");
        } else {
            nav.removeClass("on");
        }
    })

    //移动端展开nav
    $('#navToggle').on('click', function () {
        $('.m_nav').addClass('open');
    })
    //关闭nav
    $('.m_nav .top .closed').on('click', function () {
        $('.m_nav').removeClass('open');
    })

    //二级导航  移动端
    $(".m_nav .ul li").click(function () {
        $(this).children("div.dropdown_menu").slideToggle('slow')
        $(this).siblings('li').children('.dropdown_menu').slideUp('slow');
    });

})

//富文本编辑器设置
let E = window.wangEditor
let editor = new E('#Editor')
editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
editor.create()
editor.txt.html('<p>开始编辑你的文章</p>')
editor.customConfig.linkImgCallback = function (url) {
    console.log(url) // url 即插入图片的地址
}
// document.querySelector("#set").addEventListener('click', function () {
//     alert(editor.txt.text())
// }, false)

//文件上传设置
let Horderoption = {
    autoUpload: false,
    url: '',
    filters: {
        max_file_size: '10mb',
        prevent_duplicates: true,
        mime_types: [{
                title: '图片',
                extensions: 'jpg,gif,png,webp'
            },
            {
                title: '图标',
                extensions: 'ico'
            }
        ]
    },
    limitFilesCount: 10,
    deleteConfirm: true,
    removeUploaded: true,

}
$('#uploaderHorder').uploader(Horderoption);
let Uploader = $('#uploaderHorder').data('zui.uploader');
console.log(Uploader);

//设置token
var token = document.cookie.split(";")[0];
//console.log(token);

//设置文章是否可见的开关
let count = 0;
let visual = document.querySelector("#exampleInputcheck").value;
document.querySelector("#exampleInputcheck").addEventListener('click', function () {
    if (count % 2 == 1) {
        visual="0";
        //console.log(visual)
    } else {
        visual="1";
        //console.log(visual);
    }
    count++
})
//发送文章
document.querySelector('#set').addEventListener('click', function () {
    let articleType = document.querySelector("#exampleInputType").value;
    let title = document.querySelector("#exampleInputtitle").value;
    let content=editor.txt.text();
    //console.log(content);
    $.ajax({
        url:'url',
        data:{
            "articleType":articleType,
            "content":content,
            "title":title,
            "visual":visual
        },
        headers:{
            'Content-Type':'application/json',
            'access-token':token
        },
        dataType:"json",
        type:'POST',
        method:'post',
        success:function(data){
            new $.zui.Messager('发布成功',{
                type:'success',
                placement:'center',
                icon:'icon-ok-sign'
            }).show();
        },
        error:function(){
            new $.zui.Messager('网络错误或找不到服务器,错误信息',{
                type:'danger',
                placement:'center',
                icon:'icon-exclamation-sign'
            }).show();
        }
    })
    return false;
})