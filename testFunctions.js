const { createBrowser } = require('./src/browser');
const { loginToGladly } = require('./src/auth/login');



(async () => {
    
  const { browser, page } = await createBrowser();

  try {
    await loginToGladly(page);
    console.log("login successful!")
  } catch (error){
    console.log("login failed. Error: ", error.message);
  } 
  
//   finally {
//     await browser.close();
//   }
})();