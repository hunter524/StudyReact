//该篇教程的大部分库均使用了 lodash 和 ramda 中的方法

const _l = require("lodash")
const _r = require("ramda")
const moment = require('moment');
const localStorage = require('node-localstorage')


var Container = function (x) {
    this.__value = x;
}

Container.of = function (x) {
    return new Container(x);
};
console.log("Simple Container==========")
var container3 = Container.of(3);
//=> Container(3)
console.log(container3)


var containerhotDogs = Container.of("hotdogs");
//=> Container("hotdogs")
console.log(containerhotDogs)


var containerYoda = Container.of(Container.of({name: "yoda"}));
//=> Container(Container({name: "yoda" }))
console.log(containerYoda)

//第一个 Functor

console.log("Simple Container Map==========")
Container.prototype.map = function (f) {
    return Container.of(f(this.__value))
}

// map 函数该种场景从左向右执行
var map2 = Container.of(2).map(function (two) {
    return two + 2
})
console.log(map2)
//=> Container(4)


var mapToUpper = Container.of("flamethrowers").map(function (s) {
    return s.toUpperCase()
})
console.log(mapToUpper)
//=> Container("FLAMETHROWERS")


var concatLength = Container.of("bombs").map(_r.concat(" away")).map(_r.prop('length'))
//=> Container(10)
console.log(concatLength)


// MayBe 函子 MayBe 的 map 函子相对于 Container 函子添加了 null 安全判断
console.log("Simple MayBe Functor ==========")

var Maybe = function (x) {
    this.__value = x;
}

Maybe.of = function (x) {
    return new Maybe(x);
}

Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

var maybeStrMachA = Maybe.of("Malkovich Malkovich").map(_r.match(/a/ig));
//=> Maybe(['a', 'a'])
console.log(maybeStrMachA)

var nullMayBeMatchA = Maybe.of(null).map(_r.match(/a/ig));
//=> Maybe(null)
console.log(nullMayBeMatchA)

var mayBeNoAgeAdd = Maybe.of({name: "Boris"}).map(_r.prop("age")).map(_r.add(10));
//=> Maybe(null)
console.log(mayBeNoAgeAdd)

var mayBeAgeAdd = Maybe.of({name: "Dinah", age: 14}).map(_r.prop("age")).map(_r.add(10));
//=> Maybe(24)
console.log(mayBeAgeAdd)


//MayBe Functor PointFree 柯里化函子

console.log("Simple MayBe Functor Map Curry Map pointFree ==========")
//  map :: Functor f => (a -> b) -> f a -> f b
// 该 map 方法调用传递进入的函子的 map 方法
var map = _r.curry(function (f, any_functor_at_all) {
    return any_functor_at_all.map(f);
});

//  safeHead :: [a] -> Maybe(a)
var safeHead = function (xs) {
    return Maybe.of(xs[0]);
};
// 查看 MayBe 的类型 new MayBe 产生的 MayBe 是一个 Object 不再是一个函数
console.log(typeof Maybe.of("0"))

// 从右向左执行,该处的 map 方法是前面 curry 之后的方法 (即对所有函子执行 map 操作)
// 该处的 map 也可以使用 ramda 中定义的 _r.map 的方法, ramda.map 在对象存在map 方法时则调用 map 方法转换整个对象,如果不存在则转换对象中的每个属性
var streetName = _r.compose(/*对 MayBe(null) 函子执行 map 返回的依旧是 MayBe null 函子*/_r.map(_r.prop('street')),/*safeHead 返回的是 MayBe(null) 函子*/ safeHead, _r.prop('addresses'));

console.log(streetName({addresses: []}));
// Maybe(null)

console.log(streetName({addresses: [{street: "Shady Ln.", number: 4201}]}));
// Maybe("Shady Ln.")


console.log("Ramda Map Api============")
var MapBean = function (x, y) {
    this.__x = x;
    this.__y = y;
}

MapBean.of = function (x, y) {
    return new MapBean(x, y)
}

var curryMap = _r.curry(_r.map)(function (param) {
    return param.toUpperCase()
});
// 不存在 map 定义时输出
console.log(curryMap(MapBean.of("x","y")))
//{ __x: 'X', __y: 'Y' }

MapBean.prototype.map = function (f) {
    // console.log("map ==="+f.toString())
    return f(this.__x)
}
// 如果 _r.map 进入的如果是 functor 则先调用 Functor#map 方法,再将真实的 map 转换方法传递进入 Functor#map 方法进行值的转换操作
// 值转换完成之后交由 Functor#map 方法包装成 functor 返回给调用者
console.log(_r.map(function (param) {
   return  param.toUpperCase()

})(MapBean.of("x","y")))

//Maybe 实现的取钱函数式操作

console.log("Maybe withdraw ===================")
//  withdraw :: Number -> Account -> Maybe(Account)
var withdraw = _r.curry(function(amount, account) {
    return account.balance >= amount ?
        Maybe.of({balance: account.balance - amount}) :
        Maybe.of(null);
});

// 更新总帐目
var updateLedger = function (acc) {
    return acc
}

// 提取余额参数
var remainingBalance = function (acc){
    console.log("remainingBalance:"+acc)
    return _r.prop("balance")(acc)
}

