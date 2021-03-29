'use strict'
// js 20 years
function Child() {
    this.x = "childX";
    this.y = "childY";
}

// Child 类型的 prototype 是一个对象
// 所有 Child 类型的对象共享该 prototype 的方法,但是不共享变量

// Child.prototype == child.__proto__ 均代表 Child 共享的对象的类型
Child.prototype = new Parent();
var child = new Child();

console.log(child.x)
function Parent(){

    this.px = 0;

    this.printX = function () {
        console.log(this.x)
        console.log("this.px: "+this.px++)
    }

}

child.printX();
child.printX();

var child2 = new Child();

child2.printX()

console.log(Child.prototype)
console.log(child.__proto__)

// Function 也是一个对象,也可以对其进行赋值
function countedHello() {
    //一个方法的 this 没有绑定任何对象为 undefined
    console.log("Hello , World!"+this + global);
    countedHello.callCount++; // 增加该函数的 callCount 属性
}
countedHello.callCount = 0; // 将计数器与函数相关联
for (var i = 0; i < 5; i++) countedHello();
console.log(countedHello.callCount); // 显示 5
