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
const tags = document.querySelectorAll('.tags');
let controlsCanHide = true;
let hideControlsTimeout = null;
const volumeOverlay = document.querySelector('.volumeOverlay');

var moviesContainer = document.querySelector(".allMovies");
var titleMovie = document.querySelector(".titleMovie");
var author = document.querySelector(".author");
var description = document.querySelector(".description");
var recentMovieContainer = document.querySelector(".recent");
var notreSelectionContainer = document.querySelector(".notreSelection");
var dataMovies = data.films;

var currenta;

function generateMovies(container, films) {
  for (let i = 0; i < films.length; i++) {
    let videoGrid = document.createElement("div");
    videoGrid.classList.add("videoGrid");
    videoGrid.dataset.category = films[i].category;
    container.appendChild(videoGrid);

    videoGrid.setAttribute("data-title", films[i].title);

    let imgMovie = document.createElement("img");
    imgMovie.classList.add("imgMovieMini");
    imgMovie.setAttribute("src", "img/miniatures/" + films[i].img);
    videoGrid.appendChild(imgMovie);

    let hoverVideoContainer = document.createElement("div");
    hoverVideoContainer.classList.add("hoverVideoContainerAllMovies");
    videoGrid.appendChild(hoverVideoContainer);

    let titleMovie = document.createElement("div");
    titleMovie.classList.add("titleMovie");
    titleMovie.textContent = films[i].title;
    hoverVideoContainer.appendChild(titleMovie);

    let playButtonContainer = document.createElement("div");
    playButtonContainer.classList.add("playButtonContainer");
    hoverVideoContainer.appendChild(playButtonContainer);

    let playButtonImg = document.createElement("img");
    playButtonImg.classList.add("playButtonImg");
    playButtonImg.setAttribute('src', 'img/logo_plus.png');
    playButtonContainer.appendChild(playButtonImg);

    hoverVideoContainer.addEventListener("click", function() {
      currenta = videoGrid.getAttribute("data-title");
      console.log(videoGrid)

      overlayPop(currenta);
    });
  }
}

//création des cases des films Notre Selection et du contenu des hover
var ratingDataMovies = [];
for (var z = 0; z < dataMovies.length; z++) {
  if (dataMovies[z].rating == 5) {
    console.log(ratingDataMovies);
    ratingDataMovies.push(dataMovies[z]);
  }
  if (recentMovieContainer.children.length >= 3) {
    y = 999;
  }
}
generateMovies(notreSelectionContainer, ratingDataMovies);

//création des cases de tous les films et du contenu des hover
generateMovies(moviesContainer, dataMovies);

//création des cases des films récents et du contenu des hover
var recentDataMovies = [];
for (var y = 0; y < dataMovies.length; y++) {
  if (dataMovies[y].year == 2017 || dataMovies[y].year == 2016) {
    console.log(ratingDataMovies);
    recentDataMovies.push(dataMovies[y]);
  }
  if (recentMovieContainer.children.length >= 3) {
    y = 999;
  }
}
generateMovies(recentMovieContainer, recentDataMovies);

//Séléction des élèments du DOM générés dans l'overlay
var body = document.querySelector("body");
var allMoviesPlayButton = document.querySelectorAll(".hoverVideoContainerAllMovies");
var playButtonContainerRecent = document.querySelectorAll(".hoverVideoContainerRecent");
var plusButtonContainerSelection = document.querySelectorAll(".hoverVideoContainerSelection");
var overlayVideo = document.querySelector(".overlayContainer");
var overlayLowOpacity = document.querySelector(".overlayLowOpacity");
var retourTitle = document.querySelector(".retourTitle");
var imgContainer = document.querySelector(".imgContainer");
var overlayMovieTitle = document.querySelector(".overlayMovieTitle");
var overlayStars = document.querySelector(".overlayStars");
var overlayRating = document.querySelector(".overlayRating");
var overlayDuration = document.querySelector(".overlayDuration");
var overlayDate = document.querySelector(".overlayDate");
var overlayDescription2 = document.querySelector(".overlayDescription2");
var overlayGenre = document.querySelector(".overlayGenre");
var star0 = document.querySelector(".star0");
var star1 = document.querySelector(".star1");
var star2 = document.querySelector(".star2");
var star3 = document.querySelector(".star3");
var star4 = document.querySelector(".star4");
var star5 = document.querySelector(".star5");
var imgOverlay = document.createElement("img");
var videoGrid = document.querySelector(".videoGrid");


