import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './otherComponent.js'
import './flowTest'
import PropTypes from "prop-types"
import {ExternalCompositeComponent} from "./otherComponent";
import VideoPlay from "./video_play/VideoPlay";
import XGPlayer from "./video_play/XGPlayer";


//普通类型定义的组件
// class Square extends React.Component {
//     render() {
//         return (
//             // onClick={()=>{alert(`click ${this.props.value}!`)}} 点击完成之后才做出响应
//             // onClick={alert('immediately alert!')} 不用点击每次都会做出响应
//             // onClick={()=>{this.setState({value:'X'})}}
//
//             //  onClick调用内部的属性的click方法
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {/*{this.state.value === null?this.props.value:this.state.value }*/
//                     //TODO://无法在jsx的括号中写复杂的表达式?
//                     this.showbuttonContent()
//                 }
//             </button>
//         );
//     }
//
//
//     showbuttonContent() {
//         // if (this.state.value) {
//         //     return this.state.value;
//         // }
//         // else {
//         return this.props.value;
//         // }
//     }
//
//
//     //react 的是否该更新界面的回调
//     shouldComponentUpdate() {
//         // console.log(this.props.value,typeof this.props.value);
//         // if (this.props.value&& this.props.value === 'X'){
//         //     alert(`Square should update! ${this.props.value}`);
//         // }
//         return true;
//     }
// }

//通过函数的方式定义一个组件
function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {/*{this.state.value === null?this.props.value:this.state.value }*/
                //TODO://无法在jsx的括号中写复杂的表达式?
                props.value
            }
        </button>
    )
}

