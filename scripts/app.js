import Timer from "./timer.js";
const seconds = document.querySelector("#seconds-container");
const minutes = document.querySelector("#minutes-container");
const hours = document.querySelector("#hours-container");
const stateButton = document.querySelector("#state");
const changeButton = document.querySelector("#change");

const countDown = new Timer(seconds, minutes, hours, stateButton, changeButton);