// JavaScript for Interactive Features
document.addEventListener('DOMContentLoaded', () => {
    // Find Mentor Button
    document.getElementById('findMentorBtn').addEventListener('click', () => {
      alert('Redirecting to Mentor Search...');
      // Add redirection logic here
    });
  
    // Become Mentor Button
    document.getElementById('becomeMentorBtn').addEventListener('click', () => {
      alert('Redirecting to Mentor Registration...');
      // Add redirection logic here
    });
  
    // Join Workshop Button
    document.getElementById('joinWorkshopBtn').addEventListener('click', () => {
      alert('Redirecting to Workshop Registration...');
      // Add redirection logic here
    });
  
    // Book Session Buttons
    document.querySelectorAll('.book-session').forEach(button => {
      button.addEventListener('click', () => {
        alert('Booking session...');
        // Add booking logic here
      });
    });
  
    // Register Workshop Buttons
    document.querySelectorAll('.register-btn').forEach(button => {
      button.addEventListener('click', () => {
        alert('Registering for workshop...');
        // Add registration logic here
      });
    });
  
    // View Resource Buttons
    document.querySelectorAll('.view-resource').forEach(button => {
      button.addEventListener('click', () => {
        alert('Opening resource...');
        // Add resource viewing logic here
      });
    });
  });