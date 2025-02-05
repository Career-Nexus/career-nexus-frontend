// Highlight Active Tab
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop(); // Get the current file name
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach((item) => {
      if (item.getAttribute('href') === currentPage) {
          item.classList.add('active'); // Add 'active' class to the current page's menu item
      } else {
          item.classList.remove('active'); // Remove 'active' class from other items
      }
  });
});

document.querySelector('.account-img').addEventListener('click', () => {
  window.location.href = 'profile.html'; // Replace with the actual profile page URL
});

// Get the modal, sign-up link, close button, and "Let’s Get Started" button elements
const modal = document.getElementById("registrationModal");
const signUpLink = document.querySelector(".signup-text a");
const closeButton = document.querySelector(".close");
const getStartedBtn = document.getElementById("getStartedBtn");

// Show the modal when "Sign up" link is clicked
signUpLink.onclick = function(event) {
  event.preventDefault();
  modal.style.display = "block";
}

// Show the modal when "Let’s Get Started" button is clicked
getStartedBtn.onclick = function(event) {
  event.preventDefault();
  modal.style.display = "block";
}

// Hide the modal when the close button is clicked
closeButton.onclick = function() {
  modal.style.display = "none";
}

// Hide the modal if the user clicks outside of the modal content
window.onclick = function(event) {
  if (event.target === modal) {
      modal.style.display = "none";
  }
}

// Toggle menu visibility for burger icon on mobile view
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('menu-active');
}

// Functionality to close the menu when clicking on a menu item (useful for mobile view)
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
      const menu = document.querySelector('.menu');
      if (menu.classList.contains('menu-active')) {
          menu.classList.remove('menu-active');
      }
  });
});

// Optional: Handle additional search functionality
const searchButton = document.querySelector('.search-btn');
searchButton.onclick = function(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.search-input').value;
  // Perform search or any desired action with the searchInput value
  console.log("Searching for:", searchInput);
};

// Open the password reset modal
function openPasswordResetModal() {
  document.getElementById('passwordResetModal').style.display = 'block';
}

// Close the password reset modal
function closePasswordResetModal() {
  document.getElementById('passwordResetModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('passwordResetModal');
  if (event.target == modal) {
      modal.style.display = 'none';
  }
};
// Automatically update the copyright year
document.addEventListener("DOMContentLoaded", function() {
  const footerYear = document.querySelector(".footer p");
  const currentYear = new Date().getFullYear();
  footerYear.innerHTML = `&copy; ${currentYear} Career-Nexus. All Rights Reserved.`;
});

// Selecting elements
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

// Toggle mobile menu on burger icon click
burgerMenu.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent event bubbling to the document
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (mobileMenu.classList.contains('active') && !mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
      mobileMenu.classList.remove('active');
  }
});

