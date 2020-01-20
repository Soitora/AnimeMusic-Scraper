const malScraper = require('mal-scraper');
const lineReader = require('line-reader');
const { appendFile } = require('fs');
const colors = require('colors');
const pjson = require('./package.json');

console.log('\x1Bc');
console.log(` Anime Music Auto-Scraper `.bold.cyan + pjson.version + `\n`);
console.log(` Created by Soitora with Kylart/MalScraper`.grey);
console.log(` Made for use with https://animemusic.org/\n`.grey);

lineReader.eachLine('input.txt', function(input) {
    const recursiveAsyncReadLine = function() {
   
        const base = 'https://myanimelist.net';
        const type = 'anime';
        const url = `${base}/${type}/${input}`;

        malScraper.getInfoFromURL(url)
            .then(({ title, englishTitle, synonyms, japaneseTitle, premiered, aired }) => {
         
                const date = new Date(aired.split(' to')[0]); 
                const release = premiered || date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
                const fileText = url + `\t` + title + `\t` + englishTitle + `\t` + japaneseTitle + `\t` + synonyms + `\t` + release + `\n`

                appendFile(`output.txt`, fileText.replace(/,/g, ';'), 'utf-8', (err) => {
                    if (err) throw err
                })

                console.log(` Saved ` +  title.bold.red)

            })
            .catch((err) => console.log(colors.red(`\n ` + err)))

    };

    recursiveAsyncReadLine();
});