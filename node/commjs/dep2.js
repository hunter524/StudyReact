'use strict';
let https = require("https");

function getBaidu(){
    https.request("https://www.baidu.com",res => {
        let headers = res.headers;
        console.log("headers:",res);
    }).end(res=>{
        console.log("res:",res);
    });
}
// getBaidu();
module.exports={
    getBaidu:getBaidu
};