/**
 * @flow
 */

// flow 对应的 npm 安装包为 flow-bin , 安装时只需要 -D ,对于 dev 环境添加依赖即可
// flow 类型的注释的文件，使用 babel-node 可以运行,需要先全局安装 babel-cli
// (babel 对应的安装程序为 babel-core,babel-cli 7 版本以前的命名方式)
// (babel 7 以及以后的命名方式为 @babel/cli 和 @babel/core
// babel-cli 同时也提供了 babel-plugin-transform-flow-strip-types 插件，用于将 flow.js 代码翻译成为普通的 js 代码

// 直接运行 flow 命令则使用的是全局安装的 flow 命令行工具
// 使用 yarn run flow 则执行的是 package.json 配置中的 script 配置的 flow 执行命令执行的 flow.
// 该处的 flow 如果是直接 flow 则执行的是该项目中的 node_modules 中的 flow (如果配置了其他执行命令,则按执行命令进行)

function getNumber(): number {
  return 2;
  // flow 报错,因为该方法预期是返回 number 类型,该处返回了 string 类型
  // return "2";
}

console.log("getNumber is:", getNumber());
console.log(`__dirname is:${__dirname}`);
console.log(`__filename is:${__filename}`);
// current work directory 为当前项目的 package.json 文件所在的目录
// console.log(`cwd is: ${process.cwd()}`);

// flow 报错,因为调用该方法预期是不需要参数
// getNumber("2");
export default getNumber;
