class Map {
    constructor() {
        this.map = document.querySelector('.map__block');
        this.btnZoomUp = document.getElementById('btn-plus');
        this.btnZoomDown = document.getElementById('btn-minus');
        this.iconPets = document.querySelectorAll('.animal__icon');
        this.zoomPets = new Array(this.iconPets.length).fill(1);
        this.zoomCount = 0;
        this.zoomMap = 1.5;
        this.zoomIcon = 0.85;
        this.coords = {
            pointX: 108,
            pointY: 52
        };
        this.shiftCoords = {};

        this.init(this);
    }

    moveAt(event) {
        if (!event.target.classList.contains('map__block')) {
            return false;
        }

        this.shiftCoords.shiftX = event.clientX - this.coords.pointX;
        this.shiftCoords.shiftY = event.clientY - this.coords.pointY;
        this.coords.pointX = event.clientX;
        this.coords.pointY = event.clientY;

        const styleLeft = parseInt(window.getComputedStyle(this.map).left);
        const styleTop = parseInt(window.getComputedStyle(this.map).top);
        
        this.map.style.left = styleLeft + this.shiftCoords.shiftX + 'px';
        this.map.style.top = styleTop + this.shiftCoords.shiftY + 'px';
    }

    init(that) {
        that.map.addEventListener('mousedown', (event) => {
            if (that.zoomCount !== 0) {
                that.coords.pointX = event.clientX;
                that.coords.pointY = event.clientY;
                that.moveAt(event);

                const handler = (event) => {
                    that.moveAt(event);
                }

                document.addEventListener('mousemove', handler);
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', handler)
                });
            }      
        })

        that.btnZoomUp.addEventListener('click', () => {
            if (that.zoomCount < 6) {
            that.zoomCount++;

            const coefficientMap = Math.pow(that.zoomMap, that.zoomCount);
            const coefficientIcon = Math.pow(that.zoomIcon, that.zoomCount);

            that.map.style.transform = `scale(${coefficientMap})`;
            that.iconPets.forEach((elem) => {
                elem.style.transform = `scale(${coefficientIcon})`;
                const styleTop = parseInt(window.getComputedStyle(elem).top);
                elem.style.top = styleTop + 4 + 'px';
            })
            } else return;  
        })

        that.btnZoomDown.addEventListener('click', () => {
            if (that.zoomCount === 0) return;
            if (that.zoomCount === 1) {
                that.map.style.transform = '';
                that.iconPets.forEach((elem) => {
                    elem.style.transform = '';
                    const styleTop = parseInt(window.getComputedStyle(elem).top);
                    elem.style.top = styleTop - 4 + 'px';
                })
                that.map.style.top = '108px';
                that.map.style.left = '52px';
                that.zoomCount--;
            } else {
                const coefficientMap = Math.pow(that.zoomMap, that.zoomCount - 1);
                const coefficientIcon = Math.pow(that.zoomIcon, that.zoomCount - 1);
                that.map.style.transform = `scale(${coefficientMap})`;
                that.zoomCount--;
                that.iconPets.forEach((elem) => {
                    elem.style.transform = `scale(${coefficientIcon})`;
                    const styleTop = parseInt(window.getComputedStyle(elem).top);
                    elem.style.top = styleTop - 4 + 'px';
                })
            }      
        })
    }  
}

new Map()