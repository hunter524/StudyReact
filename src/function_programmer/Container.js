const _l = require('lodash');
const _r = require('ramda')
const _m = require('moment')
const fs = require("fs")
const asserts = require('assert')
const OS = require('os')
const folktale = require('folktale')
const MayBe = require('folktale/maybe')
const jquery = require("jquery")


function Container(x){
    this.__value = x
}

Container.of = function (x) {
    return new Container(x)
}


var aContainer = Container.of("a");
console.log(aContainer)

function add(x,y){
    return x+y;
}

const addC = _l.curry(add);

const addTen = addC(10);

console.log(addTen(2))
console.log(addTen(3))

//map: f,a ->b (对 a 应用 f 返回 b )
var persons = new Array()
persons['0'] = {name:"a",birthDay:"2005-02-02"}
persons['1'] = {name:"b",birthDay:"2000-02-02"}
function head(a){
    console.log(a[0])
    return a[0]
}

function birthDay(person){
    console.log(person)
    return person.birthDay
}

function age(birthDay){
    var now    = _m();
    var moment = _m(birthDay,"yyyy-MM-dd");
    return now.diff(moment,"years")
}

function trace(tag,log){
    console.log("tag "+tag+":"+log)
}

var traceC = _r.curry(trace);
// 使用 _r.map(birthDay) 包装 birthDay 则是对对象的每一个属性值执行map操作
var mappedBirth           = _r.map(birthDay);
var printFirstAge = _r.compose(traceC("Age"),age,birthDay,head);
printFirstAge(persons)

function arrayItemPlus1 (item){
    return ++item;
}

var itemPlus1 = _r.map(arrayItemPlus1);

var nArray = itemPlus1([1,2]);
console.log(nArray)

console.log(OS.version())

var lelements =[{lower:'lower'},{lower:'high'}]
function toUpper(v){
    return v.toUpperCase()
}
// 模仿 函数式编程的 Right Left 第一层 map 遍历数组,第二层 map 遍历数组中的对象
// Either 的 Right Left 操作避免了普通的 if else 嵌套操作
// map 操作则避免了 for 循环
console.log(_r.map(_r.map(toUpper))(lelements))

function linkTwo(first,second){
    return "first:"+first+"second:"+second;
}

var clinkTwo = _r.curry(linkTwo);
// curry 化还是第一个参数对应第一个参数,第二个参数对应第二个
console.log(clinkTwo("1")("2"));

console.log(MayBe.Just("0"))