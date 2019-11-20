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

### 数组(Array)

数组是一种特殊类型的对象，数组的长度可以通过设置length进行扩大和缩小，当扩大到大于当前数组长度时，多余的则为空位(空位与undefined不同，undefined在
数组遍历时不会跳过，空位在数组遍历时则会跳过，但是通过索引去获取空位的元素时则会返回undefined)，，当缩小到小于当前大小时，多余的元素会被移除。
数组的大小最大(2^32)-1 ，大于该值或者小于0的key也可以被添加进入数组，但是只是作为普通对象的属性，添加进入数组，因此数组的遍历不推荐使用 for in 进行
遍历，除非该数组为纯数组。数组的遍历推荐使用while index索引，Array#forEach 的方式进行遍历。

delete 可以删除数组中的元素，形成空位，但是数组的长度不会改变。或者使用 [,,,] 构建数组时也会形成空位。遍历时空位会被跳过。但是 undefined 占位的数组
不会被跳过。forEach ,for in,Object.keys 均会跳过空位。数组元素中的 undefined 则依旧会被遍历到，undefined代表数组中存在这个元素，只不过值是
undefined，空位则代表数组中不存在这个元素。

- 类数组对象(Array Like)

具有 length 属性的对象均可以视为类数组元素，但是无法使用push，pop，forEach，slice等数组元素相关的方法。

但是可以使用Array.prototype.xxx.call 将数组相关的方法绑定到类数组对象上进行调用。！！！使用slice可以将类数组元素转换成为数组元素，slice为取子
数组，不传入start end 则将整个类数组元素，转换成为数组。splice为删除子数组元素！！！


### 运算符

- Object#valueof Object#toString 
  当基础类型 string number 与 object 进行加法运算时，先调用 valueof 如果返回为 number，string基础类型则不再调用toString,否则需要再调用
  toString 进行类型转换，再执行运算操作。
  
  *其中Date对象除外,Date对象的toString优先级高于valueOf的优先级*

- 其他语言不常见的运算符


指数运算符：2**3 = 2^3 = 8

- 比较运算的规则
 - 两个都是字符串，则按照字典顺序比较大小
 - 两个都是基础类型，则会转换成为number类型进行比较
 - 如果其中有一个是对象，则需要先将其按照valueOf,toString优先级，转换成为基础类型再进行比较。
 - NaN 不与任何值相等，包括其自身。
 - 复合类型(对象，数组，函数)的 === 为判断是否是指向同一个内存地址的引用，< 与 > 则比较的是值。
 - undefined,null 与自身严格相等(可以认为语言内置的，单例哨兵对象)。undefined，null与其他值相比较均为false。undefined == null 则为 true。
 - 布尔运算符：
 惯用写法： !!x将一个值转换成为boolean
          && 返回第一个为false的值，而不一定是boolean值 使用 "a" && "b" && true 全true之下返回true,"a" && "" && true 返回第一个为false的值:""
          || 返回第一个为true的值，而不一定是boolean值

 -移位运算不同语言表述：或 与 非 异或 左移 右移 补零左移(普通左移也是补零) 补零右移
 js/java:           |  & ~   ^   <<  >>    <<<                  >>>
 kotlin:            or and not xor lsh rsh ulsh ursh
 移位运算符是对 int32 进行的操作，number 为 64bit 浮点数，object 等均会转换成为 32 位整数再进行运算。
 三次异或则不需要借助中间变量即可以完成两个数的互换
 右移(>>):正数补零，负数补1
 补零右移(>>>):正数/负数高位均补 0。
 移位的开关作用
 
 - 其他运算符
 void 运算符返回undefined
 逗号运算符： 返回逗号后面的值 "a","b" 返回 "b"
 普通运算符是左结合，**,?:运算符是右结合
 
 2**3**2 == 2^(3^2) a ? b : c ? d : e ? f : g == a?(b:c?(d:e?(f:g)))
 
### 类型转换

- 强制类型转换使用对应的基础类型构造函数 Number(转换策略较为严格)，Boolean，String。

- parseInt,parseFloat...转换较为宽松(123aaa) 可以转换为 123，Number则只能转换成为NaN。

- Number转换原则：valueOf,toString的优先级，前者高于后者。valueof 返回的如果的是基础类型，则调用Number，如果是对象类型则调用toString 如果返回的是基础类型则调用
Number，返回的如果依旧是对象类型则抛出错误。通常Object#toString,Function#toString返回的为为字符串基础类型，调用Number转换成number为NaN。

- String转换原则：toString的优先级高于valueof。其余同Number的转换原则。

- Boolean转换原则：除 undefined,null,NaN,0,''转换成为false，其余均会转换成为true。

- 自动类型转换： 有字符串的地方均会转换成为字符串，其余地方预期是什么便会转成什么，预期既为数字又为字符串，则数字优先。
  null 转换成数字为 0。
  undefined 转换成为数字为 NaN。
  
### 异常处理

出现异常时，则当前事件循环中的JS语句停止执行(与java线程中的代码的执行逻辑相同)

throw：可以抛出Error，也可以抛出任何类型，包括基础类型(number,string,boolean,null,undefined,object)，对象类型(object array function)
(type of 不能区分 Array 和 Object,但是可以区分 Function)

- Error 自带的属性：
  message:错误提示信息
  name:错误显示的名称
  stack：错误调用堆栈
  
- try catch finally 中均带有 return (同java使用javap查看字节码得出的结论)
  抛出异常被捕获时 catch finally 中均有return语句，以finally中的return结果作为该函数的返回值，catch中的return会被覆盖
  未抛出异常时则使用 finally中的return为返回值。
  (行为同java)
  try内部return某个变量，finally内再对变量执行操作，返回的是执行操作前的变量的值
  
- Error类型，内置为六大类型：

  SyntaxError:语法错误
  ReferenceError:引用未定义的变量
  URIError:encodeURI,decodeURI等编码解码操作，传入的参数不符合规范
  TypeError:使用 new调用非构造函数，将对象的属性当做方法调用
  RangeError: 数组长度为不合法的值(负值，大于2^32-1),调用Number时超出Number的表示范围
  EvalError：eval函数执行异常。目前该Error不会抛出
  
  
  
## 常用函数及区别

- JSON.stringify:object转换成为Json 字符串
  JSON.parse: 解析Json字符串为对象
  
- escape:
  unescape:
  
- encodeURI:
  decodeURI:
  encodeURIComponent
  decodeURIComponent
  
- btoa: base64编码，只能编码ASCII字符集，其他字符集需要先执行encodeURI转换成为合法的ASCII字符集才能进行编码
  atob: base64解码
  b-> binary a-> ASCII(64个可读ASCII字符集)
  base64:即为转换二进制为64个ASCII可读字符
  debase64:即为转换64个ASCII为原始的二进制数据