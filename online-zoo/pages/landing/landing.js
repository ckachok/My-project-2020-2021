// Pop-up "Create Account" and "Log In"
const cover = document.getElementById('cover');
const popUp = document.getElementById('pop-up');
const btnSignUp = document.getElementById('sign-up');
const btnLogIn = document.getElementById('log-in');
const btnLogOut = document.getElementById('log-out');
const btnPopUpCreateAccount = document.querySelector('.btn_style_create-account');
const btnPopUpLogIn = document.querySelector('.btn_style_log-in');
const btnGoogleSignIn = document.querySelector('.btn_style_google-sign-in');
const btnFacebookSignIn = document.querySelector('.btn_style_facebook-sign-in');
const btnGoogleLogin = document.querySelector('.btn_style_google-login');
const btnFacebookLogin = document.querySelector('.btn_style_facebook-login');
const formTitleName = document.querySelector('.form__title');
const formInputName = document.querySelector('.form__input_type_text');
const formInputPassword = document.querySelector('.form__input_type_password');
const formInputCheckbox = document.querySelector('.form__input_type_checkbox');
const formLabelCheckbox = document.querySelector('.form__label_checkbox');
const formTextCheckbox = document.querySelector('.form__text_checkbox');
const formBtnSend = document.getElementById('btn-send');
const formInputEmail = document.querySelector('.form__input_type_email');
const user = {
    name: 'user',
    email: 'user@gmail.com',
    password: 'useruser'
};

const showPopUpCreateAccount = (event) => {
    const currentTarget = event.currentTarget;

    btnGoogleSignIn.style.display = 'flex';
    btnFacebookSignIn.style.display = 'flex';
    btnGoogleLogin.style.display = 'none';
    btnFacebookLogin.style.display = 'none';    
    formTitleName.style.display = '';
    formInputName.setAttribute('required', '');
    formInputName.style.display = '';        
    formInputCheckbox.setAttribute('required', '');  
    formLabelCheckbox.style.display = '';
    formTextCheckbox.style.display = '';
    formInputPassword.style.marginBottom = '';
    formBtnSend.style.marginTop = '';
    
    changeAnimationPopUpCallButtons(currentTarget);
    hideScroll();
    showPopUp();
};

btnSignUp.addEventListener('click', showPopUpCreateAccount);
btnPopUpCreateAccount.addEventListener('click', showPopUpCreateAccount);

const showPopUpLogIn = (event) => {
    const currentTarget = event.currentTarget;

    if (btnLogIn.classList.contains('btn_style_login-user_active')) {
        return;
    }
    
    btnGoogleSignIn.style.display = 'none';
    btnFacebookSignIn.style.display = 'none';
    btnGoogleLogin.style.display = 'flex';
    btnFacebookLogin.style.display = 'flex';
    formTitleName.style.display = 'none';
    formInputName.removeAttribute('required');
    formInputName.style.display = 'none';
    formInputCheckbox.removeAttribute('required');
    formLabelCheckbox.style.display = 'none';
    formTextCheckbox.style.display = 'none';
    formInputPassword.style.marginBottom = '41px';
    formBtnSend.style.marginTop = '0';

    changeAnimationPopUpCallButtons(currentTarget);
    hideScroll();
    showPopUp();
}

btnLogIn.addEventListener('click', showPopUpLogIn);
btnPopUpLogIn.addEventListener('click', showPopUpLogIn);

const showPopUp = () => {
    cover.classList.remove('cover_hidden', 'cover_hidden_opacity');
    popUp.classList.remove('pop-up_hidden');
    setTimeout(() => {
        popUp.classList.remove('pop-up_hidden_opacity');
    }, 20);
}

const hidePopUp = () => {
    popUp.classList.add('pop-up_hidden_opacity')
    setTimeout(() => {
        showScroll();
        popUp.classList.add('pop-up_hidden');
        cover.classList.add('cover_hidden');
        formInputName.value = '';
        formInputEmail.value = '';
        formInputPassword.value = '';
        formInputCheckbox.checked = false;        
    }, 450);
};

cover.addEventListener('click', hidePopUp);

const hideScroll = () => {
    let marginSize = window.innerWidth - document.body.clientWidth;
    if (marginSize) {
        document.body.style.marginRight = marginSize + 'px';
        document.body.classList.add('hidden-scroll');
    }
}

const showScroll = () => {
    document.body.style.marginRight = '';
    document.body.classList.remove('hidden-scroll');
}

const changeAnimationPopUpCallButtons = (event) => {
    if (event.classList.contains('btn_sign-up_active') || 
        event.classList.contains('btn_log-in_active') ||
        event.classList.contains('btn_active')) {
        return;
    }
    if (btnLogIn.classList.contains('btn_log-in_active') &&
        btnPopUpLogIn.classList.contains('btn_active')) {
        btnLogIn.classList.remove('btn_log-in_active');
        btnSignUp.classList.add('btn_sign-up_active');
        btnPopUpLogIn.classList.remove('btn_active');
        btnPopUpCreateAccount.classList.add('btn_active');
        return;
    }
    if (btnSignUp.classList.contains('btn_sign-up_active') &&
        btnPopUpCreateAccount.classList.contains('btn_active')) {
        btnSignUp.classList.remove('btn_sign-up_active');
        btnLogIn.classList.add('btn_log-in_active');
        btnPopUpCreateAccount.classList.remove('btn_active');
        btnPopUpLogIn.classList.add('btn_active');
        return;
    }    
}