function overlaySuppr() {
  overlayVideo.style.display = "none";
  overlayLowOpacity.style.display = "none";
  imgOverlay.classList.remove("imgOverlay");
  star0.style.display = 'none';
  star1.style.display = 'none';
  star2.style.display = 'none';
  star3.style.display = 'none';
  star4.style.display = 'none';
  star5.style.display = 'none';
  body.style.overflow = "visible";
}
//évènement clic sur le bouton retour
retourTitle.addEventListener("click", function() {
  overlaySuppr();
});

//clic sur l'opacité pour quitter la vidéo
overlayLowOpacity.addEventListener("click", function() {
  overlaySuppr();


});



//fonction qui fait pop l'overlay avec les infos nécéssaires
function overlayPop(title) {
  body.style.overflow = "hidden";

  for (var i = 0; i < dataMovies.length; i++) {
    console.log(dataMovies[i].title, title)
    if (dataMovies[i].title === title) {
      imgOverlay.classList.add("imgOverlay");
      imgOverlay.setAttribute('src', 'img/miniatures/' + dataMovies[i].img);
      imgContainer.appendChild(imgOverlay);

      overlayMovieTitle.innerHTML = dataMovies[i].title;
      overlayRating.innerHTML = dataMovies[i].rating + "/5";
      overlayDuration.innerHTML = dataMovies[i].duration + " min";
      overlayDate.innerHTML = dataMovies[i].year;
      overlayDescription2.innerHTML = dataMovies[i].description;
      overlayGenre.innerHTML = dataMovies[i].category;

      if (Math.floor(dataMovies[i].rating) === 0) {
        star0.style.display = 'inline';
      }
      if (Math.floor(dataMovies[i].rating) === 1) {
        star1.style.display = 'inline';
      }
      if (Math.floor(dataMovies[i].rating) === 2) {
        star2.style.display = 'inline';
      }
      if (Math.floor(dataMovies[i].rating) === 3) {
        star3.style.display = 'inline';
      }
      if (Math.floor(dataMovies[i].rating) === 4) {
        star4.style.display = 'inline';
      }
      if (Math.floor(dataMovies[i].rating) === 5) {
        star5.style.display = 'inline';
      }

      break;
    }
  }

  overlayVideo.style.display = "block";
  overlayLowOpacity.style.display = "block";

  document.body.onkeyup = function(e) {
    if (e.keyCode === 27) {
      overlaySuppr();
    }
  };

}

//évènement clic sur le bouton "plus" des FILMS RECENTS du hover pour apparition de l'Overlay
for (let c = 0; c < plusButtonContainerSelection.length; c++) {
  plusButtonContainerSelection[c].addEventListener("click", function() {
    currenta = parseInt(plusButtonContainerSelection[c].parentElement.getAttribute("name"));

    overlayPop(currenta);
  })
}

//évènement clic sur le bouton "plus" des FILMS RECENTS du hover pour apparition de l'Overlay
for (let b = 0; b < playButtonContainerRecent.length; b++) {
  playButtonContainerRecent[b].addEventListener("click", function() {
    currenta = parseInt(playButtonContainerRecent[b].parentElement.getAttribute("name"));

    overlayPop(currenta);
  })
}

//évènement clic sur le bouton "plus" du hover pour apparition de l'Overlay
// for (let a = 0; a < allMoviesPlayButton.length; a++) {
//   allMoviesPlayButton[a].addEventListener("click", function() {
//     currenta = parseInt(allMoviesPlayButton[a].parentElement.getAttribute("name"));
//
//     overlayPop(currenta);
//   })
// }

var lowOpacity = document.querySelector(".lowOpacity");
var imgStartPlayer = document.querySelector(".imgContainer");

//apparition du player video pour
imgStartPlayer.addEventListener("click", function() {
  playerContainer.style.display = "block";
  lowOpacity.style.display = "block";

  for (var i = 0; i < dataMovies.length; i++) {
    if (dataMovies[i].title === currenta) {
      console.log(dataMovies[i]);
      player.setAttribute("src", "videos/" + dataMovies[i].src);
      togglePlaying();
      break;
    }
  }



  document.body.onkeyup = function(e) {
    if (e.keyCode === 27) {
      playerContainer.style.display = "none";
      lowOpacity.style.display = "none";
      player.setAttribute("src", "");
      overlaySuppr();
    }
  };

});

