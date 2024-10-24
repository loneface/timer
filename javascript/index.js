const pauseBtn = document.getElementById("pauseBtn");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const halfCircles = document.querySelectorAll(".halfcircle");
const timer = document.querySelector(".timer");

let hr = 0;
let min = +prompt("Daqiqa kiriting");
let sec = 0;

let intervalId;
let isPaused = true;
let remainingTime, futureTime, setTime;

function initializeTimer() {
  const hours = hr * 3600000;
  const minutes = min * 60000;
  const seconds = sec * 1000;
  setTime = hours + minutes + seconds;
  remainingTime = setTime;
  futureTime = Date.now() + remainingTime;
  updateDisplay();
}

function updateDisplay() {
  const hrs = Math.floor(
    (remainingTime / (1000 * 60 * 60)) % 24
  ).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2, useGrouping: false }
  );
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer.innerHTML = `
    <div>${hrs}</div>
    <div class="box">:</div>
    <div>${mins}</div>
    <div class="box">:</div>
    <div>${secs}</div>
  `;
}

function countDownTimer() {
  const currentTime = Date.now();
  remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * 360;

  if (angle > 180) {
    halfCircles[2].style.display = "none";
    halfCircles[0].style.transform = "rotate(180deg)";
    halfCircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    halfCircles[2].style.display = "block";
    halfCircles[0].style.transform = `rotate(${angle}deg)`;
    halfCircles[1].style.transform = `rotate(${angle}deg)`;
  }

  updateDisplay();

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    halfCircles.forEach((circle) => (circle.style.display = "none"));
    timer.innerHTML = `
      <div>00</div>
      <div class="box">:</div>
      <div>00</div>
      <div class="box">:</div>
      <div>00</div>
    `;

    function playMusic() {
      let audio = new Audio("audio.wav");
      audio.play();
    }
  }
}

function startTimer() {
  if (isPaused) {
    futureTime = Date.now() + remainingTime;
    intervalId = setInterval(countDownTimer, 1000);
    isPaused = false;
  }
}

function pauseTimer() {
  if (!isPaused) {
    clearInterval(intervalId);
    isPaused = true;
  }
}

function resetTimer() {
  clearInterval(intervalId);
  isPaused = true;
  initializeTimer();
  halfCircles.forEach((circle) => (circle.style.display = "none"));
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

initializeTimer();
