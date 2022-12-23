/**
 * @flow
 */

// flow 对应的 npm 安装包为 flow-bin , 安装时只需要 -D ,对于 dev 环境添加依赖即可
// flow 类型的注释的文件，使用 babel-node 可以运行,需要先全局安装 babel-cli
// babel-cli 同时也提供了 babel-plugin-transform-flow-strip-types 插件，用于将 flow.js 代码翻译成为普通的 js 代码

function getNumber(): number {
  return 2;
}

console.log("getNumber is:", getNumber());
console.log(`$__dirname`)
