import TaskCard from './TaskCard.jsx'

const preventDefault = (event) => event.preventDefault()

function TaskColumn({ title, status, tasks, onMoveTask, onDeleteTask, onDropTask }) {
  const handleDragEnter = (event) => {
    event.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const taskId = event.dataTransfer.getData('text/plain')
    if (taskId) {
      onDropTask(taskId, status)
    }
  }

  return (
    <div
      className="task-column"
      onDrop={handleDrop}
      onDragOver={preventDefault}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onMove={onMoveTask}
          onDelete={onDeleteTask}
          draggable
        />
      ))}
    </div>
  )
}

export default TaskColumn


