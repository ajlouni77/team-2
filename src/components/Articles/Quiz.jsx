import "../Articles/Articles.css";
import { Navbar } from "../exports";
import React, { useState} from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Footer from "../Footer/Footer";




function Quiz() {
  const questions = [
    {
      question: "What is the best time to organize your daily tasks?",
      options: ["Early morning", "Midday", "Before bed", "Any time"],
      answer: "Early morning",
    },
    {
      question: "What is the best way to manage large tasks?",
      options: [
        "Break them into smaller tasks",
        "Postpone them for later",
        "Do them all at once",
        "Don't plan for them",
      ],
      answer: "Break them into smaller tasks",
    },
    {
      question: "What do you do when you feel overwhelmed by too many tasks?",
      options: [
        "Take a short break",
        "Keep working",
        "Give up",
        "Switch to another task",
      ],
      answer: "Take a short break",
    },
    {
      question: "What is the most effective way to achieve work-life balance?",
      options: [
        "Pre-planning",
        "Neglect personal life",
        "Work non-stop",
        "No boundaries between work and home",
      ],
      answer: "Pre-planning",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
    }
    setSelectedAnswer("");
  };

  return (
    <>
      <FloatingWhatsApp
        phoneNumber="962785956180"
        accountName="Rami Abdelhamid"
        avatar="https://i.ibb.co/G4ps8zxW/Screenshot-2025-01-31-212827.png"
        statusMessage="Online"
        chatMessage="Hello! How can we assist you?"
        allowClickAway={true}
        darkMode={true}
        notification={true}
        notificationSound={true}
        messageDelay={1}
      />
      <Navbar />
      <div className="quiz-container" style={{ background: "#F2EFE7" }}>
        <h1>Time Management Quiz</h1>

        {showResult ? (
          <div className="result">
            <h2>
              Your Score: {score} out of {questions.length}
            </h2>
          </div>
        ) : (
          <div className="question-container">
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div className="options-container">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option)}
                  className={`option-btn ${
                    selectedAnswer === option ? "selected" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button onClick={handleSubmitAnswer} className="submit-btn">
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Quiz;

