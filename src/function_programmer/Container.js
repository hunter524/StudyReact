const _l = require('lodash');
const _r = require('ramda')
const _m = require('moment')

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
