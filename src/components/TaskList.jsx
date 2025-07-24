import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  editText,
  setEditText,
  onToggleComplete,
  onToggleEdit,
  onUpdateText,
  onDelete,
}) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editText={editText}
          setEditText={setEditText}
          onToggleComplete={onToggleComplete}
          onToggleEdit={onToggleEdit}
          onUpdateText={onUpdateText}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
