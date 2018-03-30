import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            stepNumber:0,
            xIsNext: true
        }
    }

    handleClick(i) {
        var history = this.state.history.slice(0,this.state.stepNumber+1);
        var current = history[history.length - 1];
        const squares = current.squares.slice();
        if (caculatorWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.XisNext ? "X" : "O";
        var xisNext = !this.state.XisNext;
        var stepNumber = ++this.state.stepNumber;
        this.setState({
            history: history.concat([{squares: squares}]),
            XisNext: xisNext,
            stepNumber: stepNumber
        });
    }

    jumpTo(stepNumber){
        this.setState({
            stepNumber:stepNumber,
            xisNext:(!(stepNumber % 2)),
        })
    }


    render() {
        var history = this.state.history;
        var current = history[this.state.stepNumber];
        var squares = current.squares;
        let status;
        let winner = caculatorWinner(squares);
        if (winner) {
            status = `Winner is ${winner}`
        }
        else {
            status = `Next player: ${this.state.XisNext ? "X" : "O"}`;
        }

        //需要使用key避免react报出error
        const moves = history.map((step,move)=>{
            const desc = move?'Move #'+move:'Game start';
            return(
                <li key={move}>
                    <a href='#'onClick={()=>{this.jumpTo(move)}}>{desc}</a>
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
                    <Board squares={squares} onClick={(i) =>this.handleClick(i)
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

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

