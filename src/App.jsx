import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import ProjectTasks from './pages/ProjectTasks.jsx'

function App() {
  const {
    projects,
    tasks,
    isLoadingProjects,
    projectsError,
    isDark,
    setIsDark,
    addTask,
    updateTaskStatus,
    deleteTask,
    addProject,
  } = useTaskBoardState()

  // Update body class for light/dark mode background
  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-mode')
    } else {
      document.body.classList.add('light-mode')
    }
  }, [isDark])

  return (
    <BrowserRouter>
      <div className={`app-shell ${isDark ? 'theme-dark' : 'theme-light'}`}>
        <nav className="top-nav">
          <Link to="/" className="logo-text">
            TaskBoard
          </Link>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/add-project">Add Project</Link>
            <Link to="/add-task">Add Task</Link>
            <button
              type="button"
              className="btn"
              onClick={() => setIsDark((prev) => !prev)}
              style={{ marginLeft: '0.5rem' }}
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </nav>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  projects={projects}
                  tasks={tasks}
                  isLoading={isLoadingProjects}
                  error={projectsError}
                />
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProjectTasks
                  projects={projects}
                  tasks={tasks}
                  onUpdateTaskStatus={updateTaskStatus}
                  onDeleteTask={deleteTask}
                />
              }
            />
            <Route
              path="/add-task"
              element={<AddTask projects={projects} onAddTask={addTask} />}
            />
            <Route path="/add-project" element={<AddProject onAddProject={addProject} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
