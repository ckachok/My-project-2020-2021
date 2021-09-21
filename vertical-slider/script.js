const sliderContainer = document.querySelector('.slider__container');
const sliderLeftSide = document.querySelector('.slider__left-side');
const sliderRightSide = document.querySelector('.slider__right-side');

const buttonUp = document.querySelector('.slider__btn--up');
const buttonDown = document.querySelector('.slider__btn--down');

const slidesCount = sliderLeftSide.querySelectorAll('.left-side__slide').length;

let activeSlideIndex = 0;
let scrolling = true;

sliderLeftSide.style.top = `-${(slidesCount - 1) * 100}vh`;

buttonUp.addEventListener('click', () => changeSlide('up'));
buttonDown.addEventListener('click', () => changeSlide('down'));
sliderContainer.addEventListener('wheel', (event) => scrollSlider(event));

const scrollSlider = (event) => {
  if (scrolling) {
    scrolling = false;

    if (event.deltaY < 0) {
      changeSlide('up');
    } else {
      changeSlide('down');
    }
    setTimeout(() => {
      scrolling = true;
    }, 500);
  }  
}

const loopSlider = (slider1, slider2, direction) => {
  let firstSlideLeftSide = slider2.lastElementChild;
  let firstSlideRightSide = slider1.firstElementChild;

  slider1.append(firstSlideRightSide);
  slider2.prepend(firstSlideLeftSide);

  sliderLeftSide.style.transition = 'none';
  sliderRightSide.style.transition = 'none';

  if (direction === 'up') {
    activeSlideIndex = slidesCount - 2;
  } else if (direction == 'down') {
    activeSlideIndex = 1;
  }

  setTimeout(() => {
    sliderLeftSide.style.transition = '0.5s ease-out';
    sliderRightSide.style.transition = '0.5s ease-out';
  });

  setTimeout(() => {
    changeSlide(direction);
  });
}

const changeSlide = (direction) => {
  const sliderHeight = sliderContainer.clientHeight;

  if (direction === 'up') {
    activeSlideIndex++;
    if (activeSlideIndex > slidesCount - 1) {
      loopSlider(sliderRightSide, sliderLeftSide, direction);
    }
  } else if (direction === 'down') {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      loopSlider(sliderLeftSide, sliderRightSide, direction);
    }
  }

  sliderRightSide.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
  sliderLeftSide.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
}

console.log('%cОценка своего проекта', "color: red");
console.log('%cПервый этап. Повторить исходный проект - 10 баллов;', 'color: green');
console.log('%cВторой этап. Обязательный дополнительный функционал - 10 баллов (реализована функциональность бесконечности);', 'color: green');
console.log('%cТретий этап. Дополнительный функционал на выбор - 10 баллов (реализовано возможность смены слайдов с помощью прокрутки скролла мыши);','color: green');
console.log('%cИтого за задание - 30 баллов.', 'color: red');
console.log('%cВыражаю благодарность за проверку моей работы :)', 'color: purple');
