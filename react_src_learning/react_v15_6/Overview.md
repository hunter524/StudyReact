# Overview

## 外部API

### react

./react/src/isomorphic/React.js

react 的核心 API.eg:React.Component,React.createElement.

Component 表示的使用频次最多的组件概念。

./react/src/isomorphic/classic/element/ReactElement.js

表示组件内部的元素概念，元素的类型既可以是 Host 相关的类型（div,RN 的宿主视图），也可以是组件类型(如果是组件类型，则通常需要递归继续向下解析，直到完全解析成为 Host 类型,形成 Host类型视图树)。

ReactElemt 其实 JSX 在源码层面的一种表示。eg:

```js
ReactDOM.render(<Component />, container);
```

其中的 Component表示并不是组件，而是 JSX 会被翻译成为 ReactElement 传递。ReactElement#type 字段才表示的是 Component 组件。

### react-dom

对外分别暴露向浏览器渲染的 API 和 SSR 直接返回渲染的 Dom 字符串的 API

./react/src/renderers/dom/ReactDOM.js 向浏览器的 Container(DOM 节点) 渲染 Component（组件树，视图组件）

./react/src/renderers/dom/ReactDOMServer.js SSR 使用，直接返回渲染完成 html 文本

## 内部API

### ReactElement 在内部的表示

ReactDOMComponent，ReactCompositeComponent 为了保证 Component 与其 render 返回的渲染节点的关联，用于识别 Component 的渲染树。

- ReactHostComponent/ReactDOMComponent

element 类型如果是 Host 类型则会被包装成为 ReactDOMComponent

- ReactCompositeComponent
  
element 如果为非 Host 类型则为组合类型。

### React 平台无关性的剥离

react 核心的 API 和 协调器只负责组件状态的管理和更新调度，是平台无关的(不同平台最终渲染出的元素也是不同的，browser:dom节点，RN:原生视图，SSR:html)。

因此 react,react-dom 相关代码需要调用原生对特定功能的实现，但是又不能耦合特定功能模块。（使用依赖导致，依赖注入解决该问题，由平台决定注入实现）

- ReactDOM.js/ReactDOMServer.js
  
  使用 ReactDefaultInjection(react 认为其默认应该在 Browser Client 环境中使用) 注入

  ReactDOMServer 只是定义了自己的渲染器（该渲染器是将 Component 渲染成为 html 文本）

- ReactNative.js
  
  ReactNativeDefaultInjection 向 react 核心组件注入其原生平台相关的渲染方法。

## 内部源码结构树

### ReactDom.js

#### ReactMount

- instantiateReactComponent.js
  
  - ReactCompositeComponent
  - ReactEmptyComponent
  - ReactHostComponent