const nodemailer = require('nodemailer')
// import { moment } from 'moment'

// require('moment/locale/zh-cn')
// moment.locale('zh-cn')

export class Mail {
  transporter: any
  config:any = {
    host: process.env.MAIL_HOST,
    // service: process.env.MAIL_SERVICE, // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: process.env.MAIL_PORT, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: process.env.MAIL_USER,
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: process.env.MAIL_PASSWORD
    },
    to: process.env.MAIL_TO
  }

  constructor () {
    this.transporter = nodemailer.createTransport(this.config)
  }

  send (subject, text: String = null, isHtml: Boolean = false) {
    if (!process.env.MAIL_START) {
      return
    }

    const mailOptions:any = {
      from: this.config.auth.user, // sender address
      to: this.config.to, // list of receivers
      subject: subject, // Subject line
      // 发送text或者html格式
      text: text || '' // plain text body
      // html: '' // html body
    }

    if (isHtml) {
      mailOptions.html = text || ''
    } else {
      mailOptions.text = text || ''
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
