document.addEventListener("DOMContentLoaded", () => {
  // Highlight Active Tab
  const currentPage = window.location.pathname.split('/').pop();
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach((item) => {
      if (item.getAttribute('href') === currentPage) {
          item.classList.add('active');
      } else {
          item.classList.remove('active');
      }
  });

  // Profile Image Click Redirect
  const accountImage = document.querySelector('.account-img');
  if (accountImage) {
      accountImage.addEventListener('click', () => {
          window.location.href = 'profile.html'; // Replace with the actual profile page URL
      });
  }

  // Modal Functionality for Registration
  const modal = document.getElementById("registrationModal");
  const signUpLink = document.querySelector(".signup-text a");
  const closeButton = document.querySelector(".close");
  const getStartedBtn = document.getElementById("getStartedBtn");

  if (modal) {
      if (signUpLink) {
          signUpLink.addEventListener("click", (event) => {
              event.preventDefault();
              modal.style.display = "block";
          });
      }

      if (getStartedBtn) {
          getStartedBtn.addEventListener("click", (event) => {
              event.preventDefault();
              modal.style.display = "block";
          });
      }

      if (closeButton) {
          closeButton.addEventListener("click", () => {
              modal.style.display = "none";
          });
      }

      window.addEventListener("click", (event) => {
          if (event.target === modal) {
              modal.style.display = "none";
          }
      });
  }

  // Burger Menu for Mobile
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (burgerMenu && mobileMenu) {
      burgerMenu.addEventListener('click', (event) => {
          event.stopPropagation();
          mobileMenu.classList.toggle('active');
      });

      document.addEventListener('click', (event) => {
          if (
              mobileMenu.classList.contains('active') &&
              !mobileMenu.contains(event.target) &&
              !burgerMenu.contains(event.target)
          ) {
              mobileMenu.classList.remove('active');
          }
      });
  }

  // Search Button Functionality
  const searchButton = document.querySelector('.search-btn');
  if (searchButton) {
      searchButton.addEventListener('click', (event) => {
          event.preventDefault();
          const searchInput = document.querySelector('.search-input').value;
          console.log("Searching for:", searchInput);
      });
  }

  // Password Reset Modal
  const passwordResetModal = document.getElementById('passwordResetModal');
  if (passwordResetModal) {
      const openPasswordReset = () => {
          passwordResetModal.style.display = 'block';
      };

      const closePasswordReset = () => {
          passwordResetModal.style.display = 'none';
      };

      window.addEventListener("click", (event) => {
          if (event.target === passwordResetModal) {
              closePasswordReset();
          }
      });
  }

  // Follow Button
  const followButton = document.querySelector(".follow-btn");
  if (followButton) {
      followButton.addEventListener("click", () => {
          alert("You are now following this user!");
      });
  }

  // Connect Buttons
  const connectButtons = document.querySelectorAll(".connect-btn");
  connectButtons.forEach((button) => {
      button.addEventListener("click", () => {
          const name = button.closest(".suggestion").querySelector(".suggestion-name").textContent;
          alert(`Connection request sent to ${name}!`);
      });
  });

  // Add Hashtag
  const addHashtagButton = document.querySelector(".add-hashtag");
  const hashtagsRow = document.querySelector(".hashtags-row");

  if (addHashtagButton && hashtagsRow) {
      addHashtagButton.addEventListener("click", () => {
          const newHashtag = prompt("Enter a new hashtag:");
          if (newHashtag && newHashtag.trim()) {
              const hashtagElement = document.createElement("span");
              hashtagElement.classList.add("hashtag");
              hashtagElement.textContent = `#${newHashtag.trim()}`;
              hashtagsRow.appendChild(hashtagElement);
              alert(`Hashtag #${newHashtag.trim()} added!`);
          } else {
              alert("Hashtag cannot be empty!");
          }
      });
  }

  // Menu Navigation
  const menuListItems = document.querySelectorAll(".menu-list ul li");
  const menuLinks = {
      "Learning": "learning.html",
      "Insights": "insights.html",
      "Bookmarks": "bookmarks.html",
      "Library": "library.html",
      "Newsletter": "newsletter.html",
      "Settings": "settings.html",
  };

  menuListItems.forEach((menuItem) => {
      menuItem.addEventListener("click", () => {
          const menuText = menuItem.textContent.trim();
          if (menuLinks[menuText]) {
              window.location.href = menuLinks[menuText];
          } else {
              alert("This page is not yet available!");
          }
      });
  });

  // Update Footer Year
  const footerYear = document.querySelector(".footer p");
  if (footerYear) {
      const currentYear = new Date().getFullYear();
      footerYear.innerHTML = `&copy; ${currentYear} Career-Nexus. All Rights Reserved.`;
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const tryNowButton = document.getElementById("tryNowButton");
  const paymentModal = document.getElementById("paymentModal");
  const closeModalButton = paymentModal.querySelector(".close");
  const paymentForm = document.getElementById("paymentForm");
  const paymentCountrySelect = document.getElementById("payment-country");

  // Payment Details Containers
  const usaPayment = document.getElementById("usa-payment");
  const ukPayment = document.getElementById("uk-payment");
  const internationalPayment = document.getElementById("international-payment");

  // Show Modal on Try Now Button Click
  tryNowButton.addEventListener("click", () => {
      paymentModal.style.display = "block";
  });

  // Close Modal on Close Button Click
  closeModalButton.addEventListener("click", () => {
      paymentModal.style.display = "none";
  });

  // Close Modal on Outside Click
  window.addEventListener("click", (event) => {
      if (event.target === paymentModal) {
          paymentModal.style.display = "none";
      }
  });

  // Show Payment Details Based on Region Selection
  paymentCountrySelect.addEventListener("change", (event) => {
      const selectedOption = event.target.value;

      // Hide all payment options
      usaPayment.classList.add("hidden");
      ukPayment.classList.add("hidden");
      internationalPayment.classList.add("hidden");

      // Show selected payment option
      if (selectedOption === "usa") {
          usaPayment.classList.remove("hidden");
      } else if (selectedOption === "uk") {
          ukPayment.classList.remove("hidden");
      } else if (selectedOption === "international") {
          internationalPayment.classList.remove("hidden");
      }
  });

  // Handle Payment Form Submission
  paymentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const selectedRegion = paymentCountrySelect.value;

      alert(`Payment processed successfully via ${selectedRegion.toUpperCase()} method!`);
      paymentModal.style.display = "none"; // Close modal after submission
  });
});