//判断胜利者
function caculatorWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    renderSquare(i) {
        // 传入Square一个onClick属性,onClick属性是指向一个函数
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }


    render() {
        return (
            <div>
                <div className="status"></div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {


    constructor() {
        super();
        this.state = {
            history   : [
                {
                    squares: Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            xIsNext   : true
        }
    }

    handleClick(i) {
        var history   = this.state.history.slice(0, this.state.stepNumber + 1);
        var current   = history[history.length - 1];
        const squares = current.squares.slice();
        if (caculatorWinner(squares) || squares[i]) {
            return;
        }
        squares[i]     = this.state.XisNext ? "X" : "O";
        var xisNext    = !this.state.XisNext;
        var stepNumber = ++this.state.stepNumber;
        this.setState({
            history   : history.concat([{squares: squares}]),
            XisNext   : xisNext,
            stepNumber: stepNumber
        });
    }

    jumpTo(stepNumber) {
        this.setState({
            stepNumber: stepNumber,
            xisNext   : (!(stepNumber % 2)),
        })
    }


    render() {
        var history = this.state.history;
        var current = history[this.state.stepNumber];
        var squares = current.squares;
        let status;
        let winner  = caculatorWinner(squares);
        if (winner) {
            status = `Winner is ${winner}`
        } else {
            status = `Next player: ${this.state.XisNext ? "X" : "O"}`;
        }

        //需要使用key避免react报出error
        const moves = history.map((step, move) => {
            const desc = move ? 'Move #' + move : 'Game start';
            return (
                <li key={move}>
                    <a href='#' onClick={() => {
                        this.jumpTo(move)
                    }}>{desc}</a>
                </li>
            )
        });

        function logMoves(moves) {
            console.log(moves);
            return moves;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} onClick={(i) => this.handleClick(i)
                    }/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{logMoves(moves)}</ol>
                </div>
            </div>
        );
    }
}

// ====================#字棋====================

// ReactDOM.render(
//     <Game/>,
//     document.getElementById('root')
// );

//====================other demo====================
//返回的是 ReactElement 类型
// var element = React.createElement('h1', null, "React");
// console.log(element);
// console.log('start render', new Date().getMilliseconds());
// ReactDOM.render(element, document.getElementById('root'), function () {
//     console.log('render callback', new Date().getMilliseconds());
// });

//React 即使渲染整个组件也只有变动的部分才会有变动
//同一个标签 只有 后半部分变动则 依旧也只是渲染后半部分
//React.createElement 只能创建特定的组件 而不能创建Component(更正:也可以创建Component,传入类名即可)
class DateComponent extends React.Component {
    render() {
        return (<div>
            <h1>Current is:</h1>
            <h2>not change part,chang part:{new Date().toLocaleString()}</h2>
        </div>);
    }
}

// setInterval(function () {
//     ReactDOM.render(<DateComponent/>,document.getElementById('root'))
// }, 1000);

//Component使用props属性字段
//即使每间隔1s界面都刷新一次,但是由于内容没有改变 React 也会控制不刷新DOM树 (如果children之间使用了jsx js语句则会被拆分成两个部分进行表达)
//Component的props属性只是可读,web当中修改不报错但是是无效的
// class PersonComponent extends React.Component{
//     render(){
//         return(<div>
//             <h1 onClick={this.props.onClick}> I am {this.props.person.name}</h1>
//             <h2 onClick={this.props.onClick}>I am {this.props.person.age}</h2>
//             <h3 onClick={()=>{this.props.person.name ='hunter2';alert('set name to hunter2'+this.props.person)}}>This String is not splited!</h3>
//             <img src="http://es6.ruanyifeng.com/images/cover_thumbnail_3rd.jpg" alt="javascript   "></img>
//         </div>);
//     }
// }
//
// setInterval(function () {
//     ReactDOM.render(<PersonComponent person={{name:'hutner',age:12}} onClick={()=>alert("click Person Component!")}/>,document.getElementById('root'))
// },1000);

//函数定义组件 只有h3的后半部分时间区域在进行更新操作(无状态组件实现的更新方式,使用props属性 和 多次调用render方法进行组件的更新操作)
// function Clock(props) {
//     return (
//         <div>
//             <h3>Current Is:</h3>
//             <h3>Time is {props.time.toTimeString()}</h3>
//         </div>
//     );
// }
//
// function regularRender() {
//     ReactDOM.render(<Clock time={new Date()}/>, document.getElementById('root'))
// }
//
// regularRender();
// setInterval(regularRender, 1000);


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time             : new Date(),
            notChangedInState: 'not changed state!'
        };
        this.times = 0;
//使用function的 bind 方法进行时间的更新 绑定方法中的this
// setInterval(updateInterval.bind(this),1000);

    }

    render() {
        return (
            <div>
                <h3>Current Is:</h3>
                <h3>Time is {this.state.time.toTimeString()}</h3>
                <h3>{this.state.notChangedInState}</h3>
            </div>
        );
    }

    componentDidMount() {
        console.log("Clock Component Did Mount");
        this.timerId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillUnmount() {
        console.log("Clock componentWillUnmount");
        clearInterval(this.timerId);
    }

    //两秒更新一次 判断当前Component组件在State 变化时是否应该继续更新
    shouldComponentUpdate() {
        if (this.times % 2 === 0) {
            return true;
        } else {
            return false;
        }
    }

    tick() {
        this.times++;
        var date = new Date();
        console.log('log from tick', date.toLocaleTimeString());
        this.setState({time: date});
        //刷新十次之后移除Clock组件 测试组件生命周期
        if (this.times === 10) {
            // ReactDOM.render(<div><h1>Removed Colock After 10 times!</h1></div>, document.getElementById('root'));
            // alert("change layout!");
        }
    }
}

// var element = React.createElement(Clock,null,null);
// ReactDOM.render(<Clock/>,document.getElementById('root'));


//拼装三个组件进行显示
// function App(props) {
//     return <div>
//         <Clock/>
//         <Clock/>
//         <Clock/>
//     </div>
// }


function updateInterval() {
    this.setState({time: new Date()});
}


//Event 处理
//事件的处理函数可以用bind的写法绑定this
class ToggleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state       = {
            isToggleOn: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

//    第一种写法 ：每次初始化 一个button的时候均会 返回bind this之后的一个新的函数
// <button onClick={this.handleClick.bind(this)}> {this.state.isToggleOn?'ON':'OFF'} </button>
//    第二种写法： 全局只有一个Click 函数 每次初始化时传入同一个Click函数
// <button onClick={this.handleClick}> {this.state.isToggleOn?'ON':'OFF'} </button>
//     第三种写法：基本同第一种写法，每次初始化时均会返回一个新的函数
// <button onClick={(e)=>{this.handleClick(e)}}> {this.state.isToggleOn?'ON':'OFF'} </button>

    render() {
        return (
            <div>
                <button onClick={(e) => {
                    this.handleClick(e)
                }}> {this.state.isToggleOn ? 'ON' : 'OFF'} </button>
                <a href="https://www.baidu.com" onClick={this.handleClickPreventDefault}>baidu</a>
                <a href="https://www.baidu.com" onClick={this.handleClickPreventWithParam.bind(this, this.props.name)}>prevent
                    and invoke with param</a>
            </div>
        )
    }

    handleClick(e) {
        this.setState(preState => {
            return {isToggleOn: !preState.isToggleOn}
        })
    }

    //click 调用此方法后便可以阻止<a href="url"> link</a>的默认跳转操作
    handleClickPreventDefault(e) {
        e.preventDefault();
    }

    handleClickPreventWithParam(name, e) {
        e.preventDefault();
        alert(name);
    }
}

// ReactDOM.render(<ToggleComponent/>,document.getElementById('root'));

// conditional rendering (条件渲染)
function LoginButton(props) {
    return (
        <button onClick={props.onClick}> Login </button>
    );
}

function LogOutButton(props) {
    return (
        <button onClick={props.onClick}>LogOut</button>
    );
}

function UserGrenting(props) {
    return (<h1> Welcome back!</h1>)
}

function GuestGreeeting(props) {
    return (<h1> Please Sign In!</h1>)
}

function Greenting(props) {
    if (props.isLogin) {
        return <UserGrenting/>
    } else {
        return <GuestGreeeting/>
    }
}

class LoginContronl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    render() {
        let button;
        if (this.state.isLogin) {
            button = <LogOutButton onClick={this.handleLogoutClick.bind(this)}/>
        } else {
            button = <LoginButton onClick={this.handleLoginClick.bind(this)}/>
        }
        return (
            <div>
                <Greenting isLogin={this.state.isLogin}/>
                {button}
            </div>
        );
    }


    handleLoginClick() {
        this.setState({isLogin: true});
    }

    handleLogoutClick() {
        this.setState({isLogin: false});
    }


}

