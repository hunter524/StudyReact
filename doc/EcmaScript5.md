# EcmaScript5

## Tips

### 基本语法

- 重复声明变量无效，遗忘写 var 也可以声明变量
`
var a = 1;
var a;
`
重复声明变量依然是a，a引用的值为1

`
var a = 1;
var a = 2;
`
重复声明无效，但是赋值有效



- 变量提升
`
console.log(a);
var a = 1;
console.log(a);
`
undefined
1
变量声明会被提升至代码运行的顶部，变量赋值则正常在运行时才赋值。因为变量已经声明因此使用a不会抛出ReferenceError，只会打印undefined，变量没有定义。
`
console.log(a);
`
不声明变量直接使用a，则会抛出ReferenceError，导致代码中断运行。

- 注释

`
<!---->
//
/\*\*/
/*
* 
* */
-->x=3
`

-->在行首会被当成注释

- 区块{}不构成作用域
`
{
var a = 2;
}
console.log(a)
`
a在区块外任然有效

- 省略 if else if else ,do while ,for(;;),switch case break default break,while,continue,break,continue with label,break with
label，a%2 == 0 ? true : false等操作，该部分控制语句与表达式与其他语言没有什么不同。

### 数据类型

- 数据类型种类

java八种基本数据类型：boolean，byte，char，short，int，float，double，long。
javaScript有以下：六种基本数据类型。

 基础数据类型对象:
 - number
 - boolean
 - string
 特殊值，理解为单例指示对象，哨兵对象：
 - undefined
 - null
 合成类型：
 - object (分为 function array object 三种子类型)
 
- typeof的习惯用法与缺点

`
if(typeof v === "undefined"){
    console.log("v is undefined")
}
`
v is undefined
`
console.log(typeof (typeof v));
`
string



判断v是否已经定义了， typeof v 操作返回的数据类型为string，该返回值可以理解为始终处于:number,boolean,string,undefined,null,object这几个
枚举值之内。

`
typeof null 
typeof {}
typeof []
`
object
object
object

null 对象 数组 使用typeof运算返回的均为object。但是使用 null instanceof Object 返回false，typeof 返回object是由于历史遗留原因。其实null
是一种独立的数据类型。

[] typeof 返回 object，但是其既是Object也是Array，因此可以推测出Array是Object的子类


### null undefined的纠葛

`
undefined == null
undefined === null
`
true
false

null 与 undefined 具有相等性，没有同一性。

- null表示空引用，但是已经定义赋值，false，转换成为数字表示0

- undefined表示已经定义没有赋值，甚至没有定义，赋值为null也认为已经定义。false，转换成为数字表示NAN

0 与 null 不相等，但是Number(null) 则转换成为 0 。

### Boolean转换

表达式需要转换成boolean值的地方:
false 0 NAN null undefined “” ‘’ 会被转换成为false，其余均会转成 true

### 数值表示

- 基础数值表示与精度

数值始终是64位浮点数，分为 1：1bit(符号位 0 + 1 - ) 2-12 11bit(指数部分：2047 2^-1023至2^1024) 13-64 52bit (小数部分)
因此绝对值小于 2^53 的正整数父整数均可以准确表示，大于该绝对值的数字表示则会出现精度的丢失。

正数大于 2^1024 次方则会发生正向溢出 负数小于 2^-1075次方 则会发生负向溢出 产生Infinity (typeof Infinity 为 number)

- -0 +0
大部分场合 +0 与 -0 相等，只有 1/+0 与 1/-0 时两个不相等，一个为 +Infinity 一个为 -Infinity

- NaN/Infinity

NaN/Infinity typeof均为number，NaN === NaN  NaN === NaN 均为 false ，NAN不与任何值同一相等，包括自己。
但是Infinity则与Infinity相等且同一，-Infinity与-Infinity也相等并且同一。

isNaN判断一个值是否是数字

+Infinity 大于一切值，-Infinity小于一切值。 Infinity与NaN比较大小始终返回false。

- parseInt

对字符串的解析规则，可以传递解析进制，自动从头部解析数字，当解析到为非数字部分时停止解析，返回之前的解析结果。对于 0x11 [0111 0o11] 0b111 类的进制
字符串会先被解析成为十进制数字，再对十进制数字按照进制解析规则进行解析。对于特殊数值如 1000000000000000000000.5 会先被转换成为 1e+21 科学计数法
字符串，然后再被解析成为对应的整数等数字，解析结果为1.

- parseFloat

可以解析科学计数法如1e+27,其他解析规则同parseInt。

- isNaN,isFinite

isNaN:非数值，不能转换成为数值的字符串均会返回 true，因此只能利用 NaN !== NaN 这一特性判断 NaN特殊标记量。

isFinite:只对 +-Infinity，NaN,undefined返回false，对于 null以及其他数值均返回true.

### 字符串表示

