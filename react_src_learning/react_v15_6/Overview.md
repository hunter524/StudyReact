# Overview

## 外部API

### react(core 模块，对外暴露的核心 API)

组件复用机制: **如果相同的层级的 ReactElement 组件的 type 和 key 相同则采用复用实例的方式进行更新操作，否则，则执行先卸载原先组件，再挂载新的组件**

./react/src/isomorphic/React.js

react 的核心 API.eg:React.Component,React.createElement.

(User)Component 表示的使用频次最多的组件概念(通常用户继承该类编写自己的组件，需要与 React 内部源码使用的 ReactDOMComponent 和 ReactCompositeComponent 进行区分)。

可以直接在 Component 类上声明 defaultProps、propTypes 分别用于标记用户组件的默认属性和属性对应的类型。**声明在类上，不是声明在实例的属性上**

*getChildContext* 定义在用户组件实例上的方法，用于构造其子组件时，传递给子组件的 Context.*Context 的使用在后续的 React版本中存在更改*

./react/src/isomorphic/classic/element/ReactElement.js

表示组件内部的元素概念，元素的类型既可以是 Host 相关的类型（div,RN 的宿主视图），也可以是组件类型(如果是组件类型，则通常需要递归继续向下解析，直到完全解析成为 Host 类型,形成 Host类型视图树)。

(User)Component#render 返回的即为 ReactElement（其中 type 只表示最外层的组件的类型，外层组件内部的子(组件)元素则通过 props.children 存在 ReactElement 中，并且传递给 render 返回的最外层的 (User)Component 组件），(User)Componet根据自己的需求，在 render 方法中决定是否返回传递给其的 Children 元素列表。

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

- ReactCompositeComponent 内部的 ReactElemet#type 构建的实例的 （User）Component#render 返回的组件可能是 Host 组件也可能是 Composite 组件。均需要向下调用 mountComponent 完成组件的递归向下加载，最终得到最终被用于渲染的 Host 树结构。如果是 Host 组件，则要构建 Host 组件树，并且向下调用得到其他 Composite 组件的 (User)Component#render 的组件结构直到得到全部 Host 组件树为止。

- ReactDom#render 直接传入 ReactElement 构建 ReactDomComponent/ReactCompositeComponent.作为根 ReactElement ,被包装进入 TopLevelWrapper 系统定义的 （User）Component 组件，创建一个新的 ReactElement 然后使用该 Element 实例化获得 ReactCompositeComponent

### react-dom (rendered 模块，用于向 DOM 树进行渲染)

对外分别暴露向浏览器渲染的 API 和 SSR 直接返回渲染的 Dom 字符串的 API

- ReactDom(client 端渲染器)

./react/src/renderers/dom/ReactDOM.js 向浏览器的 Container(DOM 节点) 渲染 Component（组件树，视图组件）

- ReactDomServer(SSR Server Side Rendered 渲染器)

./react/src/renderers/dom/ReactDOMServer.js SSR 使用，直接返回渲染完成 html 文本

- ReactNative (RN 渲染器,面向客户端原生的渲染器)

/home/hunter/WebstormProjects/react/src/renderers/native/ReactNative.js 中的 ReactNative#render 向客户端组件进行渲染。

- ReactTestRenderer (面向功能测试的渲染器)

如果是测试 React 的渲染器是否符合预期，渲染成为 json 则使用:

/home/hunter/WebstormProjects/react/src/renderers/testing/ReactTestRenderer.js 的 ReactTestRenderer#create 进行渲染成为 JSON 数据结构。

### reconciler

为内部 API 没有对外暴露方法调用。

相关源码位于 ./src/renderers/shared/stack/reconciler 目录下。

### react-art

react 提供的声明式的 svg,canvans 绘图工具库。*在 instantiateReactComponent.js 构建内置 Component 组件时进行了特殊处理*

## 内部API

### ./src/shared/utils

   被所有目录共享的一些工具组件的源码在该处放置

- PooledClass.js

  享元模式 的对象池。由于 JS 万物皆对象。因此该对象池是添加构造函数上的。对象池即为普通数组(数组当栈，使用 pop,push 缓冲和提取对象)，池中存储的对象即为该构造函数创建的对象。

  *使用该对象池的对象必须要具有 destructor 解构方法，用于在释放对象时进行解构操作*

  *向构造函数添加对象池时也可以添加构造方法，该处称之为 Poller方法,用于构造该对象初始化该对象时调用，内置了 1，2，3，4 个参数的*

  被池化的构造函数会被添加 instancePool,poolSize,getPooled,realease 等方法用于存储，获取，释放对象。默认的对象池容量为 10

