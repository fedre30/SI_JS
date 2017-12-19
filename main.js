const controlsHideTime = 4000;

const playerContainer = document.querySelector('.player-container');
const player = document.querySelector('.video-player');
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const mute = document.querySelector('.mute');
const volumeImg = document.querySelector('.volume-img')
const volume = document.querySelector('.volume');
const fullScreen = document.querySelector('.fullScreen-button');
const slider = document.querySelector('.slider');
const cursor = document.querySelector('.cursor');
const controls = document.querySelector('.media-controls');
const timeLeft = document.querySelector('.duration');
let controlsCanHide = true;
let hideControlsTimeout = null;
const volumeOverlay = document.querySelector('.volumeOverlay');


//FUNCTIONS
function togglePlaying(){
    if (player.paused){
        player.play();
        play.querySelector("img").src = "img/pause.png";
    }else {
        player.pause();
        play.querySelector("img").src = "img/play.png";
    }
}

function setMuted(isMuted){
    player.muted = isMuted;

    if (player.muted) {
        volume.value = 0;
        volumeImg.src = 'img/mute.png';
    } else {
        volume.value = player.volume;
        volumeImg.src = 'img/volume.png';
    }
}


function setVolume(value) {
    setMuted(false);
    player.volume = Math.max(Math.min(value, 1), 0);

}

function formatTime(time)
{
    if (time < 1) return '00:00';

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60); // modulo 60 is useful if the time is longer than one hour
    const seconds = Math.floor(time % 60);

    let formattedTime = "";

    if (hours !== 0) {
        formattedTime += hours + ':';
    }

    formattedTime += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

    return formattedTime;
}


// PLAY

play.addEventListener('click', togglePlaying);
player.addEventListener('click', togglePlaying);


// STOP

stop.addEventListener('click', function () {
    player.pause();
    player.currentTime = 0;
    play.innerHTML = '<img src="img/play.png">';
});


document.body.onkeyup = function(e){
    if(e.keyCode === 32){
        togglePlaying();
    }
};



// VOLUME
volume.addEventListener('input', (ev) => setVolume(ev.target.value));

volumeImg.addEventListener('click', function () {
    setMuted(!player.muted);
});


// FULL SCREEN
function toggleFullscreen() {

    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement)
    {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozExitFullScreen) {
            document.mozExitFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        playerContainer.classList.remove('fullscreen');
        fullScreen.querySelector("img").src = "img/full_screen.png";
    } else {
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        }

        playerContainer.classList.add('fullscreen');
        fullScreen.querySelector("img").src = "img/shrink.png";

    }
}

player.addEventListener('dblclick', toggleFullscreen);
fullScreen.addEventListener('click', toggleFullscreen);

// SLIDER

slider.addEventListener('click', function (ev) {
    const coeff = (ev.clientX - slider.getBoundingClientRect().x) / slider.getBoundingClientRect().width;
    player.currentTime = coeff * player.duration;
});




player.addEventListener('timeupdate', function () {
    // Update timer track slider
    const trackWidth = slider.getBoundingClientRect().width;
    const coeff = player.currentTime / player.duration;
    cursor.style.width = (coeff  * trackWidth) + 'px';
    timeLeft.innerHTML =  formatTime(player.currentTime % 60) + '/' + formatTime(player.duration);


    // Check if video ended
    if(player.currentTime === player.duration){
        player.pause();
        player.currentTime = 0;
        play.innerHTML = '<img src="img/play.png">';
    }
});

// CONTROLS
function hideControls() {
    if (player.paused) return;
    controls.classList.add('hidden');
}

function showControls() {
    controls.classList.remove('hidden');
}

player.addEventListener('play', function() {
    if (false === controlsCanHide) return;


    hideControlsTimeout = setTimeout(function() {
        hideControls();
    }, controlsHideTime);
});

player.addEventListener('mousemove', function() {
    clearTimeout(hideControlsTimeout);
    showControls();

    if (false === controlsCanHide) return;

    hideControlsTimeout = setTimeout(function() {
        hideControls();
    }, controlsHideTime);
});

player.addEventListener('pause', function() {
    clearTimeout(hideControlsTimeout);
    showControls();
});

controls.addEventListener('mouseenter', function() {
    controlsCanHide = false;
    clearTimeout(hideControlsTimeout);
    showControls();
}, true);

controls.addEventListener('mouseleave', function() {
    controlsCanHide = true;
}, true);

// INIT
player.volume = volume.value;