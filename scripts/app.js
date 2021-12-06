import Timer from "./timer.js";
const seconds = document.querySelector("#seconds-container");
const minutes = document.querySelector("#minutes-container");
const hours = document.querySelector("#hours-container");
const buttons = document.querySelector("#buttons");
const pomodoroSettings = document.querySelector("#pomodoro-section");
var alarm = new Audio("../sounds/alarm.mp3");
var buttonSound = new Audio("../sounds/button.mp3");

const countDown = new Timer(
    seconds,
    minutes,
    hours,
    buttons,
    pomodoroSettings,
    alarm,
    buttonSound
);