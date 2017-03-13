var prompt = require('prompt');

prompt.start();

class Game {
  constructor() {
    this.state = {
      board: new Board(),
      player1: new Player(),
      player2: new Player(),
      player: 1
    }
    this.startGame();
  }

  startGame() {
    let turn = true;
    let bool;
    // do {
      this.state.board.displayBoard();
      console.log(`Welcome to Tic Tac Toe! Player ${this.state.player} please Write down a Tile name \n`);
      prompt.get(['tile'], (err, results) => {
        bool = this.state.board.changeTiles(this.state.player, results.tile);
        while (!bool) {
          bool = this.state.board.changeTiles(this.state.player, results.tile)
        }
      })
      this.state.player = turn ? 2 : 1;
      turn = !turn;
    // }
    // while (!this.state.board.gameOver());
    console.log('GAME OVER!');
    console.log(`player ${this.state.player} wins! Resetting board`);
    this.state.board = new Board();
  }
};

class Board {
  constructor() {
    this.board = [['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22']];
  }

  changeTiles(player, tile) {
    const newTile = tile.split('');
    let space = this.board[Number(newTile[0])][Number(newTile[1])]
    console.log(space)
    this.displayBoard()
    if (space === 'X' || space === 'O') {
      console.log('invalid input');
    } else {
      if (!space) {
        console.log('invalid input')
      } else {
        if (player === 1) {
          this.board[Number(newTile[0])][Number(newTile[1])] = 'X';
          console.log(this.board[Number(newTile[0])][Number(newTile[1])])
        } else {
          this.board[Number(newTile[0])][Number(newTile[1])] = 'O'
        }
        return true;
      }
    }
    console.log(this.board)
    return false;
  }

  displayBoard() {
    for (let row of this.board) {
    let string = ''
      for (let tile of row) {
        string += tile + ' ';
      }
      console.log(string, '\n');
    }
  }

  gameOver() {
    let bool = true;
    //check diagonals
    let currentTile = this.board[0][0] 
    if (this.board[1][1] === currentTile && this.board[2][2] === currentTile) {
      return true
    }
    currentTile = this.board[2][0]
    if (this.board[1][1] === currentTile && this.board[0][2] === currentTile) {
      return true;
    }
    //check rows
    for (let row of this.board) {
      currentTile = row[0]
      for (let tile of row) {
        if (tile !== currentTile) {
          bool = false;
        }
      }
      if (bool) {
        return true;
      }
      bool = true;
    }
    //check columns
    for (let i = 0; i < this.board.length; i ++) {
      currentTile = this.board[0][i]
      for (let y = 0; y < this.board.length; y ++) {
        if (this.board[y][i] !== currentTile) {
          bool = false;
        }
      }
      if (bool) {
        return true;
      }
      bool = true;
    }

    for (let row of this.board) {
      for (let tile of row) {
        if (tile !== 'X' || tile !== 'O') {
          bool = false
        }
      }
    }
    return bool;
  }

};

class Player {
  constructor() {
    this.wins = 0;
  }

  countWins() {
    return this.wins
  }

  addWins() {
    this.wins ++;
  }
}

const game = new Game();
console.log('want to play again?');
// prompt.get([answer], (err, results) => {
//   while (results.answer === 'yes') {
//     game = new Game();
//   }
//   console.log('want to play again?');
// })