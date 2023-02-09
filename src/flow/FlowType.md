# FlowType

## Primitive Types

- null -> null,undefined -> void
- value:?string: value 可以为 null or undefined。称为 Maybe
- value?:string: value 只能为 undefined 不能为 null。称为 Optional 只能为 undefined 或者为具体的值
- default parameters 也可以为 Maybe 或者 Optional

## Literal Types

- value:2 -> 参数只能传递 2 这个字面量
- value:2|3|4 -> 参数可以传递 2,3,4 这些字面量

字面量可以是 boolean，number，string，bigints(3n 等以 n 结尾的数字)

## Mixed Type

- | （union) 构成的混合类型和组合类型
- T 构成的泛型类型
- mixed 关键字构成的 （kt:any,JAVA:Object)任意类型
  (需要注意 any 与 mixed 的区别，any允许任意 op 操纵符)

## Empty

- TODO:empty -> all subtype 的语义

## Any Types

any 则是为了避免 flow 的类型检查，而标记的类型。其也表示任意类型，但是同时对于操作符也不再检查

any 参数取任何值，如果不进行 cast 则会造成 any 类型。为了避免 any 类型泄漏，则需要 cast any类型取出和操作的值进行返回。
