import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import $ from 'jquery';

// Create a folder
const folderName = '/Users/Alina/projects/node-meme-scraper/memes';
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}

// Fetch an html from a website and create an array
const websiteLink = 'https://memegen-link-examples-upleveled.netlify.app/';
const links = [];
async function getImgSrcs() {
  try {
    const response = await axios.get(websiteLink);
    const htmlContent = cheerio.load(response.data);
    htmlContent('img').each(function () {
      const src = htmlContent(this).attr('src');
      links.push({ src });
    });
    const firstTenLinks = links.slice(0, 10);
    async function downloadImgs() {
      await axios({
        method: 'get',
        url: firstTenLinks[0].src,
        responseType: 'stream',
      }).then(function (file) {
        file.data.pipe(
          fs.createWriteStream(
            '/Users/Alina/projects/node-meme-scraper/memes/01.jpg',
          ),
        );
      });
    }
    await downloadImgs();
    console.log('Done!');
    // console.log(firstTenLinks);
  } catch (err) {
    console.error(err);
  }
}
await getImgSrcs();
// async function downloadImgs() {
//   await axios({
//     method: 'get',
//     url: firstTenLinks[0].src,
//     responseType: 'stream',
//   }).then(function (response) {
//     response.data.pipe(fs.createWriteStream('01.jpg', '.memes'));
//   });
// }
// await downloadImgs();
