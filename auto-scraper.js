const { readFileSync, promises: { appendFile }} = require('fs');
const malScraper = require('mal-scraper'); 
const { join } = require('path'); 
const { EOL } = require('os'); 
const colors = require('colors');
const pjson = require('./package.json');

const file = readFileSync(join(__dirname, "input.txt"), 'utf-8');
const lines = file.split(EOL);
const sleep = (time) => new Promise(resolve => { setTimeout(resolve, time); });

console.log('\x1Bc');
console.log(` Anime Music Auto-Scraper `.bold.cyan + pjson.version + `\n`);
console.log(` Created by Soitora with Kylart/MalScraper`.grey);
console.log(` Special thanks to Kylart and ParadoxOrigins`.grey);
console.log(` Made for use with https://animemusic.org/\n`.grey);

(async() => {
  
  const base = 'https://myanimelist.net';
  const type = 'anime';
  const url = `${base}/${type}`;
  for (const line of lines) {
    const data = await malScraper.getInfoFromURL(`${url}/${line}`);
    const date = new Date(data.aired.split(' to')[0]); 
    const release = data.premiered || date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
    const fileText = url + `\t` + data.title + `\t` + data.englishTitle + `\t` + data.japaneseTitle + `\t` + data.synonyms + `\t` + release + `\n`;
    console.log(` Saved ` +  data.title.bold.red)

    await appendFile(`output.txt`, fileText.replace(/,/g, ';'), 'utf-8');
    await sleep(1000); // wait one second
  }
})();