let duration = 10_000;
let currentTime = duration
let start;
let timerStarted = false;
const displayedTime = document.getElementById("displayedTime");

const actx = new (window.AudioContext || window.webkitAudioContext)();
const sound = new Audio("audio/Chill_Alarm3.mp3");

const startColor = [32,139,112];
let currentColor = startColor;

const c = document.getElementById("myArc");
const ctx = c.getContext("2d");
ctx.lineWidth = 5;


document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("startButton");

    btn.addEventListener("click", () => {
        currentTime = duration;

        if (timerStarted){return;}

        actx.resume(); //unlock audio

        timerStarted = true;
        start = performance.now();
        const timer = setInterval(() => {
            elapsed = performance.now() - start;
            currentTime -= elapsed;
            currentColor = lerpColor([255, 0, 0], startColor, currentTime / duration);
            const color = rgbToCss(currentColor);
            document.body.style.background = `linear-gradient(to bottom, rgba(255, 255, 255, 0.295), ${color})`;
            drawArc(currentTime / duration * Math.PI * 2);
            
            if (currentTime <= 0) {
                clearInterval(timer);
                currentTime = 0;
                navigator.vibrate(500);
                sound.volume = 0.25;
                sound.play();
            }
            
            displayedTime.textContent = (currentTime / 1000).toFixed(3);
            start = performance.now();
        }, 10);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementsByClassName("timeButton");

    Array.from(btn).forEach(button => {
        button.addEventListener("click", () => {
            duration = parseInt(button.value) * 1000;
            displayedTime.textContent = (duration / 1000).toFixed(3);
        });
    });
});

function lerpColor(a, b, t) {
    const ar = a[0], ag = a[1], ab = a[2];
    const br = b[0], bg = b[1], bb = b[2];

    return [
        Math.round(ar + (br - ar) * t),
        Math.round(ag + (bg - ag) * t),
        Math.round(ab + (bb - ab) * t)
    ];
}

function rgbToCss([r, g, b]) {
    return `rgb(${r}, ${g}, ${b})`;
}

function drawArc(amount){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.strokeStyle = rgbToCss(currentColor);//"rgba(250, 50, 50, 1)";
    ctx.arc(200, 200, 100, Math.PI * 2, Math.max(amount, 0.001));
    ctx.stroke();
}



