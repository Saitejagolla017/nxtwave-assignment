const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');

let timeInSeconds = 25 * 60;
let initialTime = timeInSeconds;
let timerInterval = null;
let isRunning = false;


const alarm = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs > 0 ? String(hrs).padStart(2, '0') + ':' : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeInSeconds);
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        if (timeInSeconds > 0) {
            timeInSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            alarm.play();
            isRunning = false;
        }
    }, 1000);
}


function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeInSeconds = initialTime;
    updateDisplay();
}

function setBreakTime(minutes) {
    stopTimer();
    timeInSeconds = minutes * 60;
    initialTime = timeInSeconds;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
shortBreakButton.addEventListener('click', () => setBreakTime(5));
longBreakButton.addEventListener('click', () => setBreakTime(15));

updateDisplay();
