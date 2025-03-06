const puppeteer = require('puppeteer');
require('dotenv').config()


async function loginToGladly() {
    console.log("logging in to Gladly...")

    // Access the login page to Gladly instance
    await.page.goto(`${process.env.GLADLY_URL}/user/login`)

    // insert login email in .env in the email name="email" field

    // insert login password in input type="password" field

    // click login button data-aid="userAuthLayout-form-loginButton"


    // if login is not redirected
        // then invalid credentials


    // if login routed to `${process.env.GLADLY_URL}/home`
        // login successful

}


const gladlyUrl = process.env.GLADLY_URL;

console.log(gladlyUrl)

