#!/usr/bin/node

console.log("shebang shell cmd!");

// env 中的 npm_**变量
console.log(
  "process env cfg:",
  JSON.stringify(process.env.npm_package_config_port)
);
console.log(process.env);

// node 的
console.log(__dirname, __filename);

// TODO:// process.env.NODE_ENV 环境变量 为 production,development 的原理。
console.log(process.env.NOE_ENV);
