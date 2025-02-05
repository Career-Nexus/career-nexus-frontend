// Tab Navigation
const tabs = document.querySelectorAll('.tab');
const tabPanes = document.querySelectorAll('.tab-pane');

// Tab Switching Logic
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Remove active classes from all tabs and panes
    tabs.forEach((t) => t.classList.remove('active'));
    tabPanes.forEach((pane) => pane.classList.remove('active'));

    // Add active classes to clicked tab and corresponding pane
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

document.querySelector('.account-img').addEventListener('click', () => {
  window.location.href = 'profile.html'; // Replace with the actual profile page URL
});

// Modal Logic (Reusable)
function setupModal({ modalId, addButtonClass, closeButtonClass, saveButtonClass, listClass, createCardCallback }) {
  const modal = document.getElementById(modalId);
  const addButton = document.querySelector(`.${addButtonClass}`);
  const closeButton = modal.querySelector(`.${closeButtonClass}`);
  const saveButton = modal.querySelector(`.${saveButtonClass}`);
  const list = document.querySelector(`.${listClass}`);

  // Open modal
  addButton.addEventListener('click', () => {
    modal.style.display = 'block';
    modal.querySelectorAll('input, textarea').forEach((input) => (input.value = '')); // Reset form fields
  });

  // Close modal
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Save content
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    const card = createCardCallback(modal);
    if (card) {
      list.appendChild(card);
      modal.style.display = 'none';
    }
  });
}

// Reusable Create Card Logic
function createCard(modal, fields) {
  const values = fields.map((field) => modal.querySelector(`#${field}`).value.trim());
  if (values.some((value) => !value)) {
    alert('Please fill in all fields.');
    return null;
  }

  return values;
}

// Add Edit and Delete Functionality
function addCardActions(card, editCallback) {
  // Delete functionality
  card.querySelector('.delete-btn').addEventListener('click', () => {
    card.remove();
  });

  // Edit functionality
  card.querySelector('.edit-btn').addEventListener('click', () => {
    editCallback(card);
    card.remove();
  });
}

// Experience Card Logic
function createExperienceCard(modal) {
  const [jobTitle, companyName, jobDuration, jobLocation, jobDescription] = createCard(modal, [
    'job-title',
    'company-name',
    'job-duration',
    'job-location',
    'job-description',
  ]);

  if (!jobTitle) return null;

  // Create card
  const card = document.createElement('div');
  card.className = 'experience-card';
  card.innerHTML = `
    <div class="experience-info">
      <h3>${jobTitle}</h3>
      <p class="company-name"><i class="fas fa-building"></i> ${companyName}</p>
      <p class="job-duration"><i class="fas fa-calendar-alt"></i> ${jobDuration}</p>
      <p class="job-location"><i class="fas fa-map-marker-alt"></i> ${jobLocation}</p>
      <p class="job-description">${jobDescription}</p>
    </div>
    <div class="experience-actions">
      <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
      <button class="btn delete-btn"><i class="fas fa-trash-alt"></i></button>
    </div>
  `;

  // Add actions
  addCardActions(card, (card) => {
    modal.querySelector('#job-title').value = jobTitle;
    modal.querySelector('#company-name').value = companyName;
    modal.querySelector('#job-duration').value = jobDuration;
    modal.querySelector('#job-location').value = jobLocation;
    modal.querySelector('#job-description').value = jobDescription;
    modal.style.display = 'block';
  });

  return card;
}

