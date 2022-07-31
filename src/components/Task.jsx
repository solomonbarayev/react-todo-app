import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Task(props) {
  return (
    <li className="task">
      <div>
        <input type="checkbox" />
        <p className="task-text">{props.task.text}</p>
      </div>
      <div className="button-container">
        <button onClick={() => props.onDeleteTask(props.task.id)}>
          <FiTrash2 className="task-icon" />
        </button>
        <button onClick={() => props.onEditTask(props.task.id)}>
          <FiEdit className="task-icon" />
        </button>
      </div>
    </li>
  );
}

export default Task;
