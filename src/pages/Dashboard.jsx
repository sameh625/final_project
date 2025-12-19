import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'

function Dashboard({ projects, tasks, isLoading, error }) {
  const getTasksCount = (projectId) =>
    tasks.filter((task) => task.projectId === projectId).length

  return (
    <div className="page">
      <header className="page-header">
        <h1>Task Management Dashboard</h1>
        <Link to="/add-project" className="btn primary">
          Add Project
        </Link>
      </header>

      {isLoading && <p className="loading-message">Loading projects...</p>}

      {error && !isLoading && <p className="error-message">{error}</p>}

      {!isLoading && !error && (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tasksCount={getTasksCount(project.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard


