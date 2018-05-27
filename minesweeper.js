class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex]==='B'){
      console.log('Game Over!');
      this._board.print();
    }
    else if (this._board.playerBoard.hasSafeTiles===0){
      console.log('You Won!');
      this._board.print();
    }
    else{
      console.log('Current Board:');
      console.log(this._board.print());
    }
  }
}

/*created a player board*/
class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    /* represent the size of the game board and will be used to determine if the game is over or not at the end of each turn*/
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }
  flipTile (rowIndex, columnIndex){
  //Check if tile is already flipped. Return if flipped
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    }
    //Check if tile is a bomb. If yes, place bomb on player board
  else if (this._bombBoard[rowIndex][columnIndex] === 'B')  {
      this._playerBoard[rowIndex][columnIndex]='B';
    }
    //If tile is not a bomb, place number or surrounding bombs on the player board
    else {
      this._playerBoard[rowIndex][columnIndex]=this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }
  getNumberOfNeighborBombs (rowIndex, columnIndex){
    let neighborOffsets=[
      [0,1],
      [1,1],
      [1,0],
      [1,-1],
      [0,-1],
      [-1,-1],
      [-1,0],
      [-1,1]
    ];
    const numberOfRows=this._bombBoard.length;
    const numberOfColumns=this._bombBoard[0].length;
    let numberOfBombs=0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex= rowIndex+offset[0];
      const neighborColumnIndex=columnIndex+offset[1];
      if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] !== 'B'){
          this._numberOfBombs++;
        }
      }
    });
    return this._numberOfBombs;
  }
  print (){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };
  hasSafeTiles(){
    return this._numberOfTiles!==this._numberOfBombs;
  }
  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for (let rowIndex=0; rowIndex<numberOfRows; rowIndex++){
        let row = [];
    for (let columnIndex=0; columnIndex<numberOfColumns; columnIndex++){
        row.push(' ');
    }
        board.push(row);
    }
    return board;
  }
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = [];
    for (let rowIndex=0; rowIndex<numberOfRows; rowIndex++){
        let row = [];
        for (let columnIndex=0; columnIndex<numberOfColumns; columnIndex++){
            row.push(null);
        }
        board.push(row);
    }
  let numberOfBombsPlaced = 0;
  while (this._numberOfBombsPlaced < this._numberOfBombs){
      let randomRowIndex=Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex=Math.floor(Math.random()*numberOfColumns);
      /*this statemet makes sure there are not bomb already placed*/
          if(board[randomRowIndex][randomColumnIndex]!=='B'){
          board[randomRowIndex][randomColumnIndex]='B';
          this._numberOfBombsPlaced++;
        }
  }
    return board;
  }
}

const g = new Game( 5, 5, 5);

g.playMove( 0, 0);
