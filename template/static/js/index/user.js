/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-03 11:19:12
 * @lastTime: 2019-04-03 21:12:07
 */
//banner设置
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

//vue-resource加载文章
var app=new Vue({
    el:'#vue_item',
    data:{
        items:[],
        resource:[],
    },
    mounted:function(){
        this.get();
    },
    methods: {
        get:function(){
            let that=this;
            this.$http.get('data.json').then(
                function(res){
                    that.items=res.data;
                    console.log(res.data);
                    document.querySelector('.main-content').style.height="auto";
                },function(res){
                    new $.zui.Messager('网络错误或找不到服务器,错误信息'+JSON.stringify(res),{
                        type:'danger',
                        placement:'bottom',
                        icon:'icon-exclamation-sign'
                    }).show();
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        checktab:function(){
            //alert("success")
            this.$http.get('fad.json').then(
                function(res){
                   this.resource=res;
                   console.log(res);
                },function(res){
                    new $.zui.Messager('网络错误或找不到服务器,错误信息',{
                        type:'danger',
                        placement:'bottom',
                        icon:'icon-exclamation-sign'
                    }).show();
                }
            )
        }
    },
})