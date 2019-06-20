'use strict';
//main module CommonJs的模块化方案
//同步加载 使用module.exports 导出指定模块
// require <=> module.require
// module.exports 导出js文件的指定方法，属性作为一个模块
// exports <=> module.exports
// global node环境下的一个全局对象 提供了console等全局方法

const dep1   = require("./dep1");
let dep2 = require("./dep2");
console.log("I am main Module!");
global.console.log("log from global.console.log!");

// dep1.rw();
// dep2.getBaidu();

// console.log("Global:",global);
console.log("module:",module);
