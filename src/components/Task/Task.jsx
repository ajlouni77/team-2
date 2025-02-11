import { useState, useEffect } from "react";
import { Navbar } from '../exports';
import axios from "axios";
import { app, firebaseConfig } from '../../firebaseConfig';
import { auth, onAuthStateChanged } from '../Register/firebaseConfig';
import Footer from "../Footer/Footer";


import Swal from 'sweetalert2'

// or via CommonJS
// const Swal = require('sweetalert2')

const Task = () => {
  const [columns, setColumns] = useState({
    todo: { name: "📝 To Do", color: "bg-blue-100", tasks: [] },
    doing: { name: "⚙️ In Progress", color: "bg-yellow-100 ", tasks: [] },
    done: { name: "✅ Done", color: "bg-green-100", tasks: [] }
  });
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
    userId: ""
  });
  const [newColor, setNewcolor] = useState("red");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [filterPriority, setFilterPriority] = useState("All");
  const [userId, setUserId] = useState(null);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
  }, []);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get(`${firebaseConfig.databaseURL}/tasks.json`);
  //       const tasks = response.data;

  //       if (tasks) {
  //         const updatedColumns = {
  //           todo: { ...columns.todo, tasks: [] },
  //           doing: { ...columns.doing, tasks: [] },
  //           done: { ...columns.done, tasks: [] }
  //         };

  //         Object.keys(tasks).forEach((taskId) => {
  //           const task = tasks[taskId];
  //           if (!task.isDeleted) {
  //             updatedColumns[task.status].tasks.push({ ...task, id: taskId });
  //           }
  //         });

  //         setColumns(updatedColumns);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);
  useEffect(() => {
    if (!userId) return;
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${firebaseConfig.databaseURL}/tasks.json`);
        const tasks = response.data;

        if (tasks) {
          const updatedColumns = {
            todo: { ...columns.todo, tasks: [] },
            doing: { ...columns.doing, tasks: [] },
            done: { ...columns.done, tasks: [] }
          };

          Object.keys(tasks).forEach((taskId) => {
            const task = tasks[taskId];
            if (!task.isDeleted && task.userId === userId) {
              updatedColumns[task.status].tasks.push({ ...task, id: taskId });
            }
          });

          setColumns(updatedColumns);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  // const handleSaveTask = async () => {
  //   if (newTask.title.trim() === "") return;

  //   try {
  //     if (isEditing) {
  //       await axios.put(`${firebaseConfig.databaseURL}/tasks/${editingTaskId}.json`, newTask);

  //       // Update state after editing:
  //       setColumns(prevColumns => {
  //         const updatedColumns = { ...prevColumns };
  //         for (const status in updatedColumns) {
  //           updatedColumns[status].tasks = updatedColumns[status].tasks.map(task =>
  //             task.id === editingTaskId ? { ...newTask, id: editingTaskId } : task
  //           );
  //         }
  //         return updatedColumns;
  //       });

  //     } else {
  //       const taskWithDeletedField = { ...newTask, isDeleted: false };
  //       const response = await axios.post(`${firebaseConfig.databaseURL}/tasks.json`, taskWithDeletedField);
  //       const taskId = response.data.name;


  //       setColumns(prevColumns => ({
  //         ...prevColumns,
  //         todo: { ...prevColumns.todo, tasks: [...prevColumns.todo.tasks, { ...taskWithDeletedField, id: taskId }] }
  //       }));
  //     }

  //     setShowModal(false);
  //     setNewTask({ title: "", description: "", priority: "Low", status: "todo", deadline: "", isDeleted: false, userId: "" });
  //   } catch (error) {
  //     console.error("Error saving task:", error);
  //   }
  // };
  // const handleDeleteTask = async (columnId, taskId) => {


  //   try {

  //     await axios.patch(`${firebaseConfig.databaseURL}/tasks/${taskId}.json`, {
  //       isDeleted: true,
  //     });

  //     //عشان نشيل المهمة من العامود بعد الحذف
  //     setColumns((prevColumns) => ({
  //       ...prevColumns,
  //       [columnId]: {
  //         ...prevColumns[columnId],
  //         tasks: prevColumns[columnId].tasks.filter((task) => task.id !== taskId)
  //       }
  //     }));
  //   } catch (error) {
  //     console.error("Error soft deleting task:", error);
  //   }
  // };

  const handleSaveTask = async () => {
    if (newTask.title.trim() === "") return;

    Swal.fire({
      title: isEditing ? 'Are you sure you want to update this task?' : 'Are you sure you want to create this task?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: isEditing ? 'Yes, update it!' : 'Yes, create it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (isEditing) {
            await axios.put(`${firebaseConfig.databaseURL}/tasks/${editingTaskId}.json`, newTask);

            setColumns(prevColumns => {
              const updatedColumns = { ...prevColumns };
              for (const status in updatedColumns) {
                updatedColumns[status].tasks = updatedColumns[status].tasks.map(task =>
                  task.id === editingTaskId ? { ...newTask, id: editingTaskId } : task
                );
              }
              return updatedColumns;
            });
          } else {
            const taskWithDeletedField = { ...newTask, isDeleted: false };
            const response = await axios.post(`${firebaseConfig.databaseURL}/tasks.json`, taskWithDeletedField);
            const taskId = response.data.name;

            setColumns(prevColumns => ({
              ...prevColumns,
              todo: { ...prevColumns.todo, tasks: [...prevColumns.todo.tasks, { ...taskWithDeletedField, id: taskId }] }
            }));
          }

          setShowModal(false);
          setNewTask({ title: "", description: "", priority: "Low", status: "todo", deadline: "", isDeleted: false, userId: "" });

          Swal.fire(
            'Success!',
            isEditing ? 'Task has been updated.' : 'Task has been created.',
            'success'
          );
        } catch (error) {
          console.error("Error saving task:", error);
        }
      }
    });
  };



  const handleDeleteTask = async (columnId, taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`${firebaseConfig.databaseURL}/tasks/${taskId}.json`, {
            isDeleted: true,
          });

          setColumns((prevColumns) => ({
            ...prevColumns,
            [columnId]: {
              ...prevColumns[columnId],
              tasks: prevColumns[columnId].tasks.filter((task) => task.id !== taskId)
            }
          }));

          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          );
        } catch (error) {
          console.error("Error soft deleting task:", error);
        }
      }
    });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.get(`${firebaseConfig.databaseURL}/tasks/${taskId}.json`);
      const task = response.data;

      if (task) {
        await axios.put(`${firebaseConfig.databaseURL}/tasks/${taskId}.json`, { ...task, status: newStatus });

        setColumns(prevColumns => {
          const updatedColumns = { ...prevColumns };

          // Remove from old column
          for (const colId in updatedColumns) {
            updatedColumns[colId].tasks = updatedColumns[colId].tasks.filter(t => t.id !== taskId);
          }

          // Add to new column
          updatedColumns[newStatus].tasks.push({ ...task, id: taskId, status: newStatus }); // Include id

          return updatedColumns;
        });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };


  const openModal = (task = null) => {
    if (task) {
      setIsEditing(true);
      setEditingTaskId(task.id);
      setNewTask(task);
    } else {
      setIsEditing(false);
      // const responsee =  axios.get(`${firebaseConfig.databaseURL}/users/${}.json`);
      // const taskk = response.data;
      setNewTask({ title: "", description: "", priority: "Low", status: "todo", deadline: "", isDeleted: false, userId });
    }
    setShowModal(true);
  };


  const openDetailModal = (task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };


  const filterTasks = (tasks) => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto p-6">
          <input
            type="text"
            placeholder="Search by Title..."
            className="w-full border p-2 mt-3 rounded-lg mb-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilterPriority("All")}
              className={`px-4 py-2 rounded-lg ${filterPriority === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterPriority("Low")}
              className={`px-4 py-2 rounded-lg ${filterPriority === "Low"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
            >
              Low
            </button>
            <button
              onClick={() => setFilterPriority("Medium")}
              className={`px-4 py-2 rounded-lg ${filterPriority === "Medium"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilterPriority("High")}
              className={`px-4 py-2 rounded-lg ${filterPriority === "High"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
            >
              High
            </button>
          </div>

          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            ➕ Create Task
          </button>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {isEditing ? "Edit Task" : "Create New Task"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ✖
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border p-2 mt-3 rounded-lg"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full border p-2 mt-3 rounded-lg"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                ></textarea>

                <select
                  className="w-full border p-2 mt-3 rounded-lg"
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                >
                  <option className="lw" value="Low">
                    Low
                  </option>
                  <option className="md" value="Medium">
                    Medium
                  </option>
                  <option className="hg" value="High">
                    High
                  </option>
                </select>

                <input
                  type="date"
                  min="2025-02-03" max="2025-12-31"
                  className="w-full border p-2 mt-3 rounded-lg"
                  value={newTask.deadline}
                  onChange={(e) =>
                    setNewTask({ ...newTask, deadline: e.target.value })
                  }
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

          {showDetailModal && selectedTask && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Task Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ✖
                  </button>
                </div>

                <h3 className="font-bold mt-3">{selectedTask?.title}</h3>
                <p className="text-sm text-gray-600">
                  {selectedTask?.description}
                </p>
                <p className="text-xs text-gray-950">
                  Priority: {selectedTask?.priority}
                </p>
                <p className="text-xs text-gray-500">
                  Deadline: {selectedTask?.deadline}
                </p>
                <div className="mt-4">
                  <h4 className="font-semibold">Attachments</h4>
                  {attachments.map((attachment, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      <a
                        href={attachment.url}
                        download={attachment.name}
                        className="text-blue-500 hover:underline"
                      >
                        {attachment.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <input
                    type="file"
                    onChange={(e) => handleAddAttachment(e.target.files[0])}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-6 mt-6">
            {Object.keys(columns).map((columnId) => {
              const column = columns[columnId];
              const filteredTasks = filterTasks(column.tasks);
              return (
                <div
                  key={columnId}
                  className={`p-4 rounded-lg shadow-md ${column.color}`}
                >
                  <h2
                    style={{ color: "black" }}
                    className="text-lg font-semibold mb-3 "
                  >
                    {column.name}
                  </h2>
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition mb-3"
                    >
                      <h3
                        className="font-bold cursor-pointer hover:text-blue-600"
                        onClick={() => openDetailModal(task)}
                      >
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {task.description}
                      </p>
                      {/* <p className="text-xs text-r-gray-950">Priority: {task.priority}</p> */}
                      <p className="text-xs">
                        Priority:{" "}
                        <span
                          className={
                            task.priority === "Low"
                              ? "text-blue-600 font-semibold"
                              : task.priority === "Medium"
                                ? "text-orange-600 font-semibold"
                                : "text-red-600 font-semibold"
                          }
                        >
                          {task.priority}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Deadline: {task.deadline}
                      </p>
                      <select
                        className="w-full border p-2 mt-2 rounded-lg bg-gray-100"
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                      >
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                      </select>

                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(task);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(columnId, task.id);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Task;