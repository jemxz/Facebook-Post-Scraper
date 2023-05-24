const getAccounts = require("../services/getAccounts");
const log = require("log-to-file");

module.exports = async function login(page) {
  /// random number is used to choose an account randomly for the number of accounts
  const randomNumber = Math.floor(Math.random() * 3);

  const account = await getAccounts(1);

  const accountEmail = account.primaryEmailAddress;
  const password = account.primaryEmailPassword;

  try {
    await page.goto("https://facebook.com/login", {
      waitUntil: "networkidle2",
      waitUntil: "load",
    });
    // ENTERING EMAIL AND PASSWORD //
    await page.waitForSelector("#email");
    await page.type("#email", accountEmail, { delay: 30 });
    console.log("Inserted email");
    await page.waitForSelector("#pass");
    await page.focus("#pass");
    await page.type("#pass", password, { delay: 30 });
    console.log("Inserted Password");
    await page.keyboard.press("Enter");
    //await page.click('#loginbutton');
    await page.waitForNavigation();
    console.log("Loging in succesfull ... ");
  } catch (error) {
    log(error, "./log/error.log");
  }
};
