//do {
//  const memes = mkdir [c:]\Users\Alina\projects\node-meme-scraper\memes;
//}
//while
import * as fs from 'fs';

const checkFolder = (folderPath) => {
  const isFolderExist = fs.existsSync(folderPath);
  return isFolderExist;
};
console.log(checkFolder('/c/Users/Alina/projects/node-meme-scraper/memes'));
