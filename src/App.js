import './App.css';
import { useState, useEffect } from 'react';
// import { useLottie } from 'lottie-react';
import Lottie from 'lottie-react';
import confetti from './assets/confetti.json';
import Form from './components/Form';
import Task from './components/Task';
import styled from 'styled-components';

function getLocalStorageTasks() {
  let localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
  if (localStorageTasks) {
    return localStorageTasks;
  }
  return [];
}

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(getLocalStorageTasks());
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [totallyDone, setTotallyDone] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    tasks.every((task) => task.isComplete === true)
      ? setTotallyDone(true)
      : setTotallyDone(false);
  }, [tasks]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (task) {
      setTasks([{ id: Date.now(), text: task, isComplete: false }, ...tasks]);
      setTask('');
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
    setTask('');
  };

  const onCompleteTask = (id) => {
    // toggle tasks on complete status, and also send it to the end of the tasks array
    let currentTask = {};
    setTasks([
      ...[
        ...tasks.map((task) => {
          if (task.id === id) {
            const updatedTask = {
              ...task,
              isComplete: !task.isComplete,
            };
            currentTask = updatedTask;
            return updatedTask;
          }
          return task;
        }),
      ].filter((i) => i.id !== id),
      currentTask,
    ]);
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
                onCompleteTask={onCompleteTask}
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
      {totallyDone && (
        <Congratz>
          <h4>Woohoo! You've finished!</h4>
          <Lottie animationData={confetti} loop={true} />
        </Congratz>
      )}
    </section>
  );
}

export default App;

const Congratz = styled.div`
  svg {
    max-width: 50%;
    margin-top: -30px;
  }
`;
