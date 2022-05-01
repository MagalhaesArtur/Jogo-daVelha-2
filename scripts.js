const squares = document.querySelectorAll("[value]");
let game = document.querySelector("[game]");
let messagetext = document.querySelector("[messageText");
let winnerDiv = document.querySelector("[message]");
let reload = document.querySelector("[button]");
reload.addEventListener("click", () => {
  document.location.reload(true);
});
const winningPossibilities = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [2, 4, 6],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
];
let classToAdd = "";
let isCircleTurn = false;

const checkForWin = (currentPlayer) => {
  return winningPossibilities.some((combination) => {
    return combination.every((index) => {
      return squares[index].classList.contains(currentPlayer);
    });
  });
};

const end = (draw, winner) => {
  if (draw) {
    messagetext.innerText = "Deu Empate!!";
  } else {
    messagetext.innerText = `${winner.toUpperCase()} Venceu!`;
  }
  winnerDiv.style.cssText = " display:flex;";
};
const checkDraw = () => {
  return [...squares].every((square) => {
    return square.classList.contains("x") || square.classList.contains("o");
  });
};

const handleClick = (e) => {
  // Colocando X ou O
  const cell = e.target;
  if (isCircleTurn) {
    classToAdd = "o";
  } else {
    classToAdd = "x";
  }
  cell.classList.add(classToAdd);
  //   Trocando a vez
  isCircleTurn = !isCircleTurn;
  game.classList.remove("x");
  game.classList.remove("o");

  if (isCircleTurn) {
    game.classList.add("o");
  } else {
    game.classList.add("x");
  }

  //   Verificar empate
  const isDraw = checkDraw();

  console.log(isDraw);
  //   Verificar Vitória
  const isWin = checkForWin(classToAdd);
  if (isWin) {
    console.log("winner");
    end(false, classToAdd);
  } else if (isDraw) {
    end(true);
  }
};

for (const square of squares) {
  square.addEventListener("click", handleClick, { once: true });
}
