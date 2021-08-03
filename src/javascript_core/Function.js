function simpleFunction() {
    console.log(Array.from(arguments).toString())
    //arguments 所属的方法
    console.log(arguments.callee)

    //调用该方法的调用者(调用该方法的方法名称)
    console.log(arguments.callee.caller)

    //同理返回当前方法的调用者(调用该方法的方法名称)
    console.log(simpleFunction.caller)

    //使用 caller.call() 可以调用调用他的方法,从而形成了一个死循环
    //同理使用 arguments.callee.call() 也可以调用自己
    // console.log(simpleFunction.caller.call())


    //方法参数的迭代器
    let iterableIterator = arguments[Symbol.iterator]();
    console.log(iterableIterator.next())
    console.log(iterableIterator.next())
    console.log(iterableIterator.next())
    console.log(iterableIterator.next())
}

function simpleParentFunction1() {
    simpleFunction("a", "b", "c")
}

function simpleParentFunction2() {
    simpleFunction("a", "b", "c")

    //通过不停的向上调用 caller 可以查询方法的调用栈,从而追踪方法的调用过程
    console.log(simpleParentFunction2.caller)
    console.log(simpleParentFunction2.caller.caller)

}

simpleParentFunction1()
simpleParentFunction2()

function functionLength1(a) {
}

function functionLength2(a, b) {

}

//Function.length 代码方法声明的参数的个数
//arguments.length 代表方法的实际的参数的个数
console.log("functionLength1", functionLength1.length, "functionLength2", functionLength2.length)
functionLength1(1)

// Rest Param
// 在 arrow function 中不存在 arguments 参数,但是可以使用 Rest Param 获取参数
// arrow function 如果使用 arguments 则是获取到的最近的 Context 方法的相关的参数
// rest param 参数是 Array 参数 /arguments 只是 Array Like
function restParameterFunc(a, b, c, ...d) {
    console.log("normal param: a->", a, " b-> ", b, " c-> ", c)
    console.log("rest param is Array:", Array.isArray(d))
    console.log("rest param length:", d.length, "0:", d[0], "1:", d[1])
}

restParameterFunc(1, 2, 3, 4, 5, 6, 7)

//es 2015 添加了默认参数,避免对可能无法传递的参数的 typeof b !== "undefined" ? b:1
//只有 undefined 作为值传递给方法时才会启用默认参数/而不是 falsy 值,如:' ',0,false,null,NAN
function es2015DefaultParam(a, b = 5) {
    return a * b
}

console.log(es2015DefaultParam(5))

//后面的命名参数可以使用前面的参数
function greet(name, greeting, message = greeting + ' ' + name) {
    return [name, greeting, message]
}

console.log(greet('David', 'Hi'))                  // ["David", "Hi", "Hi David"]
console.log(greet('David', 'Hi', 'Happy Birthday!')) // ["David", "Hi", "Happy Birthday!"]

function go() {
    return ':P'
}

function withDefaults(a, b = 5, c = b, d = go(), e = this,
                      f = arguments, g = this.value) {
    return [a, b, c, d, e, f, g]
}

function withoutDefaults(a, b, c, d, e, f, g) {
    console.log("withoutDefaults:",arguments.length)
    switch (arguments.length) {
        case 0:
            a;
            // break; // 不使用 break 则下面的所有 case 均会走,导致与default 方法结果相同
        case 1:
            b = 5;
        case 2:
            c = b;
        case 3:
            d = go();
        case 4:
            e = this;
        case 5:
            f = arguments;
        case 6:
            g = this.value;
        default:
    }
    return [a, b, c, d, e, f, g];
}

console.log(withDefaults.call({value: '=^_^='}));
// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

console.log(withoutDefaults.call({value: '=^_^='}));
// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]


function withOutDefaultParamUnSafe(a, b) {
    return a * b
}

console.log(withOutDefaultParamUnSafe(5))

function withOutDefaultParamSafe(a, b) {
    b = typeof b !== "undefined" ? b : 5
    return a * b
}

console.log(withOutDefaultParamSafe(5))


//通过获取 async 方法对象的构造函数,获取构造该对象的构造方法
let AsyncFunction = Object.getPrototypeOf(async function () {
}).constructor
console.log(typeof AsyncFunction)


//  same as "slice" in the previous example
const unboundSlice = Array.prototype.slice;
const slice = Function.prototype.apply.bind(unboundSlice);

// ...

let boundSliceArray = slice([1,2,3,4]);
console.log(boundSliceArray)

function FunctionName() {

}
//bind 的 方法打印名称是 bound FunctionName (用于标记这个方法是 bound 结束之后的方法)
console.log(FunctionName.name)
console.log(FunctionName.bind({}).name)

//引用 Function 对象自己只能使用 name 引用, this 指向的 function 绑定的环境 this.
function functionThisIsNotFunction() {
    console.log("function this ====>",this)
    console.log(functionThisIsNotFunction.toString())
}

functionThisIsNotFunction()

// GeneratorFunction
function* generatorFunction() {
    yield 1;
    yield 2;
    yield  3;
}

//generatorFunction 执行完毕之后返回的是一个 Iterator 的方法
let gfun = generatorFunction();
console.log("gfun type:",typeof gfun)

console.log("gfun next:",gfun.next())
console.log("gfun next:",gfun.next())
console.log("gfun next:",gfun.next())

//getter/setter function in Object

//getter/setter 将一个属性与一个方法绑定
let getterObj = {
    get time(){
       return Date.now()
    }
}
console.log("getter Obj time getter:",getterObj.time)
let setterObj = {
    otherTime:"",
    set time(time){
        return this.otherTime = time
    }
}
setterObj.time = Date.now();
console.log("setterObj other time:",setterObj.otherTime)
