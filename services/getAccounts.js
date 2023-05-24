var axios = require("axios");
require("dotenv").config();
const apiKey = process.env.API_KEY;
const databaseUrl = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

async function getAccounts(randomNumber) {
  var accountData;
  var options = {
    method: "POST",
    url: databaseUrl,
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
      accountData = response.data.documents[randomNumber];
      // console.log(data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return accountData;
}

module.exports = getAccounts;
