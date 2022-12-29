//ErrorBoundary只能捕获其子元素的错误 并不能捕获当前Component产生的错误
//且子元素的Error 只向上传递到理其最近的一个Component 的 componentDidCatch方法
//再向上的component 则无法接收到异常
import React from "react";
import ErrorChildComponent from "./ErrorChildComponent";

class ErrorBoundaryComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ErrorChildComponent />;
  }

  componentDidCatch(error, info) {
    alert(error);
    alert(info.componentStack);
  }
}

export default ErrorBoundaryComponent;
