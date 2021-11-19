"use strict";

class Canvas {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.canvas.textContent =
      "Le canvas n'est pas supporté par votre navigateur.";
  }

  drawNet(net) {
    this.context.fillStyle = net.color;
    this.context.fillRect(net.x, net.y, net.width, net.height);
  }
}

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
