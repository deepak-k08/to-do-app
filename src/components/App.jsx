import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editText, setEditText] = useState("");

  const handleChange = (event) => setInput(event.target.value);

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
      <TaskInput input={input} onChange={handleChange} onSubmit={handleSubmit} />
      <TaskList
        tasks={tasks}
        editText={editText}
        setEditText={setEditText}
        onToggleComplete={toggleComplete}
        onToggleEdit={toggleEdit}
        onUpdateText={updateTaskText}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
