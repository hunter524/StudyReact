let obj = {
    a:'a',
    f(){
        console.log(this)
        console.log("obj function f value:",this.a);
    }
}

let {a, f} = obj;
console.log(`desugar obj value a is: ${a}`)
console.log(global)

function optionParam(x, y, z = "default z") {
    console.log(`option param x: ${x} y: ${y} z: ${z}`)
}

optionParam("xx","yy")

//ES 6 的 Promise 对象是由内置的 v8 引擎提供的内置对象
//对应的 v8 引擎的源码位于 deps/v8/include/v8-promise.h
/**dddd
 */

console.log(typeof Promise)

let i = 2;
console.log("i is:",i,"typeof i is:",typeof i);
let s = i.toString();
console.log("s is:",s,"typeof s is:",typeof s);

//Object.prototype.toString 与 {},[],function 实例的 toString 方法是不同的
//Object.prototype 原型链上的方法被实例覆盖
f = function (p) {
    console.log(p);
}
let array = [1,2,3];
obj = {};
console.log(Object.prototype.toString.call(array));
console.log(Object.prototype.toString.call(obj));
console.log(Object.prototype.toString.call(f));
console.log(array.toString());
console.log(obj.toString());
console.log(f.toString());


