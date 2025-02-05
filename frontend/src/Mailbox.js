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

// JavaScript for Mailbox Page

// 1. Sidebar Navigation
const sidebarItems = document.querySelectorAll('.mailbox-sidebar li');
const mailListContainer = document.querySelector('.mail-list');

// Mock data for mail folders
const mailData = {
  inbox: [
    { sender: 'John Doe', subject: 'Meeting Reminder', date: 'Today', unread: true },
    { sender: 'Jane Smith', subject: 'Project Update', date: 'Yesterday', unread: false },
  ],
  sent: [
    { sender: 'You', subject: 'Report Submission', date: 'Yesterday', unread: false },
  ],
  drafts: [
    { sender: 'Draft', subject: 'Follow-up Email', date: '2 days ago', unread: false },
  ],
  junk: [],
};

// Function to switch between folders
function loadMail(folder) {
  mailListContainer.innerHTML = ''; // Clear current emails

  const mails = mailData[folder.toLowerCase()] || [];
  if (mails.length === 0) {
    mailListContainer.innerHTML = '<p>No emails in this folder.</p>';
    return;
  }

  mails.forEach((mail) => {
    const mailItem = document.createElement('div');
    mailItem.classList.add('mail-item');
    if (mail.unread) mailItem.classList.add('unread');

    mailItem.innerHTML = `
      <div class="mail-info">
        <h4 class="mail-sender">${mail.sender}</h4>
        <p class="mail-subject">${mail.subject}</p>
        <span class="mail-date">${mail.date}</span>
      </div>
      <div class="mail-actions">
        <button class="btn flag-btn"><i class="fas fa-flag"></i></button>
        <button class="btn delete-btn"><i class="fas fa-trash"></i></button>
      </div>
    `;

    // Add functionality to flag and delete buttons
    mailItem.querySelector('.flag-btn').addEventListener('click', () => {
      alert('Mail flagged!');
    });

    mailItem.querySelector('.delete-btn').addEventListener('click', () => {
      alert('Mail deleted!');
      mailItem.remove();
    });

    mailListContainer.appendChild(mailItem);
  });
}

// Add click listeners to sidebar items
sidebarItems.forEach((item) => {
  item.addEventListener('click', () => {
    sidebarItems.forEach((i) => i.classList.remove('active'));
    item.classList.add('active');

    const folder = item.textContent.trim();
    loadMail(folder);
  });
});

// Load default folder (Inbox) on page load
loadMail('Inbox');

// 2. Compose Email Modal
const composeModal = document.getElementById('compose-email-modal');
const composeBtn = document.querySelector('.compose-btn');
const closeModalBtn = composeModal.querySelector('.close-modal-btn');
const composeForm = composeModal.querySelector('#compose-email-form');

// Open modal
composeBtn.addEventListener('click', () => {
  composeModal.classList.remove('hidden');
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  composeModal.classList.add('hidden');
});

// Submit form (send email)
composeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Email sent!');
  composeForm.reset();
  composeModal.classList.add('hidden');
});

// Save as draft
composeModal.querySelector('.save-draft-btn').addEventListener('click', () => {
  alert('Draft saved!');
  composeForm.reset();
  composeModal.classList.add('hidden');
});

// 3. Search Emails
const searchInput = document.querySelector('.mail-search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const allMails = document.querySelectorAll('.mail-item');

  allMails.forEach((mail) => {
    const sender = mail.querySelector('.mail-sender').textContent.toLowerCase();
    const subject = mail.querySelector('.mail-subject').textContent.toLowerCase();
    if (sender.includes(query) || subject.includes(query)) {
      mail.style.display = 'flex';
    } else {
      mail.style.display = 'none';
    }
  });
});

// Voice search (Mock functionality)
const voiceSearchBtn = document.querySelector('.voice-search-btn');
voiceSearchBtn.addEventListener('click', () => {
  alert('Voice search activated! Speak your query.');
});

// 4. Additional Email Features (Mock)
document.addEventListener('click', (e) => {
  if (e.target.matches('.mail-item')) {
    alert('Opening email...');
    e.target.classList.remove('unread'); // Mark as read
  }
});


