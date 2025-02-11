import React from "react";
import { Navbar } from "../exports";
import "../Articles/Articles.css";
import Footer from "../Footer/Footer";

function Pomodoro() {
  return (
    <>
      <Navbar />
      <div className="pomodoro-container">
        <h1 className="pomodoro-title">🍅 Pomodoro Technique</h1>

        <p className="pomodoro-description">
          **Pomodoro Technique** is a time management method that helps you
          focus and increase productivity. It involves breaking work time into
          short intervals with regular breaks.
        </p>

        <h2 className="pomodoro-steps-title">📋 How to Use It:</h2>
        <ol className="pomodoro-steps">
          <li>⏳ Choose a task to work on.</li>
          <li>🍅 Set a timer for 25 minutes and start working.</li>
          <li>🔔 When the timer ends, take a short break (5 minutes).</li>
          <li>
            🔄 Repeat the cycle 4 times, then take a longer break (15-30
            minutes).
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
}

export default Pomodoro;
