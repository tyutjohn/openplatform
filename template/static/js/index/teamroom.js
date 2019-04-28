/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-04-19 19:27:08
 * @lastTime: 2019-04-19 19:28:25
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
var url=location.search,
    obj={};

var tar=url.replace("?","");
//设置token
var token = document.cookie.split(";")[0];
document.querySelector('#token').setAttribute('value', token);
//设置开关计数
var count=0;

var teamroom=new Vue({
    el:'#teamroom',
    data:{
        teammation:{
            teamMemberVOList:{
                length:{}
            }
        },
        resourcelist:{
            length:{}
        },
        teamnumber:{},
        teamType:{}
    },
    created(){
        this.teamlist();
        this.resourceList();
       // this.teamtype();
    },
    methods:{
        teamlist:function(){
            let self = this;
            this.$http.get("/team/queryPublic/" + tar).then(
                function (res) {
                    self.teammation = res.body.data;
                    new $.zui.Messager('加载成功', {
                        type: 'success',
                        placement: 'center',
                        icon: 'icon-ok-sign'
                    }).show();
                    console.log(res)
                },
                function (res) {
                    if (res.body.code == 1201) {
                        new $.zui.Messager('未登陆账户', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    } else {
                        new $.zui.Messager('网络错误或找不到服务器', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    }
                }
            ).catch(function (reason) {
                console.log(reason)
            })
        },
        //资源列表
        resourceList:function(){
            let self = this;
            let token=document.querySelector('#token').value;
            this.$http.get("/teamResource/queryList/" + tar,{
                params:{
                    accessToken:token
                }
            }).then(
                function (res) {
                    if(res.body.code==0){
                        self.resourcelist = res.body.data;
                        new $.zui.Messager('加载成功', {
                            type: 'success',
                            placement: 'center',
                            icon: 'icon-ok-sign'
                        }).show();
                    }else{
                        new $.zui.Messager('即将跳转,'+res.body.message, {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                        window.setTimeout(function(){
                            window.location.href='team.html'
                        },3000);
                    }
                    //console.log(res)
                },
                function (res) {
                    if (res.body.code == 1201) {
                        new $.zui.Messager('未登陆账户', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                        window.location.href='login.html'
                    } else {
                        new $.zui.Messager('网络错误或找不到服务器', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    }
                }
            ).catch(function (reason) {
                console.log(reason)
            })
        },
        //下载资源
        downloadR:function(event){
            let token=document.querySelector('#token').value;
            let resourceId = event.target.previousElementSibling.innerHTML;
            //console.log(resourceId);
            this.$http.get("/teamResource/download/"+resourceId,{
                params:{
                    accessToken:token,
                }
            }).then(
                function (res) {
                    // if(res.body.code==0){
                    // new $.zui.Messager('正在下载', {
                    //     type: 'success',
                    //     placement: 'center',
                    //     icon: 'icon-ok-sign'
                    // }).show();
                    // }else{
                    //     new $.zui.Messager('下载失败，'+res.body.message, {
                    //         type: 'danger',
                    //         placement: 'center',
                    //         icon: 'icon-exclamation-sign'
                    //     }).show();
                    // }
                    console.log(res)
                },
                function (res) {
                    if (res.body.code == 1201) {
                        new $.zui.Messager('未登陆账户', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                        window.location.href='login.html'
                    } else {
                        new $.zui.Messager('网络错误或找不到服务器', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    }
                }
            ).catch(function (reason) {
                console.log(reason)
            })
        },
        //调用Input file
        setadd:function(){
            this.$refs.resourceadd.click();
        },
        //添加上传文件样式
        tirggerFile:function(){
            let filename=document.querySelector('#file').value;
            if(!filename==''){
                document.querySelector('#file-show').style.display='flex';
            }
            document.querySelector('#file-name').innerHTML=filename;
        },
        //发布资源
        pushResource:function(){
            let token=document.querySelector('#token').value;
            let file=document.querySelector('#file').files[0];
            let redourceName=document.querySelector('#redourceName').value;
            let commentForm = new FormData();
            commentForm.append('accessToken', token);
            commentForm.append('file',file);
            commentForm.append('redourceName',redourceName);
            commentForm.append('teamId',tar);
            this.$http.post('/teamResource/publish', commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if (res.body.code == 0) {
                        new $.zui.Messager('发布成功', {
                            type: 'success',
                            placement: 'center',
                            icon: 'icon-ok-sign'
                        }).show();
                        window.location.reload();
                    }else{
                        new $.zui.Messager('发布失败，'+res.body.message, {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res);
                },
                function (res) {
                    if (res.body.code == 1201) {
                        new $.zui.Messager('未登陆账号，即将跳转', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                        window.location.href = 'login.html'
                    } else {
                        new $.zui.Messager('网络错误或未找到服务器，请检查网络后重新刷新', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(JSON.stringify(res))
                }
            ).catch(function (reason) {
                console.log(reason);
            })
        },
        //删除资源
        deleteR:function(event){
            let token=document.querySelector('#token').value;
            let resourceId = event.target.nextElementSibling.innerHTML;
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('resourceId',resourceId)
            this.$http.put('/teamResource/deleted/'+resourceId,commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('删除资源成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.reload();
                    }else{
                        new $.zui.Messager('删除失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //成员列表
        teamNumber:function(){
            let self = this;
            let token=document.querySelector('#token').value;
            this.$http.get("/teamMember/queryList/" + tar,{
                params:{
                    accessToken:token
                }
            }).then(
                function (res) {
                    self.teamnumber = res.body.data;
                    new $.zui.Messager('加载成功', {
                        type: 'success',
                        placement: 'center',
                        icon: 'icon-ok-sign'
                    }).show();
                    console.log(res)
                },
                function (res) {
                    if (res.body.code == 1201) {
                        new $.zui.Messager('未登陆账户', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    } else {
                        new $.zui.Messager('网络错误或找不到服务器', {
                            type: 'danger',
                            placement: 'center',
                            icon: 'icon-exclamation-sign'
                        }).show();
                    }
                }
            ).catch(function (reason) {
                console.log(reason)
            })
        },
        //删除成员下拉
        deleteSel:function(event){
            let domdel=event.target.parentElement.nextElementSibling;
            domdel.style.display="block"
        },
        //删除成员
        deleteNum:function(event){
            let token=document.querySelector('#token').value;
            let memberId = event.target.nextElementSibling.innerHTML;
            let password=event.target.previousElementSibling.firstElementChild.value;
            console.log(password);
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('memberId',memberId);
            commentForm.append('password',password);
            commentForm.append('teamId',tar);
            this.$http.put('/teamMember/remove',commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('移除队员成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.reload();
                    }else{
                        new $.zui.Messager('移除失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //加载队伍类型
        // teamtype:function(){
        //     let self=this;
        //     let token=document.querySelector('#token').value;
        //     this.$http.get("/teamType/queryList", {
        //         params: {
        //             accessToken: token
        //         }
        //     }).then(
        //         function(res){
        //             self.teamType=res.body;
        //             console.log(res);
        //         },function(res){
        //             if (res.body.code == 1201) {
        //                 new $.zui.Messager('未登陆账号，即将跳转', {
        //                     type: 'danger',
        //                     placement: 'center',
        //                     icon: 'icon-exclamation-sign'
        //                 }).show();
        //                 window.location.href = 'login.html'
        //             } else {
        //                 new $.zui.Messager('网络错误或未找到服务器，请检查网络后重新刷新', {
        //                     type: 'danger',
        //                     placement: 'center',
        //                     icon: 'icon-exclamation-sign'
        //                 }).show();
        //             }
        //             console.log(res);
        //         }
        //     ).catch(function(reason){
        //         console.log(reason);
        //     })
        // },
        //获取类型的值
        changeType:function(){
            let School=document.querySelector('#Xtype').value;
            console.log(School);
        },
        //设置是否可见的开关
        Switch:function(){
            if (count % 2 == 1) {
                document.querySelector("#visual").setAttribute("value", 0);
            } else {
                document.querySelector("#visual").setAttribute("value", 1);
            }
            count++;
        },
        //修改队伍信息
        teamInforUpdata:function(){
            let token=document.querySelector('#token').value;
            let description=document.querySelector('#Xdescription').value;
            let number=document.querySelector('#Xnumber').value;
            let password=document.querySelector('#Xpassword').value;
            let teamName=document.querySelector('#XteamName').value;
            let type=document.querySelector('#Xtype').value;
            let visual=document.querySelector('#visual').value;
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('description',description);
            commentForm.append('number',number);
            commentForm.append('password',password);
            commentForm.append('teamName',teamName);
            commentForm.append('type',type);
            commentForm.append('visual',visual);
            commentForm.append('teamId',tar);
            this.$http.put('/team/updatedTeamInfor',commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('修改信息成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.reload();
                    }else{
                        new $.zui.Messager('修改失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //修改队伍密码
        teamPasUpdate:function(){
            let token=document.querySelector('#token').value;
            let password=document.querySelector('#Upassword').value;
            let formerPassword=document.querySelector('#UformerPassword').value;
            let confirmPassword=document.querySelector('#UconfirmPassword').value;
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('password',password);
            commentForm.append('formerPassword',formerPassword);
            commentForm.append('confirmPassword',confirmPassword);
            commentForm.append('teamId',tar);
            this.$http.put('/team/updatedPassword',commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('修改密码成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.reload();
                    }else{
                        new $.zui.Messager('修改密码失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //获取验证码
        setcode:function(){

        },
        //忘记队伍密码
        teamForgetpas:function(){
            let token=document.querySelector('#token').value;
            let password=document.querySelector('#Fpassword').value;
            let confirmPassword=document.querySelector('#FconfirmPassword').value;
            let code=document.querySelector('#Fcode').value;
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('password',password);
            commentForm.append('confirmPassword',confirmPassword);
            commentForm.append('code',code);
            commentForm.append('teamId',tar);
            this.$http.put('/team/forgetPassword',commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('重置密码成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.reload();
                    }else{
                        new $.zui.Messager('重置密码失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //删除队伍
        teamDelete:function(){
            let token=document.querySelector('#token').value;
            let password=document.querySelector('#Dpassword').value;
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('password',password);
            commentForm.append('teamId',tar);
            this.$http.put('/team/deleted',commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('删除队伍成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.href='team.html';
                    }else{
                        new $.zui.Messager('删除队伍失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //队伍转让
        teamMove:function(){
            let token=document.querySelector('#token').value;
            let password=document.querySelector('#Mpassword').value;
            let mobile=document.querySelector('#Newmobile').value;
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('password',password);
            commentForm.append('mobile',mobile);
            commentForm.append('teamId',tar);
            this.$http.put('/team/transfer',commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('队长转让成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.href='team.html';
                    }else{
                        new $.zui.Messager('队长转让失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        },
        //退出队伍
        teamOut:function(){
            let token=document.querySelector('#token').value;
            let commentForm=new FormData();
            commentForm.append('accessToken',token);
            commentForm.append('teamId',tar);
            this.$http.put('/teamMember/exitTeam/'+tar,commentForm, {
                'Content-Type': 'Multipart/form-data'
            }).then(
                function (res) {
                    if(res.body.code==0){
                        new $.zui.Messager('退出队伍成功',{
                            type:'success',
                            placement:'center',
                            icon:'icon-ok-sign'
                        }).show();
                        window.location.href='team.html';
                    }else{
                        new $.zui.Messager('退出队伍失败，'+res.body.message,{
                            type:'danger',
                            placement:'center',
                            icon:'icon-exclamation-sign'
                        }).show();
                    }
                    console.log(res)
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
                    console.log(res)
                }
            ).catch(function(reason){
                console.log(reason);
            })
        }
    },
    computed:{
        //计算资源数量
        ResNum:function(){
            return this.resourcelist.length;
        },
        //计算团队人数
        TeamNum:function(){
            return this.teammation.teamMemberVOList.length;
        }
    },
    filters:{
        capitalize:function(value){
            let d=new Date(value);
            let times=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'--'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
            return times;
        }
    }
})