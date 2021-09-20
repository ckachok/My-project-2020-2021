class SliderZoos {
    constructor() {
        this.slider      = document.querySelector('.slider-cameras');
        this.btnLike     = document.querySelector('.btn__like');
        this.sliderList  = this.slider.querySelector('.cameras');
        this.sliderItems = this.sliderList.querySelectorAll('.cameras__item');
        this.sliderFirst = this.sliderList.querySelector('.cameras__item');
        this.nextBtn     = document.querySelector('.btn__arrow-right');
        this.prevBtn     = document.querySelector('.btn__arrow-left');

        this.options     = this.defaults;
        this.init(this);
    }

    defaults = {
        elemVisible: 1,
        speed: 1000,
        setLike: []
    }

    prev() {
        let newSlider = this;
        let lastSlide;
        let cloneLastSlide;

        for (let i = 0; i < 1; i++) {
            lastSlide = this.sliderList.lastElementChild;
            cloneLastSlide = lastSlide.cloneNode(true);
            this.sliderList.insertBefore(cloneLastSlide, this.sliderList.firstElementChild);
        }

        let slideStyle = window.getComputedStyle(lastSlide);
        this.slideWidth = lastSlide.offsetWidth + parseInt(slideStyle.marginLeft) + parseInt(slideStyle.marginRight);
        this.sliderList.style.marginLeft = '-' + this.slideWidth * 1 + 'px';
        let compStyle = window.getComputedStyle(this.sliderList).marginLeft;
        this.sliderList.style.cssText = 'transition:margin ' + this.options.speed + 'ms ease;';
        this.sliderList.style.marginLeft = '0px';
        setTimeout(function () {
            newSlider.sliderList.removeChild(lastSlide);
            newSlider.sliderList.style.cssText = 'transition:none;';
        }, this.options.speed)
    }

    next() {
        let newSlider = this;
        let firstSlide = newSlider.sliderList.firstElementChild;
        let cloneFirstSlide = firstSlide.cloneNode(true);
        let slideStyle = window.getComputedStyle(firstSlide);

        this.slideWidth = firstSlide.offsetWidth + parseInt(slideStyle.marginLeft) + parseInt(slideStyle.marginRight);
        newSlider.sliderList.appendChild(cloneFirstSlide);
        this.sliderList.style.cssText = 'transition:margin ' + this.options.speed + 'ms ease;';
        this.sliderList.style.marginLeft = '-' + this.slideWidth * 1 + 'px';

        setTimeout(function () {
            newSlider.sliderList.style.cssText = 'transition:none;';
            for (let i = 0; i < 1; i++) {
                newSlider.sliderList.removeChild(firstSlide);
                cloneFirstSlide.style.marginLeft = '';
            };

            newSlider.sliderList.style.marginLeft = '0px';
        }, this.options.speed);
    }

    changeMain(event) {
        if (event.target.classList.contains('blocker')) {
            this.currentMainCamera = document.getElementById('main-video');
            let newMainCamera = event.target.parentNode.children[0];
            let srcCurrentMainCamera = this.currentMainCamera.getAttribute('src');
            let srcNewMainCamera = newMainCamera.getAttribute('src');

            this.currentMainCamera.setAttribute('src', srcNewMainCamera);
            newMainCamera.setAttribute('src', srcCurrentMainCamera);

            srcCurrentMainCamera = this.currentMainCamera.getAttribute('src');

            const isLike = (src) => {
                let countTrue = false;

                this.options.setLike.forEach((elem) => {
                    if (elem.video === src) {
                        countTrue = true;
                    }
                })
                return countTrue;
            }

            if (isLike(srcCurrentMainCamera) === true) {
                this.btnLike.classList.add('btn__like_active');
            } else {
                this.btnLike.classList.remove('btn__like_active');
            }
        }
    }

    like(event) {
        this.currentMainCamera = document.getElementById('main-video');
        let srcCurrentMainCamera = this.currentMainCamera.getAttribute('src');

        if (event.currentTarget.classList.contains('btn__like_active')) {
            event.currentTarget.classList.remove('btn__like_active');
            this.options.setLike.forEach((elem) => {
                if (elem.video === srcCurrentMainCamera) {
                    elem.video = '';
                }
            })
        } else {
            event.currentTarget.classList.add('btn__like_active');
            let like = {
                video: srcCurrentMainCamera
            }
            this.options.setLike.push(like);
        }
    }

    init(that) {
        let newSlider = that;
        let bgTime = getTime();

        that.prevBtn.addEventListener('click', function () {
            if (newSlider.slider.classList.contains('testimonials__container')) return;

            let fnTime = getTime();
            if (fnTime - bgTime > that.options.speed) {
                bgTime = fnTime;
                that.prev();
            }
        }, false);

        that.nextBtn.addEventListener('click', function () {
            if (newSlider.slider.classList.contains('testimonials__container')) return;

            let fnTime = getTime();
            if (fnTime - bgTime > that.options.speed) {
                bgTime = fnTime;
                that.next();
            }
        }, false);

        that.sliderList.addEventListener('click', function(event) {
            that.changeMain(event);
        }, false);

        that.btnLike.addEventListener('click', function(event) {
            that.like(event);
        }, false);

        function getTime() {
            return new Date().getTime();
        }
    }
}

new SliderZoos();