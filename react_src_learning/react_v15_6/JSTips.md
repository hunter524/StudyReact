# JSTips

- +0/-0 的区别

  1/+0 === Infinity

  1/-0 === -Infinity

  实际上 +0 === -0 ,但是在实际实践中通常为了区分 +0/-0,通常使用 1/+0 1/-0 的两个值进行笔记确定 +/- 0.

- typeof/Object.prototype.toString/instanceOf 的区别
  
  typeof: 返回 object(Array,Regexp...),function,number,boolean,string(Date),undefined

  instanceOf:推测与原型链和构造函数有关。TODO://内部逻辑待定

  Object.prototype.toString:返回诸如: [object Function] 字符串用于区分 Object 的子类型如 Array,Regexp.

- xxx.constructor.name
  
  用于得到某个对象的构造函数，取他的名字可以得到该对象是由哪个构造函数创建的（即是什么类型）

- NaN 的特殊性
  
  NaN !== NaN,且为 falsy 值

- falsy 的六个值
  
  false,0,'',null,undefined,NaN.

  所谓的 falsy 即通过 Boolean(值) 得到的对象的值为 false.
  