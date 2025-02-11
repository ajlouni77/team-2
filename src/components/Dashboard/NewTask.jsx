import { useState } from "react";
import axios from "axios";

const FIREBASE_DB_URL = 'https://react-team-project-e3fab-default-rtdb.firebaseio.com';

const NewTask = ({ userId }) => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: "Low",
        status: "todo",
        deadline: "",
        isDeleted: false,
        userId: userId,
    });

    const handleSaveTask = async () => {
        if (newTask.title.trim() === "") {
            alert("Task title is required!");
            return;
        }

        try {
            if (isEditing) {
                await axios.put(`${FIREBASE_DB_URL}/tasks/${editingTaskId}.json`, newTask);
                setIsEditing(false);
                setEditingTaskId(null);
            } else {
                const taskWithUser = { ...newTask, userId };
                const response = await axios.post(`${FIREBASE_DB_URL}/tasks.json`, taskWithUser);
                console.log("New Task ID:", response.data.name);
            }

            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const resetForm = () => {
        setNewTask({
            title: "",
            description: "",
            priority: "Low",
            status: "todo",
            deadline: "",
            isDeleted: false,
            userId: userId,
        });
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
                Assign New Task
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{isEditing ? "Edit Task" : "Create New Task"}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500">
                                ✖
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full border p-2 mt-3 rounded-lg"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />

                        <textarea
                            placeholder="Description"
                            className="w-full border p-2 mt-3 rounded-lg"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        ></textarea>

                        <select
                            className="w-full border p-2 mt-3 rounded-lg"
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <input
                            type="date"
                            className="w-full border p-2 mt-3 rounded-lg"
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        />

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveTask}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            >
                                {isEditing ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewTask;
