'use strict'
// node 一些常用的 API

//node 内置的环境变量

console.log("env __dirname:",__dirname);
console.log("env __filename:",__filename);

// process 常用的 api

//输出当前执行该 js 文件的 node 进程的 pid
console.log("current process pid:",process.pid);
//通过 process#stdout 代替 console.log 在 node 环境输出文字
process.stdout.write("print by process stdout")
