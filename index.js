const puppeteer = require("puppeteer");
const schedule = require("node-schedule");
const log = require("log-to-file");

const login = require("./common/login");
const getPosts = require("./core-scraper/post-scraper");
const getAccounts = require("./services/getAccounts");
const randomWaitTime = require("./common/randomWaitTime");

async function getPost() {
  const account = await getAccounts(2);
  const targets = account.groupAdmissions;
  facebookIds = [];
  targets.map((target) => {
    facebookIds.push("https://m.facebook.com/" + target.facebookId);
  });
  const browser = await puppeteer.launch({
    headless: "new", // Running the browser in non-headless mode for visibility
    defaultViewport: null,
    args: [
      "--disable-notifications", // Disabling notifications
      "--disable-dev-shm-usage", // Disabling shared memory usage
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--single-process",
    ],
  });
  try {
    const page = await browser.newPage(); // Creating a new page instance
    await login(page, account); // Calling the 'login module'  passing the 'page' as an argument
    const pages = await Promise.all(
      facebookIds.map((facebookId) => browser.newPage())
    );
    for (let i = 0; i < targets.length; i++) {
      await pages[i].setUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
      );
      await pages[i].goto(facebookIds[i]);
    }

    await getPosts(pages, account);
    schedule.scheduleJob("*/10 * * * *", async () => {
      for (let i = 0; i < targets.length; i++) {
        var waitTime = randomWaitTime();
        await pages[i].reload();
        await pages[i].setDefaultNavigationTimeout(30000);
        await pages[i].waitForTimeout(waitTime);
      }
      await getPosts(pages, account);
    });
  } catch (error) {
    log(error, "./log/error.log");
    await browser.close();
    await getPost();
    // console.log(error);
  }
}

// Calling the 'getPost' function to start the scraping process
getPost();
