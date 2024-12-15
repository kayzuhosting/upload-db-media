const fs = require('fs')

let handler = async (m, { hanz, command, usedPrefix }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
  let media = await q.download()
  m.reply('proses membuat sticker')
  let encmedia = await hanz.sendImageAsSticker(m.chat, media, m, { packname: global.packName, author: m.pushname })
  await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
  if ((q.msg || q).seconds > 7) return m.reply('maksimal 6 detik!')
  let media = await q.download()
  m.reply('proses membuat sticker')
  let encmedia = await hanz.sendVideoAsSticker(m.chat, media, m, { packname: global.packName, author: m.pushname })
  await fs.unlinkSync(encmedia)
  } else {
  throw `Kirim Gambar/Video Dengan Caption ${usedPrefix + command}\nDurasi Video 1-6 Detik`
  }
    }
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(stiker|s|sticker)$/i
handler.limit = true
handler.noCmdStroe = true
handler.onlyGroup = true;
module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}
