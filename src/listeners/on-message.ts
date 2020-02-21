/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import { Wechaty } from 'wechaty'
import { Translate } from '../service/translate-service'

async function onMessage (msg) {
  // console.log(`Received message: ${message}`)
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()
  if (room) {
    const topic = await room.topic()
    console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
  } else {
    console.log(`Contact: ${contact.name()} Text: ${text}`)
    const isSelf = contact.self()

    if (!isSelf && msg.type() === Wechaty.instance().Message.Type.Text) {
      var translate = new Translate()
      // 翻译文本
      const textResult = await translate.text(text)
      console.log('translate', textResult)
      if (!textResult.errcode) {
        await msg.say(`${textResult.data.to}`)
      } else {
        await msg.say(`${text}\n----\n翻译失败`)
      }
    }
  }
}

module.exports = onMessage
