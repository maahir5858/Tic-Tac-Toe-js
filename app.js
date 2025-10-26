const boxes = document.querySelectorAll(".js-box");
const resetBtn = document.querySelector(".js-reset-btn");
const newGameBtn = document.querySelector(".js-new-game-btn");
const msg = document.querySelector(".js-msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


function resetGame() {
  turnO = true;
  count = 0;
  enableBoxes();
  msg.classList.add("hidden");
}


function drawGame() {
  msg.innerText = "The Game is DRAW...";
  msg.classList.remove("hidden");
  disableBoxes();
}


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // player O
      box.innerText = "O";
      turnO = false;
    } else {
      // player X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      drawGame();
    }
  });
});


function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}
function enableBoxes() {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}


function showWinner(winner) {
  msg.innerText = `The WINNER is ${winner} !`;
  msg.classList.remove("hidden");
  disableBoxes();
}


function checkWinner() {
  winPatterns.forEach((pattern) => {
    const pos1Val = boxes[pattern[0]].innerText;
    const pos2Val = boxes[pattern[1]].innerText;
    const pos3Val = boxes[pattern[2]].innerText;
    
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  });
}


resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);
