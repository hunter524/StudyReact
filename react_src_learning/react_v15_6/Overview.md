# Overview

## 外部API

### react

./react/src/isomorphic/React.js

react 的核心 API.eg:React.Component,React.createElement.

Component 表示的使用频次最多的组件概念(通常用户继承该类编写自己的组件，需要与 React 内部源码使用的 DomComponent 和 CompositeComponent 进行区分)。

./react/src/isomorphic/classic/element/ReactElement.js

表示组件内部的元素概念，元素的类型既可以是 Host 相关的类型（div,RN 的宿主视图），也可以是组件类型(如果是组件类型，则通常需要递归继续向下解析，直到完全解析成为 Host 类型,形成 Host类型视图树)。

(User)Component#render 返回的即为 ReactElement（只表示最外层的组件的类型，外层组件内部的子元素则通过 props.children 存在 ReactElement 中，并且传递给最外层的组件）。

ReactElemt 其实 JSX 在源码层面的一种表示。eg:

```js
ReactDOM.render(<Component />, container);
```

其中的 Component表示并不是组件，而是 JSX 会被翻译成为 ReactElement 传递。ReactElement#type 字段才表示的是 Component 组件。

```js
ReactDOM.render((
<div>
  <Component>
</div>),container)
```

该处传递给 render 的类型依旧是 ReactElement 类型。**但是其内部 type 的表示即为 div 字符串，表示为 Host 类型，内部表示为 ReactHostComponent/ReactDOMComponent,Host 类型元素需要自己负责子元素的渲染，行为通常是将子元素添加到当前元素内部(当前 Dom 节点的子节点)**

- ReactCompositeComponent 则不需要负责自己的（User）Component 的子元素的渲染（因为传递给其的 children 子组件，其未必会全部(部分)渲染出来，完全依赖于该 ReactCompositeComponent 表示的(User)Component的 render 方法对于传入的 props.children 的处理）

- ReactCompositeComponent 内部的 Component#render 返回的组件可能是 Host 组件也可能是 Composite 组件。均需要向下调用 mount 得到最终被用于渲染的 Host 树结构。如果是 Host 组件，则要构建 Host 组件树，并且向下调用得到其他 Composite 组件的 Component#render 的组件结构直到得到全部 Host 组件树为止。

### react-dom

对外分别暴露向浏览器渲染的 API 和 SSR 直接返回渲染的 Dom 字符串的 API

./react/src/renderers/dom/ReactDOM.js 向浏览器的 Container(DOM 节点) 渲染 Component（组件树，视图组件）

./react/src/renderers/dom/ReactDOMServer.js SSR 使用，直接返回渲染完成 html 文本

## 内部API

### ReactElement

(User)Component#render 返回的对象,JSX 在代码层面的表示。

形如:

```js
(<App/>)

(
<div> 
  <Button/>
  <div/>
</div>
)

```

type:表示当前JSX 组件的类型，div 等Host组件，App 等用户定义组件
props:用户定义在该组件上的属性。
key:内置属性，用于复用
ref:内置属性，用于搭配 React#createRef 使用，获取其内部子组件的引用。
props.children:表示当前 ReactElement 所表示的子组件

*对于用户定义的组件其 children 组件不一定会被全部(部分)渲染出来，但是对于 Host 组件其 children 组件通常会被添加到 DOM 的 Node 节点，从而被渲染出来。*
上述的论述对于理解下面的 ReactDOMCoponent

私有属性:

($$typeof): REACT_ELEMENT_TYPE 标记当前对象是一个 ReactElement对象

Type(UserComponent)#defaultProps: 用户对于当前组件定义的属性的默认值

### ReactDOMComponent/ReactCompositeComponent

ReactDOMComponent/ReactCompositeComponent 持有 ReactElement ,被 React 内部用于标记 (User)Component 及其实例(通过 ReactElement 获得 (User)Component,实例化该 （User）Component,并持有该实例，并且调用 该实例的 render 方法，获得子 ReactElement 并创建 ReactDOMComponent/ReactCompositeComponent 然后递归向下调用，直到获取到整个 Host(DOM) 树结构，添加 Document 的 Container 节点上。

ReactDOMComponent/ReactCompositeComponent 最终需要解析为 ReactDOMComponent 然后解析为 Document#Element 再挂载到 Dom 树上。

通用内部属性：

- _currentElement：当前 (Inner)Component 的 ReactElement实例
- _hostParent:当前 (Inner)Component 的父组件,也为 （Inner)Component 类型
- _hostContainerInfo :为 ReactDOMContainerInfo 类型，同时持有 TopLevelWrapper 和 Node 节点类型.(*无论哪一层的 （Inner）Component均持有的是 ReactDom#render 所封装和提供的 TopLevelWrapper 和 Node根节点容器*)

#### ReactHostComponent/ReactDOMComponent

ReactDOMComponent.prototype 会被 Mixin 两个类：ReactDOMComponent.Mixin，ReactMultiChild.Mixin 用于扩展 ReactDOMComponent 的能力。

element 类型如果是 Host 类型则会被包装成为 ReactDOMComponent

- _tag: 当前Host 组件的 tag 标记类型，如 div,p 等 Dom 元素
- _renderedChildren: 需要渲染的子组件 (Inner)Component

this._createInitialChildren(根据 props.children 递归向 mount 子元素) -> this.mountChildren

#### ReactCompositeComponent
  
element 如果为非 Host 类型则为组合类型。

内部属性:

- _instance：当前 (User)Component 的实例

#### ReactDOMTextComponent

对于 string,number 类型的内部节点均使用该类型进行表示

#### ReactDOMEmptyComponent
  
null,falsy 的空节点的内部的 Component 表示。

### ReactInstanceMap

用于管理 （User）Component 和 （Inner)Component的映射关系。(*（User）Component 为 key,（Inner)Component 为 value*)

### ReactUpdateQueue

内部视图树的更新队列。

### React 平台无关性的剥离

react 核心的 API 和 协调器只负责组件状态的管理和更新调度，是平台无关的(不同平台最终渲染出的元素也是不同的，browser:dom节点，RN:原生视图，SSR:html)。

因此 react,react-dom 相关代码需要调用原生对特定功能的实现，但是又不能耦合特定功能模块。（使用依赖导致，依赖注入解决该问题，由平台决定注入实现）

- ReactDOM.js/ReactDOMServer.js
  
  使用 ReactDefaultInjection(react 认为其默认应该在 Browser Client 环境中使用) 注入

  ReactDOMServer 只是定义了自己的渲染器（该渲染器是将 Component 渲染成为 html 文本）

- ReactNative.js
  
  ReactNativeDefaultInjection 向 react 核心组件注入其原生平台相关的渲染方法。

### DOM 节点事件处理器

- EventPluginHub

## 内部源码结构树

### ReactDom.js

#### ReactMount

- instantiateReactComponent.js
  
  - ReactCompositeComponent
  - ReactEmptyComponent
  - ReactHostComponent