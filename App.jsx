import { useEffect, useMemo, useState } from 'react';

const starterTasks = [
  { id: 1, text: 'Learn React basics', completed: false },
  { id: 2, text: 'Build my first application', completed: true }
];

function readTasks() {
  try {
    const saved = localStorage.getItem('my-tasks');
    return saved ? JSON.parse(saved) : starterTasks;
  } catch {
    return starterTasks;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(readTasks);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const remaining = tasks.filter(task => !task.completed).length;
  const completed = tasks.length - remaining;

  const visibleTasks = useMemo(() => {
    if (filter === 'Active') return tasks.filter(task => !task.completed);
    if (filter === 'Completed') return tasks.filter(task => task.completed);
    return tasks;
  }, [tasks, filter]);

  function addTask(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks(current => [...current, { id: Date.now(), text, completed: false }]);
    setInput('');
  }

  function toggleTask(id) {
    setTasks(current => current.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  function clearCompleted() {
    setTasks(current => current.filter(task => !task.completed));
  }

  return (
    <main className="page">
      <header className="heading">
        <div className="app-icon" aria-hidden="true">✓</div>
        <h1>My Tasks</h1>
        <p>Plan your day. Make progress.</p>
      </header>

      <section className="todo-card" aria-label="To-do list">
        <form className="add-form" onSubmit={addTask}>
          <input
            value={input}
            onChange={event => setInput(event.target.value)}
            placeholder="What do you need to do?"
            aria-label="New task"
            maxLength={120}
          />
          <button className="add-button" type="submit">+ Add</button>
        </form>

        <div className="counts">
          <span>{remaining} remaining</span>
          <span>{completed} completed</span>
        </div>

        <nav className="filters" aria-label="Filter tasks">
          {['All', 'Active', 'Completed'].map(name => (
            <button
              key={name}
              type="button"
              className={filter === name ? 'filter active-filter' : 'filter'}
              onClick={() => setFilter(name)}
              aria-pressed={filter === name}
            >
              {name}
            </button>
          ))}
        </nav>

        <div className="task-list">
          {visibleTasks.length === 0 ? (
            <p className="empty">{filter === 'All' ? 'No tasks yet. Add one above!' : `No ${filter.toLowerCase()} tasks.`}</p>
          ) : visibleTasks.map(task => (
            <div className={`task-row ${task.completed ? 'is-completed' : ''}`} key={task.id}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark "${task.text}" ${task.completed ? 'active' : 'completed'}`}
                />
                <span>{task.text}</span>
              </label>
              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.text}`}
                title="Delete task"
              >×</button>
            </div>
          ))}
        </div>

        <footer className="card-footer">
          <span>{tasks.length} total {tasks.length === 1 ? 'task' : 'tasks'}</span>
          <button type="button" className="clear-button" onClick={clearCompleted} disabled={completed === 0}>
            Clear completed
          </button>
        </footer>
      </section>

      <p className="footer-note">Small steps every day lead to big results.</p>
    </main>
  );
}
