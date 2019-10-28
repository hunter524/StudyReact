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





