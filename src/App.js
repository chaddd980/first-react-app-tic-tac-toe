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
      game: "over",
      clickedX: false,
      clickedY: false
    }
  }

  handleSelectionX() {
    this.setState({
      PLAYER_ONE_SYMBOL: "X",
      COMPUTER_SYMBOL: "Y",
      currentTurn: "X",
      clickedX: true,
      clickedY: false,
      game: "on"
    })
  }

  handleSelectionY() {
    this.setState({
      PLAYER_ONE_SYMBOL: "Y",
      COMPUTER_SYMBOL: "X",
      currentTurn: "Y",
      clickedY: true,
      clickedX: false,
      game: "on"
    })
  }

  XClass() {
    if (this.state.clickedX === true && this.state.game !== "over") {
      return true
    }
  }

  YClass() {
    if (this.state.clickedY === true && this.state.game !== "over") {
      return true
    }
  }

  handleClick(index) {
    if (this.state.board[index] === "" && this.state.PLAYER_ONE_SYMBOL !== "" && this.state.PLAYER_ONE_SYMBOL === this.state.currentTurn) {
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
        alert("You Win!!!")
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
        <Header handleX={this.handleSelectionX.bind(this)} handleY={this.handleSelectionY.bind(this)} changeClassX={this.XClass.bind(this)} changeClassY={this.YClass.bind(this)} reset={this.resetGame.bind(this)} />
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

class Header extends React.Component {
  handleClickX() {
    this.props.handleX()
  }

  handleClickY() {
    this.props.handleY()
  }

  componentDidMount() {
    this.classNameX()
    this.classNameY()
  }

  classNameX() {
    let className = ""
    this.props.changeClassX() === true ? className = "selected" : className = ""
    return className
  }

  classNameY() {
    let className = ""
    this.props.changeClassY() === true ? className = "selected" : className = ""
    return className
  }


  render() {
    return(
      <div>
        <div className="header">
          <h1>Tic Tac Toe</h1>
          <h3>Choose X or Y</h3>
          <button type="button" className={this.classNameX()} onClick={() => this.handleClickX()}>X</button><p>  OR  </p><button type="button" className={this.classNameY()} onClick={() => this.handleClickY()}>Y</button>
        </div>
        <div className="text-center">
          <button type="button" className="reset" onClick={() => this.props.reset()}>Reset</button>
        </div>
      </div>
    )
  }
}

export default App;
