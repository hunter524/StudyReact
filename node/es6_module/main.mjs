// node 模块化导出和导入的语法
// import/export
//export default 语法叫单体导入，是 ES2015(ES6) 为了 适应 CommonJS 模块的使用者的习惯而添加的语法
//node 模块默认是 export class A / export function f(){} / export let b = 3; 的导入/导出语法

//在 nodejs 的 node 项目中模块加载的源码目录在 /lib/internal/modules/ 文件夹下默认支持 cjs(commonJs) 模块和 esm（ES Modules） 模块

// 同时支持 Commonjs 的模块化需要将 type 配置为 commonjs 并且将 nodeModule 的语法的文件声明为 .mjs文件

//如果只需要支持 ES6 模块化则只需要将 type 设置为 module,不要将文件名改为 .mjs
import {print,print2} from "./Es6Module2.mjs";
//使用 nodejs 的模块化机制导入 node 的内部模块
import fs from "fs"

print()
print2()
fs.readFile("/home/hunter/WebstormProjects/StudyReact/node/cmd/main.js",(err, data) => {
    console.log(data.toString())
})

