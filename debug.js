const readline = require('readline');
const malScraper = require('mal-scraper')
const colors = require('colors');
const pjson = require('./package.json');

console.log('\x1Bc');
console.log(` Anime Music Debugger `.bold.cyan + pjson.version + `\n`);
console.log(` Created by @Soitora with \"Kylart/MalScraper\".`.grey);
console.log(` Made for use with https://animemusic.org/`.grey);
console.log(` Special thanks to @Kylart and @ParadoxOrigins!\n`.grey);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var recursiveAsyncReadLine = function() {
	rl.question(' Input MyAnimeList ID: '.bold.red + 'https://myanimelist.net/anime/', (input) => {

		const base = 'https://myanimelist.net';
		const type = 'anime';
		const url = `${base}/${type}/${input}`;

		console.log(` Grabbing data...\n`.grey);

		malScraper.getInfoFromURL(url)
		  .then((data) => console.log(data))
		  .catch((err) => console.log(colors.red(err)))
		setTimeout(recursiveAsyncReadLine, 5000);
		
	});
};

recursiveAsyncReadLine();