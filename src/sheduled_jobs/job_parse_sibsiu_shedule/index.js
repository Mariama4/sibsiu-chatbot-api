import axios from 'axios';
import { JSDOM } from 'jsdom';

const SIBSIU_SHEDULE_PAGE_URL = 'https://www.sibsiu.ru/raspisanie/';

export default function parseSibsiuShedule() {
  console.log('start parsing...');
  axios
    .get(SIBSIU_SHEDULE_PAGE_URL)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
