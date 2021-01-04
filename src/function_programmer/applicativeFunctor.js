const _r = require("ramda")
const Functors = require("./comm_functors")
const Container = Functors.Container
const Maybe = Functors.Maybe
const chain = Functors.chain
const Task = require("folktale").concurrency.task


// 这样是行不通的，因为 2 和 3 都藏在瓶子里。
console.log(`add Container Direct: ${_r.add(Container.of(2), Container.of(3))}`);
//NaN
var container_of_add_2 = _r.map(_r.add, Container.of(2));
// Container(add(2))
// 上述等价于 Container.of(2).map(_r.add) 这个时候 _r.add 传递进入了一个参数,但是还需要另外一个参数才可以相加

//!!!!!!!! container_of_add_2 这个 Container.__value 包装的其实是一个 加 2 的方法
//TODO:/// 至于为什么是打印出来的方法要去查看 _r.map 的实现
console.log(`container_of_add_2 function: ${container_of_add_2.__value}`)

console.log(`container_of_add_2 call: ${container_of_add_2.__value(12)}`)

// TODO:// 前一个 monad 执行结束是指 Container(2) 执行结束之后再执行 Container(3) ?
var twoAdd3 =Container.of(2).chain(function (two) {
    //局部调用得到 2 通过 _r.add curry 绑定参数 2 给 Container(3) map 时进行调用
    return Container.of(3).map(_r.add(two))
})

console.log(`twoAdd3: ${twoAdd3.__value}`)

// 两个 Container 的值相加引出了 ap 函子
// ap 函子是对两个 Functor 中的值取出,应用相应的变化,然后再封装进入 Functor 中的做法

// _r.ap ramda 的 ap 为先向原始数组 *2 生成的元素添加进入数组 再将原始数组 +3 生成的元素填入数组
console.log(`r.ap: ${_r.ap([_r.multiply(2), _r.add(3)], [1,2,3])}`)

// 向 Container 添加 ap 函子和 ramda 的 ap 函子定义不同

// 生成的Container 容器直接包装 add(2) 的方法,然后应用 ap 函子 执行操作
var justAddCont = Container.of(_r.add(2)).ap(Container.of(3));
// Container(5)
console.log(`justAddCont: ${justAddCont.__value}`)

// 先生成包装容器 Container(2) 再执行 map add 操作生成 Container 包装的 add(2)
// all together now
var mapAddCont = Container.of(2).map(_r.add).ap(Container.of(3));
// Container(5)
console.log(`mapAddCont ${mapAddCont.__value}`)


// ap 函子数学定理

// ap 操作为使用 otherContainer.map(this.__value)
// 等式右侧的 otherContainer 为 F.of(x) this.__value 为 f => f(x)
// 因此等式两侧均为 f(x)
// !!!!!!map 一个 f <=> 一个为 f 的函子,ap 一个值为 x 的函子!!!!!!
//F.of(x).map(f) == F.of(f).ap(F.of(x))

// ap 的作用是可以让我们从左到右的模式进行代码的书写

var twoAddThreeMaybe = Maybe.of(_r.add).ap(Maybe.of(2)).ap(Maybe.of(3))
console.log(`twoAddThreeMaybe ${twoAddThreeMaybe.__value}`)

// 使用 folktale.concurrency.Task 应用 apply ap 函子
var  twoAddThreeTask = Task.of(_r.add).apply(Task.of(2)).apply(Task.of(3));
console.log(`twoAddThreeMaybe ${twoAddThreeTask}`)
twoAddThreeTask.run().listen({
    onCancelled: () => {
        console.log('twoAddThreeMaybe was cancelled')
    },
    onRejected : (error) => {
        console.log('twoAddThreeMaybe went wrong')
    },
    onResolved : (value) => {
        console.log(`twoAddThreeMaybe value is ${value}`)
    }
})

// folktale.concurrency.Task.of,apply 可以实现类似 rxjava 中的zip 操作
// 等待两个异步请求都完成之后再执行 transformer 方法
// rxjava 的 zip 与该处的 zip 调用实现方法和策略不同
// rxjava zip 依赖于 CountDownLatch 进行同步计数和阻塞操作
// js 该处的同步操作则依赖于 函数的柯里化(只有函数个数达到了要求的参数个数,该函数才会继续向下执行)
// 参见文章的协调与激励

// applicative functor 的 lift 操作,避免 ap 方法与特定对象相关连

var liftA2 = _r.curry(function (f,functor1,functor2){
    return functor1.map(f).ap(functor2)
})

var liftA3 = _r.curry(function (f,functor1,functor2,functor3){
    functor1.map(f).ap(functor2).ap(functor3)
})

// 使用 liftA2 实现了 ap 函子两个方法
console.log(`liftA2 Add :${liftA2(_r.add)(Maybe.of(2))(Maybe.of(3)).__value}`)

//TODO:// 函数式编程中 applicative functor 中提到的免费开瓶器的概念无法理解

// 定律

// var tofM = _r.compose(Container.of,Maybe.of)
// var tofmLiftA2 = liftA2(_r.concat,tofM("First Element"),tofM("Second Element"))
// console.log(`tofmLiftA2: ${tofmLiftA2}`)

