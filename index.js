const puppeteer = require("puppeteer");
const login = require("./common/login");
const log = require("log-to-file");

async function getPost() {
  try {
    const browser = await puppeteer.launch({
      headless: false, // Running the browser in non-headless mode for visibility
      defaultViewport: null,
      args: [
        "--disable-notifications", // Disabling notifications
        "--disable-dev-shm-usage", // Disabling shared memory usage
        "--no-sandbox", // Disabling sandbox mode
      ],
    });
    const page = await browser.newPage(); // Creating a new page instance
    await login(page); // Calling the 'login' function passing the 'page' as an argument
  } catch (error) {
    log(error, "./log/error.log");
  }
}

// Calling the 'getPost' function to start the scraping process
getPost();
