const { doGet } = require('../utils/doHttpRequest');

const url = "http://localhost:3333";
const numberOfRequests = 100;

const requests = []
for (i = 0; i < numberOfRequests; i++) {
  requests.push(doGet(url));
}

Promise.all(requests)
  .then((results) => {
    const counters = {};

    for (result of results) {
      if (counters[result.responder]) {
        counters[result.responder]++;
      } else {
        counters[result.responder] = 1;
      }
    }

    console.log(counters);
  });

/**
OUTPUTS:
========
{'20828':2,'30680':3,'31556':91,'31720':2,'33308':2}

{ '20828': 77, '30680': 23 }
*/