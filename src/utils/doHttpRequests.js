const http = require("http");

const url = "http://localhost:3333";
const numberOfRequests = 10;

const doGet = () => {
    http.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          body = JSON.parse(body);
          console.log(body);
        });
      });
}

for (i = 0; i < numberOfRequests; i++) {
    doGet();
}