"use strict";
//main module CommonJs的模块化方案
// !!!!! CommonJs 与 nodeJs 的模块化方案相同 !!!!
// !!!!! 但是不经过 工具转换其代码无法在 browser 环境下运行,但是可以 nodejs 环境下直接运行 !!!!!

//同步加载 使用module.exports 导出指定模块
// require <=> module.require
// module.exports 导出js文件的指定方法，属性作为一个模块
// exports <=> module.exports
// exports/require 为 global node环境下的一个全局对象 提供了console等全局方法

//exports.xx=xx 为 commonJs1
//module.exports = xx 为 CommonJs2 (目前所认为的通常是 CommonJs2)

const dep1 = require("./dep1");
console.log("dep1 is from require:===>");
console.log(dep1);
let dep2 = module.require("./dep2");
console.log("dep2 is from require:===>");
console.log(dep2);
dep1.ex.rw();
console.log("I am main Module!");
global.console.log("log from global.console.log!");

// dep1.ex.rw();
// dep2.getBaidu();

// console.log("Global:",global);

// module#paths 对象包含了当前 main.js 运行的脚本所包含的环境变量
// '/home/hunter/WebstormProjects/StudyReact/node/commjs/node_modules',
// '/home/hunter/WebstormProjects/StudyReact/node/node_modules',
// '/home/hunter/WebstormProjects/StudyReact/node_modules',
// '/home/hunter/WebstormProjects/node_modules',
// '/home/hunter/node_modules',
// '/home/node_modules',
// '/node_modules'
console.log("main module is:=============>")
console.log("module:", module);
