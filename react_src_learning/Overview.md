# OverView

## 源码目录结构

### 顶级目录

React 15 版本的目录结构与该结构存在差异。后续 react 16 则采用了 [monorepo](https://danluu.com/monorepo/) 的仓库管理模式。

- packages

各个单独的功能包。如:react目录(Component,Hooks Api 等 core 直接对外暴露的 API),react-dom(ReactDom Api 用于向浏览器渲染的 API),
react-reconciler(React 渲染的协调器),react-native-renderer(RN的渲染器)，scheduler(浏览器渲染的协调器)等

- fixtures

一些小型的测试项目和测试 Demo

- build

构建输出目录

### packages 目录

react 项目子项目的分包目录，\_\_test__ 为每一个子项目的测试目录。

## React 项目三大结构

react 15 之前只有两大结构，react 16 引入第三个结构

### Reconciler

### Renderer

### Scheduler

## 外部API

### react-dom

index.js: 暴露 ReactDom 相关的 API,核心对外暴露的 API 在 ReactDOM.js 文件中。
server.js: 暴露服务端渲染相关的 API

events 目录: 包含对于浏览器事件的抽象

里面包含 Browser Dom 的渲染器逻辑。

## react-native-rendered

则是客户端的 RN 的渲染器逻辑。

## react

该项目对外暴露 Compoent,Element,createRef 等与组件相关的 API.

## react-reconciler

协调器，没有公共 API。

## react-art

svg,canvans 使用绘图相关的 API.