//使用&&运算符 表达式实现 conditional rendering
//也可以使用三目 运算符实现 界面显示元素的选择
class MailBoxComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.unReadMessage.length > 0 && <h2>You have {this.props.unReadMessage.length} message!</h2>}
                {this.props.unReadMessage.length >= 3 ? <h2>More than Three message!</h2> :
                    <h2>less than Three Message!</h2>}
            </div>
        );
    }
}

//render return null 的Component并不影响该Component的生命周期函数的调用
class ReturnNullComponet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isShowWarning) {
            return (<h1>Warning!</h1>);
        } else {
            return null;
        }
    }

    componentDidMount() {
        console.log("ReturnNullComponet did mount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount did mount");
    }
}

class NullCheckComponet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowWarning: false
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>Change Null</button>
                <ReturnNullComponet isShowWarning={this.state.isShowWarning}/>
            </div>
        );
    }

    handleClick() {
        this.setState(preState => {
            return {isShowWarning: !preState.isShowWarning}
        })
    }
}

//ListItem组件的key值应该在 应该存储于 <ListItem/> 组件上 而不应该存储月<li/> 组件上
function ListItemRight(props) {
    return (<li>{props.value}</li>);
}

//ListItemWrong 组件的key在内部指定 外部不再指定Chrome Console中便会报错 key should unique!
//ListItemWrong 在外层指定Key之后便不再报错
function ListItemWrong(props) {
    return (<li key={props.value}>{props.value}</li>);
}

class ListComponet extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.lists)
    }

    render() {
        return (
            <div>
                <ul> {this.props.lists.map((v) => {
                    return <li key={v.toString()}>{v}</li>
                })}</ul>

                <ul>{this.props.lists.map((v) =>
                    <ListItemRight key={v.toString()} value={v}/>
                )}</ul>

                <ul>
                    {this.props.lists.map((v) => <ListItemWrong key={v.toString()} value={v}/>)}
                </ul>
            </div>
        )
    }

}

//Normal FormComponent 普通的非受控组件
class NormalFormComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <label>
                    Name:
                    <input type="text" name="name"/>
                </label>
                <input type="submit" value="Submit!"/>
            </form>
        )
    }
}

//不会做页面的跳转重新查询
//textarea 是用来做显示效果使用的,但是也可以使用受控控件变成做输入使用
class FormContronlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state        = {value: ""}
        this.handleChang  = this.handleChang.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChang(event) {
        // this.setState({value:event.target.value});
        //使用受控组件将所有输入转换为大写字符
        this.setState({value: event.target.value.toUpperCase()});
    }

    handleSubmit(event) {
        alert('A name was Submitted:' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    {/*<input type="text" name="name" value={this.state.value} onChange={this.handleChang}/>*/}
                    {/*<textarea value={this.state.value} onChange={this.handleChang}/>*/}
                </label>
                <input type="submit" value="Submit!"/>
            </form>
        )
    }
}

class SelectedComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <select>
                    <option value="green">Green</option>
                    <option selected value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                </select>
            </div>
        );
    }
}

//受控组件的写法 通过select 的value值设置组件的状态
class SelectedContronlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state          = {selected: 'red'};
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        this.setState({selected: event.target.value});
    }

    render() {
        return (
            <div>
                <select value={this.state.selected} onChange={this.handleOnChange}>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                </select>
            </div>
        );
    }
}

//Lifting State Up
// function BoillingVerdict(props) {
//     if (props.celsius>= 100){
//         return <p>水会烧开!</p>
//     }
//     return <p>水不会烧开!</p>
// }

//Composition And Inheritance 组合与继承
//使用prop.children 代替显示其子控件元素
function OuterCompositeComponent(props) {
    return (<div>
        <h1>The bellow is From Child! </h1>
        {props.children}
    </div>);
}

//通过props属性实现 组件的状态组合 而不是直接使用child实现组件的组合
//Dialog 与 WelcomeDialog 使用组合的实现代替了 继承的实现
function SplitPannel(props) {
    return <div>
        <div>
            <h6> I am Left!</h6>
            {props.left}
        </div>
        <div>
            <h6>I am Right!</h6>
            {props.right}
        </div>

    </div>
}

//内部组件
const InternalCompositeComponent = {
    DatePicker: function DatePicker(props) {
        return (<a>I am Date Picker!</a>);
    },
    TimePicker: function TimePicker(props) {
        return (<a>I am Time Picker!</a>)
    }
};

//如果使用Const 对象组合组件 需要使用 一个中介函数 进行组件的导入
function BlueDatePicker() {
    // return<InternalCompositeComponent.DatePicker/>
    return <ExternalCompositeComponent.DatePicker/>;
}

function smallLetterComponent(props) {
    return (<div>
        <a>I am a small letter component!</a>
    </div>);
}

//可以使用大写组件包装小写组件的方式 实现对小写组件的兼容
function SmallLetterComponent(props) {
    return smallLetterComponent(props);
}

//JSX 可以返回数组在界面中进行渲染
function getArrayElements() {
    return [<li key="A">A</li>, <li key="B">B</li>, <li key="C">C</li>];
}

//JSX中children还可以是一个函数用于元素的渲染
function Repeate(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i))
    }
    return <div>
        <ul>
            {items}
        </ul>
    </div>
}

function RepeateChildrenIsFunction(props) {
    return <Repeate numTimes={10}>{(index) => {
        return <li>I am the {index}</li>
    }}</Repeate>
}

//Typechecking with PropTypes (dev 模式下如果参数类型不匹配会报错）
function TypeCheckComponent(props) {
    return <div>
        TypeCheckingComponent!
        <a>{props.name}</a>
    </div>
}

TypeCheckComponent.propTypes    = {
    name: PropTypes.string
};
//prop-types 使用默认的值
TypeCheckComponent.defaultProps = {
    name: "default Name!"
};

//Refs And Dom 按照最后的的用例 ref 还可以通过props进行跨组件传递
//todo:最后的提示 ref call back inline function
class RefsComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.refs = React.createRefs(); //react 16.3.1 以上才可以使用
        //textInput 指向了子元素
        this.textInput = null;
        this.setRef    = (element) => {
            this.textInput = element;
        };

        this.focusInput = () => {
            if (this.textInput) {
                this.textInput.focus();
            }
        }
    }

    render() {
        return (<div>
            <input type="text" ref={this.setRef}/>
            <input type="button" value="focus input" onClick={this.focusInput}/>
        </div>);
    }


}

//uncontrolled component (React不能主动处理响应事件的元素）
class UnControlledComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var value = this.input.value;
        alert(value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input value="Bob" type="text" ref={(input) => this.input = input}/>
                    <input type="file"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }

}

//React With ES6
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
    name: "ES6 Default Name!"
};


//
class UpdateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
    }

    render() {
        return (<div>
            <a>{this.state.value}</a>
        </div>);
    }

    componentDidMount() {
        setInterval(() => {
            console.log("call interval from mount!")
            this.setState({value: 1000})
        }, 1000);
        return true;
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate from UpdateComponent");
        return true;
    }


}

