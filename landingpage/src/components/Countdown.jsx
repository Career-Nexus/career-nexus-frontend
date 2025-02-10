import React from 'react'
import './Countdown.css'


const Countdown = () => {
    return (
        <div>
            <section class="countdown">
                <div class="container">
                    <h2>Countdown to Launch</h2>
                    <p>Our full platform launches in:</p>
                    <div id="countdown-timer">
                        <span id="days">00</span> Days
                        <span id="hours">00</span> Hours
                        <span id="minutes">00</span> Minutes
                        <span id="seconds">00</span> Seconds
                    </div>
                </div>
            </section>
        </div>
    )
}
<script src="landing-page.js"></script>
export default Countdown