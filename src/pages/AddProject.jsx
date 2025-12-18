import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function AddProject({ onAddProject }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    onAddProject({
      title,
      short_desc: description,
    })

    navigate('/')
  }

  return (
    <div className="page">
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Project Title
          <input
            type="text"
            placeholder="Enter project title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Project Description
          <textarea
            placeholder="Enter project description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit" className="btn primary">
          Save Project
        </button>
      </form>
    </div>
  )
}

export default AddProject


