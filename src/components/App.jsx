import React, { useState } from "react";
import {
  FiEdit,
  FiCheck,
  FiSquare,
  FiCheckSquare,
  FiTrash2,
} from "react-icons/fi";

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
      text: input,
      completed: false,
      editing: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleEdit = (index) => {
    const task = tasks[index];
    if (task.completed) return;

    setEditText(task.text);

    const updatedTask = tasks.map((task, i) =>
      i === index
        ? { ...task, editing: !task.editing }
        : { ...task, editing: false }
    );
    setTasks(updatedTask);
  };

  const updateTaskText = (index, newText) => {
    const updatedTask = tasks.map((task, i) =>
      i === index ? { ...task, text: newText, editing: false } : task
    );
    setTasks(updatedTask);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
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

  const deleteTask = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    const updatedTasks = tasks.filter((_, i) => i !== index);
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
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`cursor-pointer transition duration-300 ${
              task.completed ? "line-through text-gray-600" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className="flex items-center gap-2"
                onClick={() => toggleComplete(index)}
              >
                {task.completed ? <FiCheckSquare /> : <FiSquare />}

                {task.editing ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => updateTaskText(index, editText)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateTaskText(index, editText);
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
                      onClick={() => toggleEdit(index)}
                      title={
                        task.completed
                          ? "Completed tasks cannot be edited"
                          : "Edit task"
                      }
                    />
                    <FiTrash2
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => deleteTask(index)}
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
