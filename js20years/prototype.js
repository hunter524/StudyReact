function A() {
  this.a = "this.a";
}

function B() {
  this.b = "this.b";
}

function C() {
  this.c = "this.c";
}
//交换顺序会得到不一样的结果
//即原型链在 new 的那一刻确定（后期绑定无效）
//但是向 prototype 上添加属性是可以即时生效的
B.prototype = new A();
C.prototype = new B();

let b = new B();
console.log(b.hasOwnProperty("a"));
b.a = "this.b.a";
console.log(b.a);
console.log(b.b);
console.log(b.hasOwnProperty("a"));

console.log("==========");
let c = new C();
console.log(c.a);
console.log(c.b);
console.log(c.c);

for (const cKey in c) {
  console.log("c key:", cKey);
}

let regExp = /a/gi;
console.log(regExp.test("aBc"));


A.prototype = Object.prototype
B.prototype = Object.prototype
C.prototype = Object.prototype

b = new B();
console.log("b.a is:",b.a)
c = new C()
console.log("c.a is:",c.a)

B.prototype = new A()
C.prototype = new B()

let b1 = new B()
let c1 = new C()
//给构造函数设置 prototype,不会影响设置之前通过该构造函数创建的对象
console.log("after set prototype b1.a is:",b1.a)
console.log("after set prototype c1.a is:",c1.a)
console.log("b.a is:",b.a)
console.log("c.a is:",c.a)
