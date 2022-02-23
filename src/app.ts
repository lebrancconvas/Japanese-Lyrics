const {PuppeteerProject} = require('./lib/Puppeteer');

const App = async() => {
	console.log('Puppeteer is ready to start.');
	try {
		const response = await PuppeteerProject();
		if(response !== undefined) {
			console.log(response);
		}
		console.log('Puppeteer is working success.');
	} catch(err) {
		console.log(err);
		console.log('Puppeteer is working fail.');
	}
}

App();