export default function checkWinner(gameBoard) {
  const winnerCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winnerCondition.find(([a, b, c]) => {
    if (
      gameBoard[a] !== null &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    } else {
      return false;
    }
  });
}
