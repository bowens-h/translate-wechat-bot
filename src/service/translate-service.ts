import axios from 'axios'
import { objKeySort, apiSuccess, apiError } from './helpers-service'
import url from './url-service'
const md5 = require('js-md5')

export class Translate {
  appId: Number = parseInt(process.env.TENCENT_AI_APP_ID)
  appKey: String = process.env.TENCENT_AI_APP_KEY
  host: String = 'https://api.ai.qq.com/fcgi-bin'

  async text (word) {
    const source = await this.getType(word)
    if (source.errcode) {
      return source
    }

    var params: any = {
      app_id: this.appId,
      time_stamp: parseInt(<string><unknown>(new Date().getTime() / 1000)),
      nonce_str: (new Date()).valueOf() + '',
      text: word,
      source: source.data,
      target: source.data === 'zh' ? 'en' : 'zh'
    }

    params.sign = this.getSign(params)
    console.log('params', params)

    const result : any = axios({
      method: 'post',
      url: this.host + '/nlp/nlp_texttranslate',
      params
    }).then(res => {
      console.log('res', res.data)

      if (res.data.ret) {
        return apiError(200, `翻译失败，错误信息:${JSON.stringify(res.data)}`)
      } else {
        return apiSuccess({
          from: res.data.data.source_text,
          to: res.data.data.target_text
        })
      }
    }).catch(err => {
      return apiError(500, err.message)
    })

    return result
  }

  getType (word) {
    var params: any = {
      app_id: this.appId,
      time_stamp: parseInt(<string><unknown>(new Date().getTime() / 1000)),
      nonce_str: (new Date()).valueOf() + '',
      text: word,
      candidate_langs: 'zh|en',
      force: 1
    }

    params.sign = this.getSign(params)
    console.log('params', params)

    const result : any = axios({
      method: 'post',
      url: this.host + '/nlp/nlp_textdetect',
      params
    }).then(res => {
      console.log('res', res.data)

      if (res.data.ret) {
        return apiError(200, `翻译失败，错误信息:${JSON.stringify(res.data)}`)
      } else {
        return apiSuccess(res.data.data.lang)
      }
    }).catch(err => {
      return apiError(500, err.message)
    })

    return result
  }

  private getSign (params) {
    const sortParams = objKeySort(params)
    const result:String[] = []
    for (const index in sortParams) {
      result.push(`${index}=${url.encode(sortParams[index])}`)
    }
    result.push(`app_key=${this.appKey}`)
    console.log('sign', result.join('&'))

    return md5(result.join('&')).toUpperCase()
  }
}
