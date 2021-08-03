// exports 与 node 内置的 module.exports 是同一个引用
// 需要注意 exports(module.exports) 与 require(module.require) 与 import/export 的区别
console.log(typeof  exports);
console.log(`exports === module.exports : ${exports === module.exports}`)

//require 是 node 全局的一个方法
//与 node 提供的 module 内置的 module#require 不同
console.log(typeof  require);
console.log(`require === module.require : ${require === module.require}`)

console.log(typeof  global);

for (const exportsKey in exports) {
    console.log(`exportKey: ${exportsKey}`)
}

//export import 则是 JS ES6 标准的语法(用于官方支持模块化,从而避免了以前支持模块化需要依赖第三方库 UMD,AMD,CommonJs,SeaJs 的现状)
