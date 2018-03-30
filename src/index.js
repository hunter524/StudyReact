import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
        // onClick={()=>{alert(`click ${this.props.value}!`)}} 点击完成之后才做出响应
        // onClick={alert('immediately alert!')} 不用点击每次都会做出响应
        // onClick={()=>{this.setState({value:'X'})}}

      //  onClick调用内部的属性的click方法
      <button className="square" onClick={()=>this.props.onClick()} >
          {/*{this.state.value === null?this.props.value:this.state.value }*/
              //TODO://无法在jsx的括号中写复杂的表达式?
              this.showbuttonContent()
          }
      </button>
    );
  }

    showbuttonContent() {
        if (this.state.value) {
            return this.state.value;
        }
        else {
            return this.props.value;
        }
    }
}

class Board extends React.Component {
    constructor(){
        super();
        this.state={
            squares:Array(9).fill(null)
        }
    }
  renderSquare(i) {
    // 传入Square一个onClick属性,onClick属性是指向一个函数
    return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)}/>;
  }

  handleClick(i){
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares:squares});
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

