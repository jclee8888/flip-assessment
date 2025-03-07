const puppeteer = require('puppeteer');
require('dotenv').config()


async function loginToGladly(page) {
    console.log("logging in to Gladly...");

    // Access the login page to Gladly instance
    await page.goto(`${process.env.GLADLY_URL}/user/login`);

    // insert login email in .env in the email name="email" field
    console.log("filling in login form fields...");

    // email field: "id=email"
    console.log("fillinf in email field");
    await page.type('#email', process.env.GLADLY_LOGIN_EMAIL);

    // insert login password in input type="password" field
    console.log("filling in password field");
    await page.type('#password', process.env.GLADLY_LOGIN_PASSWORD);

    // click login button data-aid="userAuthLayout-form-loginButton"
    await page.click('[data-aid="userAuthLayout-form-loginButton"]')

    await page.waitForNavigation()
    console.log('dashboard successfully loaded...')
    // await page.goto(`${process.env.GLADLY_URL}/search`);

    // if login is not redirected
        // then invalid credentials


    // if login routed to `${process.env.GLADLY_URL}/home`
        // login successful

}


module.exports = { loginToGladly }


