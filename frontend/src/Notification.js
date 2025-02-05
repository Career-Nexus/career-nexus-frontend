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

// JavaScript for Notification Page

// 1. Tab Switching
const tabs = document.querySelectorAll('.notification-nav .tab');
const notificationContent = document.querySelector('.notification-content');

// Mock Data for Notifications
const notificationsData = {
  all: [
    { title: 'New Message from John Doe', message: 'Hi! I just wanted to follow up...', time: '5 mins ago', unread: true },
    { title: 'Update on Your Application', message: 'Your application has been reviewed.', time: '1 hour ago', unread: false },
    { title: 'Mention by Sarah Lee', message: 'Sarah mentioned you in a comment.', time: 'Yesterday', unread: true },
  ],
  mentions: [
    { title: 'Mention by Sarah Lee', message: 'Sarah mentioned you in a comment.', time: 'Yesterday', unread: true },
  ],
  messages: [
    { title: 'New Message from John Doe', message: 'Hi! I just wanted to follow up...', time: '5 mins ago', unread: true },
  ],
  updates: [
    { title: 'Update on Your Application', message: 'Your application has been reviewed.', time: '1 hour ago', unread: false },
  ],
};

// Function to Load Notifications
function loadNotifications(tab) {
  notificationContent.innerHTML = ''; // Clear current notifications

  const notifications = notificationsData[tab] || [];
  if (notifications.length === 0) {
    notificationContent.innerHTML = '<p>No notifications in this category.</p>';
    return;
  }

  notifications.forEach((notification) => {
    const notificationItem = document.createElement('div');
    notificationItem.classList.add('notification-item');
    if (notification.unread) notificationItem.classList.add('unread');

    notificationItem.innerHTML = `
      <div class="notification-info">
        <h4 class="notification-title">${notification.title}</h4>
        <p class="notification-message">${notification.message}</p>
        <span class="notification-time">${notification.time}</span>
      </div>
      <div class="notification-actions">
        <button class="btn mark-read-btn"><i class="fas fa-check"></i> Mark as Read</button>
        <button class="btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
      </div>
    `;

    // Mark as Read Functionality
    notificationItem.querySelector('.mark-read-btn').addEventListener('click', () => {
      notificationItem.classList.remove('unread');
      alert('Notification marked as read!');
    });

    // Delete Notification Functionality
    notificationItem.querySelector('.delete-btn').addEventListener('click', () => {
      alert('Notification deleted!');
      notificationItem.remove();
    });

    notificationContent.appendChild(notificationItem);
  });
}

// Add Click Listeners to Tabs
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active')); // Remove active class from all tabs
    tab.classList.add('active'); // Add active class to the clicked tab
    const category = tab.dataset.tab.replace('-tab', '');
    loadNotifications(category);
  });
});

// Load Default Tab (All Notifications)
loadNotifications('all');

// 2. Search Notifications
const searchInput = document.querySelector('.notification-search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const allNotifications = document.querySelectorAll('.notification-item');

  allNotifications.forEach((notification) => {
    const title = notification.querySelector('.notification-title').textContent.toLowerCase();
    const message = notification.querySelector('.notification-message').textContent.toLowerCase();

    if (title.includes(query) || message.includes(query)) {
      notification.style.display = 'flex';
    } else {
      notification.style.display = 'none';
    }
  });
});







// Prioritization Rules
const priorityKeywords = ['urgent', 'important', 'deadline'];
const prioritySenders = ['admin', 'manager', 'ceo'];

// Prioritize Notifications Function
function prioritizeNotifications(notifications) {
  return notifications.sort((a, b) => {
    const aPriority =
      prioritySenders.includes(a.sender.toLowerCase()) ||
      priorityKeywords.some((keyword) => a.title.toLowerCase().includes(keyword));
    const bPriority =
      prioritySenders.includes(b.sender.toLowerCase()) ||
      priorityKeywords.some((keyword) => b.title.toLowerCase().includes(keyword));

    return bPriority - aPriority; // Higher priority first
  });
}

