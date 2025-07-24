import React from "react";
import { FiEdit, FiCheck, FiSquare, FiCheckSquare, FiTrash2 } from "react-icons/fi";

function TaskItem({
  task,
  editText,
  setEditText,
  onToggleComplete,
  onToggleEdit,
  onUpdateText,
  onDelete,
}) {
  return (
    <li
      className={`cursor-pointer transition duration-300 ${
        task.completed ? "line-through text-gray-600" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className="flex items-center gap-2"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? <FiCheckSquare /> : <FiSquare />}

          {task.editing ? (
            <input
              className="border px-2 py-1 rounded w-full"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => onUpdateText(task.id, editText)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onUpdateText(task.id, editText);
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
                title={"Delete task"}
              />
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
