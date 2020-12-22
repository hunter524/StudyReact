require.config({
    paths: {
        "lodash": "lodash.min",
        "ramda": "ramda",
    }
})
require(['lodash','ramda'],function (_l,_r){

    // IO 为容纳函数的容器
    // IO 组合 map 时是将 map 的方法放在函数的最左边(即执行的末端)

    var IO = function(f) {
        this.__value = f;
    }

    IO.of = function(x) {
        return new IO(function() {
            return x;
        });
    }

    IO.prototype.map = function(f) {
        return new IO(_r.compose(f, this.__value));
    }


    //  io_window_ :: IO Window
    var io_window = new IO(function () {
        return window;
    });
    console.log("io_window"+io_window)
    //IO 依旧是个 functor [object:Object] 而不是一个 function 因此无法直接调用
    // console.log("io_window"+io_window())
    // 需要取出最终的值则需要使用 IO.__value() 调用最终组合生成的方法才会获得到该值
    console.log("io_window"+io_window.__value())


    var windowWidth = io_window.map(function (win) {
        return win.innerWidth
    });
// IO(1430)
    console.log("windowWidth"+windowWidth)
    console.log("windowWidth"+windowWidth.__value())

    var locationArr = io_window.map(_r.prop('location')).map(_r.prop('href')).map(_r.split('/'));
// IO(["http:", "", "localhost:8000", "blog", "posts"])
    console.log("locationArr:"+locationArr)
    console.log("locationArr:"+locationArr.__value())

//  $ :: String -> IO [DOM]
    var $ = function (selector) {
        return new IO(function () {
            return document.querySelectorAll(selector);
        });
    }

    var innerHtmlIo = $('#myDiv').map(_r.head).map(function (div) {
        return div.innerHTML;
    });
    console.log("innerHtmlIo"+innerHtmlIo)
    console.log("innerHtmlIo"+innerHtmlIo.__value())
// IO('I am some inner html')

    // 使用 IO 封装副作用,用于获取 url 的指定查询参数
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
    ////// 纯代码库: lib/params.js ///////

//  url :: IO String
    var url = new IO(function() {
        var href = window.location.href;
        return href;
    });

//  toPairs =  String -> [[String]]
//    该处返回的是数组的数组(内部数组的第 0 个元素为 key 地一个元素为 value
    var toPairs = _r.compose(_r.map(_r.split('=')), _r.split('&'));

//  params :: String -> [[String]]
    var params = _r.compose(toPairs, _r.last, _r.split('?'));

//  findParam :: String -> IO Maybe [String]
//    原文的 eq 方法需要替换为 _r.equals 方法
    var findParam = function(key) {
        return _r.map(_r.compose(Maybe.of, _r.filter(_r.compose(_r.equals(key), _r.head)), params), url);
    };

////// 非纯调用代码: main.js ///////

// 调用 __value() 来运行它！
    console.log(findParam("searchTerm").__value());
// Maybe(['searchTerm', 'wafflehouse'])
})

