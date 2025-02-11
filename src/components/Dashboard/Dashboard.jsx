import { useState, useEffect } from "react";
import { Navbar } from "../exports";
import { getDatabase, ref, onValue } from "firebase/database";
import NewTask from "./NewTask";

function Dashboard() {
  const db = getDatabase();
  const usersRef = ref(db, "users");
  const tasksRef = ref(db, "tasks");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map((userId) => ({
          id: userId,
          ...data[userId],
        }));

        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });
  }, []);

  const handleChange = (event) => {
    const userId = event.target.value;
    const user = users.find((u) => u.id === userId);

    if (user) {
      setSelectedUser(user);
      fetchUserTasks(userId);
    } else {
      setSelectedUser(null);
      setTasks([]);
    }
  };

  const fetchUserTasks = (userId) => {
    onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const tasksData = snapshot.val();
        const userTasks = Object.keys(tasksData)
          .filter((taskId) => tasksData[taskId].userId === userId)
          .map((taskId) => ({
            id: taskId,
            ...tasksData[taskId],
          }));

        setTasks(userTasks);
      } else {
        setTasks([]);
      }
    });
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-2">
        <h2 className="text-xl font-semibold mb-3">Select a User</h2>

        <select
          onChange={handleChange}
          defaultValue=""
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md shadow">
          <p>
            <strong className="text-gray-700">Email:</strong>{" "}
            {selectedUser.email}
          </p>
          <p>
            <strong className="text-gray-700">User Type:</strong>{" "}
            {selectedUser.userType}
          </p>

          <NewTask userId={selectedUser.id} />
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* To-Do Tasks */}
          <div className="p-4 bg-blue-100 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">To-Do</h3>
            {todoTasks.length > 0 ? (
              <ul>
                {todoTasks.map((task) => (
                  <li key={task.id} className="border-b py-2">
                    <strong>{task.title}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks in this category</p>
            )}
          </div>

          {/* Doing Tasks */}
          <div className="p-4 bg-yellow-100 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700">
              Doing
            </h3>
            {doingTasks.length > 0 ? (
              <ul>
                {doingTasks.map((task) => (
                  <li key={task.id} className="border-b py-2">
                    <strong>{task.title}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks in this category</p>
            )}
          </div>

          {/* Done Tasks */}
          <div className="p-4 bg-green-100 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Done</h3>
            {doneTasks.length > 0 ? (
              <ul>
                {doneTasks.map((task) => (
                  <li key={task.id} className="border-b py-2">
                    <strong>{task.title}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks in this category</p>
            )}
          </div>

          {/* High Priority Tasks */}
          <div className="p-4 bg-red-100 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700">
              High Priority
            </h3>
            {highPriorityTasks.length > 0 ? (
              <ul>
                {highPriorityTasks.map((task) => (
                  <li key={task.id} className="border-b py-2">
                    <strong>{task.title}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks in this category</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
