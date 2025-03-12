<?php
// 设置密码
$password = 'aaa';

if (isset($_POST['password'])) {
    $enteredPassword = $_POST['password'];
    if ($enteredPassword === $password) {
        $expirationTime = time() + 1000;
        setcookie('authorized', 'true', $expirationTime);
        header('Content-Type: application/json');
        echo json_encode(array('code' => 200, 'msg' => '登录成功'));
        exit();
    } else {
        header('Content-Type: application/json');
        echo json_encode(array('code' => 400, 'msg' => '密码错误'));
        exit();
    }
}

if (isset($_COOKIE['authorized']) && $_COOKIE['authorized'] === 'true') {

   include("a.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>登陆页</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="">
<link href="./static/qmsg.css" rel="stylesheet">
<script src="./static/qmsg.js"></script>
    <style>
        body {
    height: 100vh;
    width: 100vw;
    background: url(https://api.isoyu.com/bing_images.php) no-repeat;
    background: linear-gradient(5deg, #ffffff, #88a2e0);
}
button,
        input,
        input:focus ,
        #selectOption{
            outline: none;
            border: none;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow: hidden;
        }

        .login {
            width: 80%;
            max-width: 300px;
            padding: 50px 0;
            background-color: #fff;
            margin: 100px auto;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url(https://q1.qlogo.cn/g?b=qq&nk=3509679579&s=5);
    background-size: cover;
    margin-bottom: 20px;
    box-shadow: 0px 0px 20px #bd7e7e;
}

        #password {
            width: 80%;
            height: 40px;
            padding-left: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        #password:focus {
            border: 1px solid #000;
        }

        #password:hover {
            border: 1px solid #000;
        }

        #password:active {
            border: 1px solid #000;
        }

        #button {
    width: 80%;
    height: 40px;
    border-radius: 5px;
    background: linear-gradient(20deg, #6928b0, #246ca6);
    color: #fff;
    margin-bottom: 20px;
}
    
    </style>
</head>

<body>
    <div class="login">
        <div class="logo"></div>
        <input type="text" name="password" id="password" placeholder="请输入密码">
        <button id="button">提交</button>
    </div>
    <script>
 
var passwordInput = document.getElementById('password');
const button = document.getElementById('button');

button.addEventListener('click', function() {

var password = passwordInput.value;
if(password==""){
    
    Qmsg.success("密码不能为空");
}else{
    var xhr = new XMLHttpRequest();
    var loadingMsg = Qmsg.loading('我是加载条');
    xhr.open('POST', '', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var code = response.code;
            var msg = response.msg;
              setTimeout(function() {
             loadingMsg.close();
             if (code === 200) {
                 Qmsg.success(msg);
                 Qmsg.success("登陆一分钟后过期");
                setTimeout(function() {
                  location.reload();
                }, 1000); 
            } else {
               Qmsg.success(msg);
            }
           }, 500); 
             
            
        }
    };

    xhr.send('password=' + encodeURIComponent(password));
}
});

    </script>
</body>

</html>
 