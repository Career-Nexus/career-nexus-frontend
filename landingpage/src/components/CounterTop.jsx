import React, { useState, useEffect } from "react";

const CounterTop = ({ targetDate }) => {
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
        <section className="py-2">
            {/* <p className="mb-5">Our full platform launches in:</p> */}
            <div id="countdown-timer" className="flex justify-center flex-wrap text-green-900" >
                <span className="bg-gray-300 p-2 rounded-tl rounded-bl font-bold text-4xl" id="days">{timeLeft.days}</span>
                <span className="bg-gray-300 rounded-tr rounded-br mr-2 pr-1 font-bold pt-4">Days</span>
                <span className="bg-gray-300 p-2 rounded-tl rounded-bl font-bold text-4xl" id="hours">{timeLeft.hours}</span>
                <span className="bg-gray-300 rounded-tr rounded-br mr-2 pr-1 font-bold pt-4">Hrs</span>
                <span className="bg-gray-300 p-2 rounded-tl rounded-bl font-bold text-4xl" id="minutes">{timeLeft.minutes}</span>
                <span className="bg-gray-300 rounded-tr rounded-br mr-2 pr-1 font-bold pt-4">Mins</span>
                <span className="bg-gray-300 p-2 rounded-tl rounded-bl font-bold text-4xl" id="seconds">{timeLeft.seconds}</span>
                <span className="bg-gray-300 rounded-tr rounded-br mr-2 pr-1 font-bold pt-4">Secs</span>
            </div>
        </section>
    );
};

export default CounterTop;