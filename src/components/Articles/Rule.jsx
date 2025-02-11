import React from 'react'
import "../Articles/Articles.css";
import { Navbar } from "../exports";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Footer from "../Footer/Footer";

function Rule() {
  return (
    <>
      <div>
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
        <section
          style={{ background: "#F2EFE7" }}
          className="bg-white dark:bg-gray-900"
        >
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            {/* Left Content */}
            <div className="font-light text-gray-500 sm:text-lg dark:text-black">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">
                What Is the 80-20 Rule?
              </h2>
              <p className="mb-4">
                The 80-20 rule, also known as the Pareto Principle, is a
                familiar saying that asserts that 80% of outcomes (or outputs)
                result from 20% of all causes (or inputs) for any given event.
                In business, a goal of the 80-20 rule is to identify inputs that
                are potentially the most productive and make them the priority.
                For instance, once managers identify factors that are critical
                to their company's success, they should give those factors the
                most focus.
              </p>
            </div>

            {/* Right Images */}
            <div className="">
              <img
                className="w-full rounded-lg"
                src="https://i.pinimg.com/736x/7d/1a/7d/7d1a7d5010a9e06a416a97b13e5fd8c8.jpg"
                alt="office content 1"
              />
            </div>
          </div>
        </section>
        ;
      </div>
      <Footer />
    </>
  );
}

export default Rule;


