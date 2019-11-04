var x = "global x";

var bindObj = {x:"bindObj"};


function consoleThis() {
    console.log(this.x);
}
// 全局调用 this 则是全局
consoleThis();
// 方法 bind 一个对象 this 则是该对象
consoleThis.bind(bindObj)();
// 方法作为一个对象的成员 方法中的 this 则代表该对象
var objMethod = {x:"objMethod",console:consoleThis};
objMethod.console();

// 作为构造函数调用 this 指向新生成的对象
function constructor() {
    this.x = "constructor"
}

var superType = {
    hello:function (name) {
        console.log("supertype:","hello:",name)
    }
};

constructor.prototype = superType;

var conObj = new constructor();
console.log("conObj:",conObj.x,"global:",this.x);
conObj.hello("conObj");

var conObj2 = new  constructor();
conObj2.hello("conObj2");

console.log("constructor prototype:",constructor.prototype,"__proto__",constructor.__proto__);

// prototype(原型链，类的继承关系链(同一种类型的对象，共享相同的父类对象)，多个子类的对象的父类对象是同一个
// JAVA:java每一个子类对象，都具有自己的父类对象，每个子类不共享父类对象
//
// __proto__

function Child() {
    this.child = "child";
}

function Father() {
    this.father = "father"
}

function GrandFather() {
    this.grandfather = "grandfather"
}

// Father.prototype = new GrandFather();

Child.prototype = new Father();

Father.prototype = new GrandFather();

// 在下一个事件循环重新 赋值 Child.prototype则可以构建完整的 Child Father GrandFather 原型链
// setTimeout(function () {
//     Child.prototype = new Father();
//     var childNextLoop = new Child();
//     console.log("childNextLoop:",childNextLoop.grandfather)
//
// });

var child = new Child();
var father = new Father();

// console.log("child prototype",child.prototype,"child __proto__",child.__proto__,"child.__proto__proto__",child.__proto__.__proto__);
//
// console.log("father prototype",father.prototype,"father.__proto__",father.__proto__,"father.__proto__proto__",father.__proto__.__proto__);

// !!! 原型链的声明要按照先父类，后子类的关系进行。否则会导致构建子类对象时 父类对象的不完整，如：上述代码 Child.prototype 与 Father.prototype
// 调换一下顺序则 回到在child上无法找到grandfather属性。 (因此推测构建Child对象的原型链(继承关系时，是根据当时的内存中的原型关系快照构建的))
console.log(child.grandfather);


function normalFunction(who) {

    var result = "normalFunction "+who;
    this.who = who;
    console.log(result);
    return result
}

var outObj = [];
normalFunction.call(outObj,"call","call2");
normalFunction.bind(outObj,"bind")();
normalFunction.apply(outObj,/*["apply"]*/ ["apply","apply2"]);

// extends

// 构造函数方法继承
// 1. 方法apply调用传入this
// 2. 使用 prototype ，！！！ 需要更改prototype.constructor 为子类型，如果不更改则prototype.constructor为原型的父类型。
// 3. 直接修改prototype
// 4. 使用间接空对象继承继承实现prototype， 即 Man.prototype 指向一个中间的空对象，该空对象的构造方法prototype再去指向真正要继承的对象。
//    避免了更改当前对象的prototype对象中的数据，对其他对象的影响。
// 5. 拷贝继承，(for in 被继承对象中的属性和属性值，拷贝进入继承的子对象中)

// 非构造函数方法继承(如直接生成的 JSON 对象)
// 1.object 使用间接的 prototype 原型链继承，生成一个新的类型，prototype 指向被继承的对象，然后返回该新对象
// 2.for in 对象赋值 （则同java 存在深拷贝与浅拷贝的问题)


function Human(type) {
    this.type = type
}

function Man(name) {
    var args = [arguments[1]]
    Human.apply(this,args);
    this.name = name;
}

var man = new Man("man","man human");
console.log("man:"+man.name+","+man.type);



function Human1() {
    this.type = "Human1"
}

function Man1(name) {
    this.name = name;
}

Man1.prototype = new Human1();

//!!! 使用prototype继承，则需要重新覆盖 constructor 为 Man1
// Man1.prototype.constructor = Man1;

var man1 = new Man1("man1");
console.log("man1:"+man1.type+"constructor:"+man1.constructor);

//没有this引用则指向全局 即使方法绑定的对象内部存在x,该X也会指向全局

function noThisConsoleX(from) {
    console.log(from+"noThisConsoleX:"+x);
}
noThisConsoleX("global call:");

var noThisObj = {x:"noThisObj",noThisConsoleX:noThisConsoleX};

noThisObj.noThisConsoleX("noThisObjCall:");

//Js引擎执行到该处异常语句则抛出错误不再执行
// console.log(notdefined);

console.log("after notdefined");

console.log("BeforeSetTimeOut"+Date.now());
setTimeout(() => {
    console.log("AfterSetTimeOut"+Date.now());
},100);

// console.log(a);
// var a = 1;
// console.log(a);

eval("console.log(\"log from eval\")");

