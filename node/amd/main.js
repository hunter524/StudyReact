require.config({
    paths:{
        jquery:"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min"
    }
});
//配置加载非标注的AMD模块

require.config({
   shim:{
       'noAmdModule':{
           deps:['jquery'],
           exports:'NoAmdModule'
       }
   }
});


//本地加载的dep1 耗时通常在50ms以内
console.time("getDep1");
require(['dep1'],function (dep1) {
    console.log("from main call dep1#add:"+(dep1.add(3,4)));
    console.log("define:",define);
    console.timeEnd("getDep1")
});

//异步加载JQuery模块
// require(["jquery"],function ($) {
//    setTimeout(()=>{
//        console.log("jquery")
//        console.log($("div#bar")[0].innerText=Date.now())
//    },200)
// });

//异步网络加载的JQuery通常耗时在 200ms+
// console.time("getJquery");
// require(['jquery'],function ($, dep1) {
//     console.timeEnd("getJquery");
// });

// console.time("getDep2");
// require(['dep2'],function (dep2) {
//     console.timeEnd("getDep2");
//     dep2.bar()
// });

//自行配置加载非AMD规范化的模块
// console.time("noAmdModule");
// require(['noAmdModule'],function (noAmdModule) {
//     console.timeEnd("noAmdModule");
//     noAmdModule.foo();
//     //检查加载非标准化的模块时 是否污染了全局变量
//     console.log(`global jquery ${$}`)
// });

//无论加载的模块是规范化的AMD模块还是非规范化的AMD模块均会污染全局变量
// setTimeout(()=>{
//     console.log("time out jquery",$)
// },1000);

//noAmdModule中定义的全局变量可以在模块main中获取从而污染全局变量
// setTimeout(()=>{
//     console.log("Global NoAmdModule:",NoAmdModule)
// },1000);

