"use strict";
let https = require("https");

function getBaidu() {
  https
    .request("https://www.baidu.com", (res) => {
      let headers = res.headers;
      console.log("headers:", res);
    })
    .end((res) => {
      console.log("res:", res);
    });
}
// getBaidu();
console.log("dep2 init");
module.exports = {
  getBaidu: getBaidu,
};

console.log("dep2=====>module");
console.log(module);
