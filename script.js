const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
const turnIndicator = document.getElementById('turn-indicator');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!board[index]) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add('taken');
      if (checkWin()) {
        winnerMessage.textContent = `Player ${currentPlayer} Wins!`;
        turnIndicator.textContent = '';
        disableBoard();
      } else if (board.every(cell => cell)) {
        winnerMessage.textContent = 'It\'s a Tie!';
        turnIndicator.textContent = '';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  });
});

// Check for a win
function checkWin() {
  return winningCombos.some(combo => 
    combo.every(index => board[index] === currentPlayer)
  );
}

// Disable board
function disableBoard() {
  cells.forEach(cell => cell.classList.add('taken'));
}

// Restart game
restartButton.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  winnerMessage.textContent = '';
  turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
});
