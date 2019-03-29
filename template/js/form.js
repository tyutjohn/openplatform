/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-03-27 15:07:29
 * @lastTime: 2019-03-29 11:34:45
 */

//登陆注册交互动画
let screen = window.screen.width;
if (screen < 500) {
    document.querySelector("#pc").classList.add("hidden");
    document.querySelector("#button").classList.remove("hidden")
};
//切换登陆注册页面
let click = document.querySelector("#login-register");
click.onclick = function () {
    let clear = document.querySelector(".div-card").setAttribute("style", "background:none")
    let time = window.setTimeout(BackgroundClear, 1500);

    function BackgroundClear() {
        document.querySelector(".div-card").setAttribute("style", "background:#88eaeab3;")
    }
    let add1 = document.querySelector("#login").classList.add("LoginOverturn");
    let add2 = document.querySelector("#register").classList.add("RegisterOverturn");
}

//短信验证码
let code = document.querySelector(".code");
code.onclick = function () {
    let phone = document.querySelector("#exampleInputPhone").value;
    if (phone != '') {
        let phone = document.querySelector("#exampleInputPhone").value;
        $.ajax({
            url: 'register/code',
            data: phone,
            type: 'post',
            success: function () {
                alert("验证码发送成功");

                //设置button效果
                code.classList.add("disabled", "colse");
                let time = 60;
                let timer = setInterval(() => {
                    if (time == 0) {
                        code.classList.remove("colse", "disabled");
                        code.setAttribute("value", "获取验证码");
                    } else {
                        code.value = time + "秒";
                        time--;
                    }
                }, 1000);
            },
            error: function () {
                alert("网络错误")
            }
        })

    } else {
        alert("手机号码不能为空")
    }
}

//注册提交
let ReadyRegister = document.querySelector("#ReadyRegister");

ReadyRegister.onclick = function () {
    let username = document.querySelector("#exampleInputAccount2").value;
    let userpassword = document.querySelector("#exampleInputPassword2").value;
    let userphone = document.querySelector("#exampleInputPhone").value;
    let usercode = document.querySelector("#exampleInputCode").value;
    if (username && userpassword && userphone && usercode != '') {
        //post提交注册表单
        let arry = $("#form2").serializeArray();
        var obj = {};
        for (let i = 0; i < arry.length; i++) {
            obj[arry[i].name] = arry[i]['value'];
        }
        let data = JSON.stringify(obj);
        // alert(data);
        $.ajax({
            url: 'register/form',
            data: data,
            type: 'post',
            success: function () {
                alert("注册成功")
            },
            error: function () {
                alert("网络错误")
            }
        })

    } else {
        alert("信息未填写完整")
    }
}