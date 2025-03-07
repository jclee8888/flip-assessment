const puppeteer = require('puppeteer');
require('dotenv').config();


async function loginToGladly(page) {
  console.log('logging in to Gladly...');

  // Access the login page to Gladly instance
  await page.goto(`${process.env.GLADLY_URL}user/login`);

  // insert login email in .env in the email name="email" field
  console.log('filling in login form fields...');

  // email field: "id=email"
  // waitForSelector ensures that the #email field is loaded before we fill in our value
  await page.waitForSelector('#email');
  console.log('filling in email field');
  await page.type('#email', process.env.GLADLY_LOGIN_EMAIL);

  // insert login password in input type="password" field
  await page.waitForSelector('#password');
  console.log('filling in password field');
  await page.type('#password', process.env.GLADLY_LOGIN_PASSWORD);

  // click login button data-aid="userAuthLayout-form-loginButton"
  await page.waitForSelector('[data-aid="userAuthLayout-form-loginButton"]');
  await page.click('[data-aid="userAuthLayout-form-loginButton"]');

  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('Login Successful!');
    
}


module.exports = { loginToGladly };


