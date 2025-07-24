import React from "react";

function TaskInput({ input, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="form">
      <input
        name="task"
        placeholder="Task"
        value={input}
        onChange={onChange}
        className="input"
      />
      <button type="submit" className="button">
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;
