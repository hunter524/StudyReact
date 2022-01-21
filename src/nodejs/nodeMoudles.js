//commonjs 提供的 module 对象,其内部提供 exports,require 方法,用于导入导出方法
console.log(JSON.stringify(module))

console.log(JSON.stringify(module.paths))
//es6 的 module 定义则是通过 import/export 进行

// .cjs .mjs 分别表示 commonJs 和 es6 规范定义的模块文件