// Education Card Logic
function createEducationCard(modal) {
  const [degree, institution, fieldOfStudy, duration] = createCard(modal, [
    'degree',
    'institution',
    'field-of-study',
    'duration',
  ]);

  if (!degree) return null;

  // Create card
  const card = document.createElement('div');
  card.className = 'education-card';
  card.innerHTML = `
    <div class="education-info">
      <h3>${degree}</h3>
      <p class="institution-name"><i class="fas fa-university"></i> ${institution}</p>
      <p class="field-of-study"><i class="fas fa-book"></i> ${fieldOfStudy}</p>
      <p class="graduation-year"><i class="fas fa-calendar-alt"></i> Graduated: ${duration}</p>
      <p class="location"><i class="fas fa-map-marker-alt"></i> ${Location}</p>
      <p class="description">${Description}</p>
    </div>
    <div class="education-actions">
      <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
      <button class="btn delete-btn"><i class="fas fa-trash-alt"></i></button>
    </div>
  `;

  // Add actions
  addCardActions(card, (card) => {
    modal.querySelector('#degree').value = degree;
    modal.querySelector('#institution').value = institution;
    modal.querySelector('#field-of-study').value = fieldOfStudy;
    modal.querySelector('#graduation-year').value = duration;
    modal.querySelector('#location').value = Location;
    modal.querySelector('#description').value = Description;
    modal.style.display = 'block';
  });

  return card;
}  

// Setup Modals
setupModal({
  modalId: 'experience-modal',
  addButtonClass: 'add-experience-btn',
  closeButtonClass: 'close-btn',
  saveButtonClass: 'save-btn',
  listClass: 'experience-list',
  createCardCallback: createExperienceCard,
});

setupModal({
  modalId: 'education-modal',
  addButtonClass: 'add-education-btn',
  closeButtonClass: 'close-btn',
  saveButtonClass: 'save-btn',
  listClass: 'education-list',
  createCardCallback: createEducationCard,
});

// Targeting elements
const aboutTextarea = document.getElementById('about-statement-textarea');
const wordCountDisplay = document.getElementById('word-count-display');
const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');

// Update word count dynamically
aboutTextarea.addEventListener('input', () => {
    const wordCount = aboutTextarea.value.split(/\s+/).filter(word => word).length;
    wordCountDisplay.textContent = `Word Count: ${wordCount} / 500`;
});

// Edit button functionality
editButton.addEventListener('click', () => {
    aboutTextarea.removeAttribute('readonly');
    aboutTextarea.focus();
});

// Save button functionality
saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    const wordCount = aboutTextarea.value.split(/\s+/).filter(word => word).length;
    if (wordCount < 50 || wordCount > 500) {
        alert('Your About Statement must be between 50 and 1000 words.');
    } else {
        alert('About Statement saved successfully!');
        aboutTextarea.setAttribute('readonly', true);
    }
});

const aboutForm = document.getElementById('about-statement-form');

aboutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = "USER_ID"; // Replace with the actual logged-in user's ID
    const aboutStatement = aboutTextarea.value;

    if (aboutStatement.split(/\s+/).filter(word => word).length < 50 || aboutStatement.length > 500) {
        alert('About Statement must be between 50 and 500 words.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/about-statement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, aboutStatement }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            aboutTextarea.setAttribute('readonly', true);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error saving About Statement:', error);
        alert('Failed to save About Statement. Please try again.');
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    const userId = "USER_ID"; // Replace with actual user ID

    try {
        const response = await fetch(`${API_URL}/${userId}`);
        const data = await response.json();

        if (response.ok) {
            aboutTextarea.value = data.aboutStatement || '';
            aboutTextarea.setAttribute('readonly', true);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error fetching About Statement:', error);
    }
});
window.addEventListener('DOMContentLoaded', async () => {
    const userId = "USER_ID"; // Replace with actual user ID

    try {
        const response = await fetch(`${API_URL}/${userId}`);
        const data = await response.json();

        if (response.ok) {
            aboutTextarea.value = data.aboutStatement || '';
            aboutTextarea.setAttribute('readonly', true);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error fetching About Statement:', error);
    }
});

// Add click event to tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs and panes
        tabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add 'active' class to the clicked tab and its content
        tab.classList.add('active');
        const targetPane = document.getElementById(tab.dataset.tab);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});



// Show Add Project Modal
document.getElementById('add-project-btn').addEventListener('click', () => {
  document.getElementById('add-project-modal').style.display = 'flex';
});

// Close Add Project Modal
document.getElementById('close-modal-btn').addEventListener('click', () => {
  document.getElementById('add-project-modal').style.display = 'none';
});

