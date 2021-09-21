function Slider() {
  this.slider = document.querySelector('.latest-articles-slider');
  this.sliderList = this.slider.querySelector('.slider__content');
  this.sliderElements = this.sliderList.querySelectorAll('.slider__items');
  this.sliderFirst = this.sliderList.querySelector('.slider__items');
  this.prevButton = this.slider.querySelector('.slider__button--left');
  this.nextButton = this.slider.querySelector('.slider__button--right');
  this.speed = 700;

  Slider.init(this);
};

Slider.prototype.prev = function () {
  let obj = this;
  let element;
  let clone;
  for (let i = 0; i < 1; i++) {
    element = this.sliderList.lastElementChild;
    clone = element.cloneNode(true);
    this.sliderList.insertBefore(clone, this.sliderList.firstElementChild);
  }
  this.sliderList.style.marginLeft = '-' + this.elemWidth * 1 + 'px';
  let compStyle = window.getComputedStyle(this.sliderList).marginLeft;
  this.sliderList.style.cssText = 'transition:margin ' + this.speed + 'ms ease;';
  this.sliderList.style.marginLeft = '0px';
  setTimeout(function () {
    obj.sliderList.removeChild(element);
    obj.sliderList.style.cssText = 'transition:none;';
  }, this.speed)
}

Slider.prototype.next = function () {
  let obj = this;
  let element = obj.sliderList.firstElementChild;
  let clone = element.cloneNode(true);
  obj.sliderList.appendChild(clone);
  this.sliderList.style.cssText = 'transition:margin ' + this.speed + 'ms ease;';
  this.sliderList.style.marginLeft = '-' + this.elemWidth * 1 + 'px';
  setTimeout(function () {
    obj.sliderList.style.cssText = 'transition:none;';
    for (let i = 0; i < 1; i++) {
      obj.sliderList.removeChild(element);
    };
    obj.sliderList.style.marginLeft = '0px';
  }, this.speed);
}

Slider.init = function (that) {
  that.elemCount = that.sliderElements.length;
  let elemStyle = window.getComputedStyle(that.sliderFirst);
  that.elemWidth = that.sliderFirst.offsetWidth + parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);
  let bgTime = getTime();

  that.prevButton.addEventListener('click', function () {
    let fnTime = getTime();
    if (fnTime - bgTime > that.speed) {
      bgTime = fnTime; that.prev();
    }
  }, false);
  that.nextButton.addEventListener('click', function () {
    let fnTime = getTime();
    if (fnTime - bgTime > that.speed) {
      bgTime = fnTime; that.next();
    }
  }, false);

  function getTime() {
    return new Date().getTime();
  }
}

new Slider();