x = 1; <!-- x = 2;
--> x = 3;
console.log("comments",x);

if(typeof v === "undefined"){
    console.log("v is undefined")
}
console.log(typeof (typeof v));
function typeOfFunc(){

}

console.log("typeof return enum");
console.log("v",typeof v);
console.log("null",typeof null);
console.log("\"\"",typeof "");
console.log("1111",typeof 111);
console.log("false",typeof false);
console.log("typeOfFunc",typeof typeOfFunc);
console.log("{}",typeof {});
console.log("[]",typeof []);
console.log("Infinity:",typeof Infinity);

console.log("null instanceof Object:",null instanceof Object);
console.log("{} instanceof Object:",{} instanceof Object);
console.log("[] instanceof Object:",[] instanceof Object);

console.log("[] instanceof Array:",[] instanceof Array);

console.log("undefined == null:",undefined == null);
console.log("undefined === null",undefined === null);

console.log("Nan == Nan",NaN == NaN);
console.log("Nan === Nan",NaN === NaN);

console.log("Infinity == Infinity",Infinity == Infinity);
console.log("Infinity === Infinity",Infinity === Infinity);

console.log("-Infinity == -Infinity",-Infinity == -Infinity);
console.log("-Infinity === -Infinity",-Infinity === -Infinity);
console.log("Null == 0",0 == Number(null));

var number = 2221.123456;
console.log(number.toFixed(2),number.toPrecision(4),number.toExponential(0));
console.log(parseInt("-10"));

/*相当于将方法打印出来，然后拆分方法体的字符串*/
console.log((function () {/*
line1
line2
line3
*/}).toString().split("\n").slice(0,9).join("\n"));

var rawString = "bar";
var based     = btoa(rawString);
var debased         = atob(based);
console.log("based:",based,"debased",debased);

var encodeUri = encodeURIComponent("投资");
var decodeUri         = decodeURIComponent(encodeUri);
console.log("encodeUri:",encodeUri,"decodeUri:",decodeUri);

//TODO://为什么eval返回的只是 123 ？
console.log("eval:",eval("{foo:123}"));
console.log("normal:",{foo:123});

var array = ["bar","foo","123",222];
console.log("before delete:",array);
delete array[0];
console.log("after delete:",array);

array.splice(0,2);

console.log("after splice:",array);


function DeleteObj(){
    this.name = "delete obj";
}

function DeleteParent(){
    this.pname = "delete parent"
}

DeleteObj.prototype = new DeleteParent();

var deleteObj = Object.defineProperty(new DeleteObj(),"define",{
    value:"delete define",
    configurable:true,
    writable:true,
    enumerable:false,
});



console.log("before delete:","pname:",deleteObj.pname,"name:",deleteObj.name,"define:",deleteObj.define);
// console.log("d name:",delete deleteObj.name);
// console.log("d pname:",delete deleteObj.pname);
// console.log("d define:",delete deleteObj.define);

// deleteObj.define = "rename define";

console.log("after delete:","pname:",deleteObj.pname,"name:",deleteObj.name,"define:",deleteObj.define);

for (prop in deleteObj) {
    console.log("key:",prop,"value:",deleteObj[prop])
}

console.log("Object.keys:",Object.keys(deleteObj));


console.log(1/+0,1/-0);


var addFun = new Function("x","y","return x + y;");

var added = addFun(1,2);
console.log("addFun added:",added);

var aarray = [1,2,3,4,5];
console.log("aarray keys:"+Object.keys(aarray)+"array values:"+aarray);

aarray.length = 10;
console.log("after set aarray length aarray keys:"+Object.keys(aarray)+"array values:"+aarray);
console.log("aarray from 6-10:",aarray[5],aarray[6],aarray[7],aarray[8],aarray[9]);
aarray["p"]="property";
var aresult = "";
for (i in aarray){
    aresult = aresult+aarray[i];
}

console.log("for in result:"+aresult);

aresult = "";
delete aarray[2];
console.log("after delete");
aarray.forEach(function (value, index, array) {
    aresult = aresult+"value:"+value+"index:"+index+"array:"+array+"\n"
});
console.log("forEach:"+aresult);
console.log("Keys:",Object.keys(aarray));

var arrayLike = {0:"000",1:"111",2:"222",3:"333",length:4};
// arrayLike.push("444");
Array.prototype.forEach.call(arrayLike,function (v, i, arr) {
   console.log("arrayLikeForEach:",arrayLike);
});

var realArray = Array.prototype.slice.call(arrayLike);
realArray.push("slice become real array");
console.log("RealArray:",realArray);

console.log("Array Like:",arrayLike);

var opObjV = {
    valueOf:function () {
        return 1;
    }
};

var opObjT = {
    toString:function () {
        return "toString";
    },
    valueOf:function () {
        return 2;
    }
};


console.log("valueOf:",1+opObjV);
console.log("toString:",1+opObjT);

console.log("2**3:",2**3);

var opFunV = function () {
  console.log("called opFunV")
};

opFunV.valueOf=function () {
    return 2;
};

console.log("opFunV:",2+opFunV);










