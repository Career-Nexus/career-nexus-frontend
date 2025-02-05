const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});


const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    mainImage.src = thumbnail.src;
  });
});
