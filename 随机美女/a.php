<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script src="/static/qmsg.js"></script>
    <link href="/static/qmsg.css" rel="stylesheet">
    <title>随机美女-ZYYO原创</title>
    <style>
        /* 去除链接的默认下划线，设置链接颜色为黑色 */
        a:hover,
        a:link,
        a:visited,
        a:active,
        a:focus ， #selectOption {
            text-decoration: none;
            color: #000000;
        }

        /* 去除按钮和输入框的默认样式 */
        button,
        input,
        input:focus,
        #selectOption {
            outline: none;
            border: none;
        }

        /* 去除链接、按钮和输入框的点击高亮效果 */
        a,
        button,
        input {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        body {
            overflow: hidden;
        }



        @keyframes movement {

            0%,
            100% {
                background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
                    110vmax 110vmax, 90vmax 90vmax;
                background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
                    -30vmax -10vmax, 50vmax 50vmax;
            }

            25% {
                background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
                    90vmax 90vmax, 60vmax 60vmax;
                background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax,
                    -40vmax -20vmax, 40vmax 60vmax;
            }

            50% {
                background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
                    60vmax 60vmax, 80vmax 80vmax;
                background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
                    20vmax 10vmax, 30vmax 70vmax;
            }

            75% {
                background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
                    90vmax 90vmax, 70vmax 70vmax;
                background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
                    -10vmax 10vmax, 40vmax 60vmax;
            }
        }


        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #d6f0ff;
            color: #fff;
            background-image: radial-gradient(closest-side, rgb(255 174 157), rgba(235, 105, 78, 0)),
                radial-gradient(closest-side, rgb(255 189 232), rgba(243, 11, 164, 0)),
                radial-gradient(closest-side, rgb(255 246 202), rgba(254, 234, 131, 0)),
                radial-gradient(closest-side, rgb(196 174 255), rgba(170, 142, 245, 0)),
                radial-gradient(closest-side, rgb(255 215 183), rgba(248, 192, 147, 0));
            background-repeat: no-repeat;
            animation: 1s movement linear infinite;
        }

        
        #infor {
            border-radius: 40px;
            box-shadow: 0 0 40px rgb(255 255 255 / 50%);
            width: 80vw;
            height: 30vh;
            display: flex;
            max-width: 500px;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #ffffff;
            font-size: 30px;
            background: linear-gradient(2deg, #40b3ff, #974fdd);
        }

      
        #video-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 95vw;
            height: 90vh;
            padding: 4vh 0;
            box-sizing: border-box;
        }

        
        video {
            border-radius: 22px;
            max-width: 100%;
            max-height: 100%;
        }

        /* 按钮样式 */
        #start,
        #blog-button,
        #select-button {
            height: 55px;
            width: 75px;
            background-color: #0043ff;
            color: #fff;
            font-size: 1rem;
            border: none;
            border-radius: 27px;
            cursor: pointer;
        }

        #selectOption {

            height: 50px;
            width: 60px;
            background-color: #0043ff;
            color: #fff;
            font-size: 1.1rem;
            border: none;
            border-radius: 33px;
            cursor: pointer;
        }
    </style>
</head>

<body>

    <div id="video-container">

        <div id="infor">
            随机美女视频</br>
            作者：ZYYO</br>
            自选接口</br>
        </div>
      
        <video playsinline="true" webkit-playsinline="true" x5-playsinline="true" x5-video-orientation="portraint"
            x5-video-player-fullscreen="true" x5-video-player-type="h5" style="display: none" id="video"></video>
    </div>

    <div style="display:flex;gap:12px;height: 10vh;justify-content: center;align-items: center;">
        <button id="start" onclick="Start()">开始</button>
        <button style="display: none" id="select-button">
            <select id="selectOption">

                <option value="http://www.yujn.cn/api/zzxjj.php">小姐姐视频</option>
                <option value="http://www.yujn.cn/api/xgg.php">小哥哥视频</option>
                <option value="http://www.yujn.cn/api/yuzu.php">玉足美腿</option>
                <option value="http://www.yujn.cn/api/tianmei.php">甜妹系列</option>
                <option value="http://www.yujn.cn/api/jksp.php">jk洛丽塔</option>
                <option value="http://www.yujn.cn/api/ndym.php">你的欲梦</option>
                <option value="http://www.yujn.cn/api/sbkl.php">双倍快乐</option>
                <option value="http://www.yujn.cn/api/rewu.php">热舞系列</option>
                <option value="http://www.yujn.cn/api/luoli.php">萝莉系列</option>
                <option value="http://www.yujn.cn/api/manhuay.php">漫画芋</option>
                <option value="http://www.yujn.cn/api/xiaoxin.php">小新翻唱</option>
                <option value="http://www.yujn.cn/api/shejie.php">蛇姐系列</option>
                <option value="http://www.yujn.cn/api/hanfu.php">汉服系列</option>
                <option value="http://www.yujn.cn/api/jpmt.php">狱卒系列</option>
                <option value="http://www.yujn.cn/api/manyao.php">慢摇系列</option>
                <option value="http://www.yujn.cn/api/diaodai.php">掉带系列</option>
                <option value="http://www.yujn.cn/api/qingchun.php">清纯系列</option>
                <option value="http://www.yujn.cn/api/COS.php">COS系列</option>
                <option value="http://www.yujn.cn/api/nvgao.php">纯情女高</option>
                <option value="http://www.yujn.cn/api/jiepai.php">街拍系列</option>
                <option value="http://www.yujn.cn/api/ksbianzhuang.php">快手变装</option>
                <option value="http://www.yujn.cn/api/dmsp.php">动漫视频</option>
                <option value="http://www.yujn.cn/api/lyy.php">懒洋洋翻唱</option>
                <option value="http://www.yujn.cn/api/wmsc.php">完美身材</option>
                <option value="http://www.yujn.cn/api/shwd.php">丝滑舞蹈</option>
                <option value="http://www.yujn.cn/api/chuanda.php">穿搭系列</option>
                <option value="http://www.yujn.cn/api/jjy.php">鞠婧祎系列</option>
                <option value="http://www.yujn.cn/api/zrn.php">章若楠系列</option>
            </select>
        </button>
        <button id="blog-button" onclick="window.location.href = 'https://zyyo.net';
">
            作者
        </button>
    </div>

    <script>

        Qmsg.config({
            showClose: true,
            timeout: 500
        })
        var video = document.getElementById('video');
        var start = document.getElementById('start');
        var infor = document.getElementById('infor');
        var selectOption = document.getElementById('selectOption');
        var selectbutton = document.getElementById('select-button');
        video.preload = 'metadata';
        video.poster = 'https://files.codelife.cc/wallhaven/full/p2/wallhaven-p2eg9e.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp';
        video.src = selectOption.value;
        video.addEventListener('ended', function () {
            Start();
        });

        selectOption.addEventListener('change', function () {

            value = selectOption.value;
            video.src = value;
            Start();

        });

        function Start() {
            Qmsg.success("加载成功");
            start.innerHTML = "下一个";
            infor.style.display = 'none';
            selectbutton.style.display = 'block';
            video.style.display = 'block';
            video.load();
            video.play().then(function () { }).catch(function (error) {
                console.error('不允许自动播放:', error);
            });
        }


        document.onkeydown = function (e) {
            if (e.key === "F12") {
                return false;
            }
        };

        document.body.oncontextmenu = function () {
            self.event.returnValue = false
        };



    </script>
</body>

</html>