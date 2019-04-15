/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-11 09:03:00
 * @lastTime: 2019-04-11 10:32:47
 */
//设置token
var token = document.cookie.split(";")[0];
document.querySelector('#token').setAttribute('value', token);
console.log(token);
//判断是否登陆
var login_token=document.querySelector('#token').value;
if(login_token==''){
    window.location.href="login.html"
}

//侧边栏导航
var app=new Vue({
    el:'#app',
    data:{},
    mounted(){
      this.home();
    },
    methods: {
        //主页
        home:function(){
            $.ajax({
                url: '../model/home.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        bulletin_first: function () {
            $.ajax({
                url: '../model/bulletin_first.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
            //alert("success")
        },
        bulletin_second: function () {
            $.ajax({
                url: '../model/bulletin_second.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        bulletin_third: function () {
            $.ajax({
                url: '../model/bulletin_third.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        school_first: function () {
            $.ajax({
                url: '../model/schoolroll_add_school.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        college_first:function(){
            $.ajax({
                url: '../model/schoolroll_add_college.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        school_second:function(){
            $.ajax({
                url: '../model/schoolroll_list_school.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        college_second:function(){
            $.ajax({
                url: '../model/schoolroll_list_college.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        article_first:function(){
            $.ajax({
                url: '../model/article_manage.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        article_second:function(){
            $.ajax({
                url: '../model/article_type.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        article_third:function(){
            $.ajax({
                url: '../model/article_comment.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        user_normal:function(){
            $.ajax({
                url: '../model/user_normal.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        user_disable:function(){
            $.ajax({
                url: '../model/user_disable.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        article_log:function(){
            $.ajax({
                url: '../model/article_log.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        comment_log:function(){
            $.ajax({
                url: '../model/comment_log.html',
                type: 'get',
                success: function (res) {
                    $('#model').html($(res));
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
    }
});
