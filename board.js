/*created a player board*/
export class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    /* represent the size of the game board and will be used to determine if the game is over or not at the end of each turn*/
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }
  flipTile (FlipRowIndex, FlipColumnIndex){
  //Check if tile is already flipped. Return if flipped
    if (this._playerBoard[FlipRowIndex][FlipColumnIndex] !== ' '){
      return;
    }
    //Check if tile is a bomb. If yes, place bomb on player board
  if (this._bombBoard[FlipRowIndex][FlipColumnIndex] === 'B')  {
      this._playerBoard[FlipRowIndex][FlipColumnIndex]='B';
    }
    //If tile is not a bomb, place number or surrounding bombs on the player board
    else {
      this._playerBoard[FlipRowIndex][FlipColumnIndex]=this.getNumberOfNeighborBombs(FlipRowIndex, FlipColumnIndex);
    }
    this._numberOfTiles--;
  }
  getNumberOfNeighborBombs (rowIndex, columnIndex){
    let neighborOffsets = [


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
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  print (){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };
  hasSafeTiles(){
    return this._numberOfBombs!==this._numberOfTiles;
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
    for (let rowIndex=0; rowIndex < numberOfRows; rowIndex++){
        let row = [];
        for (let columnIndex=0; columnIndex < numberOfColumns; columnIndex++){
            row.push(null);
        }
        board.push(row);
    }
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs){
      let randomRowIndex=Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex=Math.floor(Math.random()*numberOfColumns);
      /*this statemet makes sure there are not bomb already placed*/
          if(board[randomRowIndex][randomColumnIndex]!=='B'){
          board[randomRowIndex][randomColumnIndex]='B';
          numberOfBombsPlaced++;
        }
  }
    return board;
  }
}
