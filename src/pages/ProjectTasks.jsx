import { useParams, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'

const filterTasksForProject = (tasks, projectId, searchQuery) => {
  const trimmedQuery = searchQuery.trim().toLowerCase()
  return tasks.filter((task) => {
    if (task.projectId !== projectId) return false
    if (!trimmedQuery) return true
    const title = task.title?.toLowerCase() || ''
    const description = task.description?.toLowerCase() || ''
    return title.includes(trimmedQuery) || description.includes(trimmedQuery)
  })
}

const splitTasksByStatus = (tasks) => ({
  todo: tasks.filter((task) => task.status === 'todo'),
  inProgress: tasks.filter((task) => task.status === 'in-progress'),
  done: tasks.filter((task) => task.status === 'done'),
})

function ProjectTasks({ projects, tasks, onUpdateTaskStatus, onDeleteTask }) {
  const { id } = useParams()
  const [searchQuery, setSearchQuery] = useState('')

  const project = projects.find((p) => p.id === id)
  const projectTitle = project ? project.title : 'unknown'

  const { todo, inProgress, done } = useMemo(() => {
    const projectTasks = filterTasksForProject(tasks, id, searchQuery)
    return splitTasksByStatus(projectTasks)
  }, [tasks, id, searchQuery])

  const handleUpdateStatus = (taskId, newStatus) => {
    onUpdateTaskStatus(taskId, newStatus)
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>{projectTitle}</h1>
        <Link to="/add-task" className="btn primary">
          Add Task
        </Link>
      </header>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="task-search-input"
        />
      </div>

      <div className="task-columns">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={todo}
          onMoveTask={handleUpdateStatus}
          onDeleteTask={onDeleteTask}
          onDropTask={handleUpdateStatus}
        />
        <TaskColumn
          title="In Progress"
          status="in-progress"
          tasks={inProgress}
          onMoveTask={handleUpdateStatus}
          onDeleteTask={onDeleteTask}
          onDropTask={handleUpdateStatus}
        />
        <TaskColumn
          title="Done"
          status="done"
          tasks={done}
          onMoveTask={handleUpdateStatus}
          onDeleteTask={onDeleteTask}
          onDropTask={handleUpdateStatus}
        />
      </div>
    </div>
  )
}

export default ProjectTasks


