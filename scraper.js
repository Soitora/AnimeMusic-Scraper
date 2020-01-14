const readline = require('readline');
const { appendFile } = require('fs');
const malScraper = require('mal-scraper');
const clipboard = require("copy-paste");
const colors = require('colors');

colors.setTheme({
    notice: ['cyan', 'bgBlack', 'bold'],
    info: 'grey',
    calmError: ['red', 'bold'],
    error: ['red', 'underline', 'bold']
});

console.log('\x1Bc');
console.log(` AnimeMusic Scraper 2.0.0`.notice);
console.log(` Created by Soitora with Kylart/MalScraper`.info);
console.log(` Made for use with https://animemusic.org/\n`.info);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const recursiveAsyncReadLine = function() {
    rl.question(' Input MyAnimeList ID: '.calmError + 'https://myanimelist.net/anime/', (myUserInput) => {

        const myAnimeIdentification = `${myUserInput}`;
        const base = 'https://myanimelist.net/anime/';
        const url = `${base}${myAnimeIdentification}`;

        console.log(` Saving to file and clipboard...\n`.info);

        malScraper.getInfoFromURL(url)
            .then(({ title, englishTitle, synonyms, japaneseTitle, premiered, aired }) => {
                const EOC = `\t`
                const dateobj = new Date(aired); 
                const release = premiered || dateobj.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
				const clipboardText = url + `/||` + title + EOC + englishTitle + EOC + japaneseTitle + EOC + synonyms + EOC + release
                const fileText = clipboardText + `\n`
                const filePath = `output.txt`
                appendFile(filePath, fileText.replace(/,/g, ';'), 'utf-8', (err) => {
                    if (err) throw err
                })
                clipboard.copy(clipboardText.replace(/,/g, ';'), function() {
                })
            })
            .catch((err) => console.log( `\n\n`.reset + ` X `.calmError + `ERROR`.error + ` (ID: ${myAnimeIdentification})\n\n`.calmError + `Input correct MyAnimeList ID:`.calmError))
        recursiveAsyncReadLine();

    });
};

recursiveAsyncReadLine();