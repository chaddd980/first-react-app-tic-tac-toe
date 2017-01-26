import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PLAYER_ONE_SYMBOL: "",
      COMPUTER_SYMBOL: "",
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      currentTurn: "",
      game: "off"
    }
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

  handleClick(index) {
    if (this.state.board[index] === "" && this.state.PLAYER_ONE_SYMBOL !== "") {
      let currentBoard = this.state.board
      currentBoard.splice(index, 1, this.state.currentTurn)
      this.setState({
        game: "on",
        board: currentBoard,
      }, () => {
        this.checkPlayer()
      })
    }
  }

  checkTie() {
    let count = 0
    this.state.board.map(function(cell,index){
      if (cell === "") {
        count += 1
      }
      return true
    })
    if (count === 0) {
      return true
    }
  }

  resetGame() {
    this.setState({
      game: "over",
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      PLAYER_ONE_SYMBOL: "",
      COMPUTER_SYMBOL: "",
      currentTurn: ""
    })
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
        }, () => {
          this.checkComputer()
        })
        count += 1
      } else {
        index = Math.round(Math.random()*8)
      }
    }
  }

  checkPlayer() {
    let winCount = 0
    var combos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]]
    combos.find(function(combo) {
      if(this.state.board[combo[0]] !== "" && this.state.board[combo[0]] === this.state.board[combo[1]] && this.state.board[combo[1]] === this.state.board[combo[2]]) {
        alert("Player Wins!!!")
        winCount += 1
        this.resetGame()
        return this.state.board[combo[0]]
      }
    }.bind(this))
    if (this.checkTie() && winCount === 0) {
      alert("Game is Tied!!!")
      this.resetGame()
    }
    if (this.state.game !== "over") {
      this.setState({
        currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.COMPUTER_SYMBOL : this.state.PLAYER_ONE_SYMBOL
      }, () => {
        this.setTimer()
      })
    }
  }

  checkComputer() {
    let winCount = 0
    var combos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]]
    combos.find(function(combo) {
      if(this.state.board[combo[0]] !== "" && this.state.board[combo[0]] === this.state.board[combo[1]] && this.state.board[combo[1]] === this.state.board[combo[2]]) {
        alert("Computer Wins!!!")
        this.resetGame()
        return this.state.board[combo[0]]
      }
    }.bind(this))
    if (this.checkTie() && winCount === 0) {
      alert("Game is Tied!!!")
      this.resetGame()
    }
    if (this.state.game !== "over") {
      this.setState({
        currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.COMPUTER_SYMBOL : this.state.PLAYER_ONE_SYMBOL
      })
    }
  }

  setTimer() {
    if (this.state.game === "on" && this.state.currentTurn === this.state.COMPUTER_SYMBOL) {
      setTimeout(this.updateBoard.bind(this), 1000)
    }
  }


  render() {
    return (
      <div className="main-div">
        <div className="header">
          <h1>Tic Tac Toe</h1>
          <h3>Choose X or Y</h3>
          <button type="button" onClick={() => this.handleSelectionX()}>X</button><p>  OR  </p><button type="button" class="btn btn-primary" onClick={() => this.handleSelectionY()}>Y</button>
        </div>
        <div className="text-center">
        <button type="button" className="reset" onClick={() => this.resetGame()}>Reset</button>
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
