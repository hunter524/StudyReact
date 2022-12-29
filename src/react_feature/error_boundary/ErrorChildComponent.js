//React Component 的 Error Boundaries
import React from "react";

class ErrorChildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  shouldComponentUpdate(nextProps, nextStates) {
    if (nextStates.hasError) {
      throw new TypeError("error boundary!");
    }
  }

  render() {
    if (this.state.hasError) {
      return <a>Some Thing Wrong!</a>;
    } else {
      return (
        <button
          onClick={() => {
            this.setState({ hasError: true });
          }}
        >
          throw error!
        </button>
      );
    }
  }
}

export default ErrorChildComponent;
