const puppeteer = require("puppeteer");
const login = require("./common/login");
const log = require("log-to-file");

async function getPost() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        "--disable-notifications",
        "--disable-dev-shm-usage",
        "--no-sandbox",
      ],
    });
    const page = await browser.newPage();
    await login(page);
  } catch (error) {
    log(error, "./log/error.log");
  }
}

getPost();
