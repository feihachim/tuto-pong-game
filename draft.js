"use strict";

// Classes
class Ball {
  constructor(x, y, radius, speed, velocityX, velocityY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
  }

  reset(canvas) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speed = 7;
    this.velocityX = -this.velocityX;
    this.velocityY = -this.velocityY;
  }
}

class Net {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

class Player {
  constructor(x, y, width, height, color, score) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.score = score;
    this.upArrowPressed = false;
    this.downArrowPressed = false;
  }

  keyDownHandler(event) {
    switch (event.keyCode) {
      case 38:
        this.upArrowPressed = true;
        break;
      case 40:
        this.downArrowPressed = true;
        break;
    }
  }

  keyUpHandler(event) {
    switch (event.keyCode) {
      case 38:
        this.upArrowPressed = false;
        break;
      case 40:
        this.downArrowPressed = false;
        break;
    }
  }
}

class Canvas {
  constructor(width, height, user, ai, ball, net) {
    this.canvas = document.querySelector("#canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.textContent =
      "Le canvas n'est pas supporté par votre navigateur.";
    this.user = user;
    this.ai = ai;
    this.ball = ball;
    this.net = net;
  }

  drawCanvas() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawNet() {
    this.context.fillStyle = this.net.color;
    this.context.fillRect(
      this.net.x,
      this.net.y,
      this.net.width,
      this.net.height
    );
    console.log("net width : " + this.net.width);
  }

  drawScore(x, y, player) {
    this.context.fillStyle = "white";
    this.context.font = "35px sans-serif";
    this.context.fillText(player.score, x, y);
  }

  drawPaddle(player) {
    this.context.fillStyle = player.color;
    this.context.fillRect(player.x, player.y, player.width, player.height);
  }

  drawBall() {
    this.context.fillStyle = this.ball.color;
    this.context.beginPath();
    this.context.arc(
      this.ball.x,
      this.ball.y,
      this.ball.radius,
      0,
      Math.PI * 2,
      false
    );
    this.context.closePath();
    this.context.fill();
  }

  render() {
    this.drawCanvas();
    this.drawNet();
    this.drawScore(canvas.width / 4, canvas.height / 6, this.user);
    this.drawScore((3 * this.canvas.width) / 4, canvas.height / 6, this.ai);
    this.drawPaddle(this.user);
    this.drawPaddle(this.ai);
    this.drawBall();
  }

  gameLoop() {
    this.render();
  }
}

//Constantes
const canvasWidth = 600;
const canvasHeight = 400;
const netWidth = 4;
const netHeight = canvasHeight;
const paddleWidth = 10;
const paddleHeight = 100;

//Variables
let ball = new Ball(canvasWidth / 2, canvasHeight / 2, 7, 7, 5, 5, "#05edff");
let net = new Net(
  canvasWidth / 2 - netWidth / 2,
  0,
  netWidth,
  netHeight,
  "white"
);
console.log(net);
let user = new Player(
  10,
  canvasHeight / 2 - paddleHeight / 2,
  paddleWidth,
  paddleHeight,
  "white",
  0
);
let ai = new Player(
  canvasWidth - paddleWidth - 10,
  canvasHeight / 2 - paddleHeight / 2,
  paddleWidth,
  paddleHeight,
  "white",
  0
);
let canvas = new Canvas(canvasWidth, canvasHeight, user, ai, ball, net);
window.addEventListener("keydown", canvas.user.keyDownHandler);
window.addEventListener("keyup", canvas.user.keyUpHandler);
canvas.gameLoop();
