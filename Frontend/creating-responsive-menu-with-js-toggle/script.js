document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('ul');
  
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  });
  