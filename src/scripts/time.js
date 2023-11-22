
export function hoursf() {
    let hours = new Date().getHours();
    if (hours <= 9) {
        return "0" + hours;
    } else {
        return hours;
    }
}

export function minutesf() {
    let minutes = new Date().getMinutes();
    if (minutes <= 9) {
        return "0" + minutes;
    } else {
        return minutes;
    }
}

export function secondsf() {
    let seconds = new Date().getSeconds();
    if (seconds <= 9) {
        return "0" + seconds;
    } else {
        return seconds;
    }
}

