const http = require("http");

const doGet = (url) => new Promise((resolve, reject) => {
  http.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      resolve(body);
    });
    res.on("error", (err) => {
      reject(err);
    });
  });
})

module.exports = { doGet };
