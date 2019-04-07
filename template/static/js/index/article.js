/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-01 19:03:05
 * @lastTime: 2019-04-07 23:21:16
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
//获取URL id
let url=location.search,
    obj={};

let tar=url.replace("?","");
//设置token
var token = document.cookie.split(";")[0];
document.querySelector('#token').setAttribute('value', token);

var app=new Vue({
    el:"#app",
    data:{
        article:{
            data:{
                publisherNick:{},
                publisherAvatar:{},
                articleType:{},
                title:{},
                content:{},
                accessory:{},
                updatedAt:{},
                articleLikeVOList:{
                    likeUserId:{},
                    userNick:{}
                },
                articleCommentVOList:{
                    createdAt:{},
                    senderName:{},
                    content:{}
                }
            }
        }
    },
    mounted:function(){
        this.get();
    },
    methods: {
        get:function(){
            let self=this;
            //
            this.$http.get("http://127.0.0.1:8080/article/query/"+tar).then(
                function(res){
                    self.article=res.data;
                    new $.zui.Messager('加载成功',{
                        type:'success',
                        placement:'center',
                        icon:'icon-ok-sign'
                    }).show();
                    console.log(res.data);
                },function(res){
                    new $.zui.Messager('网络错误或找不到服务器',{
                        type:'danger',
                        placement:'center',
                        icon:'icon-exclamation-sign'
                    }).show();
                    //console.log("状态码"+res.status+"网络错误或找不到服务器");
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        putcomment:function(){
            let content=document.querySelector('#comment-content').value;
            let token=document.querySelector('#token').value;
            //console.log(token);
            let formData=new FormData();
            formData.append('accessToken',token);
            formData.append('content',content);
            formData.append('parentId',tar)
            this.$http.post('http://localhost:8080/artircle/comment/publish',formData,{'Content-Type':'Multipart/form-data'}).then(
                function(res){
                    if(res.body.code==1001){
                        new $.zui.Messager('未填写内容，请重新填写评论',{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }else if(res.body.code==0){
                        new $.zui.Messager('发布成功，刷新加载新评论',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                    }else{
                        new $.zui.Messager('评论失败，错误原因:'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                },function(res){
                    if(res.body.code==1201){
                        new $.zui.Messager('未登陆账户，正在跳转',{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                        window.location.href='login.html'
                    }else{
                    new $.zui.Messager('网络错误或找不到服务器',{
                        type:'danger',
                        placement:'center',
                        icon:'icon-exclamation-sign'
                    }).show();
                    }
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //删除评论
        delete_comment:function(){
            
        },
        //举报
        report:function(){

        }
    },
})

//markdown文章渲染
$(function(){
    editormd.markdownToHTML("markdown", {
        htmlDecode: "style,script,iframe", //可以过滤标签解码
        emoji: true,
        taskList: true,
        tex: true,               // 默认不解析
        flowChart: true,         // 默认不解析
        sequenceDiagram: true, // 默认不解析
        codeFold: true,
    });
})
//多刷新一次解决渲染不到的bug
$(document).ready(function () {

    let begin=setInterval(function(){
        window.location.reload();
    },1000)
    clearInterval(begin)
})

//点赞接口
document.querySelector("#article-love").addEventListener('click',function(){
    //console.log(tar);
    $.get('http://localhost:8080/article/likes/'+tar,{
        "accessToken":token,
        "articleId":tar
    },function(data){
        alert("success")
    })
})