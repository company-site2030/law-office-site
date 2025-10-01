/* =============================
   القائمة للجوال (انيميشن 3D)
============================= */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navLinks.style.transition = "all 0.5s ease";
});

/* إغلاق القائمة بعد الضغط على أي رابط */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

/* =============================
   خلفية Particles متفاعلة
============================= */
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5, "random": true },
    "size": { "value": 3, "random": true },
    "line_linked": { "enable": true, "distance": 150, "color": "#f4c10f", "opacity": 0.4, "width": 1 },
    "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});

/* =============================
   تأثيرات الظهور عند التمرير
============================= */
const revealElements = document.querySelectorAll("section");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =============================
   انيميشن للكتابة (اختياري)
============================= */
const title = document.querySelector("h1");
if (title) {
  let text = title.innerText;
  title.innerText = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      title.innerText += text.charAt(i);
      i++;
      setTimeout(typing, 80);
    }
  }
  typing();
}
