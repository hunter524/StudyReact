const _r = require("ramda")
const _l = require("lodash")
// fantasy-land 为 js 代数数据结构的规范,folktale 为实现该规范的实现库
// 类似于 react-stream 与 rxjava 的关系
const _f = require("fantasy-land")
const fs = require("fs")
const folktaleCon = require("folktale/concurrency")

const Functors = require("./comm_functors")
const Maybe = Functors.Maybe
const Left = Functors.Left
const Right = Functors.Right
const Container = Functors.Container
const IO = Functors.IO
const chain = Functors.chain

// functor 则是具有 map 方法的容器
// pointed functor (具有 of 方法的 functor 称为 pointed functor)
var firstPF = Array.of(1,2,3,4);
var ffpMap = firstPF.map(a=>{return ++a})
console.log(ffpMap)

//使用 task 查看 of/task/_Task 不同的构造方法的区别
const Task = require("folktale/concurrency/task")

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
// 第一层 IO 包装的为 map 操作包装的 print 和 readFile 的 compose 操作
// 第二层为 print 包装的 IO 是将读取的内容包装成一个方法的返回值生成了 IO
// 包装如同包洋葱为由内到外 -> 拆包装为由外到内进行

// !!!!! 两层嵌套与 compose 无关,其实是由于 map 和 print 相关
// !!!!!!(第一层为执行 readFile 返回的为 print 的 IO)
// !!!!!!(第二层执行的为 print 返回的 IO )

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
//  safeProp :: Key -> {Key: a} -> Maybe a
var safeProp = _r.curry(function(x, obj) {
    return new Maybe(obj[x]);
});

//  safeHead :: [a] -> Maybe a
var safeHead = safeProp(0);

//  firstAddressStreet :: User -> Maybe (Maybe (Maybe Street) )
// 第一层:safeProp 返回的是一个 Maybe 值
// 第二层:map 取出地一个 Maybe 的值应用 safeHead 生成 Maybe (map 重新放置回了 maybe 同时 safeHead 也是 maybe
// 第二层map 时已经套了两层,一层是map 的 maybe 一层是safeHead 的 Maybe (Maybe(Maybe(head)))
// 第三层 street 两层map 加上 safeProp('street') 则三层 Maybe
var firstAddressStreet = _r.compose(
    _r.map/*取出的是 map 的 Maybe 得到safeHead 的 Maybe */(_r.map/*取出了 safeHead 的 Maybe head 值交由 safeProp street*/(safeProp('street'))), _r.map(safeHead), safeProp('addresses')
);
//!!!!!!!!! 调用结束之后又两层 map 加 safeProp 三层给包装回去了(因此需要三次 .__value 才可以取出最终的值)!!!!!!

