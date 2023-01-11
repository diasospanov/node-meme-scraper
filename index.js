import * as fs from 'fs';

const folderName = '/Users/Alina/projects/node-meme-scraper/memes';
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}
