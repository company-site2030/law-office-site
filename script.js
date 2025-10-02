// script.js - simple mobile menu toggle and particles init
document.addEventListener('DOMContentLoaded', function(){
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.menu-toggle');
  if(toggle){
    toggle.addEventListener('click', ()=> header.classList.toggle('show-nav'));
  }
});
