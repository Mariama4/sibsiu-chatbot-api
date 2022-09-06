import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import startPythonFile from './transformpdftopng.js';

const SIBSIU_SHEDULE_PAGE_URL = 'https://www.sibsiu.ru/raspisanie/';
const SIBSIU_PAGE_URL = 'https://www.sibsiu.ru';

function writeLinksToFile(linkList) {
  const file = fs.createWriteStream(
    'src/services/python_service/link_to_download.txt',
    {
      flags: 'w',
    }
  );
  linkList.map((el) => file.write(el + ';\n'));
  file.end();
  startPythonFile();
}

async function parseSibsiuShedule() {
  console.log('start parsing...');
  axios
    .get(SIBSIU_SHEDULE_PAGE_URL)
    .then((response) => {
      let page = response.data;
      const { document } = new JSDOM(page).window;
      const instituteDivs = document.querySelectorAll('.institut_div');
      let resultObj = {};
      let linkList = [];
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
          linkList.push(pdfLink);
          resultObj[instituteTitle][pdfFileName] = {
            link: pdfLink,
            date: '',
          };
        }
      }
      writeLinksToFile(linkList);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default parseSibsiuShedule;
