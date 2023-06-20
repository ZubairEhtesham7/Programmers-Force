// Create an array to represent the game board
let board = Array.from(Array(9).fill(" "));

// Variable to keep track of the current player ('X' or 'O')
let currentPlayer = "X";

// Array to store the winning combination
let winningCombination = [];

// Function to display the game board
function displayBoard() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = board[i];
    cells[i].classList.remove("winning-cell");
  }
  if (winningCombination.length > 1) {
    for (let index of winningCombination) {
      cells[index].classList.add("winning-cell");
    }
  }
  const turnDisplay = document.getElementById("turn");
  turnDisplay.innerText = `Current Turn: ${currentPlayer}`;
}
// Function to check if a player has won
function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== " " && board[a] === board[b] && board[a] === board[c]) {
      winningCombination = combination;
      return true;
    }
  }
  return false;
}
// Function to handle player's move
function makeMove(position) {
  if (board[position] === " " && !checkWin()) {
    board[position] = currentPlayer;
    displayBoard();

    if (checkWin()) {
      winningCombination = [];
      alert("Player " + currentPlayer + " wins!");
    } else if (board.indexOf(" ") === -1) {
      alert("It's a draw!");
      resetGame();
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayBoard();
  } else if (checkWin()) {
    displayBoard();
  } else {
    alert("Invalid move! Please try again.");
  }
}
// Function to reset the game
function resetGame() {
  board = Array.from(Array(9).fill(" "));
  currentPlayer = "X";
  winningCombination = [];
  displayBoard();
}
// Start the game
window.onload = function () {
  displayBoard();
};
