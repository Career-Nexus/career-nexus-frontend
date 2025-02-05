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

// JavaScript for Networking Page

// 1. Handle Tab Switching
const tabs = document.querySelectorAll('.networking-nav .tab');
const contentSections = document.querySelectorAll('.networking-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');

    // Hide all content sections
    contentSections.forEach((section) => section.classList.add('hidden'));

    // Show the corresponding section
    const tabContent = document.getElementById(tab.dataset.tab);
    tabContent.classList.remove('hidden');
  });
});

// 2. Modal Functionality for Connection Journey
const modal = document.getElementById('connection-journey-modal');
const closeModalBtn = modal.querySelector('.close-modal-btn');

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

// Close modal on button click
closeModalBtn.addEventListener('click', closeModal);

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Example: Open modal programmatically
document.querySelectorAll('.view-profile-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    openModal();
  });
});

// 3. Handle Invitations (Accept/Reject)
document.querySelectorAll('.accept-invite-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('You have accepted the invitation!');
    btn.closest('.invitation-item').remove(); // Remove the invitation card
  });
});

document.querySelectorAll('.reject-invite-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('You have rejected the invitation.');
    btn.closest('.invitation-item').remove(); // Remove the invitation card
  });
});

// 4. Sending Invitations
document.querySelectorAll('.send-invite-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('Invitation sent!');
    btn.textContent = 'Invitation Sent'; // Change button text
    btn.disabled = true; // Disable button
  });
});

// 5. Sidebar Filters (Mock Behavior)
const filters = document.querySelectorAll('.networking-sidebar a');

filters.forEach((filter) => {
  filter.addEventListener('click', (e) => {
    e.preventDefault();
    alert(`Filtering connections by: ${filter.dataset.filter}`);
  });
});








// Mock Data for Recommendations, Invitations, and Connections
const mockData = {
    recommendations: [
      {
        name: 'Jane Smith',
        job: 'Data Analyst at DataTech',
        location: 'New York, USA',
        img: 'user-placeholder.jpg',
      },
      {
        name: 'Michael Johnson',
        job: 'Backend Developer at WebTech',
        location: 'San Francisco, USA',
        img: 'user-placeholder.jpg',
      },
    ],
    invitations: [
      {
        name: 'Emily Johnson',
        job: 'Product Manager at Innovate Inc',
        location: 'Chicago, USA',
        img: 'user-placeholder.jpg',
      },
      {
        name: 'Chris Evans',
        job: 'Marketing Lead at GrowthHub',
        location: 'Boston, USA',
        img: 'user-placeholder.jpg',
      },
    ],
    connections: [
      {
        name: 'John Doe',
        job: 'Software Engineer at TechCorp',
        location: 'San Francisco, USA',
        img: 'user-placeholder.jpg',
      },
      {
        name: 'Sarah Lee',
        job: 'UI/UX Designer at CreativeWorks',
        location: 'Austin, USA',
        img: 'user-placeholder.jpg',
      },
    ],
  };
  
  // Function to Populate Recommendations
  function loadRecommendations() {
    const recommendationsContainer = document.querySelector('.recommendation-list');
    recommendationsContainer.innerHTML = ''; // Clear existing content
  
    mockData.recommendations.forEach((rec) => {
      const recommendation = document.createElement('div');
      recommendation.classList.add('recommendation-item');
      recommendation.innerHTML = `
        <img src="${rec.img}" alt="${rec.name}" class="recommendation-photo">
        <div class="recommendation-info">
          <h4>${rec.name}</h4>
          <p>${rec.job}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${rec.location}</p>
          <button class="btn send-invite-btn">Send Invitation</button>
        </div>
      `;
      recommendationsContainer.appendChild(recommendation);
    });
  
    // Add functionality to Send Invitation buttons
    document.querySelectorAll('.send-invite-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        alert('Invitation sent!');
        btn.textContent = 'Invitation Sent';
        btn.disabled = true;
      });
    });
  }
  
  // Function to Populate Invitations
  function loadInvitations() {
    const invitationsContainer = document.querySelector('.invitations-list');
    invitationsContainer.innerHTML = ''; // Clear existing content
  
    mockData.invitations.forEach((inv) => {
      const invitation = document.createElement('div');
      invitation.classList.add('invitation-item');
      invitation.innerHTML = `
        <img src="${inv.img}" alt="${inv.name}" class="invitation-photo">
        <div class="invitation-info">
          <h4>${inv.name}</h4>
          <p>${inv.job}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${inv.location}</p>
          <button class="btn accept-invite-btn">Accept</button>
          <button class="btn reject-invite-btn">Reject</button>
        </div>
      `;
      invitationsContainer.appendChild(invitation);
    });
  
    // Add functionality to Accept and Reject buttons
    document.querySelectorAll('.accept-invite-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        alert('You have accepted the invitation!');
        btn.closest('.invitation-item').remove();
      });
    });
  
    document.querySelectorAll('.reject-invite-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        alert('You have rejected the invitation.');
        btn.closest('.invitation-item').remove();
      });
    });
  }
  
  // Function to Populate Connections
  function loadConnections() {
    const connectionsContainer = document.querySelector('.connection-list');
    connectionsContainer.innerHTML = ''; // Clear existing content
  
    mockData.connections.forEach((conn) => {
      const connection = document.createElement('div');
      connection.classList.add('connection-item');
      connection.innerHTML = `
        <img src="${conn.img}" alt="${conn.name}" class="connection-photo">
        <div class="connection-info">
          <h4>${conn.name}</h4>
          <p>${conn.job}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${conn.location}</p>
          <button class="btn view-profile-btn">View Profile</button>
        </div>
      `;
      connectionsContainer.appendChild(connection);
    });
  
    // Add functionality to View Profile buttons
    document.querySelectorAll('.view-profile-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        openModal();
      });
    });
  }
  
  // Initial Load of Data
  loadRecommendations();
  loadInvitations();
  loadConnections();

  



  