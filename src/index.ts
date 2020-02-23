// import * as Koa from 'koa'
// import * as Router from 'koa-router'
// import * as bodyParser from 'koa-bodyparser'
// import AppRoutes from './routes'
import { Wechaty } from 'wechaty'
const dotenv = require('dotenv')
dotenv.config()

const name = process.env.APP_NAME
const bot = Wechaty.instance({
  // profile: '',
  name
})

bot.on('scan', './listeners/on-scan')
bot.on('login', './listeners/on-login')
bot.on('logout', './listeners/on-logout')
bot.on('message', './listeners/on-message')
bot.on('friendship', './listeners/on-friendship')

bot.start()
  .then(() => console.log('Starter Bot Started.'))
  .catch(e => console.error(e))

// const app = new Koa()
// const router = new Router()
// const port = process.env.PORT || 8080

// 路由
// AppRoutes.forEach(route => router[route.method](route.path, route.action));

// app.use(bodyParser());
// app.use(router.routes());
// app.use(router.allowedMethods());
// app.listen(port);

// console.log(`应用启动成功 端口:${port}`);
