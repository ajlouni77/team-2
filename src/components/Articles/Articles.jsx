import React, { useState } from "react";
import { Navbar } from "../exports";
import "../Articles/Articles.css";
import axios from "axios";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Footer from "../Footer/Footer";


// نموذج الاتصال
function ContactForm() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  // Function to handle voice recognition for the message box
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLanguage; // تعيين اللغة المختارة
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setMessage(speechToText);
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use axios to send data to Firebase
      await axios.post(
        "https://react-team-project-e3fab-default-rtdb.firebaseio.com/messages.json",
        {
          email: email,
          message: message,
        }
      );

      alert("Message sent successfully!✅");

      // Clear the form after sending the message
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("An error occurred while sending❌", error);
    }
  };

  return (
    <>
      {/* <div className="formcontainer">
        <div
          style={{ background: "#F2EFE7" }}
          className="contact-form p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4">Need More help?</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Your Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Write your message here"
                className="p-2 border border-gray-300 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-32 p-2 border border-gray-300 rounded-md cursor-pointer"
              >
                <option value="en-US">🇺🇸 English</option>
                <option value="ar-SA">🇸🇦 العربية</option>
                <option value="fr-FR">🇫🇷 Français</option>
                <option value="de-DE">🇩🇪 Deutsch</option>
                <option value="es-ES">🇪🇸 Español</option>
                <option value="it-IT">🇮🇹 Italiano</option>
                <option value="tr-TR">🇹🇷 Türkçe</option>
                <option value="ru-RU">🇷🇺 Русский</option>
                <option value="zh-CN">🇨🇳 中文 (الصينية)</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={startListening}
                style={{
                  backgroundColor: isListening ? "red" : "green",
                  color: "white",
                }}
                className={`p-2 rounded-md text-white ${
                  isListening ? "bg-red-500" : "bg-green-500"
                } transition-all`}
              >
                🎤 {isListening ? "Listening..." : "Record Message"}
              </button>

              <button
                type="submit"
                className="p-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div> */}

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

<Footer/>

    </>
  );
}

const products = [
  {
    id: 1,
    name: " Eisenhower ",
    href: "./Eisenhower",
    imageSrc:
      "https://luxafor.com/wp-content/uploads/2023/02/The-Eisenhower-Decision-Matrix-png.png",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "The Eisenhower Matrix",
  },

  {
    id: 2,
    name: "Pareto 80/20",
    href: "/Rule",
    imageSrc:
      "https://blog.proactioninternational.com/hs-fs/hubfs/PAI-Infographie-pareto-1920px-EN-01.png?width=800&height=602&name=PAI-Infographie-pareto-1920px-EN-01.png",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "Pareto 80/20 Rule",
  },

  {
    id: 3,
    name: "Short Quiz",
    href: "/Quiz",
    imageSrc:
      "https://img.freepik.com/premium-vector/quiz-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design_180786-81.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "Time Management",
  },

  {
    id: 4,
    name: "Kanban Board",
    href: "/Kanban",
    imageSrc:
      "https://i.etsystatic.com/18645036/r/il/bacfc0/2138845076/il_fullxfull.2138845076_qryt.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "Kanban Board",
  },

  {
    id: 5,
    name: "Pomodoro",
    href: "/Pomodoro",
    imageSrc:
      "https://i.pinimg.com/736x/c5/bd/12/c5bd126ad0a0baa8f8406990b2e019b4.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "Pomodoro ",
  },

  {
    id: 6,
    name: "Time Rule",
    href: "/Productivity",
    imageSrc: "https://i.postimg.cc/kGDJGSL6/two-five.webp",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "Time Rule",
  },
];

function Example() {
  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-bold text-center my-10 text-gray-800">
        Master Your Time ⏰
      </h1>

      <div className="bg-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.href}
                className="relative group block rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
              >
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h2
                    style={{ color: "black" }}
                    className="text-lg font-semibold text-gray-900 group-hover:text-blue-600"
                  >
                    {product.name}
                  </h2>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <ContactForm />
    </>
  );
}

export default Example;
