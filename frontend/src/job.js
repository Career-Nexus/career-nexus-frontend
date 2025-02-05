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

// Registration Modal
const modal = document.getElementById('registrationModal');
const signUpLink = document.querySelector('.signup-text a');
const closeButton = document.querySelector('.close');

if (modal && signUpLink && closeButton) {
  signUpLink.onclick = function (event) {
    event.preventDefault();
    modal.style.display = 'block';
  };

  closeButton.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

if (burgerMenu && mobileMenu) {
  burgerMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    mobileMenu.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
      mobileMenu.classList.remove('active');
    }
  });
}


const tabs = document.querySelectorAll('.job-nav .tab');
const contentSections = document.querySelectorAll('.job-content');

if (tabs && contentSections) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      contentSections.forEach((section) => section.classList.add('hidden'));
      const tabContent = document.getElementById(tab.dataset.tab);
      tabContent.classList.remove('hidden');
    });
  });
}

const jobApplicationModal = document.getElementById('job-application-modal');

if (jobApplicationModal) {
  const closeModalBtn = jobApplicationModal.querySelector('.close-modal-btn');
  const nextStepBtn = jobApplicationModal.querySelector('.next-step-btn');
  const submitBtn = jobApplicationModal.querySelector('.submit-btn');
  const formSteps = jobApplicationModal.querySelectorAll('.form-step');

  let currentStep = 0;

  function openJobApplicationModal() {
    jobApplicationModal.classList.remove('hidden');
  }

  function closeJobApplicationModal() {
    jobApplicationModal.classList.add('hidden');
  }

  nextStepBtn.addEventListener('click', () => {
    formSteps[currentStep].classList.add('hidden');
    currentStep++;
    if (currentStep < formSteps.length) {
      formSteps[currentStep].classList.remove('hidden');
    }
    if (currentStep === formSteps.length - 1) {
      nextStepBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    }
  });

  closeModalBtn.addEventListener('click', closeJobApplicationModal);
  document.querySelectorAll('.apply-job-btn').forEach((btn) => {
    btn.addEventListener('click', openJobApplicationModal);
  });
}

const postJobBtn = document.querySelector('.post-job-btn');
const postedJobList = document.querySelector('.posted-job-list');

if (postJobBtn && postedJobList) {
  postJobBtn.addEventListener('click', () => {
    const jobTitle = prompt('Enter Job Title:');
    const jobCompany = prompt('Enter Company Name:');
    const jobLocation = prompt('Enter Job Location:');

    if (jobTitle && jobCompany && jobLocation) {
      const postedJobItem = document.createElement('div');
      postedJobItem.classList.add('posted-job-item');
      postedJobItem.innerHTML = `
        <div class="posted-job-info">
          <h4>${jobTitle}</h4>
          <p>${jobCompany}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${jobLocation}</p>
          <button class="btn edit-job-btn">Edit</button>
          <button class="btn delete-job-btn">Delete</button>
        </div>
      `;
      postedJobList.appendChild(postedJobItem);

      // Add edit and delete functionality
      addManageJobListeners(postedJobItem);
    }
  });
}

function addManageJobListeners(jobItem) {
  const editBtn = jobItem.querySelector('.edit-job-btn');
  const deleteBtn = jobItem.querySelector('.delete-job-btn');

  editBtn.addEventListener('click', () => {
    const newTitle = prompt('Edit Job Title:', jobItem.querySelector('h4').textContent);
    const newCompany = prompt('Edit Company Name:', jobItem.querySelector('p:first-of-type').textContent);
    const newLocation = prompt('Edit Job Location:', jobItem.querySelector('p:nth-of-type(2)').textContent);

    if (newTitle && newCompany && newLocation) {
      jobItem.querySelector('h4').textContent = newTitle;
      jobItem.querySelector('p:first-of-type').textContent = newCompany;
      jobItem.querySelector('p:nth-of-type(2)').textContent = newLocation;
    }
  });

  deleteBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this job?')) {
      jobItem.remove();
    }
  });
}


function loadRecommendedJobs() {
  const jobList = document.querySelector('.job-list');
  if (jobList) {
    jobList.innerHTML = ''; // Clear existing jobs

    const recommendedJobs = [
      { title: 'Data Scientist', company: 'DataTech', location: 'New York, USA' },
      { title: 'UI/UX Designer', company: 'CreativeWorks', location: 'San Francisco, USA' },
      { title: 'Backend Developer', company: 'Innovate Inc', location: 'Remote' },
    ];

    recommendedJobs.forEach((job) => {
      const jobItem = document.createElement('div');
      jobItem.classList.add('job-item');
      jobItem.innerHTML = `
        <div class="job-info">
          <h4>${job.title}</h4>
          <p>${job.company}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
          <button class="btn apply-job-btn">Apply Now</button>
        </div>
      `;
      jobList.appendChild(jobItem);

      jobItem.querySelector('.apply-job-btn').addEventListener('click', openJobApplicationModal);
    });
  }
}

document.addEventListener('DOMContentLoaded', loadRecommendedJobs);
