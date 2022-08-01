function countedHello() {
    console.log("Hello , World!");
    countedHello.callCount++; // 增加该函数的 callCount 属性
}
countedHello.callCount = 0; // 将计数器与函数相关联
for (var i = 0; i < 5; i++) countedHello();
// console.log(countedHello.callCount); // 显示 5
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

//访问器属性（setter/getter）/数据属性

let a = {"a":"a"};

//使用 defineProperty 定义的属性(访问器属性，数据属性)默认不可以枚举
// defineProperty 时 value/get 不能同时存在，即一个属性不能既是访问器属性又是数据属性
// writeable: 默认为 false 表示不可以改变值
// enumerable:默认也为 false,表示不可以枚举
// configurable:默认也为 false 表示不可以删除该属性,也不可以通过 defineProperty 重复定义重复定义该属性
//                      true 时则可以重复定义该属性

//上面三个属性在 Object#create/Object#definePropety/Object#definePropeties 则均执行的默认拒绝策略
Object.defineProperty(a,"v",{
    get: function () {
        console.log("setter getter property!")
    },
    enumerable:true
})

Object.defineProperty(a,"v2",{
    value:"v2",
    enumerable:true,
    // writable:true,
    configurable:true
})

for (let aKey in a) {
    console.log("for in key",aKey);
}

console.log(Object.keys(a))

//writeable 设置为 false 即 v2 属性不可以更改
// defineProperty 时默认为 false
a.v2 = "v222"
Object.defineProperty(a,"v2",{
    value:"v2",
    enumerable:true,
    // writable:true,
    configurable:true
})
// delete a.v2
console.log(a.v2)
