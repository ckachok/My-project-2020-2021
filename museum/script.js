const playerControl = document.querySelector('.player__control');
  
playerControl.addEventListener('input', function(event) {
  if (event.target.classList.contains('progress')) {
    const value = event.target.value;
    event.target.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  }
})
