export default class Timer {
    constructor(seconds, minutes, hours, stateButton, changeButton) {
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
        this.stateButton = stateButton;
        this.changeButton = changeButton;
        this.listButton = [
            this.s.buttonUp,
            this.s.buttonDown,
            this.m.buttonUp,
            this.m.buttonDown,
            this.h.buttonUp,
            this.h.buttonDown,
        ];

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

        this.stateButton.addEventListener("click", () => {
            if (this.nIntervID == null) {
                this.startTime();
            } else {
                this.stopTime();
            }
        });
        this.changeButton.addEventListener("click", () => {
            if (this.nIntervID != null) {
                this.stopTime();
            }
            this.changeTime();
        });
    }

    startTime() {
        if (this.state) {
            console.log("changing");
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
        clearInterval(this.nIntervID);
        this.nIntervID = null;
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

    //Algorith to calculate the timer
    functionTimer() {
        console.log("tick");
        if (this.s.number == 0) {
            if (this.m.number == 0) {
                if (this.h.number == 0) {
                    this.stopTime();
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

    //Fonction to update the time on the html code, we use padStart for always
    //have 2 numbers on it otherwise if is number 1 we will have 1 and not 01
    updateInterface() {
        this.s.HTML.textContent = this.s.number.toString().padStart(2, "0");
        this.m.HTML.textContent = this.m.number.toString().padStart(2, "0");
        this.h.HTML.textContent = this.h.number.toString().padStart(2, "0");
    }
}