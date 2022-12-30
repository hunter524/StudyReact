import React from "react";

class ComponentLifeCycleSecond extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(
      `ComponentLifeCycleSecond componentWillMount ${this.props.name}`
    );
  }

  componentDidMount() {
    console.log(
      `ComponentLifeCycleSecond componentDidMount ${this.props.name}`
    );
  }

  componentWillUnmount() {
    console.log(
      `ComponentLifeCycleSecond componentWillUnmount ${this.props.name}`
    );
  }

  render() {
    return (
      <div>
        <a>I am a ComponentLifeCycleSecond named {this.props.name}</a>
      </div>
    );
  }
}

export default ComponentLifeCycleSecond
