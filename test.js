"use strict";
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const ball = document.querySelector(".ball");
let player1PositionY = 150;
let player2PositionY = 150;

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      if (player2PositionY > 10) {
        player2PositionY -= 10;
        player2.style.transform = "translateY(-10px)";
      }
      player2.style.top = player2PositionY + "px";
      break;
    case "ArrowDown":
      if (player2PositionY < 290) {
        player2PositionY += 10;
        player2.style.transform = "translateY(10px)";
      }
      player2.style.top = player2PositionY + "px";
      break;
    case "KeyA":
      if (player1PositionY > 10) {
        player1PositionY -= 10;
        player1.style.transform = "translateY(-10px)";
      }
      player1.style.top = player1PositionY + "px";
      break;
    case "KeyZ":
      if (player1PositionY < 290) {
        player1PositionY += 10;
        player1.style.transform = "translateY(10px)";
      }
      player1.style.top = player1PositionY + "px";
      break;
  }
});
