# 微信中英互译小助手

[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.30-blue.svg)](https://github.com/Chatie/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)

基于 wechaty 的微信中英互译小助手。实现自动中英互译，再也不用微信聊天时候切换 APP 进行翻译啦，直接转发消息给小助手即可搞定。

## 目录
- [实现功能](#实现功能)
- [效果预览](#效果预览)
- [安装](#安装)
- [项目中常用docker命令](#项目中常用docker命令)
- [常见问题与使用要点](#常见问题与使用要点)
- [声明](#声明)
- [体验与交流](#体验与交流)

## 实现功能
- [x] 每天 08:00 至 23:00 自动向接收邮箱发送最新微信登录二维码；
- [x] 登录成功后自动向接收邮箱发送登录成功邮件；
- [x] 掉线后自动向接收邮箱发送掉线邮件；
- [x] 中英互译；
- [ ] 语音翻译；
- [ ] 多语种支持；

## 效果预览
![](http://bowens-file.hanwenbo.top/IMG_8F56F868E1A6-1.jpeg)

## 安装
1. 需求环境
   - Node.js v10
   - Git
   - docker
   - 具有 stmp 功能的邮箱
   - [腾旭 AI 平台](https://ai.qq.com/)账号，并创建应用，接入「语种识别」与「文本翻译」能力；
2. 获取 wechaty 的 docker 镜像文件
    ```bash
    docker pull zixia/wechaty
    ```
    > [安装详细参见：docker-wechaty-getting-started](https://github.com/wechaty/docker-wechaty-getting-started)

    > docker 安装镜像如果速度慢，请使用第三方源，如：[阿里云容器镜像服务](https://cr.console.aliyun.com/cn-beijing/instances/mirrors)
3. 拉取项目并安装依赖
    ```bash
    git clone git@github.com:bowens-h/translate-wechat-bot.git
    cd translate-wechat-bot
    yarn 或 npm install
    cp .env.example .env
    ```
    如果速度 yarn 或 npm 安装速度慢，推荐使用 nrm 进行源管理
    ```bash
    npm i -g nrm
    nrm ls
    nrm use taobao
    ```
4. 编辑 .env 文件
    ```bash
    APP_NAME=小助手名称
    MAIL_START=是否启用邮箱提醒 true|false
    MAIL_USER=发件人邮箱
    MAIL_PASSWORD=发件人密码（授权码）
    MAIL_TO=收件人
    MAIL_HOST=stmp服务器
    MAIL_PORT=stmp端口号
    TENCENT_AI_APP_ID=腾讯ai平台app_id
    TENCENT_AI_APP_KEY=腾讯ai平台app_key
    ```
    > 邮件服务由 [nodemailer](https://nodemailer.com/) 提供
5. 运行
   ```bash
   # web 协议
   docker run -ti --name APP_NAME --rm --volume="$(pwd)":/bot zixia/wechaty src/index.ts

   # 或（pad协议）
   docker run -it --rm --name APP_NAME -e WECHATY_PUPPET="wechaty-puppet-padplus" -e WECHATY_PUPPET_PADPLUS_TOKEN="TOKEN" --volume="$(pwd)":/bot zixia/wechaty src/index.ts

   # 或（具有热更新能力）
   docker run -it --rm --name APP_NAME -e WECHATY_PUPPET="wechaty-puppet-padplus" -e WECHATY_PUPPET_PADPLUS_TOKEN="TOKEN" --mount type=bind,source="$(pwd)",target=/bot zixia/wechaty src/index.ts

   # 或（添加端口映射，可进行 API 开发）
   docker run -it --rm --name APP_NAME -e WECHATY_PUPPET="wechaty-puppet-padplus" -e WECHATY_PUPPET_PADPLUS_TOKEN="TOKEN" -p 8888:8888 --mount type=bind,source="$(pwd)",target=/bot zixia/wechaty src/index.ts

   # 或（服务器中后台运行）
   docker run -dit --rm --name APP_NAME -e WECHATY_PUPPET="wechaty-puppet-padplus" -e WECHATY_PUPPET_PADPLUS_TOKEN="TOKEN" --mount type=bind,source="$(pwd)",target=/bot zixia/wechaty src/index.ts

   # 或（设置 wechaty 日志级别）
   docker run -dit --rm --name APP_NAME -e WECHATY_PUPPET="wechaty-puppet-padplus"  -e WECHATY_LOG="verbose"  -e WECHATY_PUPPET_PADPLUS_TOKEN="TOKEN" --mount type=bind,source="$(pwd)",target=/bot zixia/wechaty src/index.ts
   ```
   > 命令释意：  
   > -it：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器；  
   > -dit：同上 + 后台运行；  
   > --name：创建容器的名称，请将 APP_NAME 进行替换；  
   > --rm：在容器终止运行后自动删除容器文件；  
   > --volume="$(pwd)":/bot：在镜像外层目录上挂载一个bot文件夹，存放的是当前文件夹的内容；  
   > --mount：同上 + 热更新，[参考链接](http://einverne.github.io/post/2018/03/docker-v-and-mount.html);  
   > -e WECHATY_PUPPET_PADPLUS_TOKEN：设置 TOKEN 环境变量，供容器内使用，请将 TOKEN 进行替换；  
   > -e WECHATY_LOG：设置日志环境变量，供容器内使用，[参考链接](https://github.com/wechaty/wechaty/wiki/Log)；  
   > -p 8888:8888：映射本地 8888 端口到 docker 8888 端口；
6. 运行成功后，扫描命令行上的二维码即可正常使用；

## 项目中常用docker命令
```bash
# 查看当前已安装镜像
docker images

# 查看当前运行容器（可获取 CONTAINER_ID）
docker ps

# 查看当前后台容器运行的日志（实时滚动）
docker logs -f CONTAINER_ID

# 重启容器
docker restart CONTAINER_ID

# 停止容器
docker stop CONTAINER_ID

# 进入容器 bash
docker run -ti --name APP_NAME --rm --volume="$(pwd)":/bot zixia/wechaty bash
```

## 常见问题与使用要点
1. 我的微信号无法登陆  
   
   从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆：https://wx.qq.com 上扫码查看是否能登陆，如果无法登录。请[申请 wechaty 的 Token](https://github.com/wechaty/wechaty/wiki/Support-Developers)，使用 pad 协议。

2. 使用 docker 运行 wechaty，无需在本地安装 wechaty 与 wechaty-puppet-padplus，本地实例化 wechaty 如下：
   ```TypeScript
    import { Wechaty } from 'wechaty'
    const name = process.env.APP_NAME
    const bot = Wechaty.instance({
    name
    })
   ```
   运行上述 docker 命令（pad 协议），将会自动加载所需依赖。
   > 实例化 wechaty，推荐使用 `Wechaty.instance({name})` ，相比于 `new Wechaty()`，添加 name 参数，可解决偶尔掉线的问题。
3. 只有当 `src/listeners` 文件夹内的文件发生改变时才可触发 docker 热更新，否则，需要重启 docker 容器；
4. 只要手机微信上依然显示着 web 或 pad 登录中，且实例化 Wechaty 是给定了 name 参数，重启脚本不用再次扫码登录，将会自动登录；
5. 在任意文件中，使用 `Wechaty.instance()` 都可获得当前 Wechaty 实例，当然，需要先 `import { Wechaty } from 'wechaty'`；
6. 在与腾讯 AI 平台接口交互时，需要进行 sign 加密校验，由于 javascript 的 urlencode 方法与其他语言表现不一致，故需自定义 urlencode 方法，详见 `src/service/user-service.ts`；
7. 更多问题  
   
   如果以上还没有解决你的问题，由于本项目是依赖 wechaty 开发，所以请先前往 [wechaty](https://github.com/wechaty/wechaty) 的项目 issues 中或 Google 查找是否存在相同的问题。

## 声明
- 本项目属于个人兴趣开发，开源是为了更好的技术交流，请勿使用此项目做违反微信规定或者其他违法事情；
- 建议使用小号进行测试；

## 体验与交流

欢迎有兴趣的小伙伴可以加小助手微信进行体验与交流。

![](http://bowens-file.hanwenbo.top/IMG_4604.JPG)