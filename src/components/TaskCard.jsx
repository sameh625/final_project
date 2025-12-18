function TaskCard({ task, onMove, onDelete, draggable = false }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', task.id)
  }

  return (
    <div
      className="task-card"
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
    >
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <p className="muted">Status: {task.status}</p>
      <div className="task-card-actions">
        {task.status !== 'todo' && (
          <button type="button" className="btn" onClick={() => onMove(task.id, 'todo')}>
            To Do
          </button>
        )}
        {task.status !== 'in-progress' && (
          <button
            type="button"
            className="btn"
            onClick={() => onMove(task.id, 'in-progress')}
          >
            In Progress
          </button>
        )}
        {task.status !== 'done' && (
          <button type="button" className="btn" onClick={() => onMove(task.id, 'done')}>
            Done
          </button>
        )}
        <button type="button" className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard


