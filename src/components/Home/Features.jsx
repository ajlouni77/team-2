import React from 'react'
import { motion } from "framer-motion";
import "./home.css"
import { Link } from "react-router-dom";

function Features() {
    return (
      <div className='adddd'>
                <h2 className="text-3xl font-semibold text-center mb-8 titlec">Our Features</h2>
            <section className="py-12 px-4 featureSection ">
                <div className="grid grid-cols-4 gap-4 test feature-col">
                    <div className="relative w-full h-64 transform-style-preserve-3d hover:transition-transform duration-500 cursos card-ss">
                        <div className="card w-full h-full rounded-2xl overflow-hidden">
                            <div
                                className="card-front w-full h-full backface-hidden bg-cover rounded-2xl"
                                style={{
                                    backgroundImage: `url('https://img.freepik.com/free-vector/students-employees-adding-events-deadlines-calendar-app-young-people-using-time-organizer-planner-flat-illustration_74855-20735.jpg?t=st=1738528124~exp=1738531724~hmac=d8ef473022818983fe4b4e2daab9699bd6c65705f4cf062781be102079574d32&w=740')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                }}
                            ></div>


                            <div className="card-back w-full h-full  text-white backface-hidden flex items-center justify-center rounded-2xl transform rotate-y-180 cardbgc">
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold">Task Management</h3>
                                    <p className="text-gray-200">Easily create, organize, and prioritize your tasks with simple drag-and-drop functionality. Stay on top of everything with clear task labels and deadlines.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative w-full h-64 transform-style-preserve-3d hover:transition-transform duration-500 cursos card-ss">
                        <div className="card w-full h-full rounded-2xl overflow-hidden">
                            {/* Front Side with Image (No Text) */}
                            <div
                                className="card-front w-full h-full backface-hidden bg-cover rounded-2xl"
                                style={{
                                    backgroundImage: `url('https://img.freepik.com/free-vector/screen-addiction-abstract-concept-vector-illustration-digital-overload-information-dependence-smartphone-addiction-screen-addicted-mobile-phone-dependence-mental-disorder-abstract-metaphor_335657-2262.jpg?t=st=1738528180~exp=1738531780~hmac=17fe1505ac6f2d0aaafc0ea4acfd81994f2816d3d79bd477c6da961c713f1a4f&w=740')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                }}
                            ></div>

                            {/* Back Side with Text */}
                            <div className="card-back w-full h-full bg-blue-600 text-white backface-hidden flex items-center justify-center rounded-2xl transform rotate-y-180 cardbgc">
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold">Real-Time Sync</h3>
                                    <p className="text-gray-200">Never miss an update! Your tasks sync across all your devices in real time, so you can access your to-do list from anywhere, at any time.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative w-full h-64 transform-style-preserve-3d hover:transition-transform duration-500 cursos card-ss ">
                        <div className="card w-full h-full rounded-2xl overflow-hidden">
                            {/* Front Side with Image (No Text) */}
                            <div
                                className="card-front w-full h-full backface-hidden bg-cover rounded-2xl"
                                style={{
                                    backgroundImage: `url('https://img.freepik.com/free-vector/hand-drawn-flat-new-year-s-resolutions-illustration_23-2149197403.jpg?t=st=1738528237~exp=1738531837~hmac=d5a791236adb741ddaae262c0c4612aac9edf906c1b6ec30bf4540d1f0abb987&w=740')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                }}
                            ></div>

                            {/* Back Side with Text */}
                            <div className="card-back w-full h-full bg-blue-600 text-white backface-hidden flex items-center justify-center rounded-2xl transform rotate-y-180 cardbgc">
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold">Task Reminders</h3>
                                    <p className="text-gray-200">Stay on schedule with automated reminders for upcoming tasks. Set due dates and get notified when it's time to get things done.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="relative w-full h-64 transform-style-preserve-3d hover:transition-transform duration-500 cursos card-ss">
                        <div className="card w-full h-full rounded-2xl overflow-hidden">
                            {/* Front Side with Image (No Text) */}
                            <div
                                className="card-front w-full h-full backface-hidden bg-cover rounded-2xl"
                                style={{
                                    backgroundImage: `url('https://img.freepik.com/free-photo/product-design-drawing-website-graphic_53876-120423.jpg?t=st=1738528283~exp=1738531883~hmac=edc62910bed6f7f7d99f9e1e38685abc922e90a58de5b3a5ce3e8716b43ee879&w=740')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                }}
                            ></div>

                            {/* Back Side with Text */}
                            <div className="card-back w-full h-full bg-blue-600 text-white backface-hidden flex items-center justify-center rounded-2xl transform rotate-y-180 cardbgc">
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold">Customizable Categories</h3>
                                    <p className="text-gray-200">Categorize your tasks into customizable lists (e.g., Work, Personal, Shopping) for a more organized and focused approach to managing your day.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
                <div className='BTN'>
                    <Link
                        to="/task"
                        className="py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-[#2973b2] hover:bg-[#2972B28E]"
                    >Manage Your Tasks
                    </Link>
                </div>
      </div>
    )
}

export default Features