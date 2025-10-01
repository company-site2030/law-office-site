/* قائمة الجوال */
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

/* خلفية Particles */
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80 },
    "size": { "value": 3 },
    "move": { "speed": 2 },
    "line_linked": { "enable": true }
  }
});
