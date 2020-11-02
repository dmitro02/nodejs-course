const http = require("http");

const doGet = (url, handleResponse) => {
    http.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          body = JSON.parse(body);
          handleResponse(body);
        });
      });
}

const url = "http://localhost:3333";
const numberOfRequests = 10;
const counters = {};

const handleResponse = (body) => {
  if (counters[body.responder]) {
    counters[body.responder]++;
  } else {
    counters[body.responder] = 1;
  }
  console.log(counters);
}

for (i = 0; i < numberOfRequests; i++) {
  doGet(url, handleResponse);
}

console.log(counters);