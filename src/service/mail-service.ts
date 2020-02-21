const nodemailer = require('nodemailer')
// import { moment } from 'moment'
const moment = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

export class Mail {
  transporter: any
  config:any = {
    // host: 'smtp.qq.com',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: '357164302@qq.com',
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: 'eeuongdxhmnsbijj'
    },
    to: 'hwbrzzl@qq.com'
  }

  constructor () {
    this.transporter = nodemailer.createTransport(this.config)
  }

  send () {
    const mailOptions = {
      from: this.config.auth.user, // sender address
      to: this.config.to, // list of receivers
      subject: moment().format('YYYY-MM-DD HH:mm:ss') + '翻译机器人掉线', // Subject line
      // 发送text或者html格式
      text: '' // plain text body
      // html: '' // html body
    }
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    })
  }
}
