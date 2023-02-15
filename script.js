const gameBoardControl = (() => {
  let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  let turn = 1;

  function putMarker(location) {
    gameBoard[location] = turn;
  }

  function checkWin(location) {
    let win = false;

    location = Number(location);

    //check for vertical win
    let verticalStart = location % 3;
    if (
      gameBoard[verticalStart] === gameBoard[verticalStart + 3] &&
      gameBoard[verticalStart + 3] === gameBoard[verticalStart + 6]
    )
      win = true;

    //check for horizontal win
    let horizontalStart = location - (location % 3);
    if (
      gameBoard[horizontalStart] === gameBoard[horizontalStart + 1] &&
      gameBoard[horizontalStart + 1] === gameBoard[horizontalStart + 2]
    )
      win = true;

    //check for diagonals
    if (location === 0 || location === 4 || location === 8) {
      if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8])
        win = true;
    }

    if (location === 2 || location === 4 || location === 6) {
      if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6])
        win = true;
    }

    return win;
  }

  function changeTurn() {
    turn === 1 ? (turn = 2) : (turn = 1);
  }

  function getTurn() {
    let viewTurn = turn;

    return viewTurn;
  }

  return { gameBoard, putMarker, checkWin, getTurn, changeTurn };
})();

function Player(name, marker, num) {
  return { name, marker, num };
}

let Player1 = Player("Player1", "X", 1);
let Player2 = Player("Player2", "O", 2);

const displayControl = (() => {
  const spaces = document.querySelectorAll(".space");

  spaces.forEach((space) =>
    space.addEventListener("click", () => {
      let clickedLocaton = space.classList[1].charAt(5);

      let currMark;

      if (gameBoardControl.getTurn() === 1) currMark = Player1.marker;
      else currMark = Player2.marker;

      space.textContent = currMark;

      gameBoardControl.putMarker(clickedLocaton);

      let result = gameBoardControl.checkWin(clickedLocaton);

      if (result) {
        console.log(`Player${gameBoardControl.getTurn()} wins!`);
        return;
      }

      gameBoardControl.changeTurn();
      console.log(gameBoardControl.gameBoard);
    })
  );
})();
