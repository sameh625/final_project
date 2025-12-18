import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function AddTask({ projects, onAddTask }) {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState('')
  const [status, setStatus] = useState('todo')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!projectId) return

    onAddTask({
      title,
      description,
      projectId,
      status,
    })

    navigate(`/project/${projectId}`)
  }

  return (
    <div className="page">
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Task Title
          <input
            type="text"
            placeholder="Enter task title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Task Description
          <textarea
            placeholder="Enter task description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Select Project
          <select
            required
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select Status
          <select
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <button type="submit" className="btn primary">
          Save Task
        </button>
      </form>
    </div>
  )
}

export default AddTask