// Save New Project
document.getElementById('add-project-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('project-title').value;
  const description = document.getElementById('project-description').value;

  // Add a new project card to the grid
  const projectGrid = document.querySelector('.project-grid');
  const newCard = document.createElement('div');
  newCard.classList.add('project-card');
  newCard.innerHTML = `
      <img src="placeholder-image.jpg" alt="Project Image" class="project-image" />
      <div class="project-info">
          <h3>${title}</h3>
          <p>${description}</p>
      </div>
      <div class="project-actions">
          <button class="btn view-btn">View</button>
          <button class="btn edit-btn">Edit</button>
          <button class="btn delete-btn">Delete</button>
          <button class="btn share-btn">Share</button>
      </div>
  `;
  projectGrid.appendChild(newCard);

  // Close modal
  document.getElementById('add-project-modal').style.display = 'none';
});



// Show Add Project Modal
document.getElementById('catalog-add-project-btn').addEventListener('click', () => {
  document.getElementById('catalog-add-project-modal').style.display = 'flex';
});

// Close Add Project Modal
document.getElementById('catalog-close-modal-btn').addEventListener('click', () => {
  document.getElementById('catalog-add-project-modal').style.display = 'none';
});

// Save New Project
document.getElementById('catalog-add-project-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('catalog-project-title').value;
  const description = document.getElementById('catalog-project-description').value;

  // Add a new catalog item to the grid
  const catalogGrid = document.querySelector('.catalog-grid');
  const newCatalogItem = document.createElement('div');
  newCatalogItem.classList.add('catalog-item');
  newCatalogItem.innerHTML = `
      <div class="file-icon">
          <i class="fas fa-file-alt"></i>
      </div>
      <div class="file-details">
          <h3>${title}</h3>
          <p><strong>Type:</strong> Uploaded File</p>
          <p><strong>Size:</strong> N/A</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      <div class="file-actions">
          <button class="btn catalog-view-btn">View</button>
          <button class="btn catalog-download-btn">Download</button>
          <button class="btn catalog-edit-btn">Edit</button>
          <button class="btn catalog-delete-btn">Delete</button>
      </div>
  `;
  catalogGrid.appendChild(newCatalogItem);

  // Close modal
  document.getElementById('catalog-add-project-modal').style.display = 'none';
});


// Show Create Post Modal
document.getElementById('create-post-btn').addEventListener('click', () => {
  document.getElementById('create-post-modal').style.display = 'flex';
});

// Close Create Post Modal
document.getElementById('close-post-modal-btn').addEventListener('click', () => {
  document.getElementById('create-post-modal').style.display = 'none';
});

// Submit New Post
document.getElementById('create-post-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  // Add new post to the feed
  const postFeed = document.querySelector('.post-feed');
  const newPost = document.createElement('div');
  newPost.classList.add('post');
  newPost.innerHTML = `
      <div class="post-header">
          <h3>${title}</h3>
          <p class="post-meta">Posted by You on ${new Date().toLocaleDateString()}</p>
      </div>
      <div class="post-content">
          <p>${content}</p>
      </div>
      <div class="post-actions">
          <button class="btn like-btn">Like</button>
          <button class="btn comment-btn">Comment</button>
          <button class="btn edit-btn">Edit</button>
          <button class="btn delete-btn">Delete</button>
      </div>
  `;
  postFeed.appendChild(newPost);

  // Close modal
  document.getElementById('create-post-modal').style.display = 'none';
});

// Simulate dynamic updates to metrics and activity feed
document.addEventListener('DOMContentLoaded', () => {
  // Update Metrics
  const totalPosts = 12; // Example dynamic value
  const totalProjects = 8;
  const completedTasks = 15;
  const totalConnections = 25;

  document.getElementById('total-posts').textContent = totalPosts;
  document.getElementById('total-projects').textContent = totalProjects;
  document.getElementById('completed-tasks').textContent = completedTasks;
  document.getElementById('total-connections').textContent = totalConnections;

  // Activity Feed Updates
  const activityFeed = document.getElementById('activity-feed');
  const newActivity = document.createElement('li');
  newActivity.textContent = 'Added a new post: "Dashboard Tips" on Dec 2, 2024';
  activityFeed.prepend(newActivity); // Add to the top of the feed
});

