//cmd file
//依赖路径等的相关配置
console.time("cmd main");
seajs.config({
    bath:"./",
    charset:'utf-8',
    alias:{
        'dep':'./dep1.js',
        'sub':'./dep2.js'
    }
});

//使用依赖
//依赖的导出定义需要 在dep1.js 或者 dep2.js中
// seajs.use('dep',function (dep) {
//     console.log("seajs use call module:",dep.add(1,2));
// });

seajs.use('sub',function (sub) {
    console.log('seajs use call sub',sub.sub(2,1))
});

console.log("after call seajs use");
console.timeEnd("cmd main");
