import React from "react";
import { Navbar } from "../exports";
import "../Articles/Articles.css";
import Footer from "../Footer/Footer";


function ProductivityTechniques() {
  return (
    <>
      <Navbar />
      <div className="productivity-container">
        <h1 className="productivity-title">⏳ Productivity Techniques</h1>

        {/* The Two-Minute Rule */}
        <div className="technique">
          <h2 className="technique-title">The Two-Minute Rule</h2>

          <p className="technique-description">
            The Two-Minute Rule suggests that if a task takes two minutes or
            less to complete, do it immediately. This approach helps prevent
            procrastination and keeps small tasks from piling up.
          </p>
          <h3 className="steps-title">📋 How to Apply It:</h3>
          <ul className="steps-list">
            <li>🔍 Identify small tasks that can be completed quickly.</li>
            <li>📝 If it takes two minutes or less, do it right away!</li>
            <li>
              💡 This helps you keep your to-do list short and avoid clutter.
            </li>
          </ul>
        </div>

        {/* The 5-Second Rule */}
        <div className="technique">
          <h2 className="technique-title">The 5-Second Rule</h2>

          <p className="technique-description">
            The 5-Second Rule, popularized by Mel Robbins, encourages immediate
            action. When you feel the urge to do something, count backward from
            5 and take action as soon as you reach "1". This helps to break the
            cycle of hesitation.
          </p>
          <h3 className="steps-title">📋 How to Apply It:</h3>
          <ul className="steps-list">
            <li>⏱️ When you think of a task, start counting down from 5.</li>
            <li>💥 As soon as you hit "1", immediately act on the task.</li>
            <li>
              💪 This can help overcome procrastination and lead to quicker
              decision-making.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductivityTechniques;
