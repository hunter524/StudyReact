import React from "react";

const ThemeContext = React.createContext({
    bg: "white",
    fg: "black"
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
    static contextType = ThemeContext;

    render() {
        return <div>time: ${this.context.time} item context{this.context.bg}
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