// Handle Quick Actions
document.getElementById('dashboard-create-post').addEventListener('click', () => {
  alert('Redirecting to Create Post page...');
  // Logic to redirect or open Create Post modal
});

document.getElementById('dashboard-add-project').addEventListener('click', () => {
  alert('Redirecting to Add Project page...');
  // Logic to redirect or open Add Project modal
});

document.getElementById('dashboard-view-profile').addEventListener('click', () => {
  alert('Redirecting to Profile page...');
  // Logic to redirect or view profile
});


// Show and Hide Modals
const showModal = (modalId) => {
  document.getElementById(modalId).style.display = 'flex';
};

const closeModal = (modalId) => {
  document.getElementById(modalId).style.display = 'none';
};

// Profile Picture Modal
document.getElementById('edit-profile-picture-btn').addEventListener('click', () => {
  showModal('edit-profile-picture-modal');
});

document.getElementById('close-profile-picture-modal').addEventListener('click', () => {
  closeModal('edit-profile-picture-modal');
});

// Cover Photo Modal
document.getElementById('edit-cover-photo-btn').addEventListener('click', () => {
  showModal('edit-cover-photo-modal');
});

document.getElementById('close-cover-photo-modal').addEventListener('click', () => {
  closeModal('edit-cover-photo-modal');
});

// Profile Details Modal
document.getElementById('edit-profile-details-btn').addEventListener('click', () => {
  showModal('edit-profile-details-modal');
});

document.getElementById('close-profile-details-modal').addEventListener('click', () => {
  closeModal('edit-profile-details-modal');
});

// Submit Actions (Profile Picture, Cover Photo, Details)
document.getElementById('edit-profile-picture-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Profile picture updated successfully!');
  closeModal('edit-profile-picture-modal');
});

document.getElementById('edit-cover-photo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Cover photo updated successfully!');
  closeModal('edit-cover-photo-modal');
});

document.getElementById('edit-profile-details-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Profile details updated successfully!');
  closeModal('edit-profile-details-modal');
});


document.querySelectorAll('.stat-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert('This will link to a detailed analytics page!');
  });
});

// Open and Close Modal Functionality
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const addCertModal = document.getElementById("add-cert-modal");

// Open Modal
openModalBtn.addEventListener("click", () => {
  addCertModal.style.display = "block";
});

// Close Modal
closeModalBtn.addEventListener("click", () => {
  addCertModal.style.display = "none";
});

// Close Modal When Clicking Outside the Content
window.addEventListener("click", (event) => {
  if (event.target === addCertModal) {
    addCertModal.style.display = "none";
  }
});

const videoPreview = document.getElementById('video-preview');
const startRecordingBtn = document.getElementById('start-recording');
const stopRecordingBtn = document.getElementById('stop-recording');
const applyVideoBtn = document.getElementById('apply-video');
const redoVideoBtn = document.getElementById('redo-video');
const timerDisplay = document.getElementById('timer-display');

let mediaRecorder;
let recordedChunks = [];
let timer;
let timeLimit = 30; // seconds

// Access user's webcam
async function startWebcam() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  videoPreview.srcObject = stream;
}

// Start recording
startRecordingBtn.addEventListener('click', () => {
  const stream = videoPreview.srcObject;
  mediaRecorder = new MediaRecorder(stream);
  recordedChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const videoURL = URL.createObjectURL(videoBlob);
    videoPreview.src = videoURL;
    videoPreview.controls = true;
  };

  mediaRecorder.start();
  startTimer();

  startRecordingBtn.style.display = 'none';
  stopRecordingBtn.style.display = 'inline-block';
});

