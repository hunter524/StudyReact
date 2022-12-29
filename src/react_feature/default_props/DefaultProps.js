//React With ES6
import React from "react";

class DefaultProps extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a>Default Props with ES6 Class</a>
        <a>Props name is:{this.props.name}</a>
      </div>
    );
  }
}

//ES6 给组件定义默认属性
DefaultProps.defaultProps = {
  name: "ES6 Default Name!",
};