class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`ComponentLifeCycle componentWillMount ${this.props.name}`)
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


    render() {
        return (<div>
            <a>
                I am a ComponentLifeCycle named {this.props.name}
            </a>
        </div>);
    }
}

class ComponentLifeCycleSecond extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`ComponentLifeCycleSecond componentWillMount ${this.props.name}`)
    }

    componentDidMount() {
        console.log(`ComponentLifeCycleSecond componentDidMount ${this.props.name}`)
    }

    componentWillUnmount() {
        console.log(`ComponentLifeCycleSecond componentWillUnmount ${this.props.name}`)

    }

    render() {
        return (<div>
            <a>
                I am a ComponentLifeCycleSecond named {this.props.name}
            </a>
        </div>);
    }
}

//according to Advanced Guide Reconciliation
// Component的更新首先判断 root 元素的 type是否相同，如果相同则更新Component属性，
// 如果不相同则替换该root 下面的所有子元素（移除原先的Component 添加新的Component）
class ParentLifeCycleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {times: 0}
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState((preState) => {
                return {times: preState.times + 1}
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        if (this.state.times % 3 === 0) {
            return <ComponentLifeCycle name="3% = 0"/>
        } else if (this.state.times % 3 === 1) {
            return <ComponentLifeCycle name="3% = 1"/>
        } else if (this.state.times % 3 === 2) {
            return <ComponentLifeCycleSecond name="3% = 2"/>
        } else {
            return null;
        }
    }
}


//React Context Test
const ThemContext = React.createContext("light");
const UserContext = React.createContext("hunter")

class InnerThemComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    // 将Context在生命周期函数中使用 只能使用props传入属性才可以进行访问
    // componentDidMount(){
    //     let {them,children} = this.props;
    //     console.log("them is:",this.props.them)
    // }

    render() {
        return (
            <ThemContext.Consumer>
                {(them) => {
                    return <a>{them}</a>
                }}
            </ThemContext.Consumer>);
    }

}

class OuterThemComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <InnerThemComponent/>
            </div>
        )
    }

}

class MultiplyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ThemContext.Provider value="color blue">
                    <UserContext.Provider value="admin hunter">
                        <ThemContext.Consumer>
                            {(them) => (
                                <UserContext.Consumer>
                                    {(user) => (
                                        <a>I am {user} my skin is {them} </a>
                                    )}
                                </UserContext.Consumer>
                            )
                            }
                        </ThemContext.Consumer>


                    </UserContext.Provider>
                </ThemContext.Provider>
            </div>
        );
    }

}

//HOC High Order Component 可以解决所有子组件共享Context的问题
//实现策略是将 Context取出 作为props的参数传递进入组件（类似于高阶函数，高阶函数可以调用低阶函数）

//todo:forward refs Context如何理解？ consumer 包装一层再把FancyButton进行导出
// class FancyButton extends React.Component{
//     constructor(props){
//         super(props);
//     }
//
//     render(){
//         return(<a>Theme is {this.props.theme}</a>);
//     }
// }
//
//
// React.forwardRef((props,ref)=>(
//     <ThemContext.Consumer>
//         {them=>(<FancyButtom {...props} theme={them} ref={ref}/>)}
//     </ThemContext.Consumer>
// ));


//react 中的Fragment
function TdList(props) {
    // return (
    //     <td>1</td>
    //     <td></td>
    // );

    return (
        <React.Fragment>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </React.Fragment>
    );
}

//第一个只有三列 第二行一个div则为1列
function FragmentComponet(props) {
    return (
        <table>
            <tr>
                <TdList/>
            </tr>
            <tr>
                <div>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </div>
                <td>
                    <div>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </div>
                </td>
            </tr>
        </table>
    );
}

//ReactDom 中的portal组件 用于控制与组合组件

//React Component 的 Error Boundaries
class ErrorBoundaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false}
    }

    shouldComponentUpdate(nextProps, nextStates) {
        if (nextStates.hasError) {
            throw new TypeError("error boundary!");
        }
    }

    render() {
        if (this.state.hasError) {
            return <a>Some Thing Wrong!</a>
        } else {
            return <button onClick={() => {
                this.setState({hasError: true})
            }}>throw error!</button>
        }
    }


}

