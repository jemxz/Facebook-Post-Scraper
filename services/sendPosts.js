const log = require("log-to-file");

var axios = require("axios").default;
require("dotenv").config();

module.exports = async function sendData(resultData) {
  const url = process.env.REFERAL_URL;
  const authorizationToken = process.env.AUTHORIZATION_TOKEN;

  var options = {
    method: "POST",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token token=" + authorizationToken,
    },
    data: resultData,
  };
  // console.log(resultData);
  await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      console.log("success");
    })
    .catch(function (error) {
      log(error, "../log/error.log");
      console.error(error);
      return;
    });
};
