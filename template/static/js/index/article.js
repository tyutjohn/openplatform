/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-01 19:03:05
 * @lastTime: 2019-04-01 20:09:45
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
            this.$http.get("/article.json").then(
                function(res){
                    self.article=res.data;
                    console.log(res.data);
                },function(res){
                    console.log("状态码"+res.status+"网络错误或找不到服务器");
                }
            ).catch(function(reason){
                console.log(reason);
            })
        }
    },
})