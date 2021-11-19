"use strict";

const canvas = document.querySelector("#canvas");
canvas.width = 600;
canvas.height = 400;
canvas.textContent = "Le canvas n'est pas supporté par votre navigateur.";
const context = canvas.getContext("2d");

// Some other variables

const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

// Some other variables end

//Objects

//net
const net = {
  x: canvas.width / 2 - netWidth / 2,
  y: 0,
  width: netWidth,
  height: netHeight,
  color: "white",
};

//user paddle
const user = {
  x: 10,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

const ai = {
  x: canvas.width - paddleWidth - 10,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

//ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 7,
  speed: 7,
  velocityX: 5,
  velocityY: 5,
  color: "#05edff",
};

//Objects end

//drawing functions
function drawNet() {
  context.fillStyle = net.color;
  context.fillRect(net.x, net.y, net.width, net.height);
}

function drawScore(x, y, score) {
  context.fillStyle = "white";
  context.font = "35px sans-serif";
  context.fillText(score, x, y);
}

function drawPaddle(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
}

//drawing functions end

function render() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawNet();
  drawScore(canvas.width / 4, canvas.height / 6, user.score);
  drawScore((3 * canvas.width) / 4, canvas.height / 6, ai.score);
  drawPaddle(user.x, user.y, user.width, user.height, user.color);
  drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawBall(ball.x, ball.y, ball.radius, ball.color);
}

window.addEventListener("keydown", keyDownHandler);
window.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  switch (event.keyCode) {
    case 38:
      upArrowPressed = true;
      break;
    case 40:
      downArrowPressed = true;
      break;
  }
}

function keyUpHandler(event) {
  switch (event.keyCode) {
    case 38:
      upArrowPressed = false;
      break;
    case 40:
      downArrowPressed = false;
      break;
  }
}

// reset the ball
function reset() {
  // reset ball's value to older values
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;

  // changes the direction of ball
  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;
}

// collision Detect function
function collisionDetect(player, ball) {
  // returns true or false
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

  return (
    ball.left < player.right &&
    ball.top < player.bottom &&
    ball.right > player.left &&
    ball.bottom > player.top
  );
}

function update() {
  //move the paddles
  if (upArrowPressed && user.y > 0) {
    user.y -= 8;
  } else if (downArrowPressed && user.y < canvas.height - user.height) {
    user.y += 8;
  }

  //check if ball hits top or bottom wall
  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    // play wallHitSound

    ball.velocityY = -ball.velocityY;
  }

  // if ball hit on right wall
  if (ball.x + ball.radius >= canvas.width) {
    // play scoreSound

    // then user scored 1 point
    user.score += 1;
    reset();
  }

  // if ball hit on left wall
  if (ball.x - ball.radius <= 0) {
    // play scoreSound

    // then ai scored 1 point
    ai.score += 1;
    reset();
  }
  //move the ball
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  //ai paddle movement
  ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.09;
  //collision detection on padles
  let player = ball.x < canvas.width / 2 ? user : ai;

  if (collisionDetect(player, ball)) {
    // play hitSound

    // default angle is 0deg in Radian
    let angle = 0;

    // if ball hit the top of paddle
    if (ball.y < player.y + player.height / 2) {
      // then -1 * Math.PI / 4 = -45deg
      angle = (-1 * Math.PI) / 4;
    } else if (ball.y > player.y + player.height / 2) {
      // if it hit the bottom of paddle
      // then angle will be Math.PI / 4 = 45deg
      angle = Math.PI / 4;
    }

    /* change velocity of ball according to on which paddle the ball hitted */
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // increase ball speed
    ball.speed += 0.2;
  }
}

function gameLoop() {
  update();
  render();
}

setInterval(gameLoop, 1000 / 60);
