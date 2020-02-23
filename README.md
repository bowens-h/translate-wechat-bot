[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)

[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.30-blue.svg)](https://github.com/Chatie/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)

# 微信中英互译小助手
基于 wechaty 的微信中英互译小助手。实现自动中英互译，再也不用微信聊天时候切换 APP 进行翻译啦，直接转发消息给小助手即可搞定。

## 实现功能
[*] 自动向设置的邮箱发送微信登录二维码；  

## 效果预览
![](http://bowens-file.hanwenbo.top/IMG_8F56F868E1A6-1.jpeg)

## 安装
1. 需求环境：Node.js v10、git、docker
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
    MAIL_USER=邮件发件人
    MAIL_PASSWORD=发件人邮箱
    MAIL_TO=收件人
    MAIL_HOST==stmp服务器
    MAIL_PORT=stmp端口号
    TENCENT_AI_APP_ID=腾讯ai平台app_id
    TENCENT_AI_APP_SECRET=腾讯ai平台app_secret
    ```
    > 邮件服务由
## ts-koa-starter

这是一个`koa`+`typescript`的起手式(简单的空环境)

如果你想再加个`typeorm`来玩玩数据库，请 clone 下来后切换到`bt-ts-koa-typeorm`分支

ps:`typeorm`是一个非常好的数据库 ORM，如果你没玩过，请务必尝试一下 💪💪💪

## 项目结构

```
.
├── src
│   ├── controller      //controller层
│   ├── service         //service层
│   ├── routes.ts       //路由
│   └── index.ts        //项目入口index.js
├── ecosystem.config.js //pm2配置
├── nodemon.json        //nodemon配置
├── package.json
└── tsconfig.json
```

## 使用

- git clone https://github.com/Vibing/ts-koa-starter.git
- yarn 或者 npm i
- yarn start 或 npm start
- 在浏览器中开打`localhost:3000`

### 打包

- yarn build 或 npm run build

### 生产环境启动

- 生产环境使用 pm2 启动 可以达到负载均衡 执行：yarn pro 或 npm run pro （生产环境端口默认：8080）

## 友情链接

- Koa2 [Koa (koajs) -- 基于 Node.js 平台的下一代 web 开发框架 \| Koajs 中文文档](https://koa.bootcss.com/)
- Typescript [TypeScript 中文网 · TypeScript——JavaScript 的超集](https://www.tslang.cn/)