// Update Load Notifications to Include Prioritization
function loadNotifications(tab) {
  notificationContent.innerHTML = ''; // Clear current notifications

  const notifications = prioritizeNotifications(notificationsData[tab] || []);
  if (notifications.length === 0) {
    notificationContent.innerHTML = '<p>No notifications in this category.</p>';
    return;
  }

  notifications.forEach((notification) => {
    const notificationItem = document.createElement('div');
    notificationItem.classList.add('notification-item');
    if (notification.unread) notificationItem.classList.add('unread');

    // Highlight priority notifications
    if (
      prioritySenders.includes(notification.sender.toLowerCase()) ||
      priorityKeywords.some((keyword) => notification.title.toLowerCase().includes(keyword))
    ) {
      notificationItem.style.border = '2px solid #007bff';
    }

    notificationItem.innerHTML = `
      <div class="notification-info">
        <h4 class="notification-title">${notification.title}</h4>
        <p class="notification-message">${notification.message}</p>
        <span class="notification-time">${notification.time}</span>
      </div>
      <div class="notification-actions">
        <button class="btn mark-read-btn"><i class="fas fa-check"></i> Mark as Read</button>
        <button class="btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
      </div>
    `;

    // Add functionality for buttons
    notificationItem.querySelector('.mark-read-btn').addEventListener('click', () => {
      notificationItem.classList.remove('unread');
      alert('Notification marked as read!');
    });

    notificationItem.querySelector('.delete-btn').addEventListener('click', () => {
      alert('Notification deleted!');
      notificationItem.remove();
    });

    notificationContent.appendChild(notificationItem);
  });
}







// Follow-Up Suggestions
function checkFollowUps() {
    const followUpNotifications = [];
  
    Object.values(notificationsData).forEach((category) => {
      category.forEach((notification) => {
        if (notification.unread && notification.time.includes('Yesterday')) {
          followUpNotifications.push(notification);
        }
      });
    });
  
    if (followUpNotifications.length > 0) {
      alert(`You have ${followUpNotifications.length} notifications that need follow-up!`);
    }
  }
  
  // Check follow-ups every 10 seconds (mock real-time behavior)
  setInterval(checkFollowUps, 10000);

  






  // Categorization Rules
const categorizationRules = {
    important: ['urgent', 'important', 'deadline'],
    updates: ['update', 'new feature', 'system'],
    social: ['mention', 'tagged', 'commented'],
  };
  
  // Categorize Notifications
  function categorizeNotifications(notifications) {
    return notifications.reduce(
      (categories, notification) => {
        const content = `${notification.title} ${notification.message}`.toLowerCase();
  
        if (categorizationRules.important.some((keyword) => content.includes(keyword))) {
          categories.important.push(notification);
        } else if (categorizationRules.updates.some((keyword) => content.includes(keyword))) {
          categories.updates.push(notification);
        } else if (categorizationRules.social.some((keyword) => content.includes(keyword))) {
          categories.social.push(notification);
        } else {
          categories.general.push(notification);
        }
  
        return categories;
      },
      { important: [], updates: [], social: [], general: [] }
    );
  }
  
  // Apply Categorization on Data
  const categorizedNotifications = categorizeNotifications(notificationsData.all);
  notificationsData.important = categorizedNotifications.important;
  notificationsData.updates = categorizedNotifications.updates;
  notificationsData.social = categorizedNotifications.social;
  notificationsData.general = categorizedNotifications.general;
  
  // Update Tabs to Load Categorized Notifications
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active')); // Remove active class
      tab.classList.add('active'); // Add active class
      const category = tab.dataset.tab.replace('-tab', '');
      loadNotifications(category);
    });
  });
  








  // Enhanced UI for Priority Notifications
