// 函数式编程指北中的 functor 在该处统一定义
const _r = require("ramda")

//Container Functor
let Container = function (x) {
    this.__value = x;
}

Container.of = function (x) {
    return new Container(x);
};


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

Maybe.prototype.map = function (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

//根据 monad 定义 join 方法,进行解洋葱的操作
Maybe.prototype.join = function() {
    return this.isNothing() ? Maybe.of(null) : this.__value;
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

module.exports = {
    Maybe:Maybe,
    Left:Left,
    Right:Right,
    Container:Container,
    IO,IO,
}