// Stop recording
stopRecordingBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  clearInterval(timer);

  stopRecordingBtn.style.display = 'none';
  applyVideoBtn.style.display = 'inline-block';
  redoVideoBtn.style.display = 'inline-block';
});

// Redo recording
redoVideoBtn.addEventListener('click', () => {
  startRecordingBtn.style.display = 'inline-block';
  applyVideoBtn.style.display = 'none';
  redoVideoBtn.style.display = 'none';
  videoPreview.srcObject = videoPreview.srcObject;
  videoPreview.controls = false;
});

// Timer functionality
function startTimer() {
  let remainingTime = timeLimit;
  timerDisplay.textContent = `00:${remainingTime}`;

  timer = setInterval(() => {
    remainingTime -= 1;
    timerDisplay.textContent = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;

    if (remainingTime <= 0) {
      clearInterval(timer);
      stopRecordingBtn.click();
    }
  }, 1000);
}

// Start the webcam on load
startWebcam();

const helpModal = document.getElementById("help-modal");
const openHelpModalBtn = document.getElementById("open-help-modal");
const closeHelpModalBtn = document.getElementById("close-help-modal");

// Open Help Modal
openHelpModalBtn.addEventListener("click", () => {
  helpModal.style.display = "flex";
});

// Close Help Modal
closeHelpModalBtn.addEventListener("click", () => {
  helpModal.style.display = "none";
});

// Close Modal When Clicking Outside
window.addEventListener("click", (event) => {
  if (event.target === helpModal) {
    helpModal.style.display = "none";
  }
});


applyVideoBtn.addEventListener("click", () => {
  alert("Your video has been saved and applied successfully!");
  // Logic to upload the video to the server or save to profile goes here
});


// Variables to store the video blob
let recordedVideoBlob;

// Stop recording and prepare the video for upload
stopRecordingBtn.addEventListener("click", () => {
  mediaRecorder.stop();
  clearInterval(timer);

  stopRecordingBtn.style.display = "none";
  applyVideoBtn.style.display = "inline-block";
  redoVideoBtn.style.display = "inline-block";

  mediaRecorder.onstop = () => {
    recordedVideoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const videoURL = URL.createObjectURL(recordedVideoBlob);
    videoPreview.src = videoURL;
    videoPreview.controls = true;
  };
});

// Handle Apply Video Button
applyVideoBtn.addEventListener("click", () => {
  if (recordedVideoBlob) {
    // Example: Sending the video to a server
    const formData = new FormData();
    formData.append("video", recordedVideoBlob, "video-introduction.webm");

    fetch("/upload-video", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Your video has been saved successfully!");
        } else {
          alert("Failed to save your video. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
        alert("An error occurred. Please try again later.");
      });
  } else {
    alert("No video to apply!");
  }
});

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp
  },
});
const upload = multer({ storage });

// Route to handle video upload
app.post("/upload-video", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send({ message: "Video uploaded successfully!", file: req.file });
});

// Serve uploads folder statically (Optional)
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

applyVideoBtn.addEventListener("click", () => {
  if (recordedVideoBlob) {
    // Show progress container
    const progressContainer = document.getElementById("progress-container");
    const progressPercentage = document.getElementById("progress-percentage");
    const uploadProgress = document.getElementById("upload-progress");

    progressContainer.style.display = "block";

    const formData = new FormData();
    formData.append("video", recordedVideoBlob, "video-introduction.webm");

    // Use XMLHttpRequest for progress updates
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload-video");

    // Track progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        progressPercentage.textContent = `${percentage}%`;
        uploadProgress.value = percentage;
      }
    };

    // Handle upload completion
    xhr.onload = () => {
      if (xhr.status === 200) {
        alert("Video uploaded successfully!");
        progressContainer.style.display = "none";
      } else {
        alert("Failed to upload video.");
      }
    };

    // Handle errors
    xhr.onerror = () => {
      alert("An error occurred during the upload.");
    };

    // Send the request
    xhr.send(formData);
  } else {
    alert("No video to apply!");
  }
});










