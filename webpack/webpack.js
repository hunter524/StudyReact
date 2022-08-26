//下面的两个判断，构建流程会在 webpack 打包时被替换成真实环境

// if (process.env.NODE_ENV !== "production") {
//   console.log("not in production model");
// }
//
// if (__DEV__) {
// }

// require 直接解析 JSON 文件形成 JSON 对象
// 这是 nodejs 自带的模块加载器的功能
let json = require("../package.json");
console.log(typeof json);

console.log(json.name);

// node 的模块加载器无法加载 img 图标
// let img = require("../public/favicon.ico");
// console.log(typeof img);
