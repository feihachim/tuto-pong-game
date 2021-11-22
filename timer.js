"use strict";

const timer = document.querySelector(".timer");
const sessionLength = document.querySelector(".session-length");
const breakLength = document.querySelector(".break-length");
const decrementSession = document.querySelector(".decrement-session");
const decrementBreak = document.querySelector(".decrement-break");
const buttonTimer = document.querySelector("#play-pause");
const incrementSession = document.querySelector(".increment-session");
const incrementBreak = document.querySelector(".increment-break");
const audioElement = document.querySelector("audio");
let idTimer;
let playStatus = false;
let sessionTimer = 1500;
let breakTimer = 300;
function prependZero(number) {
  let result;
  if (number < 10) {
    result = "0" + number;
  } else {
    result = number.toString();
  }
  return result;
}
function decrementTime(timer) {
  if (timer > 0) {
    timer -= 1;
  }
  return displayTime(timer);
}

function toggle(value) {
  return !value;
}

function playTimer(e) {
  playStatus = toggle(playStatus);
  if (sessionTimer > 0 && playStatus) {
    idTimer = setInterval(() => {
      sessionTimer--;
      timer.textContent = displayTime(sessionTimer);
    }, 1000);
  } else {
    clearInterval(idTimer);
  }
}

function displayTime(timer) {
  let seconds = timer % 60;
  let minutes = (timer - seconds) / 60;
  return `${prependZero(minutes)}:${prependZero(seconds)}`;
}

decrementSession.addEventListener("click", (event) => {
  if (sessionTimer > 60) {
    sessionTimer -= 60;
    sessionLength.textContent = Math.floor(sessionTimer / 60);
    timer.textContent = displayTime(sessionTimer);
  }
});

incrementSession.addEventListener("click", (event) => {
  if (sessionTimer < 3600) {
    sessionTimer += 60;
    sessionLength.textContent = Math.floor(sessionTimer / 60);
    timer.textContent = displayTime(sessionTimer);
  }
});

decrementBreak.addEventListener("click", (event) => {
  if (breakTimer > 60) {
    breakTimer -= 60;
    breakLength.textContent = Math.floor(breakTimer / 60);
  }
});

incrementBreak.addEventListener("click", (event) => {
  if (breakTimer < 3600) {
    breakTimer += 60;
    breakLength.textContent = Math.floor(breakTimer / 60);
  }
});

window.addEventListener("load", (event) => {
  sessionLength.textContent = Math.floor(sessionTimer / 60);
  breakLength.textContent = Math.floor(breakTimer / 60);
  timer.textContent = displayTime(sessionTimer);
});
buttonTimer.addEventListener("click", playTimer);
