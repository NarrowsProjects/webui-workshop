const { expect } = require('chai');
const { setUpPuppeteer } = require('./util');

describe('Application Integration Tests', function() {
  this.timeout(10000); 

  let browser;
  let page;
  let server;
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

  it('should successfully connect to the application', async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
    const title = await page.title();
    expect(title).to.equal('WebUI Workshop - 2023');
  });

  it('should have the home page as default', async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
    const pageHeader = await page.$eval('h1', el => el.textContent);
    expect(pageHeader).to.equal('Home Page');
  });

  it('should have working navigation buttons', async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
  
    await page.click('button#NavigateAbout');
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const aboutHeader = await page.$eval('h1', el => el.textContent);
    expect(aboutHeader).to.equal('About Page');
    
    await page.click('button#NavigateHome');
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const homeHeader = await page.$eval('h1', el => el.textContent);
    expect(homeHeader).to.equal('Home Page');
  });

  it('should update username when button is clicked', async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const initialUser = await page.$eval('label.m1', el => el.textContent);
    expect(initialUser).to.include('Guust');
    
    await page.click('button#ChangeNameButton');
    await page.waitForFunction(() => {
      const label = document.querySelector('label.m1');
      return label && label.textContent.includes('New username');
    });
    
    const updatedUser = await page.$eval('label.m1', el => el.textContent);
    expect(updatedUser).to.include('New username');
  });

  it('should fetch application data in about page', async () => {
    await page.goto(`${url}?page=about`, { waitUntil: 'networkidle2' });
    
    const initialText = await page.$eval('p', el => el.textContent);
    expect(initialText).to.equal('Data requested 0 times');
    
    await page.click('button#ApplicationDataButton');
    await page.waitForSelector('table.table');
    
    const tableData = await page.$$eval('table.table tbody tr', rows => {
      return rows.map(row => {
        const [keyCell, valueCell] = row.querySelectorAll('td');
        return [keyCell.textContent, valueCell.textContent];
      });
    });
    
    expect(tableData).to.deep.include(['appName', 'WebUI Workshop']);
    expect(tableData).to.deep.include(['year', '2025']);
    expect(tableData).to.deep.include(['version', '1.0.0']);
  });

  async function logElements(selector){
    const elementInfo = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? {
        textContent: el.textContent,
        outerHTML: el.outerHTML,
        exists: true
      } : { exists: false };
    }, selector);
    console.log(elementInfo);
    
  }

});