const puppeteer = require('puppeteer');

// initiate browser. Any other browser configurations done here
async function createBrowser() {
  // change back to headldess when done. Any other browser configurations done here
  const browser = await puppeteer.launch({ headless: true });

  // open new tab in browser
  const page = await browser.newPage();


  return { browser, page };
    
}

module.exports = { createBrowser };