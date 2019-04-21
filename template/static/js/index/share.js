/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-02 22:43:25
 * @lastTime: 2019-04-06 20:48:08
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

$(function () {
    md_edit = editormd("content-editormd", {
        placeholder: '此处开始编写您要发布的内容',
        width: "100%",
        height: 1000,
        codeFold: true,
        syncScrolling: "single",
        path: "lib/",
        //saveHTMLToTextarea: true, // 保存HTML到Textarea
    });
})


//文件上传设置
// let Horderoption = {
//     autoUpload: false,
//     url: '',
//     filters: {
//         max_file_size: '10mb',
//         prevent_duplicates: true,
//         mime_types: [{
//                 title: '图片',
//                 extensions: 'jpg,gif,png,webp'
//             },
//             {
//                 title: '图标',
//                 extensions: 'ico'
//             }
//         ]
//     },
//     limitFilesCount: 10,
//     deleteConfirm: true,
//     removeUploaded: true,
//
// }
// $('#uploaderHorder').uploader(Horderoption);
// let Uploader = $('#uploaderHorder').data('zui.uploader');
// console.log(Uploader);

//设置token
var token = document.cookie.split(";")[0];
document.querySelector('#token').setAttribute('value', token);
// console.log(token);
//文章可见计数器
var count = 0;

var share=new Vue({
    el:'#share',
    data:{
        label:{},
        user:{},
        followpeople:{}
    },
    created(){
        this.userinfor();
        this.followMe();
    },
    mounted:function(){
        this.get();
    },
    methods:{
        //加载文章类型
        get:function(){
            let self=this;
            let token=document.querySelector('#token').value;
            this.$http.get("http://localhost:8080/article/type/queryArticleTypeList", {
                params: {
                    accessToken: token
                }
            }).then(
                function(res){
                    self.label=res.body;
                   // console.log(JSON.stringify(res));
                },function(res){
                    console.log(res);
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        changeLable:function(){
            let lable=document.querySelector('#exampleInputType').value;
           // console.log(lable);
        },
        //发送文章
        setarticle:function(){
            let articleType = document.querySelector("#exampleInputType").value;
            let title = document.querySelector("#exampleInputtitle").value;
            let accessToken = document.querySelector('#token').value;
            document.querySelector("#exampleMarkdown").value = md_edit.getMarkdown();
            let content = document.querySelector("#exampleMarkdown").value;
            let visual = document.querySelector("#exampleInputcheck").value;
            let formData=new FormData();
            formData.append('accessToken',accessToken);
            formData.append('articleType',articleType);
            formData.append('title',title);
            formData.append('content',content);
            formData.append('visual',visual);
            this.$http.post('http://localhost:8080/article/publish',formData,{'Content-Type':'Multipart/form-data'}).then(
                function(res){
                    if (res.data.code == 0) {
                        new $.zui.Messager('发布成功', {
                            type: 'success',
                            placement: 'center',
                            icon: 'icon-ok-sign'
                        }).show();
                    } else {
                        new $.zui.Messager('发布未成功，'+data.message, {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    }
                    // console.log(JSON.stringify(res))
                },
                function (res) {
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
                    //console.log(JSON.stringify(res))
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //设置文章是否可见开关
        check:function(){
            if (count % 2 == 1) {
                document.querySelector("#exampleInputcheck").setAttribute("value", 0);
            } else {
                document.querySelector("#exampleInputcheck").setAttribute("value", 1);
            }
            count++;
        },
        //获取当前登陆用户信息
        userinfor:function(){
            let self=this;
            let token=document.querySelector('#token').value;
            this.$http.get("http://localhost:8080/user/queryMyInformation", {
                params: {
                    accessToken: token
                }
            }).then(
                function(res){
                    self.user=res.body.data;
                    console.log(res);
                },function(res){
                    console.log(res);
                }
            ).catch(function(reason){
                console.log(reason);
            })

        },
        //被关注人数
        followMe:function(){
            let self=this;
            let token=document.querySelector('#token').value;
            this.$http.get("http://localhost:8080/user/queryFollowedMeList", {
                params: {
                    accessToken: token
                }
            }).then(
                function(res){
                    self.followpeople=res.body.data;
                    console.log(res);
                },function(res){
                    console.log(res);
                }
            ).catch(function(reason){
                console.log(reason);
            })
        }
    },
    computed:{
        //计算被关注人数
        FollowUser:function(){
            return this.followpeople.length;
        }
    }
})