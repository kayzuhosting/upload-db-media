const axios = require('axios');
const FormData = require('form-data');
const fileType = require('file-type');
const uploadImage = require('../../lib/uploadImage');


let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'Tidak ada media yang ditemukan!';
  
 
  let media = await q.download();
  
 
  let fileInfo = await fileType.fromBuffer(media);
  let ext = fileInfo ? fileInfo.ext : mime.split('/')[1];
  let filename = `upload.${ext}`;

  
  let link2 = await pomf(media, filename);
let Iimge = await uploadImage(media)
  
  m.reply(`
*Upload ke Pomf Sukses*
🔗 *Link*: ${link2.files[0].url}
📂 *Ukuran*: ${link2.files[0].size} Byte
⌛ *Expired*: _tidak ada batas waktu_

IING
${Iimge}
  `);
}

handler.help = ["tourl2"];
handler.tags = ["uploader"];
handler.command = /^(tourl)$/i;
handler.limit = true;
handler.register = false;

module.exports = handler;


async function pomf(media, filename) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('files[]', media, { filename });
    
    axios.post('https://pomf2.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      reject("Gagal mengunggah media");
    });
  });
}


