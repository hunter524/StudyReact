/**
 * @flow
 */

// flow 对应的 npm 安装包为 flow-bin , 安装时只需要 -D ,对于 dev 环境添加依赖即可
// flow 类型的注释的文件，使用 babel-node 可以运行,需要先全局安装 babel-cli
// (babel 对应的安装程序为 babel-core,babel-cli 7 版本以前的命名方式)
// (babel 7 以及以后的命名方式为 @babel/cli 和 @babel/core
// 在 babel7 以后的版本中以 @babel/ 开头的安装包为有 babel 自身提供，其他以 babel- 作为开头的包则由第三方提供
// babel-cli 同时也提供了 babel-plugin-transform-flow-strip-types 插件，用于将 flow.js 代码翻译成为普通的 js 代码

// 直接运行 flow 命令则使用的是全局安装的 flow 命令行工具
// 使用 yarn run flow 则执行的是 package.json 配置中的 script 配置的 flow 执行命令执行的 flow.
// 该处的 flow 如果是直接 flow 则执行的是该项目中的 node_modules 中的 flow (如果配置了其他执行命令,则按执行命令进行)
// flow的配置文件为 .flowconfig

//  flow.js 语法可以在 create-react-app 中直接使用无需配置
// 因为在 create-react-app 项目中,内部配置依赖了 babel-preset-react-app-> plugin-transform-flow-strip-types
// 用于解析 flow 代码

// 如果没有使用 create-react-app 也没有使用 babel
// 则可以使用 flow-remove-types（flow 自家开发的工具)进行 flow 语法的剥离
// 安装 flow-remove-types 依赖 flow-node ，flow-node 同 babel-node 一样可以直接执行包含 flow 语法的 js 文件

// 如果只使用了 babel 需要先安装 @babel/core @babel/cli @babel/preset-flow
// 在 .babelrc 中配置 { "presets": ["@babel/preset-flow"] } 启用 preset-flow
// 后面即可以执行 "babel src/ -d lib/ 编译 src 中的flow文件

//ps：babel 中的 preset 均以 preset-xxx 作为命名，目前提供四种 preset
// @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/preset-flow
// @babel/preset-react 需要特别与 babel-preset-react-app 进行区分，babel-preset-react-app 是
// create-react-app 工具配置的 create-react-app 所需要的配置
// 其依赖了如下 @babel 内置工具
// ├─ babel-preset-react-app@10.0.1
// │  ├─ @babel/core@^7.16.0
// │  ├─ @babel/plugin-proposal-class-properties@^7.16.0
// │  ├─ @babel/plugin-proposal-decorators@^7.16.4
// │  ├─ @babel/plugin-proposal-nullish-coalescing-operator@^7.16.0
// │  ├─ @babel/plugin-proposal-numeric-separator@^7.16.0
// │  ├─ @babel/plugin-proposal-optional-chaining@^7.16.0
// │  ├─ @babel/plugin-proposal-private-methods@^7.16.0
// │  ├─ @babel/plugin-transform-flow-strip-types@^7.16.0
// │  ├─ @babel/plugin-transform-react-display-name@^7.16.0
// │  ├─ @babel/plugin-transform-runtime@^7.16.4
// │  ├─ @babel/preset-env@^7.16.4
// │  ├─ @babel/preset-react@^7.16.0
// │  ├─ @babel/preset-typescript@^7.16.0
// │  ├─ @babel/runtime@^7.16.3
// │  ├─ babel-plugin-macros@^3.1.0
// │  └─ babel-plugin-transform-react-remove-prop-types@^0.4.24

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
