
//from 为从 ArrayLike/Iterable 创建数组
//ArrayLike 必须要拥有 数字下标属性 和 length 字段
let arrayLike = {"0":"0","1":"1","length":2};

//arrayLike 并不是 Array
console.log("arrayLike is Array:"+Array.isArray(arrayLike))

console.log(`Array#from length: ${Array.from.length}`)
let fromArray = Array.from(arrayLike);
console.log(fromArray.length,fromArray[0],fromArray[1])

let literalArray = ["a","b","c","d","e"]

console.log(literalArray.join(),"\n\r",literalArray.toString(),"\n\r",literalArray.toLocaleString())
literalArray.copyWithin()

let arrayIterator  = literalArray[Symbol.iterator]();
// let fromIteratorArray = Array.from(literalArray.keys());
// let fromIteratorArray = Array.from(literalArray.values());
let fromIteratorArray = Array.from(arrayIterator);
// entry 同 map 的 entry 表示,表示 k(下标) v(值的集合)
// let fromIteratorArray = Array.from(literalArray.entries());



console.log(fromIteratorArray.length, Array.isArray(fromIteratorArray),fromIteratorArray[3])

console.log("type of ArrayIterator:",typeof arrayIterator)

// 一个 iterator 只能迭代一次
let iteratorfun = literalArray[Symbol.iterator];
console.log(`iteratorFunction ${typeof iteratorfun}`)
arrayIterator = literalArray[Symbol.iterator]();

for (let arrayIteratorElement of arrayIterator) {
    console.log("arrayIterator Element:",arrayIteratorElement)
}

//Object#keys 与 Array#keys 的区别在于 空位元素是否纳入考虑
// Object#keys: [ '0', '2' ]
// Array#keys: [ 0, 1, 2 ]

let simpleArray = [1,,3];
console.log("Object#keys:",Object.keys(simpleArray))
console.log("Array#keys:",[...simpleArray.keys()])

//String 是一种 ArrayLike 数据类型,可以通过 Array#from 获取 String 中的每一个字母
let stringArrayLike = "I am String is Array Like !"
let charArray = Array.from(stringArrayLike)
console.log("charArray#length:",charArray.length)
charArray.forEach((value, index, array) => {
    console.log("index:",index," ====> ",value)
})


let jsonArray = JSON.parse("{\"array\":[1,2,3,4],\"name\":\"hunter\"}")
console.log("json Array is Array:",Array.isArray(jsonArray.array))

function ArgumentsIsArrayLike() {
    console.log("arguments is array:",Array.isArray(arguments))
    console.log("arguments length:",arguments.length,"arguments:",arguments[0],arguments[1],arguments[2],"...")
}

ArgumentsIsArrayLike(1,2,3)

[1].sort()
