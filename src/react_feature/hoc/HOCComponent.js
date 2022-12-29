import React from "react";
import LowComponent from "./LowComponent";

//High Order Component （类似于函数式编程中的高阶函数）
//函数式编程中：传入低阶函数 被 高阶函数调用
//React中传入低阶Component被高阶Component进行包装调用
//可以通过修改DisplayName 修改在Chrome React Debug工具中显示的组件名称
//如果不修改DisplayName则默认显示的 返回的class的名称 （即使包装的低阶的组件不同，Chrome中显示的高阶的组件的名称还是相同的）
//copy 低阶组件的静态方法 进入高阶组件中是很有必要的，但是需要明确的知道组件的名称 copy所有组件的静态方法可以使用 “hoist-non-react-statics”module进行
//todo://High Order Component 组件是否便可以解决面向切面编程的问题？
function wrapLowComponent(LowComponent, name) {
  class HOCComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <LowComponent name={name} />;
    }
  }

  HOCComponent.displayName = `HOCWrapped${
    LowComponent.displayName || LowComponent.name || "Component"
  }`;
  return HOCComponent;
}

const HighComponent = wrapLowComponent(LowComponent, "low low low！");
const HighComponentSecond = wrapLowComponent(
  LowComponent,
  "low second ,low second ,low second!"
);

export { HighComponent, HighComponentSecond };