// Function to dynamically load advertisements
document.addEventListener('DOMContentLoaded', () => {
  const adContainer = document.querySelector('.ad-container');

  // Example advertisement data (replace with API calls for real data)
  const ads = [
    {
      title: "Discover New Career Opportunities",
      image: "https://via.placeholder.com/300x150",
      description: "Explore premium services tailored to your career growth.",
      link: "https://www.example.com/career-opportunities"
    },
    {
      title: "Enhance Your Skills Today",
      image: "https://via.placeholder.com/300x150",
      description: "Join our skill development programs and grow professionally.",
      link: "https://www.example.com/skills-development"
    },
  ];

  // Function to render an ad
  function renderAd(ad) {
    adContainer.innerHTML = `
      <h3>${ad.title}</h3>
      <img src="${ad.image}" alt="${ad.title}">
      <p>${ad.description}</p>
      <a href="${ad.link}" target="_blank">Learn More</a>
    `;
  }

  // Cycle through advertisements every 5 seconds
  let currentAdIndex = 0;
  renderAd(ads[currentAdIndex]);

  setInterval(() => {
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    renderAd(ads[currentAdIndex]);
  }, 5000); // Change advertisement every 5 seconds
});


document.addEventListener("DOMContentLoaded", () => {
  const minimizeBtn = document.querySelector(".minimize-btn");
  const messageContainer = document.querySelector(".message-container");
  const messageFooter = document.querySelector(".message-footer");

  // Toggle visibility of the message section
  minimizeBtn.addEventListener("click", () => {
      const icon = minimizeBtn.querySelector("i");
      messageContainer.style.display = messageContainer.style.display === "block" ? "none" : "block";
      messageFooter.style.display = messageFooter.style.display === "flex" ? "none" : "flex";

      // Toggle icon between up and down arrows
      if (icon.classList.contains("fa-chevron-up")) {
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
      } else {
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
      }
  });

  // Send message functionality
  const sendBtn = document.querySelector(".send-btn");
  const messageInput = document.querySelector(".message-input");

  sendBtn.addEventListener("click", () => {
      const message = messageInput.value.trim();
      if (message) {
          alert(`Message sent: "${message}"`); // Replace with real sending functionality
          messageInput.value = ""; // Clear input after sending
      } else {
          alert("Please enter a message!");
      }
  });
});










