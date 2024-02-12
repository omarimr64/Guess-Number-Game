"use strict";

// variables
const number = document.querySelector(".number");
const message = document.querySelector(".message").textContent;
const mark = number.textContent;
const checkButton = document.querySelector(".check");
const scoreText = document.querySelector(".score");

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = document.querySelector(".score").textContent;
let highScore = document.querySelector(".highscore").textContent;

// Functions
const errorAnimation = function (element) {
  element.classList.add("between-animation");
  element.addEventListener("animationend", function () {
    element.classList.remove("between-animation");
  });
  new Audio("audio/error2.mp3").play();
};

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// buttons
checkButton.addEventListener("click", function () {
  let guess = document.querySelector(".guess").value;

  if (!guess) {
    displayMessage("No number!");
  } else if (guess > 20 || guess < 1) {
    errorAnimation(document.querySelector(".between"));
  } else if (Number(guess) === secretNumber) {
    displayMessage("🎉 Correct Answer");
    document.querySelector("body").style.backgroundColor = "#60b347";
    number.style.width = "30rem";
    number.textContent = secretNumber;
    checkButton.style.display = "none";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (Number(guess) !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too high" : "Too low");
      score--;
      scoreText.textContent = score;
    } else {
      displayMessage("You lost the game");
      scoreText.textContent = 0;
      document.querySelector("body").style.backgroundColor = "red";
      number.style.width = "30rem";
      number.textContent = secretNumber;
      checkButton.style.display = "none";
    }
  }
});

document.querySelector(".again").addEventListener("click", () => {
  // reset the score
  score = 20;
  scoreText.textContent = score;

  // reset the number value
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // reset the message
  displayMessage(message);

  // reset the mark
  number.textContent = mark;

  // reset the value
  document.querySelector(".guess").value = "";

  // reset the background
  document.querySelector("body").style.backgroundColor = "#222";

  // reset the width
  number.style.width = "15rem";

  // display the check button
  checkButton.style.display = "initial";
});
