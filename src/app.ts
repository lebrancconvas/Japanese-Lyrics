import {PrintLyric} from './lib/JapaneseLyrics';

const App = async() => {
	try {
		console.log('Puppeteer is ready to work.');
		const response = await PrintLyric(1, 1);
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

App();