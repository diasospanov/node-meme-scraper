// Create a folder
// import * as fs from 'fs';

// const folderName = '/Users/Alina/projects/node-meme-scraper/memes';
// if (!fs.existsSync(folderName)) {
//   fs.mkdirSync(folderName);
// }

// Fetch an html from a website
import axios from 'axios';
import * as cheerio from 'cheerio';
import $ from 'jquery';

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
    console.log(links);
  } catch (err) {
    console.error(err);
  }
}
await getImgSrcs();