单引号，双引号均表示字符串(双引号内部使用"需要进行转义，但是可以使用单引号，单引号则相对应)，多行书写需要在行尾添加 \,输出依旧是单行输出。

使用多行注解输出多行字符串

字符串可以当字符数组使用，但是具有只读属性。对字符数组length其中元素的修改均是无效的。

四字节的的UTF-8编码编码的Unicode字符串，由于历史原因会导致长度识别错误，一个四字节编码的字符会被认为是 2 个字符。

btoa base64编码 atob base64解码，只能用于ASCII字符，非ASCII字符则需要使用encodeURIComponent,decodeURIComponent 现仅需URI编码。

### 对象(Object Array Function)

- 普通对象

key均为且只能为字符串，数字也会被转换成为字符串。不符合js标识符号规范的key需要添加‘or"如key以数字开头 1key 123等作为对象的key。
原始值引用为值拷贝，对象值引用为引用赋值(即两个对象指向同一个内存区域块)

 {} 语句与表达式的解析，只有{}统一解析为语句，只有添加({})才解析为表达式返回对象。主要时在eval执行代码时会有区别。
 
Object.keys 查看对象自己的属性名称。自己的不可遍历属性可以通过该方法获得，但是获取不到原型链上定义的属性。

delete: 删除属性，没有该属性也可以正常删除。 delete 删除数组中的元素会留下一个空位。使用Array#splice删除数组中的元素则不会留下空位。使用Array#slice
可以获得数组的子数组元素。

in :可以判断某个属性是否存在于当前对象上，或者原型链上(即可以遍历自己以及原型链上的属性).使用Object#defineProperty 设置的 enumerable 属性为
false 时则该属性不可以用 for in 遍历得到。

Object#hasOwnerProperty: 判断某个属性是否是对象自己的属性。（原型链上的属性不属于对象自己的属性）

delete不可以删除的元素：继承来的元素，非当前对象自己的元素(原型链上的元素)。 使用Object#defineProperty新定义属性时，设置配置属性 configurable
为false则该字段不可以删除。

- Object.defineProperty 属性配置。
 configurable:true 该属性可以通过delete删除，false则不可以删除
 enumerable: false : for in 不可以遍历该属性，true for in 可以遍历该属性。
 writable:
 
- with操作 (省略多次调用obj.xx进行操作)

`
with(obj){
    p1 = "p1";
}
`
必须是当前对象存在的属性，如果当前对象不存在该属性则会导致创建一个当前作用域的全局变量。
但是会导致编译器无法进行优化，需要等到运行时才能判断该变量是全局变量，还是with obj 使用的对象内部的属性变量。

### 函数(Function)

- 函数声明
 - 匿名函数赋值变量(函数表达式声明，即使该函数具有名称，也只可以在函数内部使用，全局无法使用)
   函数表达式(没有函数命名提升--其实命名提升均存在，只是此时该变量并没有被赋值成为函数)
 - 函数命令生成命名函数 (有函数命名提升)
 - 使用 Function 构造函数生成函数。
 
 函数命令声明函数 与函数表达式声明同一个函数的名称同时存在，则函数表达式的优先级始终是最高的，因为其在后面运行赋值，函数命令声明函数会被提升进行操作。
 
 `
 var addFun = new Function("x","y","return x + y;");
 var added = addFun(1,2);
 console.log("addFun added:",added);
 `
- 函数的属性
 function.name (函数名称)
 function.length (函数参数个数)与调用时传入的参数个数无关
 function.toString (函数源码,以及函数内部的注释也会被返回)
 

- 函数作用域
 ES5 只有全局作用域和函数内部作用域 ES6新添加块级作用域
 当函数局部变量与全局变量重名时，局部变量会覆盖全局变量(局部变量优先),且局部变量只能在函数内部声明，在if 等块级作用域内声明的变量也是全局变量。
 函数内部也存在局部的变量提升。
 
 函数本身的作用域与运行时的作用域无关，影响到函数对于外部变量的读取(静态读取外部作用域的变量),函数A调用函数B,函数B无法引用到函数A内部的作用域的变量。
 
 嵌套声明函数，则构成了函数作用域的闭包概念。
 
- 函数参数
 同名参数以同名参数的最后一个参数为准，即使没有传递则为undefined。如果需要获得第一个参数则需要使用函数的arguments对象获取参数。
 - arguments:
 同名参数获取，获取前面被覆盖的同名参数
 arguments运行时被修改重新设置值，同时使用 a,b,c 等获取的参数的值也会被修改。
- 闭包
 封装私有参数，通过调用函数返回对象，封装函数闭包内部的私有属性，只暴露特定的方法(避免了使用new 构造函数生成的对象，外部可以完全访问/修改/添加对象的属性)
 
- IIFE(即时调用函数表达式)

function(){}() X 声明在行首会被解析成为语句，无法被即时调用

(function (){})();
(function (){}());上述两种均可以即时调用








