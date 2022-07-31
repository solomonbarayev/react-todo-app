import "./App.css";
import { useState } from "react";

import Form from "./components/Form";
import Task from "./components/Task";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (task) {
      setTasks([{ id: Date.now(), text: task }, ...tasks]);
      setTask("");
    }
  };

  const onDeleteTask = (id) => {
    setTasks([...tasks.filter((task) => task.id !== id)]);
  };

  const onEditTask = (id) => {
    setEditing(true);
    tasks.map((task) => {
      if (task.id === id) {
        setTask(task.text);
        setEditId(task.id);
      }
    });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    const newTasks = tasks.map((item) => {
      if (item.id === editId) {
        const updatedTask = {
          ...item,
          text: task,
        };
        return updatedTask;
      }
      return item;
    });
    setTasks(newTasks);
    setEditing(false);
    setTask("");
  };

  return (
    <section className="container">
      <h1>What are we doing today?</h1>
      {editing ? (
        <Form
          task={task}
          tasks={tasks}
          setTask={setTask}
          onSubmit={submitUpdate}
          isEditing={editing}
        />
      ) : (
        <Form
          task={task}
          setTask={setTask}
          onSubmit={onSubmit}
          isEditing={editing}
        />
      )}

      {tasks.length !== 0 ? (
        <ul className="tasks">
          {tasks.map((task) => {
            return (
              <Task
                task={task}
                key={task.id}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            );
          })}
        </ul>
      ) : (
        <h2 className="waiting">Waiting on your tasks...</h2>
      )}
      {tasks.length > 0 && (
        <button
          type="button"
          className="reset-button"
          onClick={() => setTasks([])}
        >
          Reset Todos
        </button>
      )}
    </section>
  );
}

export default App;
