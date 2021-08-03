import React from "react";

// 指定默认的值,当视图层级没有 Context.Provider 则提供该默认值
// 如果提供了 Provider 则必须提供 value 值,value 中如果缺少字段则默认为 null
// 如果有了 Context.Provider 即使 value 值提供的是 undefined 也不会使创建时提供的默认值生效
const ThemeContext = React.createContext({
    bg: "white",
    fg: "black",
    changeUpper:function () {
        console.log("changeUpper")
    }
})

const FontContext = React.createContext({
    size : "16px",
    color: "black"
})

class SimpleContextComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: Date.now()
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: Date.now()
            })
        }, 2000)
    }

    render() {
        return (
            <ThemeContext.Provider value={{bg: "black", fg: "white", time: this.state.time}}>
                <FontContext.Provider value={{size: "320px", color: "black"}}>
                    <DetailComponent/>
                </FontContext.Provider>
            </ThemeContext.Provider>
        )
    }
}

class DetailComponent extends React.Component {
    render() {
        return (
            <div>
                <TitleComponent/>
                <ItemComponent/>
            </div>
        )
    }
}

class ItemComponent extends React.Component {
    //context 的两种使用方式:
    //第一种: 指定 static 的 contextType 为指定类型,然后在 render 中直接使用 this.context 引用指定类型的 Context
    //第二种: 使用指定 Context.Consumer 组件,通过函数的方式获取到该 Context 引用并且返回 JSX
    static contextType = ThemeContext;

    render() {
        return <div>time: ${this.context.time} item context bg:{this.context.bg} item context fg:{this.context.fg}
            <FontContext.Consumer>
                {(context) => {
                    return <div style={{color:context.color,fontSize:context.size}}>FFFFF</div>
                }}
            </FontContext.Consumer>
        </div>;
    }
}

class TitleComponent extends React.Component {
    static contextType = ThemeContext;

    render() {
        return <div>time: ${this.context.time} title context{this.context.fg}</div>;
    }
}


export default SimpleContextComponent
