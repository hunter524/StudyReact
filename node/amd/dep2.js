// 定义dep2模块 该模块依赖JQuery模块
console.log("amd loading dep2");

console.time("startDep2");
define(['jquery'],function ($) {
    console.log("call amd dep2 Factory");
    console.timeEnd("startDep2");
    function bar() {
        $("div#bar")[0].innerText = "Text From Dep2 bar()"
    }
    return {
        bar:bar
    }
});
