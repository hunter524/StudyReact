# CSS2.1/CSS3

## CSS样式类型

- 行内样式
- 内联样式
- 外部样式

## 选择器

### id选择器

### 元素(标签)选择器

### 类选择器

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

权重相同，声明在后面的覆盖前面的