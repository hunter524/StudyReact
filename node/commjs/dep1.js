"use strict";
let fs = require("fs");

function readDirAndFile() {
  let content = fs
    .readFileSync(
      "/home/hunter/WebstormProjects/StudyReact/node/commjs/main.js"
    )
    .toString();
  console.log("dep1=========readDirAndFile===========");
  console.log(content.substring(0, 50));
  console.log("dep1=========readDirAndFile end1===========");

  //node运行的目录代表当前目录
  let files = fs.readdirSync(".");
  console.log(files);
  console.log("dep1=========readDirAndFile end2===========");
}

// 非node 的模块化方式
// export  default {
//     rw:readDirAndFile
// };

// module.exports ={
//         rw:readDirAndFile
// };
console.log("dep1 init");
exports.ex = {
  rw: readDirAndFile,
};

console.log("dep1=====>module")
console.log(module)
