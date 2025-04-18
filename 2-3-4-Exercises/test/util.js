const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

async function setUpPuppeteer() {
    const server = spawn('node', ['index.js'], {
        env: { ...process.env, NODE_ENV: 'test' },
        stdio: 'inherit'
    });

    await new Promise(res => setTimeout(res, 1000));

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    return { server, browser, page };
}

module.exports = { setUpPuppeteer }