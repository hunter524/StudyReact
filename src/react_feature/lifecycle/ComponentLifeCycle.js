import React from 'react';

/**
 * 挂载：
 * constructor -> static getDerivedStateFromProps() ->
 * componentWillMount(UNSAFE_componentWillMount) -> render() -> componentDidMount()
 * 更新
 *
 */
class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`ComponentLifeCycle componentWillMount ${this.props.name}`)
    }

    render() {
        return (<div>
            <a>
                I am a ComponentLifeCycle named {this.props.name}
            </a>
        </div>);
    }

    componentDidMount() {
        console.log(`ComponentLifeCycle componentDidMount ${this.props.name}`)
    }

    //如果Component的Type相同只是属性不同 则先调用该方法，然后调用ComponentWillUpdate方法

    componentWillUnmount() {
        console.log(`ComponentLifeCycle componentWillUnmount ${this.props.name}`)

    }

    componentWillReceiveProps() {
        console.log(`ComponentLifeCycle componentWillReceiveProps ${this.props.name}`)
    }

    componentWillUpdate() {
        console.log(`ComponentLifeCycle componentWillUpdate ${this.props.name}`)
    }

}

ComponentLifeCycle.getDerivedStateFromProps = function () {

}

export default ComponentLifeCycle
