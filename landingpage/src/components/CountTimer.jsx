import React, { useState, useEffect } from "react";

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
    <section className="bg-[#5da05d] text-center text-white py-16">
      <div className="font-bold text-xl">
        <h2 className="font-semibold text-3xl mb-8">We're Almost Ready!</h2>
        <p>We've been working hard to make Career-Nexus something truly impactful. <br />While our initial launch date is shifting, we're making the final touches to ensure your experience is world-class.</p>
        <p>Stay tuned; launch is coming very soon!</p>
        <p>Thank you for your patience and support.</p>
        {/* <h2 className="font-semibold text-3xl mb-8">Countdown to Launch</h2>
        <p className="mb-8 font-bold">Our full platform launches in:</p>
        <div className="flex justify-center gap-5 flex-wrap">
          <span className="bg-green-900 py-2 px-3 rounded-md font-bold text-4xl" id="days">{timeLeft.days} Days</span> 
          <span className="bg-green-900 py-2 px-3 rounded-md font-bold text-4xl" id="hours">{timeLeft.hours}  Hours</span>
          <span className="bg-green-900 py-2 px-3 rounded-md font-bold text-4xl" id="minutes">{timeLeft.minutes} Minutes</span> 
          <span className="bg-green-900 py-2 px-3 rounded-md font-bold text-4xl" id="seconds">{timeLeft.seconds} Seconds</span> 
        </div> */}
      </div>
    </section>
  );
};

export default CountTimer;