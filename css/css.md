# CSS2.1/CSS3

## CSS样式类型

- 行内样式
  
  ```html
  <div style="background-color:blue;"/>
  ```

- 内联样式

  ```html
  <style type="text/css">
    body div{
      background-color:blue;
    }
  </style>
  ```

- 外部样式
  
  ```html
  <link rel="stylesheet" type="text/css" href="demo.css"/>
  ```

## 选择器

### id选择器

\#id

一个 html 文件中 id 是唯一存在的，因此 id 选择器选择的元素也是唯一的。（不需要与其他选择器 和 层次选择器结合使用）

### 元素(标签)类型选择器

div div

通常与层次选择器结合使用

### 类选择器

.class <===> *.class

div.class

div div.class

可以与元素选择器和层次选择器结合使用

### 属性选择器

[attribute="value"] <====> *[attribute="value"]

### 伪类选择器/伪元素选择器/目标伪类选择器

- 动态伪类选择器: a:link a:visited a:hover a:active(点击时的效果) a:focus

- 目标伪类选择器: URL 后面携带 #fragment 指向该节点 id 时才会生效。

```css
a:target{
  background-color:blue;
}
```

- 结构伪类选择器：

E:first-child,E:last-child

E:root(等同于匹配 html 标签)

E F:nth-child(n)(匹配第 n 个元素，且必须要为 F 类型*非F类型也会参加计数*，否则匹配不上),E F:nth-last-child(n)（与前面的相比为倒数元素）

E:nth-of-type(n)(指定 E 类型的第 n 个元素),E:nth-last-of-type(n)(与前面的一个相比为倒数)

E:first-of-type(指定类型的第一个),E:last-of-type(指定类型的倒数第一个)

E:only-child (父元素只包含一个子元素，且为 E 类型)

E:only-of-type(该类型的元素在父元素下面只有一个，则选中该元素。但是该元素可以有其他类型子元素。)

E:empty(表示没有子元素的的元素)

E表示选择的元素本身是父元素的第几个元素（或者指定是该类型的第几个元素-->nth-of-type,通常结合层次选择器使用）

E 可以是元素选择器，类选择器，id 选择器

n 可以为 1，2，3 等整数（从 1 开始），2n+1,-n+5 （通常用于匹配前五个）n+5(匹配第五个及之后的元素) 等公式（n 从 0 开始，得出的值小于等于 0 则不选择任何元素），odd(奇数),even（偶数） 等关键字

多个伪结构选择器可以结合使用如：

```css
.article img:nth-of-type(n+2):nth-last-of-type(n+2){
  float:left
}
```

除了第一张和最后一张图片，其他的 img 均左对齐

:nth-child(1) <===> :first-child
:nth-last-child(1) <===> last-child
:nth-of-type(1) <===> :first-of-type
:nth-last-of-type(1) <===> :last-of-type

UI 元素状态伪类选择器：a:checked a:enabled a:disabled

- 否定伪类选择器

即为选中些元素之后，再排除指定类型的元素。

```css
input:not([type=submit]){

}

### 层次选择器

  层次选择器可以组合上述三种选择器，形成下述的层次关系

- 后代选择器

    ```css
    body div{
      background-color:blue;
    }

    <!-- 只需要 div 处于 div 中即选中（可以不是直接后代，儿子，孙子，曾孙子均可），不需要关注 div 的层级 -->
    div div{
      background-color:blue;
    }

    ```

- 子选择器(儿子选择器)
  
  ```css
  div > div {
    background-color:blue;
  }
  ```

  直接子元素才可以被选中（结合 id,类选择器使用则更加精确）

- 相邻兄弟选择器
  
  先选择兄，再选择弟。弟与兄直接相邻，并且在兄的后面

  ```css
  .active + div{
    background-color:blue;
  }
  ```

  先选择了 .active 元素，如果 .active 的相邻下一个元素为 div 则选中该元素

- 通用兄弟选择器
  
  ```css
  .active ~ div{
    background-color:blue;
  }
  ```

  相比兄弟选择器，只选直接兄弟而言，其可以选择更多的兄弟。

### 选择器优先级

内联样式 (1000)

id (0100)

类,伪类，属性 (0010)

标签,伪元素 (0001)

通配符，子类，兄弟 (0000)

继承样式 (没有权重)

权重相同，声明在后面的覆盖前面的.

!important 注解声明的样式高于其他所有样式