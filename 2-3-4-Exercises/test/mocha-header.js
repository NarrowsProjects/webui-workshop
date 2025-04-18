const { expect } = require('chai');
const { setUpPuppeteer } = require('./util');

describe('Header integration tests', function() {
  this.timeout(10000); 

  let browser;
  let page;
  let server;
  const headerSelector = '.p2.shadow-level2.level2';
  const url = 'http://localhost:8080'

  before(async () => {
    const setup = await setUpPuppeteer()
    browser = setup.browser;
    page = setup.page;
    server = setup.server;
  });

  after(async () => {
    await browser.close();
    server.kill();
  });

  it('should display pagename in header', async () => {
    await page.goto(`${url}?page=home`, { waitUntil: 'networkidle2' }); 
  
    const homeHeader = await page.$eval(headerSelector, el => el.textContent);
    
    expect(homeHeader).to.contain('Welcome to the home page.');
    
    await page.goto(`${url}?page=about`, { waitUntil: 'networkidle2' });
    
    const aboutHeader = await page.$eval(headerSelector, el => el.textContent);
    expect(aboutHeader).to.contain('Welcome to the about page.');
  });

  it('should display random numbers when websocket number stream is opened', async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    await page.click('button#NrSocketButton');
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const headerText = await page.$eval(headerSelector, el => el.textContent);
    expect(headerText).to.match(/Your current number is: 0\.[0-9]+/);
    
  });
  
  it('should change random numbers every 5 seconds when websocket number stream is opened', async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    await page.click('button#NrSocketButton');
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const initialText = await page.$eval(headerSelector, el => el.textContent);
    const initialNumber = parseFloat(initialText.match(/Your current number is: 0\.\d+/)[1]);
    expect(initialNumber).to.be.a('number');
    
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    const updatedText = await page.$eval(headerSelector, el => el.textContent);
    const updatedNumber = parseFloat(updatedText.match(/Your current number is: 0\.\d+/)[1]);
    
    expect(updatedNumber).to.be.a('number');
    expect(updatedNumber).to.not.equal(initialNumber);
  });
});