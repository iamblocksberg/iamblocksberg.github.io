// Start: 2023/01/24 20:00
// Type: string[]
var targetNumber = [];
const targetLength = 4;

const textInput = document.querySelector("#text-input");
const log = document.querySelector("#log");
const boxInput = document.querySelector("#box-input");
const playAgainBtn = document.querySelector("#play-again");
const form = document.querySelector("#form");

function genNumber() {
  while (targetNumber.length < targetLength) {
    let x = Math.floor(Math.random() * 10);
    x = x.toString();

    if (!isAdded(x)) {
      targetNumber.push(x);
    }
  }
  //   console.log("targetNumber", targetNumber);
}

function isAdded(n) {
  for (const item of targetNumber) {
    if (item === n) return true;
  }
  return false;
}

function checkInput() {
  let countA = 0;
  let countB = 0;
  let result = "";

  if (textInput.value.length < 1) return;
  if (textInput.value.trim().length != targetLength) return;
  if (isInputRepeatNumber()) return;

  for (let i = 0; i < textInput.value.length; i++) {
    const x = textInput.value[i];
    if (targetNumber[i] === x) {
      countA++;
    } else if (isAdded(x)) {
      countB++;
    }
  }

  result = `${textInput.value} = `;
  if (countA > 0) result += `${countA}A `;
  if (countB > 0) result += `${countB}B `;
  if (countA <= 0 && countB <= 0) result += "0";
  printToDisplay(result);
  textInput.value = "";
  textInput.focus();

  if (countA === targetLength) onFinishGame();
}

function isInputRepeatNumber() {
  const x = textInput.value.trim();
  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x.length; j++) {
      if (i === j) continue;

      const x1 = x[i];
      const x2 = x[j];
      if (x1 === x2) return true;
    }
  }
  return false;
}

function printToDisplay(text) {
  log.innerHTML += text + "<br>";
}

function onSubmit(event) {
  event.preventDefault();
  checkInput();
}

function onPlayAgain() {
  window.location.reload();
}

function onFinishGame() {
  boxInput.style.display = "none";
  playAgainBtn.style.display = "block";
  printToDisplay("<br>YOU WIN!!!");
}

function run() {
  form.addEventListener("submit", onSubmit);

  genNumber();
  textInput.focus();
  printToDisplay("4 Digit Game<br>");
}

run();

/*
TODO
- count used time
- count amount of input
- restart button
*/
