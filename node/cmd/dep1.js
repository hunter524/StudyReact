function add(a,b){
    console.log("from dep1 a+b:"+(a+b));
    return a+b;
}
console.log("cmd loading dep1");

async function asyncGetModule(){
    return {
        add: add
    }
}

function syncGetModule(){
    return {
        add: add
    }
}
//！！！导出依赖操作也需要使用define进行声明 默认的文件是不会导出依赖的
//seajs 中将global.define 定义为Model.def

// define(function (require,exports) {
//     exports.add = add
// });

//三个参数分别对应
// require：定义的依赖的依赖
// exports:需要导出的依赖
// Module：所有module模块的定义
define(function () {
    let argLenth = arguments.length;
    console.log(`arg 0 ${arguments[0]} arg 1 ${arguments[1] } arg 2 ${arguments[2] }`,arguments[1],arguments[2]);
    console.log(`arg length ${argLenth}`);
    return syncGetModule()
});