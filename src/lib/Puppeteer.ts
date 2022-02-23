const puppeteer = require('puppeteer');

const PuppeteerProject = async() => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();

	const link = '';

	await page.goto(link, {waitUntil: 'domcontentloaded'});
	await page.setViewport({width: 1440, height: 788});
}

export {PuppeteerProject};