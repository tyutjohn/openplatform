/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-01 19:03:05
 * @lastTime: 2019-04-03 21:21:21
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
                    //console.log(res.data);
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
        }
    },
})