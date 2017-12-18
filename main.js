const player = document.querySelector('.video-player');
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const mute = document.querySelector('.mute');
const volume = document.querySelector('.volume');
const fullScreen = document.querySelector('.fullScreen-button');
const slider = document.querySelector('.slider');
const cursor = document.querySelector('.cursor');
const controls = document.querySelector('.media-controls');



//FUNCTIONS

function isPlaying(){
    if (player.paused){
        player.play();
        play.innerHTML = '<img src="img/pause.png">';
    }else {
        player.pause();
        play.innerHTML = '<img src="img/play.png">';

    }
}




function toggleMute(){
    player.muted = !player.muted;
}


function setVolume(value) {
    player.volume = Math.max(Math.min(value, 1), 0);
}


// PLAY

play.addEventListener('click', isPlaying);
player.addEventListener('click', isPlaying);


// STOP

stop.addEventListener('click', function () {
    player.pause();
    player.currentTime = 0;
    play.innerHTML = '<img src="img/play.png">';
});


document.body.onkeyup = function(e){
    if(e.keyCode === 32){
        isPlaying();
    }
};


// MUTE
mute.addEventListener('click', toggleMute);

// VOLUME
volume.addEventListener('change', (ev) => setVolume(ev.target.value));


// FULL SCREEN

fullScreen.addEventListener('click', function () {
    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
    }

});

// SLIDER

slider.addEventListener('click', function (ev) {
    const coeff = (ev.clientX - slider.getBoundingClientRect().x) / slider.getBoundingClientRect().width;
    player.currentTime = coeff * player.duration;
});





setInterval(function () {

    // Update timer track slider
    const trackWidth = slider.getBoundingClientRect().width - cursor.getBoundingClientRect().width;
    const coeff = player.currentTime / player.duration;
    cursor.style.marginLeft = (coeff * trackWidth) + 'px';

    // Check if video ended
    if(player.currentTime === player.duration){
        player.pause();
        player.currentTime = 0;
        play.innerHTML = '<img src="img/play.png">';
    }
}, 100);


