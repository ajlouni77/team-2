import React, { useState } from "react";
import { Navbar } from "../exports";
import "../Articles/Articles.css";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Footer from "../Footer/Footer";

// بيانات الأعمدة والبطاقات
const initialColumns = {
  todo: {
    title: "To Do",
    tasks: ["Research new project", "Plan weekly tasks", "Check emails"],
  },
  inProgress: {
    title: "In Progress",
    tasks: ["Develop Kanban feature", "Team meeting"],
  },
  done: {
    title: "Done",
    tasks: ["Submit project report"],
  },
};

function Kanban() {
  const [columns, setColumns] = useState(initialColumns);

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
      <div className="kanban-container" style={{ background: "#F2EFE7" }}>
        <h1 className="kanban-title"> What is Kanban?</h1>
        <p className="kanban-description">
          Kanban is a visual workflow management method that helps teams
          organize tasks efficiently. Tasks move through different stages like
          To Do, In Progress, and Done.
          <br />
          It provides clarity, flexibility, and productivity, making it a great
          tool for time management.
        </p>

        {/* صورة توضيحية لنظام Kanban */}
        <img
          src="https://i.etsystatic.com/18645036/r/il/bacfc0/2138845076/il_fullxfull.2138845076_qryt.jpg"
          alt="Kanban Board Example"
          className="kanban-image"
        />

        <div className="kanban-board">
          {Object.entries(columns).map(([key, column]) => (
            <div key={key} className="kanban-column">
              <h2>{column.title}</h2>
              {column.tasks.map((task, index) => (
                <div key={index} className="kanban-card">
                  {task}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Kanban;