const showUserName = (event) => {
    let userName = formInputName.value;
    let valueLeft;
    const btnTextLogIn = btnLogIn.querySelector('.btn__text_log-in');
    const currentTarget = event.target;

    btnTextLogIn.style.left = '';
    btnSignUp.style.display = 'none';
    btnTextLogIn.classList.add('user-name');
    
    if (userName === '') {
        btnTextLogIn.innerHTML = 'user';
    } else {
        btnTextLogIn.innerHTML = userName;
    }

    switch (true) {
        case (currentTarget === btnGoogleSignIn || currentTarget === btnGoogleLogin):
            btnTextLogIn.innerHTML = 'Logged in with Google';
            valueLeft = -83;
            break;
        case (currentTarget === btnFacebookSignIn || currentTarget === btnFacebookLogin):
            btnTextLogIn.innerHTML = 'Logged in with Facebook';
            valueLeft = -100;
            break;
        default:
            const widthUserName = btnTextLogIn.offsetWidth;
            valueLeft = (56 - widthUserName) / 2;
    } 

    btnTextLogIn.style.left = `${valueLeft}px`;
    btnTextLogIn.style.visibility = 'visible';
    btnLogIn.classList.add('btn_style_login-user_active');
    btnLogIn.style.border = 'none';
    btnLogIn.style.borderRadius = '0';
}

const logIntoAccount = (event) => {
    let userEmail = user.email;
    let userPassword = user.password;
        
    if (btnPopUpLogIn.classList.contains('btn_active')) {
        if (formInputEmail.value === userEmail &&
            formInputPassword.value === userPassword) {
            formInputName.value = '';
            hidePopUp();
            showUserName(event);
        } else {
            return alert('Incorrect email or password');
        }
    }
    
    if (formInputName.validity.valid &&
        formInputEmail.validity.valid &&
        formInputPassword.validity.valid &&
        formInputCheckbox.validity.valid) {
        hidePopUp();
        showUserName(event);
    }
}

const logIntoAccountWithGoogleOrFacebook = (event) => {
    hidePopUp();
    showUserName(event);
}

btnGoogleSignIn.addEventListener('click', logIntoAccountWithGoogleOrFacebook);
btnGoogleLogin.addEventListener('click', logIntoAccountWithGoogleOrFacebook);
btnFacebookSignIn.addEventListener('click', logIntoAccountWithGoogleOrFacebook);
btnFacebookLogin.addEventListener('click', logIntoAccountWithGoogleOrFacebook);
formBtnSend.addEventListener('click', logIntoAccount);

const logOutAccount = () => {
    const btnTextLogIn = btnLogIn.querySelector('.btn__text_log-in');

    hideBtnLogOut();
    btnSignUp.style.display = '';
    btnTextLogIn.classList.remove('user-name');
    btnTextLogIn.innerHTML = "log in"
    btnLogIn.classList.remove('btn_style_login-user_active');
    btnLogIn.style.border = '';
    btnLogIn.style.borderRadius = '';
}

btnLogOut.addEventListener('click', logOutAccount);

const showBtnLogOut = () => {
    if (btnLogIn.classList.contains('btn_style_login-user_active')) {
        btnLogOut.style.opacity = '1';
        btnLogOut.style.pointerEvents = 'auto';
    }
}

btnLogIn.addEventListener('click', showBtnLogOut);

const hideBtnLogOut = () => {
    btnLogOut.style.opacity = '';
    btnLogOut.style.pointerEvents = '';
}

window.addEventListener('scroll', hideBtnLogOut);

// Slider for section "Pets in zoo"

class SliderPetsInZoo {
    constructor() {
        this.slider = document.querySelector('.pets-in-zoo__container');
        this.sliderList = this.slider.querySelector('.slider__container');
        this.sliderItems = this.sliderList.querySelectorAll('.content-middle');
        this.sliderFirst = this.sliderList.querySelector('.content-middle');
        this.nextBtn = this.slider.querySelector('.btn__arrow-right');
        this.prevBtn = this.slider.querySelector('.btn__arrow-left');

        this.options = this.defaults;
        this.init(this);
    }

    defaults = {
        elemVisible: 1,
        speed: 2000
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

    init(that) {
        // that.elemCount = that.sliderItems.length;
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

        function getTime() {
            return new Date().getTime();
        }
    }
}

new SliderPetsInZoo();

// Slider for section "Testimonials"

class SliderTestimonials extends SliderPetsInZoo {
    constructor() {
        super();
        this.slider = document.querySelector('.testimonials__container');
        this.sliderList = this.slider.querySelector('.comments');
        this.sliderItems = this.sliderList.querySelectorAll('.comments__item');
        this.sliderFirst = this.sliderList.querySelector('.comments__item');

        this.options = this.defaults;
        this.init(this);
    }

    defaults = {
        elemVisible: 3,
        looping: true,
        auto: true,
        interval: 10000,
        scrollDelay: 20000,
        speed: 1000
    }

    init(that) {
        let bgTime = getTime();

        function setAutoScroll() {
            that.autoScroll = setInterval(function() {
                let fnTime = getTime();
                if (fnTime - bgTime + 10 > that.options.interval) {
                    bgTime = fnTime;
                    if (!that.options.auto) return;
                    that.next();
                }
            }, that.options.interval);
        }

        function stopAutoScroll(event) {
            if (event.target.parentNode.classList.contains('comments__item') ||
                event.target.classList.contains('comments__item') ||
                event.target.classList.contains('comments__text')) {
                that.options.auto = false;
                clearInterval(that.autoScroll);
                setTimeout(function () {
                    that.options.auto = true;
                    setAutoScroll();
                }, that.options.scrollDelay);
            } else {
                return;
            }
        }

        if (that.options.auto) {
            setAutoScroll();
        }

        that.sliderList.addEventListener('click', stopAutoScroll, false);
        
        function getTime() {
            return new Date().getTime();
        }
    }
}

new SliderTestimonials();