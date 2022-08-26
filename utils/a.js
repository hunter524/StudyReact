#!/usr/bin/node
let childProcess = require("child_process");
let fs = require("fs");

let result = childProcess.execSync("adb shell ifconfig");
result = result.toString("utf-8");
result = /(192\.168\.[0-9]*\.[0-9]*)/.exec(result)[1];
console.log("usb0 ip: ====\n", result);
let hosts = fs.readFileSync("/etc/hosts").toString("utf-8");
result = hosts.replace(/^[1-9].* a\.com$/m, `${result} a.com`);
fs.rmSync("/etc/hosts");
fs.writeFileSync("/etc/hosts", result);
console.log("==============after set hosts==============");
console.log(childProcess.execSync("cat /etc/hosts").toString("utf-8"));
