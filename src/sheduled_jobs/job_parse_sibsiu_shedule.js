import axios from 'axios';
import { JSDOM } from 'jsdom';
import https from 'https';

const SIBSIU_SHEDULE_PAGE_URL = 'https://www.sibsiu.ru/raspisanie/';
const SIBSIU_PAGE_URL = 'https://www.sibsiu.ru';

function getAndTransformFilenInImages(obj) {
  console.log(obj);
}

export default function parseSibsiuShedule() {
  console.log('start parsing...');
  axios
    .get(SIBSIU_SHEDULE_PAGE_URL)
    .then((response) => {
      let page = response.data;
      const { document } = new JSDOM(page).window;
      const instituteDivs = document.querySelectorAll('.institut_div');
      let resultObj = {};

      for (let instituteIndex in instituteDivs) {
        if (typeof instituteDivs[instituteIndex] !== 'object') continue;
        let instituteTitle = instituteDivs[instituteIndex]
          .querySelector('p.p_title')
          .textContent.trim();
        let instituteFilesLink =
          instituteDivs[instituteIndex].querySelectorAll('li.ul_file > a');
        resultObj[instituteTitle] = {};
        for (let fileLinkIndex in instituteFilesLink) {
          if (typeof instituteFilesLink[fileLinkIndex] !== 'object') break;
          let pdfFileName = instituteFilesLink[fileLinkIndex].textContent;
          let pdfLink =
            SIBSIU_PAGE_URL +
            instituteFilesLink[fileLinkIndex]
              .getAttribute('href')
              .replaceAll('\\', '/')
              .replaceAll(' ', '%20');

          resultObj[instituteTitle][pdfFileName] = {
            link: pdfLink,
            date: '',
          };
        }
      }
      getAndTransformFilenInImages(resultObj);
      console.log('end parsing...');
      // console.log(resultObj);
      // return resultObj;
    })
    .catch((err) => {
      console.log(err);
    });
}
