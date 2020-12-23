const _r = require("ramda")
const _l = require("lodash")

// functor 则是具有 map 方法的容器
// pointed functor (具有 of 方法的 functor 称为 pointed functor)
var firstPF = Array.of(1,2,3,4);
var ffpMap = firstPF.map(a=>{return ++a})
console.log(ffpMap)

//使用 task 查看 of/task/_Task 不同的构造方法的区别
const Task = require("folktale/concurrency/task")
const fs = require("fs")

// 使用 of 包装一个容器进入 Task
var appendTask = Task.of("a").map((v)=>v+"b");
appendTask.run().listen({
    onCancelled: () => { console.log('the task was cancelled') },
    onRejected: (error) => { console.log('something went wrong') },
    onResolved: (value) => { console.log(`The value is ${value}`) }
    }
)

//task 方法等同于 使用 new _Task 构造一个异步任务
var readFirstLineTaskTask = Task.task(function (resolve) {
    fs.readFile("/home/hunter/lintlist.txt","utf-8",(err,data)=>{
        err?resolve.reject(err):resolve.resolve(data.split("\n")[0])
    })
})

readFirstLineTaskTask.run().listen({
        onCancelled: () => { console.log('the task was cancelled') },
        onRejected: (error) => { console.log('something went wrong') },
        onResolved: (value) => { console.log(`The value is ${value}`) }
    }
)

//直接构建 Task 需要使用 _Task 进行 Task 的构建
//通过 JS 所谓的构造函数进行构造 Task
var readFirstLineTaskNew = new Task._Task(function (resolve) {
    fs.readFile("/home/hunter/lintlist.txt","utf-8",(err,data)=>{
        err?resolve.reject(err):resolve.resolve(data.split("\n")[0])
    })
})

readFirstLineTaskNew.run().listen({
        onCancelled: () => { console.log('the task was cancelled') },
        onRejected: (error) => { console.log('something went wrong') },
        onResolved: (value) => { console.log(`The value is ${value}`) }
    }
)

// 该处需要使用 IO 函子实现多层嵌套的函子
var IO = function(f) {
    this.__value = f;
}

IO.of = function(x) {
    return new IO(function() {
        return x;
    });
}
IO.prototype.map = function(f) {
    console.log("IO map f:"+f+
        "\nthis.__value:"+this.__value)
    return new IO(_r.compose(f, this.__value));
}


// Support
// ===========================
// readFile 返回的是一个 IO 包含的 function 用于读取文件
var readFile = function(filename) {
    return new IO(function() {
        return fs.readFileSync(filename, 'utf-8');
    });
};

//  print :: String -> IO String
var print = function(x) {
    console.log("print X1:"+x);
    return new IO(function() {
        console.log("print X2:"+x);
        return x;
    });
}

// Example
// ===========================
//  cat :: IO (IO String)

// 下面的两个 catBean 赋值语句等价
// readFile 返回的是一个 IO(_=>String)
// readFile 的第一层 IO 在执行 print 第一层的 map 时被剥离,取出内部读取文件的函数 组合进入 print 重新包装成 IO
// 第一层 IO 为 map 操作生成的 IO 取出 .__value() 执行完成之后为 print 这一层的 IO 同时第一层执行完毕时已经读取了文件中的内容
// 第二层为 print 包装的 IO 是将读取的内容包装成一个方法的返回值生成了 IO
// 包装如同包洋葱为由内到外 -> 拆包装为由外到内进行

// cat = _r.map(print)(readFile)
var cat = _r.compose(_r.map(print), readFile);

//
var catBean = cat("/home/hunter/WebstormProjects/StudyReact/.flowconfig");
// var catBean = _r.map(print)(readFile("/home/hunter/WebstormProjects/StudyReact/.flowconfig"))

// 读取的一层 IO 包装时已经出发了 readFile 的读取文件执行操作
console.log("======IO First Out==============")
console.log(`IO First:${catBean.__value()}`)

// 读取第二层 IO ( 第二次玻璃 IO 容器时真正的获取到了其中的值
console.log("======IO Second Out==============")
console.log(`IO Second:${catBean.__value().__value()}`)

// 该处 catFirstChar 又被打包了两次 IO (源头是 cat 直接返回了打包两次的 IO ,因此在对里面包含的内容进行 map 操作时也需要 map 两次
var catFirstChar = _r.compose(_r.map(_r.map(_r.head)),cat)
console.log(`catFirstChar: ${catFirstChar("/home/hunter/WebstormProjects/StudyReact/.flowconfig").__value().__value()}`)

// 普通的 Maybe 函子的洋葱包装

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
//  safeProp :: Key -> {Key: a} -> Maybe a
var safeProp = _r.curry(function(x, obj) {
    return new Maybe(obj[x]);
});

//  safeHead :: [a] -> Maybe a
var safeHead = safeProp(0);

//  firstAddressStreet :: User -> Maybe (Maybe (Maybe Street) )
var firstAddressStreet = _r.compose(
    _r.map(_r.map(safeProp('street'))), _r.map(safeHead), safeProp('addresses')
);

var firstMaybeMaybeMaybe =  firstAddressStreet(
    {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
);
console.log(`three maybe head: ${JSON.stringify(firstMaybeMaybeMaybe.__value.__value.__value)}`)
// Maybe(Maybe(Maybe({name: 'Mulburry', number: 8402})))

// functor 多层嵌套的产生原因是由于 _r.compose 的组合函数的要求生成的
// 如果不用组合的函数式编程方式进行函数调用则不会产生多成 Maybe 嵌套的问题

var onlyOneMaybe = safeProp('addresses')({addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}).map(safeHead);
console.log(`one maybe head: ${JSON.stringify(onlyOneMaybe.__value)}`)
