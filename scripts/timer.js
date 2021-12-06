export default class Timer {
    constructor(
        seconds,
        minutes,
        hours,
        buttons,
        pomodoroSettings,
        alarmSound,
        buttonSound
    ) {
        this.s = {
            number: 0,
            HTML: seconds.querySelector("#seconds"),
            buttonUp: seconds.querySelector(".up"),
            buttonDown: seconds.querySelector(".down"),
        };

        this.m = {
            number: 0,
            HTML: minutes.querySelector("#minutes"),
            buttonUp: minutes.querySelector(".up"),
            buttonDown: minutes.querySelector(".down"),
        };

        this.h = {
            number: 0,
            HTML: hours.querySelector("#hours"),
            buttonUp: hours.querySelector(".up"),
            buttonDown: hours.querySelector(".down"),
        };
        this.state = false;
        this.icon = false;
        this.alarmSound = alarmSound;
        this.buttonSound = buttonSound;

        this.listButton = [
            this.s.buttonUp,
            this.s.buttonDown,
            this.m.buttonUp,
            this.m.buttonDown,
            this.h.buttonUp,
            this.h.buttonDown,
        ];

        this.timerAll = {
            stateButton: buttons.querySelector("#state"),
            changeButton: buttons.querySelector("#change"),
            icon: buttons.querySelector("#icon-tim"),
        };

        this.pomodoroAll = {
            startButton: buttons.querySelector("#state-pom"),
            breakButton: buttons.querySelector("#break"),
            longbreakButton: buttons.querySelector("#longBreak"),
            icon: buttons.querySelector("#icon-pom"),
        };

        this.mode = {
            button: buttons.querySelector("#setting"),
            state: true,
            working: true,
        };

        this.pomodoro = {
            settings: true,
            work: false,
            pomodoroSection: pomodoroSettings,
            inputBreak: pomodoroSettings.querySelector("#break-text"),
            inputWork: pomodoroSettings.querySelector("#work-text"),
            inputLongBreak: pomodoroSettings.querySelector("#long-break-text"),
            applyButton: pomodoroSettings.querySelector("#apply"),
            closeButton: pomodoroSettings.querySelector("#close"),
            data: {
                workNumber: 0,
                breakNumber: 0,
                longbreakNumber: 0,
            },
        };

        this.icons = {
            start: buttons.querySelector("#start"),
            pause: buttons.querySelector("#pause"),
        };

        this.s.buttonUp.addEventListener("click", () => {
            this.addTime(this.s);
        });
        this.m.buttonUp.addEventListener("click", () => {
            this.addTime(this.m);
        });
        this.h.buttonUp.addEventListener("click", () => {
            this.addTime(this.h);
        });

        this.s.buttonDown.addEventListener("click", () => {
            this.resTime(this.s);
        });
        this.m.buttonDown.addEventListener("click", () => {
            this.resTime(this.m);
        });
        this.h.buttonDown.addEventListener("click", () => {
            this.resTime(this.h);
        });

        this.timerAll.stateButton.addEventListener("click", () => {
            if (this.nIntervID == null) {
                this.startTime();
            } else {
                this.stopTime();
            }
        });
        this.timerAll.changeButton.addEventListener("click", () => {
            if (this.nIntervID != null) {
                this.stopTime();
            }
            this.icon = false;
            this.changeIcon();
            this.changeTime();
        });

        this.pomodoroAll.startButton.addEventListener("click", () => {
            if (this.nIntervID == null) {
                this.startTime();
            } else {
                this.stopTime();
            }
        });
        this.pomodoroAll.breakButton.addEventListener("click", () => {
            this.funtionPomodoro();
        });

        this.pomodoroAll.longbreakButton.addEventListener("click", () => {
            this.stopTime();
            this.updateTime(this.pomodoro.data.longbreakNumber);
            this.startTime();
            this.pomodoroAll.longbreakButton.classList.add("hide");
        });

        this.pomodoro.closeButton.addEventListener("click", () => {
            this.settings();
        });

        this.pomodoro.applyButton.addEventListener("click", () => {
            this.applyTime();
            this.updateTime(this.pomodoro.data.workNumber);
            this.settings();
        });

        this.mode.button.addEventListener("click", () => {
            if (this.mode.state) {
                this.pomodoroMode();
                this.mode.state = false;
                this.stopTime();
                if (this.state) {
                    this.changeTime();
                }
                this.pomodoroAll.startButton.innerHTML = "WORK";
            } else {
                this.timerMode();
                this.mode.state = true;
                this.stopTime();
            }
        });
    }

    startTime() {
        this.buttonSound.play();
        this.icon = true;
        this.changeIcon();
        if (this.state) {
            this.changeTime();
        }
        this.s.number = this.s.HTML.textContent;
        this.m.number = this.m.HTML.textContent;
        this.h.number = this.h.HTML.textContent;

        this.nIntervID = setInterval(() => {
            this.functionTimer();
        }, 1000);
    }

    stopTime() {
        this.buttonSound.play();
        clearInterval(this.nIntervID);
        this.nIntervID = null;
        this.icon = false;
        this.changeIcon();
    }

    addTime(t) {
        if (t.number < 59) {
            t.number++;
        }
        this.updateInterface();
    }
    resTime(t) {
        if (t.number > 0) {
            t.number--;
        }
        this.updateInterface();
    }

    changeTime() {
        if (this.state == false) {
            this.listButton.map((button) => {
                button.classList.remove("hide");
            });
            this.state = true;
            console.log("show " + this.state);
        } else {
            this.listButton.map((button) => {
                button.classList.add("hide");
            });
            this.state = false;
            console.log("hide");
        }
    }

    settings() {
        if (this.pomodoro.settings) {
            this.pomodoro.pomodoroSection.style.display = "none";
            this.pomodoro.settings = false;
        } else {
            this.pomodoro.pomodoroSection.style.display = "flex";
            this.pomodoro.settings = true;
        }
    }

    applyTime() {
        this.pomodoro.data.workNumber = this.pomodoro.inputWork.value;
        this.pomodoro.data.breakNumber = this.pomodoro.inputBreak.value;
        this.pomodoro.data.longbreakNumber = this.pomodoro.inputLongBreak.value;
    }

    changeIcon() {
        if (this.icon) {
            this.icons.start.classList.remove("hide");
            this.pomodoroAll.startButton.innerHTML = "STOP";
            this.icons.pause.classList.add("hide");
        } else {
            this.icons.start.classList.add("hide");
            this.pomodoroAll.startButton.innerHTML = "START";
            this.icons.pause.classList.remove("hide");
        }
    }

    pomodoroMode() {
        this.pomodoroAll.startButton.classList.remove("hide");
        this.pomodoroAll.breakButton.classList.remove("hide");
        this.pomodoroAll.icon.classList.remove("hide");
        this.mode.working = true;
        this.pomodoroAll.breakButton.innerHTML = "BREAK";
        this.pomodoroAll.longbreakButton.classList.add("hide");
        for (const key in this.timerAll) {
            if (Object.hasOwnProperty.call(this.timerAll, key)) {
                this.timerAll[key].classList.add("hide");
            }
        }
        this.pomodoro.settings = true;
        this.pomodoro.pomodoroSection.style.display = "flex";
        this.pomodoroAll.startButton.innerHTML = "WORK";
    }

    timerMode() {
        this.pomodoroAll.startButton.classList.add("hide");
        this.pomodoroAll.breakButton.classList.add("hide");
        this.pomodoroAll.icon.classList.add("hide");
        this.pomodoroAll.longbreakButton.classList.add("hide");
        this.s.number = 0;
        this.m.number = 0;
        this.h.number = 0;
        this.updateInterface();
        for (const key in this.timerAll) {
            if (Object.hasOwnProperty.call(this.timerAll, key)) {
                console.log(this.timerAll[key]);
                this.timerAll[key].classList.remove("hide");
            }
        }
    }

    updateTime(m) {
        this.s.number = 0;
        this.m.number = m % 60;
        this.h.number = Math.floor(m / 60);
        this.updateInterface();
    }

    //Algorith to calculate the timer
    functionTimer() {
        console.log("tick");
        if (this.s.number == 0) {
            if (this.m.number == 0) {
                if (this.h.number == 0) {
                    if (!this.mode.state) {
                        console.log("end");
                        this.funtionPomodoro();
                        this.alarmSound.play();
                    } else {
                        this.stopTime();
                    }
                } else {
                    this.h.number--;
                    this.m.number = 59;
                    this.s.number = 59;
                }
            } else {
                this.m.number--;
                this.s.number = 59;
            }
        } else {
            this.s.number--;
        }
        this.updateInterface();
    }

    funtionPomodoro() {
        if (this.mode.working) {
            this.stopTime();
            this.updateTime(this.pomodoro.data.breakNumber);
            this.startTime();
            this.mode.working = false;
            this.pomodoroAll.breakButton.innerHTML = "WORK";
            if (this.pomodoro.data.longbreakNumber > 0) {
                this.pomodoroAll.longbreakButton.classList.remove("hide");
            }
        } else {
            this.stopTime();
            this.updateTime(this.pomodoro.data.workNumber);
            this.startTime();
            this.mode.working = true;
            this.pomodoroAll.breakButton.innerHTML = "BREAK";
            if (this.pomodoro.data.longbreakNumber > 0) {
                this.pomodoroAll.longbreakButton.classList.add("hide");
            }
        }
    }

    //Fonction to update the time on the html code, we use padStart for always
    //have 2 numbers on it otherwise if is number 1 we will have 1 and not 01
    updateInterface() {
        this.s.HTML.textContent = this.s.number.toString().padStart(2, "0");
        this.m.HTML.textContent = this.m.number.toString().padStart(2, "0");
        this.h.HTML.textContent = this.h.number.toString().padStart(2, "0");
    }
}

// change positions and use grid for buttons