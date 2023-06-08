const timeScraper = require("../common/time-scraper");

module.exports = async function getTime(page, divSelector) {
  const times = await timeScraper(page, divSelector);
  console.log(times);

  // Get the current date and time
  const currentDate = new Date();

  // Function to parse and format the dates
  function parseDate(dateString) {
    if (dateString.includes("Yesterday at")) {
      // Format: "Yesterday at 2:51 AM ·"
      const [, time] = dateString.split(" at ");
      const [hour, minute] = time.split(":");

      // Subtract one day from the current date and set the time
      const parsedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1,
        parseInt(hour),
        parseInt(minute)
      );

      return parsedDate.toLocaleString();
    } else if (dateString.includes("at")) {
      // Format: "May 10 at 8:12 PM"
      const [month, day, _, time] = dateString.split(" ");
      const [hour, minute] = time.split(":");

      // Create a new Date object with the parsed values
      const parsedDate = new Date(
        currentDate.getFullYear(),
        getMonthIndex(month),
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
      );

      return parsedDate.toLocaleString();
    } else if (dateString.includes("hrs")) {
      // Format: "7 hrs"
      const [hours] = dateString.split(" ");

      // Subtract the hours from the current date
      const parsedDate = new Date(
        currentDate.getTime() - parseInt(hours) * 60 * 60 * 1000
      );

      return parsedDate.toLocaleString();
    } else if (dateString.includes("hr")) {
      // Format: "7 hrs"
      const [hours] = dateString.split(" ");

      // Subtract the hours from the current date
      const parsedDate = new Date(
        currentDate.getTime() - parseInt(hours) * 60 * 60 * 1000
      );

      return parsedDate.toLocaleString();
    } else if (dateString.includes("min")) {
      // Format: "7 min"
      const [minutes] = dateString.split(" ");

      // Subtract the minutes from the current date
      const parsedDate = new Date(
        currentDate.getTime() - parseInt(minutes) * 60 * 1000
      );

      return parsedDate.toLocaleString();
    } else if (dateString.includes("sec")) {
      // Format: "20 sec"
      const [seconds] = dateString.split(" ");

      // Subtract the seconds from the current date
      const parsedDate = new Date(
        currentDate.getTime() - parseInt(seconds) * 1000
      );

      return parsedDate.toLocaleString();
    } else {
      return dateString; // Return unchanged if the format is not recognized
    }
  }

  // Helper function to get the month index from the month name
  function getMonthIndex(month) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames.indexOf(month);
  }

  // Parse and format the dates in the array
  const formattedDates = times.map(parseDate);

  console.log(formattedDates);
  return formattedDates;
};
