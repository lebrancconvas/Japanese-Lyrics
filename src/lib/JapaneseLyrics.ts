const puppeteer = require('puppeteer');
const fs = require('fs');
const JLyric = require('../../data/input/json/JLyric.json');

const GetLyric = async(artistid: number, trackid: number) => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();

	const baselink = 'https://j-lyric.net';
	const artistcode = JLyric[artistid - 1].artistcode;
	const trackcode = JLyric[artistid - 1].tracks[trackid - 1].trackcode;
	const urlPath: String[] = ['artist', artistcode, `${trackcode}.html`];
	let queryParam = '';

	urlPath.map(path => {
		queryParam += `/${path}`;
	})

	const link = `${baselink}/${queryParam}`;

	await page.goto(link);
	await page.setViewport({width: 1440, height: 788});
	
	const lyricSelector = '#Lyric';
	await page.waitForSelector(lyricSelector);

	const element = await page.$(lyricSelector);
	const lyric = await page.evaluate((el: any) => el.innerHTML, element);

	await page.close();
	await browser.close();

	return lyric;
};

const PrintLyric = async(artistid: number, trackid: number) => {
	let getLyric = await GetLyric(artistid, trackid);
	let lyricList: String[] = getLyric.split('<br>');

	const trackname = JLyric[artistid - 1].tracks[trackid - 1].track;
	const artistname = JLyric[artistid - 1].artist; 
	const artistcode = JLyric[artistid - 1].artistcode;
	const trackcode = JLyric[artistid - 1].tracks[trackid - 1].trackcode;
	const trackspotify = JLyric[artistid - 1].tracks[trackid - 1].links.spotify;
	const trackyoutube = JLyric[artistid - 1].tracks[trackid - 1].links.youtube;

	const url = `https://j-lyric.net/artist/${artistcode}/${trackcode}.html`;
	let lyricText = `# [${trackname} - ${artistname}](${url})  \n## Information  \nTrack: ${trackname}  \nArtist: ${artistname}  \n## Link to Listen  \n[Youtube](${trackyoutube})  \n[Spotify](${trackspotify})  \n## Lyric  \n`;
	
	for(let i = 0; i < lyricList.length; i++) {
		lyricText += `${lyricList[i]}  \n`;
	}

	fs.writeFileSync(`./data/output/${artistname} - ${trackname}.md`, lyricText, (err: unknown) => {
		console.log(err);
		console.log('File Writing Failed.');
	})
}

export {PrintLyric, JLyric};