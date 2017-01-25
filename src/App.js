import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PLAYER_ONE_SYMBOL: "X",
      COMPUTER_SYMBOL: "O",
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      currentTurn: "X",
      game: "on"
    }
  }


  handleClick(index) {
    if (this.state.board[index] === "") {
      this.state.board[index] = this.state.currentTurn
      this.setState({
        board: this.state.board,
        currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.COMPUTER_SYMBOL : this.state.PLAYER_ONE_SYMBOL,
      })
    }
    this.checkWinner()
  }

  handleSelectionX() {
    this.setState({
      PLAYER_ONE_SYMBOL: "X",
      COMPUTER_SYMBOL: "Y",
      currentTurn: "X"
    })
  }

  handleSelectionY() {
    this.setState({
      PLAYER_ONE_SYMBOL: "Y",
      COMPUTER_SYMBOL: "X",
      currentTurn: "Y"
    })
  }

  checkWinner() {
    var combos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]]
    combos.find(function(combo) {
      if(this.state.board[combo[0]] !== "" && this.state.board[combo[0]] === this.state.board[combo[1]] && this.state.board[combo[1]] === this.state.board[combo[2]]) {
        alert("Player " + this.state.currentTurn + " wins!!")
        this.setState({
          game: "over",
          board: [
            "", "", "", "", "", "", "", "", ""
          ],
        })
        return this.state.board[combo[0]]
      } else {
        return false
      }
    }.bind(this))
  }

  setTimer() {
    if (this.state.game === "on") {
      setTimeout(this.updateBoard.bind(this), 2000)
    }
  }

  componentDidUpdate() {
    if (this.state.game === "on" && this.state.currentTurn === this.state.COMPUTER_SYMBOL) {
      this.setTimer()
    }
  }

  updateBoard() {
    var count = 0
    let currentBoard = this.state.board
    let index = Math.round(Math.random()*8)
    while (count === 0) {
      if (this.state.board[index] === "") {
        currentBoard.splice(index, 1, this.state.currentTurn)
        this.setState({
          board: currentBoard,
          currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.COMPUTER_SYMBOL : this.state.PLAYER_ONE_SYMBOL
        })
        count += 1
      } else {
        index = Math.round(Math.random()*8)
      }
    }

  }

  render() {
    return (
      <div className="main-div">
        <div className="header">
          <h1>Tic Tac Toe</h1>
          <h3>Choose X or Y</h3>
          <button type="button" class="btn btn-primary" onClick={() => this.handleSelectionX()}>X</button><p>  OR  </p><button type="button" class="btn btn-primary" onClick={() => this.handleSelectionY()}>Y</button>
        </div>
        <div className="col-xs-12">
          <div className="dummy"></div>
          <div className="board">
            {this.state.board.map((cell, index) => {
              return <div onClick={() => this.handleClick(index)} className="square">{cell}</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
