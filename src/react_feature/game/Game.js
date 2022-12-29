import React from "react";
import Board from "./Board";
import "./game.css";

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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    const squares = current.squares.slice();
    if (caculatorWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.XisNext ? "X" : "O";
    var xisNext = !this.state.XisNext;
    var stepNumber = ++this.state.stepNumber;
    this.setState({
      history: history.concat([{ squares: squares }]),
      XisNext: xisNext,
      stepNumber: stepNumber,
    });
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber: stepNumber,
      xisNext: !(stepNumber % 2),
    });
  }

  render() {
    var history = this.state.history;
    var current = history[this.state.stepNumber];
    var squares = current.squares;
    let status;
    let winner = caculatorWinner(squares);
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player: ${this.state.XisNext ? "X" : "O"}`;
    }

    //需要使用key避免react报出error
    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a
            href="#"
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </a>
        </li>
      );
    });

    function logMoves(moves) {
      console.log(moves);
      return moves;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{logMoves(moves)}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