### ReactElementSymbol.js

   在 ReactElement 这个普通的对象上添加的 $$typeof 属性的常量值。如果 JS 引擎支持 Symbol 则使用 'react.element' 的字符串值作为 Symbol 的 key 作为常量值。如果不支持则使用魔数 0xeac7 作为标记。

### ./src/renderers/shared/stack/reconciler

   协调器相关的源码被组织在该目录下

- ReactUpdates.js

   主要对外暴露的方法,用于协调和调度组件的更新操作。主要被 ReactDom,ReactMount,ReactART 使用。eg:ReactMount#_renderNewRootComponent 的操作，并不是直接被调用者调用执行，而是将该操作需要执行的 ReactMount#batchedMountComponentIntoNode 方法交由调度器进行协调分发和执行。何时执行，怎么执行，按照什么顺序执行均是由ReactUpdates 内部的事件调度器负责控制。

- ReactUpdateQueue.js/ReactNoopUpdateQueue.js

### .src/renderers/shared/utils

   只被协调器和渲染器使用的工具组件的源码被组织在该处。

- Transaction.js
  
  装饰(wrapper)一次更新的方法调用,形成一种事务机制，提供 initialize 更新前的回调机制，try catch 包裹待调用的方法，保证 perform 调用的方法是否抛出异常，均可以完成调用，并且调用 close 方法。形成 initialize -> perform -> close 的事务调用机制。

### ReactElement

(User)Component#render 返回的对象,JSX 在代码层面的表示。

*TODO:// render 中的条件渲染是在何时处理的？在编译前就已经处理好了？*

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

type:表示当前JSX 组件的类型，div 等Host组件，App 等用户定义组件。type 如果是 (User) Component 则是用户声明和定义的构造函数和类。
key:内置属性，用于复用
ref:内置属性，用于搭配 React#createRef 使用，获取其内部子组件的引用。
props:用户定义在该组件上的属性。
props.children:表示当前 ReactElement 所表示的子组件

*对于用户定义的组件其 children 组件不一定会被全部(部分)渲染出来，但是对于 Host 组件其 children 组件通常会被添加到 DOM 的 Node 节点，从而被渲染出来。*
上述的论述对于理解下面的 ReactDOMComponent

_owner: 表示当前 ReactElement 是被谁（User）Component 的render 创造出来(TODO://_owner 在什么地方被赋值的？)

私有属性:

($$typeof): REACT_ELEMENT_TYPE 标记当前对象是一个 ReactElement对象,而不是其他普通对象

Type(User)Component)#defaultProps: 用户对于当前组件定义的属性的默认值
Type(User)Component)#propTypes: 表示 props 对应的字段的数据的类型。使用 PropTypes 的类型库作为类型表达方式。

### ReactDOMComponent/ReactCompositeComponent

ReactDOMComponent/ReactCompositeComponent 均持有 ReactElement

ReactDOMComponent/ReactCompositeComponent 的核心均是围绕其持有的 ReactElement 作为核心展开。

通过 ReactElement#type 构建 (User) Component 实例并且持有实例

通过 ReactDOMComponent#mountComponent,ReactCompositeComponent#mountComponent 向下递归组件实例，最终得到待渲染的 markUp（Dom）标记，渲染加载到 Dom 树上。

在 mountComponent 加载当前组件的过程中，也会调用(performInitialMount),从而调用当前 (User)Component#render 得到下层组件的 ReactElement 并且构建 ReactDOMComponent/ReactCompositeComponent

然后递归向下调用 mountComponent 直到返回 markup(Dom) 标记结束为止。（结束递归的标志是直到叶子节点返回的均为 ReactDOMComponent 为止）

