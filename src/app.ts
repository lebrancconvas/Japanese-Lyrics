import {PrintLyric} from './lib/JapaneseLyrics';

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

App(3,1); 



