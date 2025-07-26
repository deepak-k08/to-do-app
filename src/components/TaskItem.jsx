import React from "react";
import {
  FiEdit,
  FiCheckSquare,
  FiSquare,
  FiTrash2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function TaskItem({
  task,
  editText,
  setEditText,
  editDueDate,
  setEditDueDate,
  onToggleComplete,
  onToggleEdit,
  onUpdateTask,
  onDelete,
}) {
  const handleSave = () => {
    onUpdateTask(task.id, editText, editDueDate);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`cursor-pointer transition duration-300 ${
        task.completed ? "line-through text-gray-600" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 w-full">
        
          <div onClick={() => onToggleComplete(task.id)} className="cursor-pointer">
            {task.completed ? <FiCheckSquare /> : <FiSquare />}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {task.editing ? (
              <motion.input
                key="input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="border px-2 py-1 rounded w-full"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
                autoFocus
              />
            ) : (
              <motion.span
                key="text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {task.text}
              </motion.span>
            )}
          </AnimatePresence>

          {task.editing ? (
            <input
              type="date"
              className="border px-2 py-1 rounded ml-2"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          ) : (
            task.dueDate && (
              <span className="text-sm text-gray-500 ml-2">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          {!task.editing ? (
            <>
              <FiEdit
                className={`${
                  task.completed
                    ? "cursor-not-allowed text-gray-400"
                    : "cursor-pointer text-blue-500 hover:text-blue-700"
                }`}
                onClick={() => onToggleEdit(task.id)}
                title={
                  task.completed
                    ? "Completed tasks cannot be edited"
                    : "Edit task"
                }
              />
              <FiTrash2
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => onDelete(task.id)}
                title="Delete task"
              />
            </>
          ) : (
            <button
              className="text-green-600 hover:text-green-800 text-sm border px-2 py-1 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default TaskItem;
