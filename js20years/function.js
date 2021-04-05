function countedHello() {
    console.log("Hello , World!");
    countedHello.callCount++; // 增加该函数的 callCount 属性
}
countedHello.callCount = 0; // 将计数器与函数相关联
for (var i = 0; i < 5; i++) countedHello();
console.log(countedHello.callCount); // 显示 5
var args = [1,2,3,4];
function argsNumber(){
    console.log(arguments.length)
}

argsNumber(...args)// arguments length 5
argsNumber(args)// arguments length 1

"String".toLocaleLowerCase()
var upperCaseA = String("aaa").toUpperCase();
console.log(upperCaseA)

console.log(Date(Date.now()))

// Math 全局对象
// Math console.log(Math)
