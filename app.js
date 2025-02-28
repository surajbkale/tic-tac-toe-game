let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let clickCount = 0;

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

const resetGame = () => {
    clickCount = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");

}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box was Clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    clickCount++;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

const showWinner = (winner) => {
  msg.innerText = `Congrats! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  newGameBtn.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
    msg.innerText = `Draw! No winner in this Game!`;
    msgContainer.classList.remove("hide");
    newGameBtn.classList.remove("hide");
    disableBoxes();
  };

const checkWinner = () => {
  for (const pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (
      pos1val != "" &&
      pos2val != "" &&
      pos3val != "" &&
      pos1val === pos2val &&
      pos2val === pos3val
    ) {
      console.log("Winner!", pos1val);
      showWinner(pos1val);
    } if(clickCount >= 9 && pos1val != pos2val && pos3val != pos2val) {
        showDraw();
    }
  }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);