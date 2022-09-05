import fs from 'fs';
import https from 'https';

const download = async (url, path) => {
  https
    .get(url, (res) => {
      const stream = fs.createWriteStream(path);

      res.pipe(stream);

      stream.on('finish', () => {
        stream.close();
        console.log('Image downloaded');
      });
    })
    .on('error', (err) => {
      // handle error
      console.log(err);
    });
};

let urls = [
  'https://www.sibsiu.ru/files/raspisanie/asi/Расписание%20занятий/1%20курс%20Осенний%20семестр%202022-2023.pdf',
  'https://www.sibsiu.ru/files/raspisanie/asi/Расписание%20занятий/2%20курс%20Осенний%20семестр%202022-2023.pdf',
  'https://www.sibsiu.ru/files/raspisanie/asi/Расписание%20занятий/3%20курс%20Осенний%20семестр%202022-2023.pdf',
  'https://www.sibsiu.ru/files/raspisanie/asi/Расписание%20занятий/4%20курс%20Осенний%20семестр%202022-2023.pdf',
].map((el) => decodeURIComponent(el));

// urls.forEach((url) => {
//   const fileName = url.split('/').pop();
//   download(url, `./img/${fileName}`);
// });