//ErrorBoundary只能捕获其子元素的错误 并不能捕获当前Component产生的错误
//且子元素的Error 只向上传递到理其最近的一个Component 的 componentDidCatch方法
//再向上的component 则无法接收到异常
class CatchComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ErrorBoundaryComponent/>);

    }

    componentDidCatch(error, info) {
        alert(error);
        alert(info.componentStack);
    }
}

//High Order Component （类似于函数式编程中的高阶函数）
//函数式编程中：传入低阶函数 被 高阶函数调用
//React中传入低阶Component被高阶Component进行包装调用
//可以通过修改DisplayName 修改在Chrome React Debug工具中显示的组件名称
//如果不修改DisplayName则默认显示的 返回的class的名称 （即使包装的低阶的组件不同，Chrome中显示的高阶的组件的名称还是相同的）
//copy 低阶组件的静态方法 进入高阶组件中是很有必要的，但是需要明确的知道组件的名称 copy所有组件的静态方法可以使用 “hoist-non-react-statics”module进行
//todo://High Order Component 组件是否便可以解决面向切面编程的问题？
function wrapLowComponent(LowComponent, name) {
    class HOCComponent extends React.Component {
        constructor(props) {
            super(props)
        }

        render() {
            return <LowComponent name={name}/>
        }

    }

    // HOCComponent.displayName = `HOCWrapped${LowComponent.displayName||LowComponent.name||'Component'}`;
    return HOCComponent;
}

function LowComponent(props) {
    return (
        <button onClick={function () {
            LowComponent.staticMethod("button");
        }}>I am Low Component!Name is {props.name}</button>
    );
}

//定义在类上的方法 而不是定义在类的内部的方法
//定义在类的{}内部的方法为对象的方法
//定义在类的引用上的方法 为类的方法
LowComponent.staticMethod = function (message) {
    alert("hello:" + message);
};

const HighComponent       = wrapLowComponent(LowComponent, "low low low！");
const HighComponentSecond = wrapLowComponent(LowComponent, "low second ,low second ,low second!");

//Forwarding refs(向Component中的Component组件索取引用）
//HOC 的Component ref默认不向下传递 需要通过React.forwardRef 将ref作为props的一个参数向下传递
const ForwardRefButton = React.forwardRef((props, ref) => {
    return <button ref={ref}>Click</button>
});


const ref = React.createRef();

//Render Props （渲染属性）i.e (属性中存在一个渲染函数，负责组件的其他部分的渲染。可以取名叫render方法也可以不叫render 实际即是一个渲染方法的指针）
//也可以使用High Order Component （HOC）实现一个组件内置于另外一个组件的渲染（将低阶组件内置于高阶组件内返回）
//todo:React.Component 与React.PureComponent 的区别 （普通的Component每次都返回true？PureComponent 的 shouldComponentUpdate会进行浅比较然后判断是否该更新数据
class MouseMove extends React.Component {
    constructor(props) {
        super(props);
        this.state           = {
            x: 0,
            y: 0,
        };
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    shouldComponentUpdate() {
        // var b =super.shouldComponentUpdate();
        // console.log("shouldComponentUpdate"+b);
        return true;
    }

    handleMouseMove(event) {
        //判断某个元素是否是ReactElement
        // var valid = React.isValidElement(React.createElement("a",null,null));
        // console.log(`valid ${valid}`);

        var number = React.Children.count(this.props.children);
        console.log(`children number is ${number}`);

        this.setState({
            x: event.clientX,
            y: event.clientY,
        })
    }

    render() {
        return (
            <div style={{height: '1000px', width: '100%'}} onMouseMove={this.handleMouseMove}>
                <a>Current Position is {`x: ${this.state.x} y: ${this.state.y}`}</a>
                {/*{this.props.render(this.state)}*/}
                {/*内层的控件决定了其Children是否显示*/}
                {this.props.children || <a>No Children</a>}
            </div>
        );
    }


}


//页面元素组合
class AppComposite extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            {/*<Clock/>*/}
            {/*<Clock/>*/}
            {/*<Clock/>*/}
            {/*<ToggleComponent name="I am ToggleComponent"/>*/}
            {/*<LoginContronl/>*/}
            {/*<MailBoxComponent unReadMessage={['React','Re:React','Re:Re:React']}/>*/}
            {/*<NullCheckComponet/>*/}
            {/*<ListComponet lists={[1, 2, 3, 4, 5]}/>*/}
            {/*<NormalFormComponent/>*/}
            {/*<FormContronlComponent/>*/}
            {/*<SelectedComponent/>*/}
            {/*<SelectedContronlComponent/>*/}