var firstMaybeMaybeMaybe =  firstAddressStreet(
    {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
);
console.log(`===============Three MayBe==========================
one:${firstMaybeMaybeMaybe.__value.constructor}
tow:${firstMaybeMaybeMaybe.__value.__value.constructor}
three:${firstMaybeMaybeMaybe.__value.__value.__value.constructor}
`)
console.log(`three maybe head: ${JSON.stringify(firstMaybeMaybeMaybe.__value.__value.__value)}`)
// Maybe(Maybe(Maybe({name: 'Mulburry', number: 8402})))

// functor 多层嵌套的产生原因是由于 _r.compose 的组合函数的要求生成的
// 如果不用组合的函数式编程方式进行函数调用则不会产生多成 Maybe 嵌套的问题

// var onlyOneMaybe = safeProp('addresses')({addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}).map(safeHead);
// console.log(`one maybe head: ${JSON.stringify(onlyOneMaybe.__value)}`)

function ThisFunc(){
    console.log(`ThisFunc ${this}`)
}

//直接调用 this 为 global
ThisFunc()

// new 过之后 this 就是 object
new ThisFunc()


// 自己 Maybe 实现 join 方法,在 folktale 则不存在
// 在 folktale 中将 map 之后紧跟着 join 的行为叫做 chain

//  join :: Monad m => m (m a) -> m a
var join = function(mma){ return mma.join(); }

//  firstAddressStreet :: User -> Maybe Street
// join, _r.map(safeHead) 取出了 _r.map 生成的 Maybe 向下进行传递 (该处的 Maybe 则是由 safeHead 生成的)
// join, _r.map(safeProp('street')) 同样取出了 _r.map 生成的 Maybe 向下传递 safeProp('street') 生成的 Maybe

// map/join 版本
var firstAddressStreet = _r.compose(
    join, _r.map(safeProp('street')), join, _r.map(safeHead), safeProp('addresses')
);

firstMaybeMaybeMaybe =firstAddressStreet(
    {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
);
console.log(`Join One Maybe First: ${JSON.stringify(firstMaybeMaybeMaybe.__value)}`)
// Maybe({name: 'Mulburry', number: 8402})

// 使用 chain <=> flatMap <=> 先map 再 join <=> 先 map 再 flat 摊平

// chain 版本 该处的 chain 与 ramda#chain 的定义不同

//  chain :: Monad m => (a -> m b) -> m a -> m b


var firstAddressStreet = _r.compose(
    chain(safeProp('street')), chain(safeHead), safeProp('addresses')
);

firstMaybeMaybeMaybe = firstAddressStreet(
    {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
);
console.log(`Chain One Maybe First: ${JSON.stringify(firstMaybeMaybeMaybe.__value)}`)


// monad 结合律的定律
// compose(join, map(join)) == compose(join, join)
//   map(join) 摊平的是内层的 M (M a)
//             map(join)
// M(M(M a))-------------------> M(M a)
//      |                          |
//      |                          |
//join  |                  join    |
//      |                          |
//      v         join             v
//    M(M a)--------------------> M a
// join 是不停的 从外层向内层对 M(M(M a)) 进行摊平


// Practice
// 1

// 给定一个 user，使用 safeProp 和 map/join 或 chain 安全地获取 sreet 的 name

var safeProp = _r.curry(function (x, o) { return Maybe.of(o[x]); });
var user = {
    id: 2,
    name: "albert",
    address: {
        street: {
            number: 22,
            name: 'Walnut St'
        }
    }
};

var ex1 = _r.compose(chain(safeProp('name')),chain(safeProp('street')),safeProp("address"))
console.log(`ex1 streetName ${ex1(user).__value}`)

//  2
// ==========
// 使用 getFile 获取文件名并删除目录，所以返回值仅仅是文件，然后以纯的方式打印文件
var __filename = "/home/hunter/WebstormProjects/StudyReact/tmp.txt"
var getFile = function() {
    return new IO(function(){ return __filename; });
}

var pureLog = function(x) {
    return new IO(function(){
        console.log(x);
        return 'logged ' + x;
    });
}

var ex2 = _r.compose(chain(pureLog),_r.map(function (filename) {
    fs.rmSync(filename)
    return filename
}),getFile);
// 为什么 ex2() 返回的是一个 function?
// 调用 ex2()() 返回的才是 IO(log) 的函数?
// console.log(`ex2 IO ${ex2()}`)
// console.log(`ex2 IO ${ex2()().__value()}`)


// 练习 3
// ==========
// 使用 getPost() 然后以 post 的 id 调用 getComments()
// var getPost = function(i) {
//     return folktaleCon.task.task( resolver =>{
//         resolver({ id: i, title: 'Love them tasks' });
//     });
// }
//
// var getComments = function(i) {
//     return folktaleCon.task.task( resolver=>{
//         resolver([
//             {post_id: i, body: "This book should be illegal"},
//             {post_id: i, body: "Monads are like smelly shallots"}
//         ]);
//     });
// }
//
//
// var ex3 = _r.compose(_r.map(function (task) {
//     return task.chain(getComments)
// }), getPost);
// console.log(`ex3 ${ex3("Id 3").run().listen(
//     {
//         onCancelled: () => {
//             console.log('Ex3 was cancelled')
//         },
//         onRejected : (error) => {
//             console.log('Ex3 went wrong')
//         },
//         onResolved : (value) => {
//             console.log(`Ex3 value is ${value}`)
//         }
//     }
// )}`)