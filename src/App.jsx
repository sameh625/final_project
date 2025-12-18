import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import ProjectTasks from './pages/ProjectTasks.jsx'

import { useEffect, useState } from 'react'

const PROJECTS_API_URL = 'https://69405a7a993d68afba6bd602.mockapi.io/api/v1/project'
const STORAGE_LOCAL_PROJECTS_KEY = 'taskboard_local_projects'
const STORAGE_TASKS_KEY = 'taskboard_tasks'
const STORAGE_IMPORTED_FROM_API_KEY = 'taskboard_imported_from_api_v1'

const safeParseArray = (value, fallback = []) => {
  if (!value) return fallback
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

const getArrayFromStorage = (key) => {
  if (!window?.localStorage) return []
  const stored = window.localStorage.getItem(key)
  return safeParseArray(stored)
}

const updateArrayStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore storage errors
  }
}

const mergeById = (first = [], second = []) => {
  const byId = new Map()
  ;[...first, ...second].forEach((item) => {
    if (item && item.id != null) {
      byId.set(item.id, item)
    }
  })
  return Array.from(byId.values())
}

export function useTaskBoardState() {
  const [projects, setProjects] = useState([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [projectsError, setProjectsError] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isDark, setIsDark] = useState(true)

  // Load from localStorage on first mount
  useEffect(() => {
    setProjects(getArrayFromStorage(STORAGE_LOCAL_PROJECTS_KEY))
    setTasks(getArrayFromStorage(STORAGE_TASKS_KEY))
  }, [])

  // Fetch projects and initial tasks from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(PROJECTS_API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()

        setProjects((prev) => mergeById(data, prev))

        const alreadyImported = window.localStorage.getItem(STORAGE_IMPORTED_FROM_API_KEY)
        if (!alreadyImported) {
          const initialTasksFromApi =
            data?.flatMap((project) =>
              (project.Tasks || []).map((task) => ({
                id: task.id,
                title: task.title,
                description: task.desc || '',
                status: task.status || 'todo',
                projectId: project.id,
              })),
            ) || []

          let mergedTasks = []
          setTasks((prev) => {
            mergedTasks = mergeById(initialTasksFromApi, prev)
            return mergedTasks
          })

          try {
            window.localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(mergedTasks))
            window.localStorage.setItem(STORAGE_IMPORTED_FROM_API_KEY, 'true')
          } catch {
            // ignore storage errors
          }
        }
      } catch (err) {
        setProjectsError(err.message || 'Something went wrong')
      } finally {
        setIsLoadingProjects(false)
      }
    }

    fetchProjects()
  }, [])

  const addTask = (task) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...task,
    }

    setTasks((prev) => [...prev, newTask])

    const existingTasks = getArrayFromStorage(STORAGE_TASKS_KEY)
    const updated = [...existingTasks, newTask]
    updateArrayStorage(STORAGE_TASKS_KEY, updated)
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      )

      updateArrayStorage(STORAGE_TASKS_KEY, updated)

      return updated
    })
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== taskId)

      updateArrayStorage(STORAGE_TASKS_KEY, updated)

      return updated
    })
  }

  const addProject = (projectData) => {
    const newProject = {
      id: crypto.randomUUID(),
      title: projectData.title,
      short_desc: projectData.short_desc,
      tasks_count: projectData.tasks_count || 0,
      Tasks: [],
    }

    setProjects((prev) => [...prev, newProject])

    const existingProjects = getArrayFromStorage(STORAGE_LOCAL_PROJECTS_KEY)
    const updated = [...existingProjects, newProject]
    updateArrayStorage(STORAGE_LOCAL_PROJECTS_KEY, updated)
  }

  return {
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
  }
}




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
