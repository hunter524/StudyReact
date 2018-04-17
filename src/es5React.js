import React from 'react';

//Es5 中使用create-react-class 实现不需要ES6的Class的特性创建新的组件

var createReactClass = require("create-react-class");

//同时组件的export只能导出指定的组件
export var Greeting = createReactClass({
    render: function () {
        return (<div>
            <a> Component from create react class!</a>
            <a>Name is {this.props.name}</a>
        </div>);
    },

    getDefaultProps: function () {
        return {
            name: "defaultName"
        }
    }
});

//user create-react-class to test mixin feature
//生命周期函数 优先调用mixin的生命周期函数 然后再调用Component自生的生命周期函数
var setInterValMixIn = {
    componentWillMount:function () {
        console.log("componentWillMount from mixin!");
        this.intervals = [];
    },
    setInterval:function () {
        this.intervals.push(setInterval.apply(null,arguments));
    },
    componentWillUnmount:function () {
        console.log("componentWillMount from mixin!");
        this.intervals.forEach(clearInterval)
    }
};

export var MixInComponent = createReactClass({
    mixins:[setInterValMixIn],
    getInitialState:function(){
        return {seconds:0}
    },
    render:function () {
        return(
            <div>
                <a>This Component last Times {this.state.seconds}</a>
            </div>
        );
    },
    componentDidMount:function () {
      this.setInterval(this.tick,1000);
    },
    tick:function () {
        this.setState((preState)=>{
            return {seconds:preState.seconds+1}
        })
    },
    componentWillMount:function () {
        console.log("componentWillMount from class!");
    },
    componentWillUnmount:function () {
        console.log("componentWillMount from class!");
    }
});