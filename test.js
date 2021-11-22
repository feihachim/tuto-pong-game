"use strict";

const playButton = document.querySelector(".play-game");
const player = document.querySelector(".player1");
const h2 = document.querySelector("h2");
const ai = document.querySelector(".ai");
const ball = document.querySelector(".ball");
let playerPositionY = 150;
let aiPositionY = 150;
let ballPositionX = 10;
let ballPositionY = 10;
let velocityX = 2;
let velocityY = 2;
let playerScore = 0;
let aiScore = 0;

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      if (playerPositionY > 10) {
        playerPositionY -= 10;
        player.style.transform = "translateY(-10px)";
      }
      player.style.top = playerPositionY + "px";
      break;
    case "ArrowDown":
      if (playerPositionY < 290) {
        playerPositionY += 10;
        player.style.transform = "translateY(10px)";
      }
      player.style.top = playerPositionY + "px";
      break;
  }
});

function prependZero(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number.toString();
  }
}

function play() {
  if (ballPositionY >= 195 && ballPositionX < 275) {
    velocityY = -velocityY;
  }
  if (ballPositionX >= 275) {
    velocityX = -velocityX;
  }
  if (ballPositionY <= -195) {
    velocityY = -velocityY;
  }
  if (ballPositionX <= -275) {
    console.log(
      "Position de la pagaie : " +
        playerPositionY +
        ", balle : " +
        ballPositionY
    );
  }
  if (ballPositionX <= -295) {
    ballPositionX = 0;
    ballPositionY = 0;
    aiScore++;
    h2.textContent = `${prependZero(playerScore)} - ${prependZero(aiScore)}`;
    if (aiScore === 10) {
      alert("GAME OVER");
      return;
    }
  }
  ballPositionX += velocityX;
  ballPositionY += velocityY;
  ai.style.top = (ballPositionY + 150) * 1 + "px";
  ball.style.transform =
    "translate(" + ballPositionX + "px," + ballPositionY + "px)";

  window.requestAnimationFrame(play);
}

window.addEventListener("load", (event) => {
  h2.textContent = `${prependZero(playerScore)} - ${prependZero(aiScore)}`;
});

playButton.addEventListener("click", (event) => {
  play();
});
