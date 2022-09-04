import axios from 'axios';
import { response } from 'express';
import https from 'https';

// let a = https.get(
//   'https://www.sibsiu.ru/files/raspisanie/asi/СОБРАНИЯ%20%20ПЕРВОКУРСНИКОВ%20%2001.09.2022.pdf'
// );

// console.log(a);

axios
  .get(
    'https://www.sibsiu.ru/files/raspisanie/asi/СОБРАНИЯ%20%20ПЕРВОКУРСНИКОВ%20%2001.09.2022.pdf'
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
