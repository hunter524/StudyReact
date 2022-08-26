function countedHello() {
  console.log("Hello , World!");
  countedHello.callCount++; // 增加该函数的 callCount 属性
}
countedHello.callCount = 0; // 将计数器与函数相关联
for (var i = 0; i < 5; i++) countedHello();
// console.log(countedHello.callCount); // 显示 5
var args = [1, 2, 3, 4];
function argsNumber() {
  console.log(arguments.length);
}

argsNumber(...args); // arguments length 5
argsNumber(args); // arguments length 1

"String".toLocaleLowerCase();
var upperCaseA = String("aaa").toUpperCase();
console.log(upperCaseA);

console.log(Date(Date.now()));

// Math 全局对象
// Math console.log(Math)

//访问器属性（setter/getter）/数据属性

//对于访问器属性，浏览器中还提供了非标准化的方法用于定义
//__defineSetter__ ,__defineGetter__
//标准化的定义方法时通过 defineProperty,defineProperties 定义 set/get 属性

let a = { a: "a" };

//使用 defineProperty 定义的属性(访问器属性，数据属性)默认不可以枚举
// defineProperty 时 value/get 不能同时存在，即一个属性不能既是访问器属性又是数据属性
// writeable: 默认为 false 表示不可以改变值
// enumerable:默认也为 false,表示不可以枚举
// configurable:默认也为 false 表示不可以删除该属性,也不可以通过 defineProperty 重复定义重复定义该属性
//                      true 时则可以重复定义该属性

//上面三个属性在 Object#create/Object#definePropety/Object#definePropeties 则均执行的默认拒绝策略
Object.defineProperty(a, "v", {
  get: function () {
    console.log("setter getter property!");
  },
  enumerable: true,
});

Object.defineProperty(a, "v2", {
  value: "v2",
  enumerable: true,
  // writable:true,
  configurable: true,
});

for (let aKey in a) {
  console.log("for in key", aKey);
}

console.log(Object.keys(a));

//writeable 设置为 false 即 v2 属性不可以更改j
// defineProperty 时默认为 false
a.v2 = "v222";
Object.defineProperty(a, "v2", {
  value: "v2",
  enumerable: true,
  // writable:true,
  configurable: true,
});
// delete a.v2
console.log(a.v2);

//Object.seal(密封）
//已有属性字段的 configurable 属性设置为 false,不可以删除已有属性
//isExtensible 属性设置为 false 则不可以给已有对象扩展属性（添加新的属性）
//但是可以更改已有属性的值

//Object.freeze(冻结)
//基于 seal 的基础上，writeable 属性也设置为 false，即 值也不可以被修改

// new 调用构造函数，如果return 返回的是 object 则直接使用该 Object
// 如果没有返回，则使用 new 操作符传递给该函数的 this 作为返回值
// (this 即为一个新的对象，构造函数可以在该对象上添加属性/方法)
function Constructor() {
  return {
    x: "x",
    y: "y",
  };
}

function Constructor2() {
  this.c2 = "c2";
  console.log("contructor2 this:");
  console.log(JSON.stringify(this));
  return this;
}
console.log("top level this!");
console.log(JSON.stringify(this));
console.log("this === global", this === globalThis);
console.log(JSON.stringify(new Constructor()));
console.log(JSON.stringify(new Constructor2()));

function add_handlers(node) {
  var i = 0;
  for (var i = 0; i < 10; i++) {
    node[i].onclick = function () {
      console.log(i);
    };
  }
}

function add_handlers_opt(node) {
  var helper = function (i) {
    return function () {
      console.log(i);
    };
  };

  var i = 0;
  for (var i = 0; i < 10; i++) {
    node[i].onclick = helper(i);
  }
}

//使用 let 则没有闭包变量的问题，本质上是闭包的语法糖
function add_handlers_opt2(node) {
  for (let i = 0; i < 10; i++) {
    node[i].onclick = function () {
      console.log(i);
    };
  }
}

let node = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
// add_handlers(node);
// node[1].onclick();
// node[2].onclick();
// node[3].onclick();
// node[4].onclick();

// add_handlers_opt(node);
add_handlers_opt2(node);
node[1].onclick();
node[2].onclick();
node[3].onclick();
node[4].onclick();
