class Clazz  extends Array{

    name="Class Type Field"

    constructor() {
        super(10);
    }
}

let clazz = new Clazz();
let clazz2 = new Clazz();
clazz2.name = "Class Type Field 2"
console.log(JSON.stringify(clazz));
console.log(clazz.name);
console.log(clazz2.name);
console.log(Clazz.prototype);

//模块
//export default 语法叫单体导入，是 ES2015(ES6) 为了 适应 CommonJS 模块的使用者的习惯而添加的语法
//node 模块默认是 export class A / export function f(){} / export let b = 3; 的导入/导出语法

