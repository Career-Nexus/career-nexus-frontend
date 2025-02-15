import React, { useState, useEffect } from "react";
import "./countdown.css";

const CountTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to show time immediately

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  return (
    <section className="countdown">
      <div className="container">
        <h2>Countdown to Launch</h2>
        <p className="mb-5">Our full platform launches in:</p>
        <div id="countdown-timer" className="flex justify-center gap-5 flex-wrap">
          <span className="bg-green-900 py-2 px-3 rounded-md" id="days">{timeLeft.days} Days</span> 
          <span className="bg-green-900 py-2 px-3 rounded-md" id="hours">{timeLeft.hours}  Hours</span>
          <span className="bg-green-900 py-2 px-3 rounded-md" id="minutes">{timeLeft.minutes} Minutes</span> 
          <span className="bg-green-900 py-2 px-3 rounded-md" id="seconds">{timeLeft.seconds} Seconds</span> 
        </div>
      </div>
    </section>
  );
};

export default CountTimer;