//  finishTransaction :: Account -> String
var finishTransaction = _r.compose(remainingBalance, updateLedger); // <- 假定这两个函数已经在别处定义好了

//  getTwenty :: Account -> Maybe(String)
var getTwenty = _r.compose(map(finishTransaction), withdraw(20));


console.log(getTwenty({ balance: 200.00}))
// Maybe("Your balance is $180.00")

console.log(getTwenty({ balance: 10.00}))
// Maybe(null)

console.log("MayBe either NotNull================")

//  maybe :: b -> (a -> b) -> Maybe a -> b
// x 表示的为 b
// f 表示一个 a->b 的转换函数
// m 表示 Maybe a 类型
// maybe 函数最终返回的是 b 类型
var maybe = _r.curry(function(x, f, m) {
    return m.isNothing() ? x : f(m.__value);
});

//  getTwenty :: Account -> String
// 这个版本的 getTwenty m(withdraw) 返回的是 MayBe#Nothing 时则不运行 f(finishTransaction) 直接返回字符串作为该结果
// 函数式编程在 curry maybe 的过程中直接截断了 finishTransaction 的运行
// !!!!! x 的类型需要与 finishTransaction 返回的类型一直,否则会导致函数的上游产生异常!!!!!
var getTwenty = _r.compose(
    maybe("You're broke!", finishTransaction), withdraw(20)
);


console.log(getTwenty({ balance: 200.00}));
// "Your balance is $180.00"

console.log(getTwenty({ balance: 10.00}));
// "You're broke!"


// Right Left 与 Either 的关系
// Left 忽略 map 时传递进入的 function
// Right 则像maybe 一样在 map 中取出值/执行map 操作放回 Right 容器
console.log("From Right Left To Either=============")
var Left = function(x) {
    this.__value = x;
}

Left.of = function(x) {
    return new Left(x);
}

Left.prototype.map = function(f) {
    return this;
}

var Right = function(x) {
    this.__value = x;
}

Right.of = function(x) {
    return new Right(x);
}

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
}

console.log(Right.of("rain").map(function(str){ return "b"+str; }));
// Right("brain")

console.log(Left.of("rain").map(function(str){ return "b"+str; }));
// Left("rain")

console.log(Right.of({host: 'localhost', port: 80}).map(_r.prop('host')));
// Right('localhost')

console.log(Left.of("rolls eyes...").map(_r.prop("host")));
// Left('rolls eyes...')


//Left Right 获取年龄的操作 左值与右值数据类型不同
//Left 表示失败是获取到的是错误提示信息,为字符串类型
//Right 表示成功获取到的是正确的年龄值

console.log("From Left Right GetAge ==============")
//  getAge :: Date -> User -> Either(String, Number)
var getAge = _r.curry(function(now, user) {
    var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
    if(!birthdate.isValid()) return Left.of("Birth date could not be parsed");
    return Right.of(now.diff(birthdate, 'years'));
});

console.log(getAge(moment(), {birthdate: '2005-12-12'}));
// Right(9)
console.log(getAge(moment(), {birthdate: 'balloons!'}));
// Left("Birth date could not be parsed")

//  fortune :: Number -> String
//  原文的例子不能运行: _r.concat 不能将 number 和 String 进行加法操作
//  因此修改完成的例子在 中间添加了 _r.toString 操作
var fortune  = _r.compose(_r.concat('If you survive, you will be '),_r.toString,_r.add(1));

//  zoltar :: User -> Either(String, _)
var zoltar = _r.compose(_r.map(console.log), _r.map(fortune), getAge(moment()));

zoltar({birthdate: '2005-12-12'});
// "If you survive, you will be 10"
// Right(undefined)

zoltar({birthdate: 'balloons!'});
// Left("Birth date could not be parsed")

// 通过 Left Right 定义一个 either 函数
console.log("Either Function ============>")
//  either :: (a -> c) -> (b -> c) -> Either a b -> c
// f 为 a->c 的一个函数,为将 Left 中的 a 转换成为 c
// g 为 将 b->c 的一个函数,为将 Right 中的 b 转换为 c 的一个函数
// e 为 一个 Either 可以容纳 a 也可以容纳 b 的一个容器
var either = _r.curry(function(f, g, e) {
    switch(e.constructor) {
        case Left: return f(e.__value);
        case Right: return g(e.__value);
    }
});

//  zoltar :: User -> _
// 原例子是 id 没有该方法,因此该处替换成为 lodash.identity 方法
// lodash.identity 的传入实际上只是为了满足 either 方法的调用需求
var zoltar = _r.compose(console.log, either(_l.identity, fortune), getAge(moment()));

console.log(zoltar({birthdate: '2005-12-12'}));
// 第一行输出是由 _r.compose 内部的 console.log 打印出来
// 第二行 undefined 是由我们调用的方法打印的 zoltar 方法的返回值为 undefined
// "If you survive, you will be 10"
// undefined

console.log(zoltar({birthdate: 'balloons!'}));
// "Birth date could not be parsed"
// undefined

// IO 函子 避免副作用,与上述 Maybe Either 的不同之处在于该函子不只是容纳值
// 其容纳的是方法而不再是值
//  getFromStorage :: String -> (_ -> String)
var getFromStorage = function(key) {
    return function() {
        return localStorage[key];
    }
}