// Simulated AI Categorization Data
const emailCategorizationRules = {
    important: ['boss', 'urgent', 'meeting', 'deadline'],
    promotions: ['sale', 'offer', 'discount', 'promo'],
    social: ['friend', 'birthday', 'party', 'invite'],
  };
  
  // AI-Powered Categorization
  function categorizeEmails(emails) {
    return emails.reduce(
      (categories, email) => {
        const content = `${email.sender} ${email.subject}`.toLowerCase();
  
        if (emailCategorizationRules.important.some((word) => content.includes(word))) {
          categories.important.push(email);
        } else if (emailCategorizationRules.promotions.some((word) => content.includes(word))) {
          categories.promotions.push(email);
        } else if (emailCategorizationRules.social.some((word) => content.includes(word))) {
          categories.social.push(email);
        } else {
          categories.general.push(email);
        }
  
        return categories;
      },
      { important: [], promotions: [], social: [], general: [] }
    );
  }
  
  // Categorize and Load Emails
  function loadCategorizedEmails() {
    const allEmails = [
      { sender: 'Boss', subject: 'Urgent: Team Meeting Tomorrow', date: 'Today', unread: true },
      { sender: 'PromoStore', subject: '50% OFF on all items!', date: 'Yesterday', unread: false },
      { sender: 'Friend', subject: 'Birthday Party Invite', date: '2 days ago', unread: false },
      { sender: 'HR', subject: 'Policy Update', date: '3 days ago', unread: false },
    ];
  
    const categorizedEmails = categorizeEmails(allEmails);
  
    // Render categorized emails
    Object.entries(categorizedEmails).forEach(([folder, emails]) => {
      const folderElement = document.querySelector(`.mailbox-sidebar li[data-folder="${folder}"]`);
      folderElement.dataset.count = emails.length;
  
      folderElement.addEventListener('click', () => {
        loadMailList(emails);
      });
    });
  
    // Load default folder (Important)
    loadMailList(categorizedEmails.important);
  }
  
  // Load Emails in the Mail List
  function loadMailList(emails) {
    const mailListContainer = document.querySelector('.mail-list');
    mailListContainer.innerHTML = emails.length
      ? ''
      : '<p>No emails in this folder.</p>';
  
    emails.forEach((email) => {
      const mailItem = document.createElement('div');
      mailItem.classList.add('mail-item');
      if (email.unread) mailItem.classList.add('unread');
  
      mailItem.innerHTML = `
        <div class="mail-info">
          <h4 class="mail-sender">${email.sender}</h4>
          <p class="mail-subject">${email.subject}</p>
          <span class="mail-date">${email.date}</span>
        </div>
        <div class="mail-actions">
          <button class="btn flag-btn"><i class="fas fa-flag"></i></button>
          <button class="btn delete-btn"><i class="fas fa-trash"></i></button>
        </div>
      `;
  
      // Add functionality to flag and delete buttons
      mailItem.querySelector('.flag-btn').addEventListener('click', () => {
        alert('Mail flagged!');
      });
  
      mailItem.querySelector('.delete-btn').addEventListener('click', () => {
        alert('Mail deleted!');
        mailItem.remove();
      });
  
      mailListContainer.appendChild(mailItem);
    });
  }
  
  // Call AI-powered categorization on page load
  loadCategorizedEmails();
  



  // Follow-Up Reminders
function checkFollowUps() {
    const allEmails = [
      { sender: 'HR', subject: 'Policy Update', date: '3 days ago', unread: true },
      { sender: 'John Doe', subject: 'Meeting Reminder', date: 'Today', unread: false },
    ];
  
    const followUpEmails = allEmails.filter(
      (email) => email.unread && email.date.includes('days ago')
    );
  
    if (followUpEmails.length > 0) {
      alert(`You have ${followUpEmails.length} emails that need follow-up!`);
    }
  }
  
  // Check for follow-ups every 10 seconds (Mock)
  setInterval(checkFollowUps, 10000);

  
  // Highlight Priority Emails
function highlightPriorityEmails() {
    const allEmails = document.querySelectorAll('.mail-item');
  
    allEmails.forEach((email) => {
      const sender = email.querySelector('.mail-sender').textContent.toLowerCase();
      if (sender === 'boss') {
        email.style.border = '2px solid #007bff';
      }
    });
  }
  
  // Call after emails are loaded
  highlightPriorityEmails();
  



// Voice Dictation for Email Composition
function enableVoiceDictation() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice dictation is not supported in your browser.');
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    // Elements for dictation
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
  
    // Start dictation for Subject
    subjectField.addEventListener('dblclick', () => {
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        subjectField.value = transcript;
      };
      recognition.onerror = () => {
        alert('Error during voice dictation.');
      };
    });
  
    // Start dictation for Message
    messageField.addEventListener('dblclick', () => {
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messageField.value += transcript;
      };
      recognition.onerror = () => {
        alert('Error during voice dictation.');
      };
    });
 }
  
// Enable voice dictation on page load
  enableVoiceDictation();
  



// Priority Email Ranking
function rankEmails(emails) {
    const priorityKeywords = ['urgent', 'asap', 'important', 'deadline'];
    const prioritySenders = ['boss', 'manager', 'hr'];
  
    return emails.sort((a, b) => {
      const aPriority =
        prioritySenders.includes(a.sender.toLowerCase()) ||
        priorityKeywords.some((word) => a.subject.toLowerCase().includes(word))
          ? 1
          : 0;
  
      const bPriority =
        prioritySenders.includes(b.sender.toLowerCase()) ||
        priorityKeywords.some((word) => b.subject.toLowerCase().includes(word))
          ? 1
          : 0;
  
      return bPriority - aPriority; // Higher priority first
    });
  }
  
  // Load Ranked Emails
  function loadRankedEmails() {
    const allEmails = [
      { sender: 'Boss', subject: 'Urgent: Team Meeting Tomorrow', date: 'Today', unread: true },
      { sender: 'Friend', subject: 'Let’s catch up', date: 'Yesterday', unread: false },
      { sender: 'HR', subject: 'Policy Update', date: '2 days ago', unread: false },
      { sender: 'PromoStore', subject: 'Exclusive Offer: 50% OFF!', date: '3 days ago', unread: false },
    ];
  
    const rankedEmails = rankEmails(allEmails);
    loadMailList(rankedEmails);
  }
  
  // Call ranked emails loader
  loadRankedEmails();
  