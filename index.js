const puppeteer = require('puppeteer');

const youtubeweba = (url) => {
    return new Promise((resolve) => {
        (
            async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
                await page.on('request', async r => {
                    const url = r.url();
                    if (r.resourceType() === 'xhr' && url.includes('videoplayback') && url.includes('itag=251') && url.includes('ctier=L') == false) {
                        await browser.close();
                        resolve(url.split('&range')[0]);
                    }
                });
            }
        )();
    });
}
module.exports = youtubeweba;
