// 函数式编程指北中的 functor 在该处统一定义
const _r = require("ramda")

//Container Functor
let Container = function (x) {
    this.__value = x;
}

// pointed Functor 的定义:实现了 of 方法的 Functor
// 功能是实现最小化的上下文
Container.of = function (x) {
    return new Container(x);
};

Container.prototype.map = function (f) {
    return new Container(f(this.__value))
}

Container.prototype.join = function (f) {
    return this.__value
}
// join 去除掉的洋葱皮是 map 包装的外层的洋葱皮 ( 即原始的 Container 的值)
// 保留的是 map 方法返回的洋葱皮
Container.prototype.chain = function (f) {
    return this.map(f).join()
}

// ap 函子是实现了 ap 方法的 pointed Functor
Container.prototype.ap = function (other_container){
    return other_container.map(this.__value)
}




// Maybe Functor
let Maybe = function (x) {
    this.__value = x;
}

Maybe.of = function (x) {
    return new Maybe(x);
}

Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
}

// Maybe 在 map 过程中会触发短路机制(即 Maybe 是 nothing 则 f 方法压根不会执行
Maybe.prototype.map = function (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

//根据 monad 定义 join 方法,进行解洋葱的操作
Maybe.prototype.join = function() {
    return this.isNothing() ? Maybe.of(null) : this.__value;
}

Maybe.prototype.ap = function (other_container){
    return other_container.map(this.__value)
}


// Left Right Functor

let Left = function(x) {
    this.__value = x;
}

Left.of = function(x) {
    return new Left(x);
}

Left.prototype.map = function(f) {
    return this;
}

let Right = function(x) {
    this.__value = x;
}

Right.of = function(x) {
    return new Right(x);
}

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
}

// IO 函子目前只容纳函数,用于隔离副作用
// 具体使用参见 io_in_browser 目录 (IO 的示例依赖于 window document)
let IO = function(f) {
    this.__value = f;
}

IO.of = function(x) {
    return new IO(function() {
        return x;
    });
}
//map 操作的定义则是先应用原先的 IO 函子中定义的函数 再应用传入的函数
// f(this.__value(v)) => f 为map传入的函数,this.__value 为原先 IO 函子定义的函数
IO.prototype.map = function(f) {
    return new IO(_r.compose(f, this.__value));
}

IO.prototype.join = function () {
    return this.__value
}

let chain = _r.curry(function(f, m){
    return m.map(f).join(); // 或者 compose(join, map(f))(m)
});

module.exports = {
    Maybe:Maybe,
    Left:Left,
    Right:Right,
    Container:Container,
    IO:IO,
    chain:chain,
}