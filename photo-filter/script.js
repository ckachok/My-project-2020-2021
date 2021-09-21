const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg',
                '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
                '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg',
                '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const control = document.querySelector('.btn-container');
const controlButtons = control.querySelectorAll('.btn, .label');
const btnReset = document.querySelector('.btn-reset');
const btnNextPicture = document.querySelector('.btn-next');
const btnLoadPicture = document.getElementById('btnInput');
const btnSavePicture = document.querySelector('.btn-save');
const btnFullscreen = document.querySelector('.fullscreen');
const filters = document.querySelectorAll('.filters label');
const picture = document.querySelector('.editor img');
let i;

function getTimeOfDay() {
    const data = new Date();
    const hour = data.getHours();

    switch (true) {
        case (hour >= 6 && hour < 12):
        return 'morning';
        case (hour >= 12 && hour < 18):
        return 'day';
        case (hour >= 18 && hour < 24):
        return 'evening';
        case (hour >= 0 && hour < 6):
        return 'night';
    }
}

function viewNextImage(link) {
    const img = new Image();

    img.src = link;
    img.onload = () => {
        picture.setAttribute('src', link);
    }
}

function getImage() {
    (i > 19 || i === undefined) ? i = 0 : i;

    const index = i % images.length;
    const imageLink = `${base}${getTimeOfDay()}/${images[index]}`;

    viewNextImage(imageLink);
    i++;
    btnNextPicture.disabled = true;
    setTimeout(() => {
        btnNextPicture.disabled = false
    }, 500);
}

function loadImage() {
    const file = btnLoadPicture.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        picture.src = reader.result;
    }
    reader.readAsDataURL(file);
    btnLoadPicture.value = '';
}

function drawImage() {
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');
    img.src = picture.src;
    img.height = picture.height;
    img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        let sizeDifference = canvas.height / img.height;
        const ctx = canvas.getContext('2d');
        const blurValue = getComputedStyle(picture).filter.match(/[0-9]*(?=px)/)[0];

        ctx.filter = getComputedStyle(picture).filter.replace(`blur(${blurValue}px)`, `blur(${Math.ceil(blurValue * sizeDifference)}px)`);
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL();

        saveImage(dataUrl);
    }
}

function saveImage(url) {
    const link = document.createElement('a');

    link.download = `download-image.png`;
    link.href = url;
    link.click();
    link.delete;
}

function applyFilter(event) {
    const filterOutput = event.target.parentNode.querySelector('output');
    const units = event.target.dataset.sizing;

    filterOutput.value = event.target.value;
    picture.style.setProperty(`--${event.target.name}`, filterOutput.value + units );
}

function resetFilter() {
    filters.forEach((element) => {
        const filterInput = element.querySelector('input');
        const filterOutput = element.querySelector('output');

        filterInput.value = filterInput.getAttribute('value');
        filterOutput.value = filterInput.value;
    });
    picture.removeAttribute('style');
}

function applyBtnAnimation(event) {
    if (event.target.classList.contains('btn-active')) return;

    controlButtons.forEach((elem) => {
        elem.classList.remove('btn-active');
        if (event.target.classList.contains('btn-load--input')) {
            event.target.parentNode.classList.add('btn-active');
        } else {
            event.target.classList.add('btn-active');
        }
    })
}

function changeModeScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

control.addEventListener('click', applyBtnAnimation);
btnReset.addEventListener('click', resetFilter);
btnNextPicture.addEventListener('click', getImage);
btnLoadPicture.addEventListener('change', loadImage);
btnSavePicture.addEventListener('click', drawImage);
btnFullscreen.addEventListener("click", changeModeScreen);
filters.forEach((element) => {
    const filterInput = element.querySelector('input');

    filterInput.addEventListener('input', applyFilter);
});