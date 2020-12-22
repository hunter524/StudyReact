// functor 则是具有 map 方法的容器
// pointed functor (具有 of 方法的 functor 称为 pointed functor)
var firstPF = Array.of(1,2,3,4);
var ffpMap = firstPF.map(a=>{return ++a})
console.log(ffpMap)