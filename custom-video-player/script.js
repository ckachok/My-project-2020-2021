const btnPlay = document.querySelector('.playback');
const btnPlayBig = document.querySelector('.btn-play');
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
const btnVolume = document.querySelector('.volume');
const volumeIcon = document.getElementById('volume');
const playIcon = document.getElementById('playback');
const btnFullscreen = document.querySelector('.fullscreen');
const volumeProgress = document.querySelector('.volume__progress');
const playbackProgress = document.querySelector('.playback__progress');
const playerViewport = document.querySelector('.player__viewport');

let initVolumeValue;
let countVideo = 0;
let curVolumeValue = volumeProgress.value;
let initSpeed = 1;

const videos = [
  {
    src: 'assets/video/section__video__the-louvre.mp4',
    poster: 'assets/img/section__video__poster1-louvre.jpg'
  },
  {
    src: 'assets/video/section__video__exhibition-body-and-soul.mp4',
    poster: 'assets/img/section__video__poster2-louvre.jpg'
  },
  {
    src: 'assets/video/section__video__lesser-known-masterpieces.mp4',
    poster: 'assets/img/section__video__poster3-louvre.jpg'
  }
]

function pauseVideo() {
  playerViewport.pause();

  btnPlayBig.style.display = 'inline-block';
  playIcon.setAttribute('src', 'assets/svg/player__playback-icon.svg');
  playIcon.setAttribute('id', 'playback');

  setTimeout(() => {
    btnPlayBig.style.opacity = 1;
  }, 100);
}

function startVideo() {
  playerViewport.play();

  btnPlayBig.style.opacity = 0;
  btnPlayBig.style.transition = 'transform 0.8s, opacity 0.5s';
  playIcon.setAttribute('src', 'assets/svg/player__pause-icon.svg');
  playIcon.setAttribute('id', 'pause');

  setTimeout(() => {
    btnPlayBig.style.display = 'none';
  }, 500);
}

function playVideo() {
  if ((playIcon.getAttribute('id') === 'pause')) {
    pauseVideo();
  } else {
    playerViewport.volume = curVolumeValue / 100;
    startVideo();
  };
}

function updateProgress() {
  let durationVideo = playerViewport.duration;
  let currentTimeVideo = playerViewport.currentTime;

  playbackProgress.value = currentTimeVideo / durationVideo * 100;
  playbackProgress.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${playbackProgress.value}%, #C4C4C4 ${playbackProgress.value}%, #C4C4C4 100%)`;
}

function rewindVideo(event) {
  let widthProgress = playbackProgress.offsetWidth;
  let currentPosition = event.offsetX;

  playbackProgress.value = currentPosition / widthProgress * 100;
  playerViewport.currentTime = currentPosition / widthProgress * playerViewport.duration;

  if (event.type === 'mousedown') {
    playerViewport.pause();
  } else if (event.type === 'mouseup') {
    startVideo();
  };
}

function changeVolume(event) {
  curVolumeValue = volumeProgress.value;

  if (event.code === 'KeyM' || event.target.parentNode === btnVolume) {
    if (+curVolumeValue) {
      initVolumeValue = curVolumeValue;
      curVolumeValue = 0;
      volumeIcon.setAttribute('src', 'assets/svg/player__volume-mute-icon.svg');
    } else {
      curVolumeValue = initVolumeValue;
      volumeIcon.setAttribute('src', 'assets/svg/player__volume-icon.svg');
    }
  }

  volumeProgress.value = curVolumeValue;
  playerViewport.volume = curVolumeValue / 100;
  volumeProgress.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${curVolumeValue}%, #C4C4C4 ${curVolumeValue}%, #C4C4C4 100%)`;
}

function changeModeScreen() {
  if (document.fullscreenElement) {
    document.webkitCancelFullScreen();
  } else {
    playerViewport.requestFullscreen();
  }
}

function speedUp() {
  if (initSpeed < 2) {
    playerViewport.playbackRate = initSpeed + 0.25;
    initSpeed = playerViewport.playbackRate;
  }
}

function speedDown() {
  if (initSpeed > 0.25) {
    playerViewport.playbackRate = initSpeed - 0.25;
    initSpeed = playerViewport.playbackRate;
  }
}

function nextVideo() {
  pauseVideo();
  if (countVideo === 2) {
    countVideo = 0;
  } else {
    countVideo++;
  }

  playerViewport.setAttribute('src', videos[countVideo].src);
  playerViewport.setAttribute('poster', videos[countVideo].poster);
}

function prevVideo() {
  pauseVideo();
  if (countVideo === 0) {
    countVideo = 2;
  } else {
    countVideo--;
  }

  playerViewport.setAttribute('src', videos[countVideo].src);
  playerViewport.setAttribute('poster', videos[countVideo].poster);
}

btnNext.addEventListener('click', nextVideo);
btnPrev.addEventListener('click', prevVideo);

btnPlay.addEventListener('click', playVideo);
btnPlayBig.addEventListener('click', playVideo);

playerViewport.addEventListener('timeupdate', () => {
  setTimeout(() => {
    updateProgress();
  }, 100);
});

playbackProgress.addEventListener('mousedown', rewindVideo);
playbackProgress.addEventListener('mouseup', rewindVideo);

volumeProgress.addEventListener('input', changeVolume);
btnVolume.addEventListener('click', changeVolume);

btnFullscreen.addEventListener('click', changeModeScreen);

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'Space':
    event.preventDefault(); 
    playVideo();
    break;
    case 'KeyM': changeVolume(event);
    break;
    case 'Period': speedUp();
    break;
    case 'Comma': speedDown();
    break;
    case 'KeyF': changeModeScreen();
    break;
    case 'KeyN': nextVideo();
    break;
    case 'KeyP': prevVideo();
    break;
    case 'KeyK': playVideo();
    break;
  }
});


console.log('%cОценка своего проекта', "color: red");
console.log('%cПервый этап. Повторить исходный проект или реализовать проигрыватель из задания Museum - 10 баллов;', 'color: orange');
console.log('%cВторой этап. Обязательный дополнительный функционал - 10 баллов:', 'color: orange');
console.log('%c- клавиша Пробел — пауза;', 'color: green');
console.log('%c- клавиша M (англ) — отключение/включение звука;', 'color: green');
console.log('%c- клавиша > — ускорение воспроизведения ролика;', 'color: green');
console.log('%c- клавиша < — замедление воспроизведения ролика;', 'color: green');
console.log('%c- клавиша F — включение/выключение полноэкранного режим.', 'color: green');
console.log('%cТретий этап. Дополнительный функционал на выбор - 20 баллов:','color: orange');
console.log('%c- добавлена возможность перелистывания видео с помощью двух дополнительных кнопок управления (10 баллов);', 'color: green');
console.log('%c- добавлены горячие клавиши N и P для перелистывания видео и горячая клавиша K для остановки и воспроизведения видео (4 балла);', 'color: green');
console.log('%c- добавлена горячая клавиша K для остановки и воспроизведения видео (2 балла);', 'color: green');
console.log('%c- добавлена дополнительная кнопка для воспроизведения видео на самом окне просмотра (2 балла);', 'color: green');
console.log('%c- добавлена возможность выключать и включать звук кликнув по кнопке звука (2 балла).', 'color: green');
console.log('%cИтого за задание - 40 баллов.', 'color: red');
console.log('%cВыражаю благодарность за проверку моей работы :)', 'color: purple');