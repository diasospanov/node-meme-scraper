// Import libraries
import * as fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Create a folder
const folderName = '/Users/Alina/projects/node-meme-scraper/memes';
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}

// Fetch html from a website, create an array, download images
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
      for (let i = 0; i < firstTenLinks.length; i++) {
        await axios({
          method: 'get',
          url: firstTenLinks[i].src,
          responseType: 'stream',
        }).then(function (file) {
          const path = '/Users/Alina/projects/node-meme-scraper/memes/0';
          const newPath = path.concat(i + 1, '.jpg');
          file.data.pipe(fs.createWriteStream(newPath));
        });
      }
    }
    await downloadImgs();
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}
await getImgSrcs();
