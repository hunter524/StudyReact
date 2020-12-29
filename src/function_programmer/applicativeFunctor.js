const _r = require("ramda")
const Functors = require("./comm_functors")
const Container = Functors.Container
const chain = Functors.chain


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
// ap 函子是对两个 Functor 中的值进行相加处理

// _r.ap ramda 的 ap 为先向原始数组 *2 生成的元素添加进入数组 再将原始数组 +3 生成的元素填入数组
console.log(`r.ap: ${_r.ap([_r.multiply(2), _r.add(3)], [1,2,3])}`)

// 向 Container 添加 ap 函子和 ramda 的 ap 函子定义不同

