/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * @since: 2019-03-27 15:07:29
 * @lastTime: 2019-03-27 15:14:29
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

        sendMessage();
    } else {
        alert("手机号码不能为空")
    }
}

//向后台发送手机号并请求验证码
function sendMessage() {
    let phone = document.querySelector("#exampleInputPhone").value;
    var xhr = new XMLHttpRequest();
    xhr.open("post", "url,jsp", true);
    var data = {
        phone: phone
    }
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert("sucess")
            }
        }
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
        var xhr = new XMLHttpRequest();
        xhr.open("post", "url3,jsp", true);
        var data = {
            username: username,
            userpassword: userpassword,
            userphone: userphone,
            usercode: usercode
        }
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    alert("sucess")
                }
            }
        }

    } else {
        alert("信息未填写完整")
    }
}