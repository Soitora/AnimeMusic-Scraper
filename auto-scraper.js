const malScraper = require('mal-scraper');
const lineReader = require('line-reader');
const { appendFile } = require('fs');
const colors = require('colors');

colors.setTheme({
    notice: ['cyan', 'bgBlack', 'bold'],
    info: 'grey',
    calmError: ['red', 'bold'],
    error: ['red', 'underline', 'bold']
});

console.log('\x1Bc');
console.log(` Anime Music Auto Scraper 2.0.1`.notice);
console.log(` Created by Soitora with Kylart/MalScraper`.info);
console.log(` Made for use with https://animemusic.org/\n`.info);

lineReader.eachLine('input.txt', function(input) {
    const recursiveAsyncReadLine = function() {
   
            const base = 'https://myanimelist.net';
            const type = 'anime';
            const url = `${base}/${type}/${input}`;
    
            malScraper.getInfoFromURL(url)
                .then(({ title, englishTitle, synonyms, japaneseTitle, premiered, aired }) => {
                    const dateobj = new Date(aired.split(' to')[0]); 
                    const release = premiered || dateobj.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
                    const fileText = url + `\t` + title + `\t` + englishTitle + `\t` + japaneseTitle + `\t` + synonyms + `\t` + release
                    const fileTextNewLine = fileText + `\n`
                    const filePath = `output.txt`
                    appendFile(filePath, fileTextNewLine.replace(/,/g, ';'), 'utf-8', (err) => {
                        if (err) throw err
                    })
                    console.log(` Saving ` +  title.calmError)
                })
                .catch((err) => console.log( `\n ` + err))
    };
    
    recursiveAsyncReadLine();
});