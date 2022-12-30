// 如果不相同则替换该root 下面的所有子元素（移除原先的Component 添加新的Component）
import ComponentLifeCycle from "./ComponentLifeCycle";
import ComponentLifeCycleSecond from "./ComponentLifeCycleSecond";
import React from "react";

class ParentLifeCycleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { times: 0 };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState((preState) => {
        return { times: preState.times + 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    if (this.state.times % 3 === 0) {
      return <ComponentLifeCycle name="3% = 0" />;
    } else if (this.state.times % 3 === 1) {
      return <ComponentLifeCycle name="3% = 1" />;
    } else if (this.state.times % 3 === 2) {
      return <ComponentLifeCycleSecond name="3% = 2" />;
    } else {
      return null;
    }
  }
}

export default ParentLifeCycleComponent