            {/*<OuterCompositeComponent>*/}
            {/*<h2>I am inner Children!</h2>*/}
            {/*<h3>I am also a Inner Children!</h3>*/}
            {/*</OuterCompositeComponent>*/}
            {/*<SplitPannel left={<h5>I am Left Content!</h5>} right={<h5>I am Right Content!</h5>}/>*/}

            {/*<DefaultComponent/>*/}
            {/*非class组件无法使用export导出？*/}
            {/*{ExternalCompositeComponent.TimePicker()}*/}

            {/*可以通过中间函数的方式导入Const对象组件*/}
            {/*<BlueDatePicker/>*/}

            {/*小写组件不报错但是会被忽略*/}
            {/*<SmallLetterComponent/>*/}

            {/*既可以嵌套字面变量 还可以嵌套元素,New ！后面的换行会被压缩成空格！*/}
            {/*<div>I am <h6>Hunter! New*/}
            {/*Line！</h6></div>*/}
            {/*<ul>{getArrayElements()}</ul>*/}

            {/*<RepeateChildrenIsFunction/>*/}

            {/*<TypeCheckComponent />*/}
            {/*<div>{add(22,33)}</div>*/}

            {/*<RefsComponent/>*/}

            {/*<UnControlledComponent/>*/}

            {/*<UpdateComponent/>*/}


            {/*使用ES5的语法 和 create-react-class module 创建的组件*/}
            {/*<Greeting/>*/}
            {/*<Greeting name="Self Definition Name"/>*/}

            {/*使用ES6 语法定义的 Props属性*/}
            {/*<DefaultProps/>*/}
            {/*<DefaultProps name = "Not Default Name!"/>*/}

            {/*使用mixin属性实现计时操作*/}
            {/*<MixInComponent/>*/}

            {/*使用Context参数 透过Component 进行参数的传递*/}
            {/*<ThemContext.Provider value="blue">*/}
            {/*<OuterThemComponent/>*/}
            {/*</ThemContext.Provider>*/}

            {/*没有匹配到Provider 则使用默认的值*/}
            {/*<OuterThemComponent/>*/}
            {/*parent Component 声明周期 比较算法测试*/}
            {/*<ParentLifeCycleComponent/>*/}

            {/*<MultiplyComponent/>*/}

            {/*<FragmentComponet/>*/}

            {/*<CatchComponent/>*/}

            {/*包装低阶的Component形成一个更高级别的抽象，从而提供给外部进行使用 更高级的Component封装一些更加通用与抽象的逻辑*/}
            {/*<HighComponent/>*/}
            {/*<HighComponentSecond/>*/}

            {/*通过ref获取到 ForwardButton底层Button的引用 点击可以通过forward ref修改ref的引用*/}
            {/*<ForwardRefButton ref={ref}/>*/}
            {/*<button onClick={()=>{ref.current.innerHTML="Changed"}}>call Ref Method!</button>*/}

            {/*通过render props 设置鼠标的跟踪*/}
            <MouseMove render={state => {
                return <a style={{position: 'absolute', left: state.x, top: state.y}}>Cat</a>
            }}>
                {/*<a>I am a Children!Not Display</a>*/}
                {/*<a>I am a Children!Display!</a>*/}
            </MouseMove>

        </div>);
    }

    //装配组件的生命周期函数 从组件的底层 向 顶层调用 Clock->App
    componentDidMount() {
        console.log("App componentDidMount!");
    }

    //卸载组件的生命周期函数 从组件的顶层 向 底层调用 App->Clock
    componentWillUnmount() {
        console.log("App componentWillUnmount!");
    }
}

// 表单在 React 中既可以表示成受控组件/也能表示为非受控组件
class FormComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {v:"v"}
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        名字:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="提交" />
                </form>
            </div>
        );
    }

    onInput(e) {
        console.log(`onInput:${e.target.value}`)
        // this.setState({
        //     v: e.target.value
        // })
    }

    onChange(e){
        console.log(`onChange:${e.target.value}`)
    }


}

//组件的使用 需要放在组件声明的下面
ReactDOM.render(<XGPlayer/>, document.getElementById('root'));