document.addEventListener("DOMContentLoaded", () => {
    const postInput = document.querySelector(".post-input");
    const sendPostButton = document.querySelector(".send-post");
    const mediaUploadButton = document.querySelector(".media-upload");
    const postHolderContainer = document.querySelector(".post-holder-container"); // Container for posts
    let selectedMedia = null; // Track selected media for posting
    let selectedMediaType = null; // Track the type of media: 'image' or 'video'

    // Media Upload
    mediaUploadButton.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*,video/*"; // Allow both image and video uploads
        input.click();
        input.addEventListener("change", () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const fileType = file.type.startsWith("video") ? "video" : "image";
                    selectedMedia = reader.result; // Save media for the post
                    selectedMediaType = fileType;
                    alert(`${fileType === "video" ? "Video" : "Image"} selected for posting.`);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Invalid file. Please upload a valid image or video.");
            }
        });
    });

    // Send Post
    sendPostButton.addEventListener("click", () => {
        const content = postInput.value.trim();
        if (!content && !selectedMedia) {
            alert("Please write something or select media before posting!");
            return;
        }
        createPost(content, selectedMedia, selectedMediaType);
        postInput.value = ""; // Clear input
        selectedMedia = null; // Reset selected media
        selectedMediaType = null; // Reset media type
    });

    // Create Post
    function createPost(text, media, mediaType) {
        const postHolder = document.createElement("div");
        postHolder.classList.add("post-holder");

        postHolder.innerHTML = `
            <div class="post-header">
                <img src="profile-image.jpg" alt="Profile Image">
                <div class="post-user-info">
                    <h4>John Doe</h4>
                    <p>Software Engineer</p>
                </div>
            </div>
            <div class="post-content">
                ${text ? `<p>${text}</p>` : ""}
                ${
                  media
                    ? mediaType === "image"
                      ? `<img src="${media}" alt="Uploaded Image">`
                      : `<video controls>
                            <source src="${media}" type="video/mp4">
                            Your browser does not support the video tag.
                         </video>`
                    : ""
                }
            </div>
            <div class="post-footer">
                <button class="btn like-btn"><i class="fas fa-thumbs-up"></i> Like</button>
                <button class="btn comment-btn"><i class="fas fa-comment"></i> Comment</button>
                <button class="btn share-btn"><i class="fas fa-share"></i> Share</button>
                <button class="btn save-btn"><i class="fas fa-save"></i> Save</button>
            </div>
            <div class="comment-section">
                <div class="comment-input-container">
                    <img src="profile-image.jpg" alt="Profile Image" class="comment-profile-img">
                    <textarea class="comment-input" placeholder="Write a comment..."></textarea>
                    <button class="comment-submit">Post</button>
                </div>
                <div class="comment-list"></div>
            </div>
        `;

        // Add the new post to the top of the post holder container
        postHolderContainer.prepend(postHolder);

        // Footer Actions
        postHolder.querySelector(".like-btn").addEventListener("click", () => {
            const likeButton = postHolder.querySelector(".like-btn");
            likeButton.classList.toggle("liked");
            likeButton.innerHTML = likeButton.classList.contains("liked")
                ? `<i class="fas fa-thumbs-up"></i> Liked`
                : `<i class="fas fa-thumbs-up"></i> Like`;
        });

        postHolder.querySelector(".comment-btn").addEventListener("click", () => {
            const commentInput = postHolder.querySelector(".comment-input");
            commentInput.focus();
        });

        // Share functionality
        postHolder.querySelector(".share-btn").addEventListener("click", () => {
            const postContent = postHolder.querySelector(".post-content").cloneNode(true);
            createPost("Shared Content", postContent.innerHTML, null);
        });

        postHolder.querySelector(".save-btn").addEventListener("click", () => {
            alert("Post saved!");
        });

        // Handle Comment Submission
        const commentSubmit = postHolder.querySelector(".comment-submit");
        const commentList = postHolder.querySelector(".comment-list");
        commentSubmit.addEventListener("click", () => {
            const commentInput = postHolder.querySelector(".comment-input");
            const commentText = commentInput.value.trim();
            if (commentText) {
                const comment = document.createElement("div");
                comment.classList.add("comment");
                comment.innerHTML = `
                    <img src="profile-image.jpg" alt="Profile Image">
                    <div class="comment-text">${commentText}</div>
                `;
                commentList.appendChild(comment);
                commentInput.value = ""; // Clear comment input
            }
        });
    }
});








