const {PrintLyric, JLyric} = require('./lib/JapaneseLyrics');
// const {JLyric} = require('../data/input/json/JLyric.json');

const App = async(artistid: number, trackid: number) => {
	try {
		console.log('Puppeteer is ready to work.');
		const response = await PrintLyric(artistid, trackid);
		if(response !== undefined) {
			console.log(response);
		} else {
			console.log('Puppeteer works success.'); 
		}
	} catch (err) {
		console.log(err);
		console.log("Puppeteer works fail.");
	}
}

for(let i = 0; i < Object.keys(JLyric).length; i++) {
	for(let j = 0; j < Object.keys(JLyric[i].tracks).length; j++) {
		App(i+1, j+1);  
	}
} 