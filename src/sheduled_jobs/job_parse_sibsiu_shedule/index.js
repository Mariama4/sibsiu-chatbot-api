import axios from 'axios';
import { JSDOM } from 'jsdom';

const SIBSIU_SHEDULE_PAGE_URL = 'https://www.sibsiu.ru/raspisanie/';

export default function parseSibsiuShedule() {
  console.log('start parsing...');
  axios
    .get(SIBSIU_SHEDULE_PAGE_URL)
    .then((response) => {
      let page = response.data;
      const { document } = new JSDOM(page).window;
      const documentsLinks = document.querySelectorAll('li.ul_file > a');
      const listOfInstituteTitle = document.querySelectorAll('p.p_title');

      for (let indexLink in documentsLinks) {
        if (typeof documentsLinks[indexLink] !== 'object') continue;
        let pdfLink =
          'https://www.sibsiu.ru' +
          documentsLinks[indexLink]
            .getAttribute('href')
            .replaceAll('\\', '/')
            .replaceAll(' ', '%20');
        let pdfName = documentsLinks[indexLink].textContent;
        console.log(pdfLink, pdfName);
      }

      // console.log(listOfInstituteTitle);
    })
    .catch((err) => {
      console.log(err);
    });
}
