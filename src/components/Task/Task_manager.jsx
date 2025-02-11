import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialColumns = {
  todo: { name: "To Do", tasks: [] },
  doing: { name: "Doing", tasks: [] },
  done: { name: "Done", tasks: [] }
};

const Task = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "todo",
    deadline: "",
    attachments: []
  });

  // عند إنهاء السحب
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = source.droppableId === destination.droppableId ? sourceTasks : [...destColumn.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;

    destTasks.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
      [destination.droppableId]: { ...destColumn, tasks: destTasks }
    });
  };

  // فتح المودال لإنشاء أو تعديل المهمة
  const openModal = (task = null) => {
    if (task) {
      setIsEditing(true);
      setEditingTaskId(task.id);
      setNewTask(task);
    } else {
      setIsEditing(false);
      setNewTask({ title: "", description: "", priority: "Low", status: "todo", deadline: "", attachments: [] });
    }
    setShowModal(true);
  };

  // حفظ المهمة (إضافة أو تعديل)
  const handleSaveTask = () => {
    if (newTask.title.trim() === "") return;

    if (isEditing) {
      setColumns((prevColumns) => {
        const updatedColumns = { ...prevColumns };
        Object.keys(updatedColumns).forEach((colId) => {
          updatedColumns[colId].tasks = updatedColumns[colId].tasks.map((task) =>
            task.id === editingTaskId ? { ...newTask, id: editingTaskId } : task
          );
        });
        return updatedColumns;
      });
    } else {
      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: { ...prevColumns.todo, tasks: [...prevColumns.todo.tasks, { ...newTask, id: Date.now().toString() }] }
      }));
    }

    setShowModal(false);
  };

  // حذف المهمة
  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        tasks: prevColumns[columnId].tasks.filter((task) => task.id !== taskId)
      }
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {/* زر إنشاء مهمة */}
      <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Create Task</button>

      {/* مودال إدخال أو تعديل المهمة */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-3">{isEditing ? "Edit Task" : "Create New Task"}</h2>
            <input type="text" placeholder="Title" className="w-full border p-2 mb-2 rounded" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            <textarea placeholder="Description" className="w-full border p-2 mb-2 rounded" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}></textarea>
            <select className="w-full border p-2 mb-2 rounded" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input type="date" className="w-full border p-2 mb-2 rounded" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />

            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSaveTask} className="bg-green-500 text-white px-4 py-2 rounded">{isEditing ? "Update Task" : "Add Task"}</button>
            </div>
          </div>
        </div>
      )}

      {/* لوحة المهام */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(columns).map((columnId) => {
            const column = columns[columnId];
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded min-h-[300px]">
                    <h2 className="text-xl font-semibold mb-3">{column.name}</h2>
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white p-3 rounded shadow mb-3">
                            <h3 className="font-bold">{task.title}</h3>
                            <p className="text-sm">{task.description}</p>
                            <p className="text-xs text-red-600">Priority: {task.priority}</p>
                            <p className="text-xs text-gray-500">Deadline: {task.deadline}</p>

                            {/* أزرار التعديل والحذف */}
                            <div className="flex justify-end space-x-2 mt-2">
                              <button onClick={() => openModal(task)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                              <button onClick={() => handleDeleteTask(columnId, task.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Task;
