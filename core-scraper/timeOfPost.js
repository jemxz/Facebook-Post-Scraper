const moment = require("moment");
const timeScraper = require("../common/time-scraper");

module.exports = async function getTime(page, divSelector) {
  const times = await timeScraper(page, divSelector);

  // Here we remove the full stop sign and make it vaiable for parsing
  const updatedArray = times.map((date) => {
    const dotIndex = date.indexOf("·");
    return dotIndex !== -1 ? date.substring(0, dotIndex).trim() : date;
  });

  // Parsing Function for converting each time to Epoch time
  function parseStringToEpoch(string) {
    const now = moment().unix();

    if (string.includes("Yesterday")) {
      const timeStr = string.split(" at ")[1];
      const epochTime = now - 86400;
      return epochTime;
    } else if (string.includes("hr")) {
      const hours = parseInt(string.split(" ")[0]);
      const epochTime = now - hours * 3600;
      return epochTime;
    } else if (string.includes("hrs")) {
      const hours = parseInt(string.split(" ")[0]);
      const epochTime = now - hours * 3600;
      return epochTime;
    } else if (string.includes("mins")) {
      const minutes = parseInt(string.split(" ")[0]);
      const epochTime = now - minutes * 60;
      return epochTime;
    } else {
      const dateStr = string.split(" at ")[0];
      const timeStr = string.split(" at ")[1];
      const formatStr = "MMMM D [at] h:mm A";
      const dateTimeStr = `${dateStr} at ${timeStr}`;
      const epochTime = moment(dateTimeStr, formatStr).unix();
      return epochTime;
    }
  }

  const epochTimes = updatedArray.map(parseStringToEpoch);
  console.log(epochTimes);
  return epochTimes;
};
