const puppeteer = require("puppeteer");
const schedule = require("node-schedule");
const log = require("log-to-file");

const login = require("./common/login");
const getPosts = require("./core-scraper/post-scraper");
const getAccounts = require("./services/getAccounts");
const modify = require("./common/dom-modifier");

async function getPost() {
  const account = await getAccounts(2);
  const targets = account.groupAdmissions;
  facebookIds = [];
  targets.map((target) => {
    facebookIds.push("https://m.facebook.com/" + target.facebookId);
  });
  try {
    const browser = await puppeteer.launch({
      headless: false, // Running the browser in non-headless mode for visibility
      defaultViewport: null,
      args: [
        "--disable-notifications", // Disabling notifications
        "--disable-dev-shm-usage", // Disabling shared memory usage
        "--no-sandbox",
      ],
    });

    const page = await browser.newPage(); // Creating a new page instance
    await login(page, account); // Calling the 'login module'  passing the 'page' as an argument
    const pages = await Promise.all(
      facebookIds.map((facebookId) => browser.newPage())
    );
    for (let i = 0; i < 3; i++) {
      await pages[i].setUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
      );
      await pages[i].goto(facebookIds[i]);
      await modify(pages[i]);
    }

    await getPosts(pages, account);
    schedule.scheduleJob("0 */8 * * *", async () => {
      await page.reload();
      await getPosts(pages, account);
    });
  } catch (error) {
    console.log(error);
    log(error, "./log/error.log");
  }
}

// Calling the 'getPost' function to start the scraping process
getPost();
