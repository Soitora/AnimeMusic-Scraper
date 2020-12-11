const moment = require("moment");
const malScraper = require("mal-scraper"); 
const colors = require("colors");
const pjson = require("./package.json");
const { readFileSync, promises: { appendFile }} = require("fs");
const { join } = require("path"); 
const { EOL } = require("os"); 

const file = readFileSync(join(__dirname, "input.txt"), "utf-8");
const lines = file.split(EOL);
const sleep = (time) => new Promise(resolve => { setTimeout(resolve, time); });

console.log("\x1Bc");
console.log(` Anime Music Auto-Scraper `.bold.cyan + pjson.version + `\n`);
console.log(` Created by @Soitora with \"Kylart/MalScraper\".`.grey);
console.log(` Made for use with https://animemusic.org/`.grey);
console.log(` Special thanks to @Kylart and @ParadoxOrigins!\n`.grey);

(async() => {
	
	const base = "https://myanimelist.net";
	const type = "anime";
	const url = `${base}/${type}`;
	for (const line of lines) {
		const data = await malScraper.getInfoFromURL(`${url}/${line}`);
		const date = moment(data.aired.split(" to")[0],"MMM D, YYYY").format("YYYY-MM-DD"); 
		const season = data.premiered || moment(date, "YYYY-MM-DD").format("MM[/]YYYY").replace(/(?<!\S)0[1-3]\/(?![^\s\d])/g, "Winter ").replace(/(?<!\S)0[4-6]\/(?![^\s\d])/g, "Spring ").replace(/(?<!\S)0[7-9]\/(?![^\s\d])/g, "Summer ").replace(/(?<!\S)1[0-2]\/(?![^\s\d])/g, "Fall ")
		const fileText = url + `/` + line + `/` + `\t` + data.title + `\t` + data.englishTitle + `\t` + data.japaneseTitle + `\t` + data.synonyms + `\t` + season + `\t` + date + `\t` + data.picture + `\n`;
		console.log(` Saved ` +    data.title.bold.red)

		await appendFile(join(__dirname, "output.txt"), fileText.replace(/,/g, ";").replace(/"/g, ""), "utf-8");
		await sleep(1000); // wait one second
	}
})();