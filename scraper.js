const readline = require('readline');
const malScraper = require('mal-scraper');
const clipboard = require("copy-paste");
const colors = require('colors');
const pjson = require('./package.json');

console.log('\x1Bc');
console.log(` Anime Music Scraper `.bold.cyan + pjson.version + `\n`);
console.log(` Created by Soitora with Kylart/MalScraper`.grey);
console.log(` Special thanks to Kylart and ParadoxOrigins`.grey);
console.log(` Made for use with https://animemusic.org/\n`.grey);

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
            .then(({ title, englishTitle, synonyms, japaneseTitle, premiered, aired }) => {
                
                const date = new Date(aired.split(' to')[0]); 
                const release = premiered || date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
				const fileText = url + `\t` + title + `\t` + englishTitle + `\t` + japaneseTitle + `\t` + synonyms + `\t` + release
                
                clipboard.copy(fileText.replace(/,/g, ';'), function() {})
                
            })
            .catch((err) => console.log(colors.red(`\n ` + err)))
        recursiveAsyncReadLine();

    });
};

recursiveAsyncReadLine();