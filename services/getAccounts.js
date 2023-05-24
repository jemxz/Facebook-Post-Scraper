var axios = require("axios");
require("dotenv").config();

const apiKey = process.env.API_KEY;
const databaseUrl = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

async function getAccounts(randomNumber) {
  var accountData; // Variable to store the retrieved account data

  var options = {
    method: "POST",
    url: databaseUrl, // URL for the database endpoint
    headers: {
      "'Content-Type'": "'application/json'",
      "'Access-Control-Request-Headers'": "'*'",
      account_key: apiKey,
    },
    data: {
      collection: collectionName,
      database: databaseName,
      dataSource: "Cluster0",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      accountData = response.data.documents[randomNumber]; // Storing the account data from the response
    })
    .catch(function (error) {
      console.error(error);
    });

  return accountData; // Returning the retrieved account data
}

module.exports = getAccounts;
