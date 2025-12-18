import { Link } from 'react-router-dom'

function ProjectCard({ project, tasksCount }) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.short_desc}</p>
      <p className="muted">Tasks: {tasksCount}</p>
      <Link to={`/project/${project.id}`} className="btn">
        View Tasks
      </Link>
    </div>
  )
}

export default ProjectCard