ReactMount.js 中 TopLevelWrapper（实际为系统定义的 （User）Component 类型） 类，则是为了保证最外层 ReactDom#render 直接传递 ReactElement 和 （User）Component 通过 render 得到 ReactElement 的统一。
(ReactDom#render 第一次渲染的为 ReactElement#type 为 TopLevelWrapper 类型，其 render 返回的 Element 为 ReactDom#render 传入的用户类型的 Element。)

(TopLevelWrapper,(User)Component 通过 ReactInstanceMap 获得的 （User）Component#_reactInternalInstance ，即通过 ReactElement#type 为 TopLevelWrapper,(User)Component 的 ReactElement 创建的)

每次解析组件的 render 出来的元素(ReactElement)后，即通过该 ReactElement 创建下一层的 ReactDomComponent,ReactCompositeComponent,并且通过 ReactElement#type 构建下一层的(User)Component 实例，并且调用相应的生命周期方法。

ReactDOMComponent/ReactCompositeComponent 最终需要解析为 ReactDOMComponent 然后解析为 Document#Element 再挂载到 Dom 树上。

通用内部属性：

- _currentElement：当前 (Inner)Component 的 ReactElement实例
- _rootNodeId
- _compositeType:枚举常量，标记当前的 (User) Component 类型(取名可以理解为 ReactCompositeComponent 的内置 (User)Component 类型，也可以理解为 ReactCompositeComponent 的具体细分类型)

```js
var CompositeTypes = {
  ImpureClass: 0,//React.Component 普通复杂 Component (使用最多)
  PureClass: 1, //React.PureComponent 单纯组件，State，Props 只做浅比较，对于性能具有较大的提升
  StatelessFunctional: 2,// 函数式组件
};
```

- _instance
  
  表示通过 ReactElement#type 构建的 （User）Component 类型的实例，在 ReactCompositeComponent 中的存根。

- _hostParent:当前 (Inner)Component 的父组件,也为 （Inner)Component 类型.通常为 null 值。

- _hostContainerInfo :为 ReactDOMContainerInfo 类型，同时持有 TopLevelWrapper 和 Node 节点类型.(*无论哪一层的 （Inner）Component均持有的是 ReactDom#render 所封装和提供的 TopLevelWrapper 和 Node根节点容器*)

- _renderedNodeType

  标记当前 (Inner)Component 持有的 (User) Commpont#render 返回的 ReactElement 的节点类型。

```js
var ReactNodeTypes = {
  HOST: 0,
  COMPOSITE: 1,
  EMPTY: 2,
}
```

分为 Host，Composite，Empty 三种类型。

- _renderedComponent
  
  当前(Inner)Component 持有的 ReactElement#type 的 (User) Commpont#render 返回的 ReactElement 构建的 （Inner)Component

#### ReactHostComponent/ReactDOMComponent

ReactDOMComponent.prototype 会被 Mixin 两个类：ReactDOMComponent.Mixin，ReactMultiChild.Mixin 用于扩展 ReactDOMComponent 的能力。

element 类型如果是 Host 类型则会被包装成为 ReactDOMComponent

- _tag: 当前Host 组件的 tag 标记类型，如 div,p 等 Dom 元素
- _hostNode:当前的 ReactDomComponent(如果是渲染的根组件)，所依赖的 Dom#Element 容器。(组合类型组件不能直接挂载到 DOM 树上，因此没有该属性标记)
- _renderedChildren: 需要渲染的子组件 (Inner)Component

ReactDomComponet 递归渲染的子组件是将子组件返回的 markup(html标签)，添加到当前 Dom 根节点的子元素。

this._createInitialChildren(根据 props.children 递归向 mount 子元素) -> this.mountChildren

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

### ReactDom

#### ReactMount

- instantiateReactComponent.js
  
  - ReactCompositeComponent
  - ReactEmptyComponent
  - ReactHostComponent

- TopLevelWrapper

  用于包装 ReactDom#render 传递的渲染在顶层的 ReactElement. TopLevelWrapper 在本质上是一种包装用户的 ReactElement 的一种顶层的特殊的 ReactElement.

## 源码文件及职责

### React.js

- Children
  
  - map

    递归对于对象执行 map 操作。

  - forEach

    递归对于对象执行 forEach 操作。

  - count

    递归对于 children 进行计数操作

  - toArray

    递归对于 children 向数组进行放入和摊平操作。

  - only

    判断 children 是否是一个 ReacElement 而不是一个 Element 数组。
  
对于 ./src/isomorphic/children/ReactChildren.js 中的方法的导出，便于对于 ReactElement 中 props.children 属性的操作. map,forEach,cout,toArray 均执行 flat 摊平操作，即如果 children 的元素是 array 则继续向下进行递归操作。

- Component
  
  ReactBaseClasses React(User)Componet 相关 Api 的对外导出。React 使用者通常是继承该类编写 Class Component.其在原型上提供 setState,isReactComponent 等方法该使用者进行使用。

  ./src/isomorphic/modern/class/ReactBaseClasses.js 对外导出的类

  - isReactComoponent

    判断组件是否是 (User) Component 组件

  - setState

    用户更新组件状态，从而触发组件更新

  - forceUpdate

    强制更新组件，无视组件状态的更新

- PureComponet
  
  单纯组件，只对 Props 和 State 进行浅层比较.(即 Props,State 对象不相等时执行渲染，不会比较对象内部的值)***对象浅比较的判断逻辑位于:./node_modules/fbjs/lib/shallowEqual.js 中***

  因此在渲染性能上有很大的提升，要求用户自己需要直到 Props,State 内部的深层次不同，进行手动调用 forceUpdate 进行渲染。

  ./src/isomorphic/modern/class/ReactBaseClasses.js 对外导出的类

- createElement
  
  ./src/isomorphic/classic/element/ReactElement.js 对外导出的方法

  通过 type,config,children 创建一个 ReactElement 对象。

- cloneElement

  通过 element,config,children 复制一个新的 Element。

  config 中传递的属性会覆盖 element 中原有的旧属性。如果 config 中有 属性名称，但是值为空则 使用 Component#defaultProps 存在的属性进行覆盖。

  ./src/isomorphic/classic/element/ReactElement.js 对外导出的方法

- isValidElement

  ./src/isomorphic/classic/element/ReactElement.js 对外导出的方法

- PropTypes
  
  用于做类型校验。*在 React 已经标记为 deprecated 将在 React 16 中移除该属性。*

  推荐使用者后续自行导入 prop-types 最新组件使用。

  ./src/isomorphic/classic/types/ReactPropTypes.js 对外导出的方法

- createClass

  暴露给外部，通过 Spec 对象，创建一个(User)Component。Spec 为一个普通对象，但是其按照 (User)Component 的规格定义了该对象属性，如 render 方法，componentDidUpdate 方法等模板方法。

  是对于内部模块 ./src/isomorphic/classic/class/createClass.js 和 模块 create-react-class 的导出。

- createFactory

  对于 createElement 绑定 type 后返回的方法，并且在该方法上添加 type 属性，用于标记该 ReactElement 工厂方法和什么 type 类型关联。

  ./src/isomorphic/classic/element/ReactElement.js 对外导出的方法

- createMixin

  创建混入，*已经在 react 15.6 中标记为移除，将在 react 16 被移除。*

- DOM

  对于 ./src/addons/ReactDOMFactories.js 中方法的导出，用于创建 HTML tag 类型的 ReactElement的工厂方法。

  *在 react 15.6 中也被标记为 deprecated，将在 react 16 中移除，且建议迁移到 react-dom-factories 包*

- version

  用于标记 当前 React 的版本。

### ReactDom.js

- findDOMNode
- render
- unmountComponentAtNode
- version
- unstable_batchedUpdates
- unstable_renderSubtreeIntoContainer

### PooledClass.js

对象池化技术，提升 JS 中对象复用的执行效率。文件路径：./src/shared/utils/PooledClass.js

### ReactNoopUpdateQueue.js

默认的无行为的 DOM 更新队列。并且对于默认的 enqueueSetState,enqueueForceUpdate 等方法打印 warning 日志，提醒用户该种行为无法更新 Component 视图进入 Dom 视图树。

文件路径： ./src/isomorphic/modern/class/ReactNoopUpdateQueue.js

### ReactCurrentOwner.js

通过 current 持有当前已经构建的即将被进行渲染等操作的 ReactElement 对象.

文件路径：/home/hunter/WebstormProjects/react/src/isomorphic/classic/element/ReactCurrentOwner.js

### waning.js

fbjs 内部提供的工具组件，用于打印 warning 日志使用。

### ReactElementSymbol.js

ReactElement.$$typeof 标记所指向的常量，用于标记该对象是 ReactElement 类型。

内部使用的值为 REACT_ELEMENT_TYPE,如果 js 引擎支持 ES6 Symbol 则使用 key 值为 "react.element" 的 Symbol 作为该变量的值。如果不支持 Symbol 则使用 Magic Number 0xeac7 作为该常量的值。

### ReactElement.js

ReactElement 为该文件模块向外导出的构造函数，但是不建议使用 new 关键字构造该对象，用于创建 ReactElement 对象。

该对象具有 type,key,ref,props,props.children,_owner(标记当前 ReactElement 是由哪个 ReactDomComponent,ReactCompositeComponent 创建的),$$typeof(值为 ReactElementSymbol 内部的标记常量，用于区分和识别当前对象的类型为 ReactElement 对象类型)

创建的 ReactElement 对象是被 freeze 的(如果是测试环境，正式环境不会执行该操作)，无法修改属性值，添加，删除新的属性。

key,ref,__self,__source 为 ReactElement的保留属性，无法被用户使用的属性。

Component 类上定义的 defaultProps,也是在模块中的 createElement 方法中进行处理的(用户传递的属性不存在，则使用该默认属性)

### ReactPropTypes.js

在 React 15 即之前导出为 React.PropTypes 变量

prop-types 组件在 React 中的使用，目前已经已经被标记为 deprecated ,将在 16 版本中移除。

基于 prop-types 添加了是否是 ReactElement 的判断。isValidElement.

用于定义在 Component 类上的 propTypes 类型标记，进行类型检测的方法。

内部的校验方法，return null 表示正常校验通过

除基础类型以外的常用类型:

- arrayof
  
  传递一个类型检测器方法，返回一个该类型的检测方法。

  对象类型的指定字段需要为数组，且数组的每个元素均需要符合类型检测方法的检测。

- element
  
  判断对象的指定属性值是否为 ReactElement 类型。

- instanceOf
  
  传递一个类型如: Array ,返回该类型的检测方法。

- node
  
  判断元素是否为 string,boolean,number,undefined,null,ReactElement. 如果元素是 Array 或者可迭代类型，则判断其容器内部每个元素的类型是否为 string,boolean,number,undefinded,null,ReactElement 类型。这六种类型即被认为是其所述的节点类型，因为其不会在包含子属性。

- objectOf
  
  传递类型检测方法，返回一个判断指定对象的指定属性的值中的每个值是否符合该方法的检测。

- oneOf
  
  传递一个值数组，返回一个判断指定对象的指定属性值是否是数组其中的一个。

- oneOfType
  
  同上，只不过传递的是类型检测方法数组。用于检测指定对象的指定属性值是否为指定类型。

- shape
  
  传递 key:检测方法对象。对对象的指定 key 的值采用指定的方法进行检测。

### createClass.js

在 React.js 中暴露为 createClass 方法，通过 Spec 创建 (User) Compoent 类。

*在 React 15.6 中已经标记为 deprecated 将在 16 中移除该属性。*

在 npm 中暴露的模块名称为 create-react-class

文件路径为：./src/isomorphic/classic/class/createClass.js

其 Spec 规格对象定义的属性名称和含义如下：

- mixins
  
  待 mixIn 组件对象实例 的 对象数组.(mixin 为多个对象组成的数组)

- statics
  
  待 mixIn 组件类上的对象(只能是一个对象及定义在其上的方法)。

- propTypes
  
  props 属性对应的字段的类型信息。

  定义在类上的属性

- contetxTypes
  
  当前 Component 被传入的 context 中对应的字段的类型信息。

  定义在类上的属性

- childContextTypes
  
  定义当前组件设置给其子组件的 context 内部的对应字段的类型信息。

  定义在类上的属性

- getDefaultProps
  
  返回默认属性对象的方法，在组件初始化的时候调用。

  定义在类上的属性方法。

- getInitialState
  
  返回组件初始状态对象的方法。

- getChildContext
  
  返回当前组件传递给子组件的 context 对象。

- render
  
  返回 ReactElement 渲染组件的方法。*因为调用时机和调用频率不定，因此该函数不能有副作用*

- componentWillMount
- componentDidMount
- componentWillReceiveProps
  
  父组件更新传递给子组件的 props,context 时，先调用子组件该方法，告知子组件的 nextProps,nextContext

  在该方法中，用户可以根据 当前 this.props 和 next.props 修改当前组件的状态。

  反之在 componentWillReceiveState 中在无法修改 props 的状态，因为组件自己无法修改自己的 props 属性。

- shouldComponentUpdate

  传递给该方法 nextProps,nextState,nextContext 让子组件判断是否需要更新视图（*即 render 方法是否需要被调用*）

  *无论返回 true/false,组件的 props,state,context 均会被更新成为新值*

- componentWillUpdate
  
  传递给该方法 nextProps,nextState,nextContext,ReactReconcileTransaction，标记该组件将要被更新

- componentDidUpdate
  
  传递给该方法的参数为 prevPops,prevState,prevContext,rootNode(当前组件在 DOM 树上所表示的 DOMElement)

- componentWillUnmount
  
  表示组件将要被卸载，通常与 componentWillMount 配对使用，前者作为组件加载时的资源初始化，后者作为组件卸载时的资源清理操作。

- updateComponent
  
  高级方法，客户端接管通常由 React Renderer（渲染器）和 reconciliation（协调器）执行的操作。 获得的参数为 ReactReconcileTransaction。
