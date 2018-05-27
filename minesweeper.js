/*created a player board*/
const generatePlayerBoard = (numberOfRows, numberOfColumns) =>{
let board = [];
for (let rowIndex=0; rowIndex<numberOfRows; rowIndex++){
    let row = [];
for (let columnIndex=0; columnIndex<numberOfColumns; columnIndex++){
    row.push(' ');
}
    board.push(row);
}
return board;
};
/*created a bomb board where bombs are located*/
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rowIndex=0; rowIndex<numberOfRows; rowIndex++){
      let row = [];
      for (let columnIndex=0; columnIndex<numberOfColumns; columnIndex++){
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
};

const getNumberOfNeighborBombs= (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows=bombBoard.length;
  const numberOfColumns=bombBoard[0].length;
  let numberOfBombs=0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex= rowIndex+offset[0];
    const neighborColumnIndex=columnIndex+offset[1];
    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
      if (bombBoard[neighborRowIndex][neighborColumnIndex] !== 'B'){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};
/*created flip tile action*/
const flipTile = (playerBoard, bombBoard, flipRowIndex, flipColumnIndex) => {
//Check if tile is already flipped. Return if flipped
  if (playerBoard[flipRowIndex][flipColumnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  }
  //Check if tile is a bomb. If yes, place bomb on player board
  else if(bombBoard[flipRowIndex][flipColumnIndex]==='B'){
    playerBoard[flipRowIndex][flipColumnIndex]='B';
  }
  //If tile is not a bomb, place number or surrounding bombs on the player board
  else {
    playerBoard[flipRowIndex][flipColumnIndex]=getNumberOfNeighborBombs(bombBoard, flipRowIndex, flipColumnIndex);
  }
};
/*print board whichever board is requested*/
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3,3);
let bombBoard = generateBombBoard(3,3,4);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);

flipTile(playerBoard, bombBoard, 0, 1);
console.log('Updated Player Board:');
printBoard(playerBoard);
