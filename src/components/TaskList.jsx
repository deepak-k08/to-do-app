import React from "react";
import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";

function TaskList({
  tasks,
  editText,
  setEditText,
  editDueDate,
  setEditDueDate,
  onToggleComplete,
  onToggleEdit,
  onUpdateTask,
  onDelete,
}) {
  return (
    <ul className="task-list">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editText={editText}
            setEditText={setEditText}
            editDueDate={editDueDate}
            setEditDueDate={setEditDueDate}
            onToggleComplete={onToggleComplete}
            onToggleEdit={onToggleEdit}
            onUpdateTask={onUpdateTask}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TaskList;
