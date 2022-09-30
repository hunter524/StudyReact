# JSTips

- +0/-0 的区别

  1/+0 === Infinity

  1/-0 === -Infinity

  实际上 +0 === -0 ,但是在实际实践中通常为了区分 +0/-0,通常使用 1/+0 1/-0 的两个值进行笔记确定 +/- 0.

- typeof/Object.prototype.toString/instanceOf 的区别
  
  typeof: 返回 object(Array,Regexp...),function,number,boolean,string(Date)

  instanceOf:TODO://内部逻辑待定

  Object.prototype.toString:返回诸如: [object Function] 字符串用于区分 Object 的子类型如 Array,Regexp.

- NaN 的特殊性
  
  NaN !== NaN,且为 falsy 值
  