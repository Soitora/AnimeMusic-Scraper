const readline = require('readline');
const malScraper = require('mal-scraper');
const clipboard = require("copy-paste");
const colors = require('colors');
const pjson = require('./package.json');

console.log('\x1Bc');
console.log(` Anime Music Scraper `.bold.cyan + pjson.version + `\n`);
console.log(` Created by @Soitora with \"Kylart/MalScraper\".`.grey);
console.log(` Made for use with https://animemusic.org/`.grey);
console.log(` Special thanks to @Kylart and @ParadoxOrigins!\n`.grey);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const recursiveAsyncReadLine = function() {
    rl.question(' Input MyAnimeList ID: '.bold.red + 'https://myanimelist.net/anime/', (input) => {

        const base = 'https://myanimelist.net';
        const type = 'anime';
        const url = `${base}/${type}/${input}`;

        console.log(` Saving to clipboard...\n`.grey);

        malScraper.getInfoFromURL(url)
            .then(({ title, englishTitle, synonyms, japaneseTitle, premiered, aired, picture }) => {
                
                const date = new Date(aired.split(' to')[0]); 
                const airDate = date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
                const season = premiered || date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' }).replace(/(?<!\S)0[1-3]\/(?![^\s\d])/g, 'Winter ').replace(/(?<!\S)0[4-6]\/(?![^\s\d])/g, 'Spring ').replace(/(?<!\S)0[7-9]\/(?![^\s\d])/g, 'Summer ').replace(/(?<!\S)1[0-2]\/(?![^\s\d])/g, 'Fall ')
				const fileText = url + `\t` + title + `\t` + englishTitle + `\t` + japaneseTitle + `\t` + synonyms + `\t` + season + `\t` + airDate + `\t` + picture
                
                clipboard.copy(fileText.replace(/,/g, ';'), function() {})
                
            })
            .catch((err) => console.log(colors.red(`\n ` + err)))
        recursiveAsyncReadLine();

    });
};

recursiveAsyncReadLine();