function loadNotifications(tab) {
    notificationContent.innerHTML = ''; // Clear current notifications
  
    const notifications = prioritizeNotifications(notificationsData[tab] || []);
    if (notifications.length === 0) {
      notificationContent.innerHTML = '<p>No notifications in this category.</p>';
      return;
    }
  
    notifications.forEach((notification) => {
      const notificationItem = document.createElement('div');
      notificationItem.classList.add('notification-item');
  
      // Add high-priority styling
      if (
        prioritySenders.includes(notification.sender.toLowerCase()) ||
        priorityKeywords.some((keyword) => notification.title.toLowerCase().includes(keyword))
      ) {
        notificationItem.classList.add('high-priority');
      }
  
      // Add follow-up badge
      const followUpBadge =
        notification.unread && notification.time.includes('Yesterday')
          ? '<span class="follow-up-badge">Follow-Up</span>'
          : '';
  
      notificationItem.innerHTML = `
        <div class="notification-info">
          <h4 class="notification-title">
            ${notification.title}
            ${followUpBadge}
          </h4>
          <p class="notification-message">${notification.message}</p>
          <span class="notification-time">${notification.time}</span>
        </div>
        <div class="notification-actions">
          <button class="btn mark-read-btn"><i class="fas fa-check"></i> Mark as Read</button>
          <button class="btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
        </div>
      `;
  
      // Mark as Read Functionality
      notificationItem.querySelector('.mark-read-btn').addEventListener('click', () => {
        notificationItem.classList.remove('unread');
        alert('Notification marked as read!');
      });
  
      // Delete Notification Functionality
      notificationItem.querySelector('.delete-btn').addEventListener('click', () => {
        alert('Notification deleted!');
        notificationItem.remove();
      });
  
      notificationContent.appendChild(notificationItem);
    });
  }
  
  // Enhanced Tabs with Category-Specific Styles
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active')); // Remove active class
      tab.classList.add('active'); // Add active class
      const category = tab.dataset.tab.replace('-tab', '');
      loadNotifications(category);
    });
  });
  





  // Notification Settings Logic
const settingsForm = document.getElementById('notification-settings-form');

// Save Settings Handler
settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const mentionsEnabled = document.getElementById('mentions-toggle').checked;
  const updatesEnabled = document.getElementById('updates-toggle').checked;
  const priorityAlertsEnabled = document.getElementById('priority-alerts-toggle').checked;
  const followUpAlertsEnabled = document.getElementById('follow-up-alerts-toggle').checked;
  const refreshFrequency = document.getElementById('refresh-frequency').value;

  // Mock Save to Local Storage
  const userSettings = {
    mentionsEnabled,
    updatesEnabled,
    priorityAlertsEnabled,
    followUpAlertsEnabled,
    refreshFrequency,
  };

  localStorage.setItem('notificationSettings', JSON.stringify(userSettings));

  alert('Settings saved successfully!');
  applySettings(userSettings);
});

// Apply Settings
function applySettings(settings) {
  // Toggle categories based on user settings
  if (!settings.mentionsEnabled) {
    document.querySelector('.notification-nav li[data-tab="mentions-tab"]').style.display = 'none';
  } else {
    document.querySelector('.notification-nav li[data-tab="mentions-tab"]').style.display = '';
  }

  if (!settings.updatesEnabled) {
    document.querySelector('.notification-nav li[data-tab="updates-tab"]').style.display = 'none';
  } else {
    document.querySelector('.notification-nav li[data-tab="updates-tab"]').style.display = '';
  }

  // Apply refresh frequency (mock example)
  if (settings.refreshFrequency === 'realtime') {
    alert('Notifications will refresh in real-time!');
  } else if (settings.refreshFrequency === 'hourly') {
    alert('Notifications will refresh hourly.');
  } else if (settings.refreshFrequency === 'daily') {
    alert('You will receive a daily summary of notifications.');
  }
}

// Load Settings on Page Load
document.addEventListener('DOMContentLoaded', () => {
  const savedSettings = JSON.parse(localStorage.getItem('notificationSettings'));
  if (savedSettings) {
    document.getElementById('mentions-toggle').checked = savedSettings.mentionsEnabled;
    document.getElementById('updates-toggle').checked = savedSettings.updatesEnabled;
    document.getElementById('priority-alerts-toggle').checked = savedSettings.priorityAlertsEnabled;
    document.getElementById('follow-up-alerts-toggle').checked = savedSettings.followUpAlertsEnabled;
    document.getElementById('refresh-frequency').value = savedSettings.refreshFrequency;

    applySettings(savedSettings);
  }
});
