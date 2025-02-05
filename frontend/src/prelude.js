// Countdown Timer Functionality
function startCountdown(targetDate) {
    const timerElement = document.getElementById("countdown-timer");

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            timerElement.innerHTML = "The platform has launched!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to display immediately
}

// Set the target launch date (e.g., 3 months from now)
const launchDate = new Date("2025-04-24T00:00:00").getTime();
startCountdown(launchDate);
