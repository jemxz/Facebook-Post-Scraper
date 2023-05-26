const getAccounts = require("../services/getAccounts");
const log = require("log-to-file");

module.exports = async function login(page, account) {
  // getting Facebook account information for loging in purpouses
  const accountEmail = account.primaryEmailAddress;
  const password = account.primaryEmailPassword;

  try {
    // Navigationg to Facebook Login Page //
    await page.goto("https://facebook.com/login", {
      waitUntil: "networkidle2",
      waitUntil: "load",
    });
    // ENTERING EMAIL AND PASSWORD //
    await page.waitForSelector("#email");
    await page.type("#email", accountEmail, { delay: 30 });

    await page.waitForSelector("#pass");
    await page.focus("#pass");
    await page.type("#pass", password, { delay: 30 });

    await page.keyboard.press("Enter");
    await page.waitForNavigation();
  } catch (error) {
    log(error, "./log/error.log");
  }
};
