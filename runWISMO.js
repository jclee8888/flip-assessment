const { createBrowser } = require('./src/browser');
const { loginToGladly } = require('./src/auth/login');
const { searchByPhoneNumberAndExtract } = require('./src/searchPhoneNumberAndExtract');
const fs = require('fs');
const path = require('path');


const phoneNumbers = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src/data', 'phoneNumbers.json'), 'utf-8')
);

(async () => {

  // spin up browser
  const { browser, page } = await createBrowser();

  try {
    // login
    await loginToGladly(page);

    // initialize results array where results for each phone number will be pushed
    const searchResults = [];

    // loop through phone numbers in data/phoneNumbers.json
    for (const phoneNumber of phoneNumbers) {
      try {
        // search for the phone number in Gladly, extract details
        const result = await searchByPhoneNumberAndExtract(page, phoneNumber);
        // push the results to searchResults array
        searchResults.push({ success: true, phoneNumber, data: result });
      } catch (error) {
        console.warn(`Failed to fetch information for ${phoneNumber}: ${error.message}`);
        // if errors occur, we log a failure entry. This will be for phone numbers that do not have orders or account history
        searchResults.push({ 
          success: false, 
          phoneNumber, 
          data: {
            customerName: 'n/a',
            orderNumber: 'n/a',
            phoneNumber,
            email: 'n/a'
          },
          error: error.message });
      }
    }
    console.log('Fetched searchResults: ', JSON.stringify(searchResults, null, 2));
  } catch (error){
    console.log("login failed. Error: ", error.message);
  } 
  
//   close out browser
  finally {
    await browser.close();
  }

})();