//clic sur l'opacité pour quitter la vidéo
lowOpacity.addEventListener("click", function() {
  playerContainer.style.display = "none";
  lowOpacity.style.display = "none";
  player.setAttribute("src", "");

});





//PLAYER VIDEO
function togglePlaying() {
  if (player.paused) {
    player.play();
    play.querySelector("img").src = "img/pause.png";
  } else {
    player.pause();
    play.querySelector("img").src = "img/play.png";
  }
}

function setMuted(isMuted) {
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

function formatTime(time) {
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

stop.addEventListener('click', function() {
  player.pause();
  player.currentTime = 0;
  play.innerHTML = '<img src="img/play.png">';
});


document.body.onkeyup = function(e) {
  if (e.keyCode === 32) {
    togglePlaying();
  }
};



// VOLUME
volume.addEventListener('input', (ev) => setVolume(ev.target.value));

volumeImg.addEventListener('click', function() {
  setMuted(!player.muted);
});


// FULL SCREEN
function toggleFullscreen() {

  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement) {

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


    if (playerContainer.classList.contains('fullscreen')) {
      fullScreen.querySelector("img").src = "img/shrink.png";
    }

  }

}

player.addEventListener('dblclick', toggleFullscreen);
fullScreen.addEventListener('click', toggleFullscreen);

// SLIDER

slider.addEventListener('click', function(ev) {
  const coeff = (ev.clientX - slider.getBoundingClientRect().x) / slider.getBoundingClientRect().width;
  player.currentTime = coeff * player.duration;
});




player.addEventListener('timeupdate', function() {
  // Update timer track slider
  const trackWidth = slider.getBoundingClientRect().width;
  const coeff = player.currentTime / player.duration;
  cursor.style.width = (coeff * trackWidth) + 'px';
  timeLeft.innerHTML = formatTime(player.currentTime) + '/' + formatTime(player.duration);


  // Check if video ended
  if (player.currentTime === player.duration) {
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

//tags

const pickedTags = [];

function updateFilter() {
  console.log(pickedTags);
  if (pickedTags.length === 0) {
    for (let i = 0; i < moviesContainer.children.length; i++) {
      moviesContainer.children[i].style.display = '';
    }
    return;
  }

  for (let movieIndex = 0; movieIndex < moviesContainer.children.length; movieIndex++) {
    const movieElement = moviesContainer.children[movieIndex];
    let isVisible = pickedTags.indexOf(movieElement.dataset.category) !== -1;

    movieElement.style.display = isVisible ? '' : 'none';
  }
}

for (let i = 0; i < tags.length; i++) {
  tags[i].addEventListener('click', function() {
    if (this.classList.contains('tag-highlight')) {
      this.classList.remove('tag-highlight');
      pickedTags.splice(pickedTags.indexOf(this.dataset.category), 1);
    } else {
      this.classList.add('tag-highlight');
      pickedTags.push(this.dataset.category);
    }
    updateFilter();
  });
}

//tags

//ANIMATION menu

var menuItem1 = document.querySelector(".menuTitle");
var menuItem2 = document.querySelector(".menuGenre");
var menuItem3 = document.querySelector(".menuRecent");
var menuItem4 = document.querySelector(".menuAffiche");

var section1 = document.querySelector(".notreSelectionContainer");
var section2 = document.querySelector(".genreContainer");
var section3 = document.querySelector(".containerVideo");
var section4 = document.querySelector(".recentContainer");
var footer = document.querySelector("footer");

window.addEventListener("scroll", function() {
  if (section1.getBoundingClientRect().top < section1.offsetHeight) {
    menuItem1.classList.add("scrollHover");
    menuItem2.classList.remove("scrollHover");
    menuItem3.classList.remove("scrollHover");
    menuItem4.classList.remove("scrollHover");
  }
  if (section2.getBoundingClientRect().top < section2.offsetHeight && section3.getBoundingClientRect().top > section2.offsetHeight) {
    menuItem2.classList.add("scrollHover");
    menuItem1.classList.remove("scrollHover");
    menuItem3.classList.remove("scrollHover");
    menuItem4.classList.remove("scrollHover");
  }
  if (section3.getBoundingClientRect().top < section4.offsetHeight && section4.getBoundingClientRect().top > section3.offsetHeight) {
    menuItem3.classList.add("scrollHover");

    menuItem1.classList.remove("scrollHover");
    menuItem2.classList.remove("scrollHover");
    menuItem4.classList.remove("scrollHover");
  }
  if (section4.getBoundingClientRect().top < section3.offsetHeight) {
    console.log(section4.getBoundingClientRect().top);
    menuItem4.classList.add("scrollHover");
    menuItem1.classList.remove("scrollHover");
    menuItem2.classList.remove("scrollHover");
    menuItem3.classList.remove("scrollHover");
  }
});

// search Barre

var field = document.querySelector('input');
var error = document.querySelector('.notFound');
var found = document.querySelector('.found');
var number = document.querySelector('.numberSearch');
var dieu = document.querySelector('.dieu');
var rechercheSection = document.querySelector('.recherche');
var rechercheTitle = document.querySelector(".rechercheTitle");
var hrTop = document.querySelector(".hr-top");



field.addEventListener('focus', function() {
  field.style.border = '2px solid #277e7f';
});

field.addEventListener('blur', function() {
  field.style.border = '';
});

field.addEventListener('keydown', inputSearch);


function inputSearch(event) {
  var search;
  var inputKey = event.keyCode;
  var films_found = 0;

  if (inputKey == 13) {
    while (rechercheSection.lastChild) {
      rechercheSection.lastChild.remove();
      found.style.display = '';
      rechercheTitle.style.display = '';
      hrTop.style.display = '';
    }

    search = field.value;
    if (search) {

      var searchDataMovies = [];
      for (var i = 0; i < dataMovies.length; i++) {
        var lowertitle = dataMovies[i].title.toLowerCase();
        var lowersearch = search.toLowerCase();
        if (lowertitle.includes(lowersearch)) {
          searchDataMovies.push(dataMovies[i]);

          films_found++;
        }
      }

      if (searchDataMovies.length > 0) {
        number.textContent = films_found;
        found.style.display = 'block';
        dieu.style.display = '';
        console.log(films_found);
        rechercheTitle.style.display = 'block';
        hrTop.style.display = 'block';
        generateMovies(rechercheSection, searchDataMovies);

      }
    }
    if (films_found === 0) {
      found.style.display = '';
      error.style.display = 'block';
      dieu.style.display = '';
    } else {
      error.style.display = '';
      dieu.style.display = '';
    }
  } else {
    error.style.display = 'block';
    found.style.display = '';
    dieu.style.display = '';
  }
  if (search === 'ariel') {
    dieu.style.display = 'block';
    error.style.display = '';
    found.style.display = '';
  }
}

// HAMBURGER MENU

var burger = document.querySelector('.burger');
var closeBurger = document.querySelector('.closeBurger');
var nav = document.querySelector('.sideMenuDisplay');
var changeSize = document.querySelector('.changeSize');
var body = document.querySelector('.bodyWidth');
var burgerTop = document.querySelector('.burgerMenuBefore');
var burgerRotateTop = document.querySelector('.burgerRotateTop');
var burgerMid = document.querySelector('.burgerMid');
var burgerMidDisplay = document.querySelector('.burgerMidDisplay');
var burgerBot = document.querySelector('.burgerMenuAfter');
var burgerRotateBot = document.querySelector('.burgerRotateBot');
var burgerPosition = document.querySelector('.burgerPosition');

burger.addEventListener('click', function() {
    nav.classList.toggle('closeBurger');
    body.classList.toggle('changeSize');
    burgerTop.classList.toggle('burgerRotateTop');
    burgerMid.classList.toggle('burgerMidDisplay');
    burgerBot.classList.toggle('burgerRotateBot');

    if (nav.classList.contains('closeBurger') === false ) {
        body.classList.add('menuBodySlideOut');
        nav.classList.add('burgerMenuSlideOut');
    } else {
        body.classList.remove('menuBodySlideOut');
        nav.classList.remove('burgerMenuSlideOut');
    };

    if (nav.classList.contains('closeBurger') === true ) {
        body.classList.add('menuBodySlideIn');
        nav.classList.add('burgerMenuSlideIn');
    } else {
        body.classList.remove('menuBodySlideIn');
        nav.classList.remove('burgerMenuSlideIn');
    };

});

//FORM

document.querySelector("html").classList.add('js');

var fileInput  = document.querySelector( ".inputfile" ),
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".submit");

button.addEventListener( "keydown", function( event ) {
    if ( event.keyCode === 13 || event.keyCode === 32 ) {
        fileInput.focus();
    }
});
button.addEventListener( "click", function( event ) {
    fileInput.focus();
    return false;
});
fileInput.addEventListener( "change", function( event ) {
    the_return.innerHTML = this.value;
});