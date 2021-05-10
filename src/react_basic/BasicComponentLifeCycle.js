import React from "react";
import {render} from "react-dom";

class BasicComponentLifeCycle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowChild: true
        }
    }
    // getDerivedStateFromError or/and componentDidCatch 只能捕获在 render 时抛出的错误
    // 无法捕获在处理 onClick 等事件时抛出的异常

    static getDerivedStateFromError(error) {
        return {
            isShowChild: false
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(`BasicComponentLifeCycle  componentDidCatch: ${error.toString()} \n ${errorInfo.toString()}`)
    }

    render() {
        return (
            <div>
                <div onClick={this.showChild}>SHOW</div>
                <div onClick={this.hideChild}>HIDE</div>
                {this.state.isShowChild ? <ChildComponent/> : null}
            </div>
        );
    }

    showChild = ()=>{
        this.setState({
            isShowChild:true
        })
    }

    hideChild = ()=>{
        this.setState({
            isShowChild:false
        })
    }
}

class ChildComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("componentWillMount ChildComponent")
    }

    componentDidMount() {
        console.log("componentDidMount ChildComponent")
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate ChildComponent")
        return true
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("componentWillUpdate ChildComponent")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate ChildComponent")
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps ChildComponent")
    }

    componentWillUnmount() {
        console.log("componentWillUnmount ChildComponent")
    }

    componentDidCatch(error, errorInfo) {
        console.log("componentDidCatch ChildComponent")
    }

    render() {
        throw "error"
        return (<div>
            <div onClick={this.errorClick}>ERROR CLICK</div>
        </div>)
    }

    errorClick = () => {
        throw "error";
    }

}

export default BasicComponentLifeCycle
