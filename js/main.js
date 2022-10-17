const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
let timer = document.getElementById("timer");
let audio_jump = new Audio('./audio/jump.wav');
let audio_game_over = new Audio('./audio/dead.wav');
let timeInSec = 0;
let timer_interval;

function start_time() {
    if (timer_interval) {
        clearInterval(timer_interval);
    }

    timer_interval = setInterval(function () {
        timeInSec += 1;
        convertSecondsToTime();
    }, 10);

}

function convertSecondsToTime() {
    given_seconds = timeInSec;

    dateObj = new Date(given_seconds * 10);
    minutes = dateObj.getUTCMinutes();
    seconds = dateObj.getSeconds();
    miliSeconds = dateObj.getMilliseconds();

    timeString =
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0") +
        ":" +
        (miliSeconds / 10).toString().padStart(2, "0");

    timer.textContent = timeString;
}

function reset_time() {
    clearInterval(timer_interval);
    timeInSec = 0;
    timer.textContent = "00:00:00";
}

function jump() {
    if (dino.classList != 'jump') {
        dino.classList.add('jump')
    }
    setTimeout(function () {
        dino.classList.remove('jump')
    }, 600)
    audio_jump.play();
}

document.addEventListener('keyup', function () {
    jump();
});

let live = setInterval(function () {
    let topDino = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    let rightCactus = parseInt(window.getComputedStyle(cactus).getPropertyValue('right'));

    if (rightCactus > 505 && rightCactus < 540 && topDino > -85) {
        audio_game_over.play();
        reset_time();
        alert('PERDISTE :( ' + "\n" + "Tu tiempo: " + `${timeString}`);
        document.body.classList.add('preload');
    }

}, 10);

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        document.body.classList.remove('preload');
        start_time()
    }
})


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {

    if (window.innerHeight > window.innerWidth) {
        alert("Rote su teléfono por favor");
    }

    document.addEventListener('touchstart', function () {
        jump();
    });

    document.addEventListener('touchstart', event => {
        if (event) {
            document.body.classList.remove('preload');
            start_time()
        }
    })

};