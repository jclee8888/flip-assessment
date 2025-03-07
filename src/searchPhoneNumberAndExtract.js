require('dotenv').config();

async function searchByPhoneNumberAndExtract(page, phoneNumber) {


  // since this is a dashboard, we want to wait just until the core UI is loaded. everything else we will assume as background requests.

  console.log('Navigating directly to /search...');
  await page.goto(`${process.env.GLADLY_URL}search`, { waitUntil: 'networkidle2' });

  //   await page.type('[data-aid="searchInput-input"]', phoneNumber);
  await page.type('[placeholder="Search for customer or conversation"]', phoneNumber);
  console.log(`inputted phone number: ${phoneNumber} in search bar...`);

  // Promise.race gives me two options: original promise, cancellation event. If 'a.unstyled' does not load, promise is cancelled
  const found = await Promise.race([
    // original promise: wait for a.unstyled (the name) to render
    page.waitForSelector('a.unstyled', { timeout: 5000 }).then(() => true),
    // cancellation event: if a.unstyled doesn't render, this means that customer account doesn't exist
    page.waitForSelector('.universalSearch-results-noResults', { timeout: 5000 }).then(() => false)
  ]);

  // click the first card that comes up. Select unstyled <a>
  await page.click('a.unstyled');

  // extract the order number after click
  await page.waitForSelector('[data-aid="order-number-section"]');
  console.log('extracting orderNumber...');
  const orderNumber = await page.$eval('[data-aid="order-number"]', el=>el.innerText);

  // extract customer name
  await page.waitForSelector('[data-aid="customerName-input"]');
  console.log('extracting customerName...');
  const customerName = await page.$eval('[data-aid="customerName-input"]', el=>el.value);


  // extract customer email. If email doesn't exist, then use 'n/a'
  let email = 'n/a';
  try {
    console.log('extracting email...');
    await page.waitForSelector('.customerEmailDisplay-email', { timeout: 5000 });
    email = await page.$eval('.customerEmailDisplay-email', el=>el.innerText);
  } catch (error) {
    console.warn(`No email found for ${phoneNumber}`);
  }


  const results = { 
    customerName, 
    // regex to isolate only order number.  e.g.) 'order /n 1234' --> '1234'
    orderNumber: orderNumber.replace(/[^\d]/g, ''), 
    phoneNumber, 
    email 
  };

  return results;
}


module.exports = { searchByPhoneNumberAndExtract };