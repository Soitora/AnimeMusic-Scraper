const malScraper = require('mal-scraper')
const readline = require('readline');
const colors = require('colors');

colors.setTheme({
    notice: ['cyan', 'bgBlack', 'bold'],
    info: 'grey',
    calmError: ['red', 'bold'],
    error: ['red', 'underline', 'bold']
});

console.log('\x1Bc');
console.log(` MAL-Scraper Debugger`.notice);
console.log(` Created by Soitora with Kylart/MalScraper`.info);
console.log(` Made for debugging the AnimeMusic-Scraper\n`.info);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var recursiveAsyncReadLine = function() {
    rl.question(' Input MyAnimeList ID: '.calmError + 'https://myanimelist.net/anime/', (myUserInput) => {

        const myAnimeIdentification = `${myUserInput}`;
        const base = 'https://myanimelist.net/anime/';
        const url = `${base}${myAnimeIdentification}`;

        malScraper.getInfoFromURL(url)
		  .then((data) => console.log(data))
		  .catch((err) => console.log(err))
        setTimeout(recursiveAsyncReadLine, 5000);
		
    });
};

recursiveAsyncReadLine();