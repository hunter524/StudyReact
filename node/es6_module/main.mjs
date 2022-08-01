// 同时支持 Commonjs 的模块化需要将 type 配置为 commonjs 并且将 nodeModule 的语法的文件声明为 .mjs文件

//如果只需要支持 ES6 模块化则只需要将 type 设置为 module,不要将文件名改为 .mjs
import {print,print2} from "./Es6Module2.mjs";

print()
print2()

