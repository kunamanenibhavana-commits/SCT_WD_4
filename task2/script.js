let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timer = null;
let running = false;
let lapCounter = 1;

// Display Elements
const minDisplay = document.getElementById("minutes");
const secDisplay = document.getElementById("seconds");
const msDisplay = document.getElementById("milliseconds");

// Buttons
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

// Lap List
const lapList = document.getElementById("lapList");

// Update Stopwatch Display
function updateDisplay() {

    minDisplay.textContent = String(minutes).padStart(2, "0");
    secDisplay.textContent = String(seconds).padStart(2, "0");
    msDisplay.textContent = String(milliseconds).padStart(2, "0");

}

// Stopwatch Logic
function runStopwatch() {

    milliseconds++;

    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    updateDisplay();

}

// Start
startBtn.addEventListener("click", () => {

    if (!running) {

        timer = setInterval(runStopwatch, 10);
        running = true;

        startBtn.innerHTML = "✔ Running";
        startBtn.disabled = true;

    }

});

// Pause
pauseBtn.addEventListener("click", () => {

    clearInterval(timer);
    running = false;

    startBtn.innerHTML = "▶ Start";
    startBtn.disabled = false;

});

// Reset
resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    running = false;

    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    lapCounter = 1;

    updateDisplay();

    lapList.innerHTML = "";

    startBtn.innerHTML = "▶ Start";
    startBtn.disabled = false;

});

// Lap
lapBtn.addEventListener("click", () => {

    if (!running) return;

    const lap = document.createElement("li");

    lap.innerHTML = `
        <span>Lap ${lapCounter}</span>
        <strong>
        ${String(minutes).padStart(2, "0")} :
        ${String(seconds).padStart(2, "0")} :
        ${String(milliseconds).padStart(2, "0")}
        </strong>
    `;

    lapList.prepend(lap);

    lapCounter++;

});

// Initialize
updateDisplay();