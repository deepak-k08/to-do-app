import React, { useState } from "react";
import {
  FiEdit,
  FiCheck,
  FiSquare,
  FiCheckSquare,
  FiTrash2,
} from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editText, setEditText] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    const newTask = {
      id: uuidv4(),
      text: input,
      completed: false,
      editing: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleEdit = (id) => {
  const taskToEdit = tasks.find((task) => task.id === id);
  if (taskToEdit.completed) return;

  setEditText(taskToEdit.text);

  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, editing: !task.editing }
      : { ...task, editing: false }
  );
  setTasks(updatedTasks);
};


  const updateTaskText = (id, newText) => {
  if (!newText.trim()) return;

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, text: newText, editing: false } : task
  );
  setTasks(updatedTasks);
};


const toggleComplete = (id) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      if (!task.completed) {
        const audio = new Audio("/sounds/strike.mp3");
        audio.play();
      }
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  setTasks(updatedTasks);
};

  const deleteTask = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );
  if (!confirmDelete) return;

  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
};


  return (
    <div className="card">
      <h1 className="title">Task List</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="task"
          placeholder="Task"
          value={input}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">
          Add Task
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task, id) => (
          <li
            key={task.id}
            className={`cursor-pointer transition duration-300 ${
              task.completed ? "line-through text-gray-600" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className="flex items-center gap-2"
                onClick={() => toggleComplete(task.id)}
              >
                {task.completed ? <FiCheckSquare /> : <FiSquare />}

                {task.editing ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => updateTaskText(task.id, editText)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateTaskText(task.id, editText);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span>{task.text}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!task.editing && (
                  <>
                    <FiEdit
                      className={`${
                        task.completed
                          ? "cursor-not-allowed text-gray-400"
                          : "cursor-pointer text-blue-500 hover:text-blue-700"
                      }`}
                      onClick={() => toggleEdit(task.id)}
                      title={
                        task.completed
                          ? "Completed tasks cannot be edited"
                          : "Edit task"
                      }
                    />
                    <FiTrash2
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => deleteTask(task.id)}
                      title={"Delete task"}
                    />
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
