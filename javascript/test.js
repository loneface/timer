const pauseBtn = document.getElementById("pauseBtn");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const halfCircles = document.querySelectorAll(".halfcircle");
const timer = document.querySelector(".timer");

let hr = 0;
let min = +prompt("daqiqa kiriting");
let sec = 0;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const starTime = Date.now();
const futureTime = starTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
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

  if (remainingTime < 0) {
    clearInterval(timerLoop);
    halfCircles[0].style.display = "none";
    halfCircles[1].style.display = "none";
    halfCircles[2].style.display = "none";

    timer.innerHTML = `
    <div>00</div>
    <div class="box">:</div>    
    <div>00</div>    
    <div class="box">:</div>    
    <div>00</div>    
    `;        
  }
}
