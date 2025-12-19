## TaskBoard – React Kanban Project

TaskBoard is a small task manager built with **React**.  
It supports multiple projects, per‑project task boards (To Do / In Progress / Done), drag‑and‑drop between columns, and light/dark themes with data persisted in `localStorage` and initially seeded from a mock API.

---

### 1. Getting started

- **Install dependencies**
  - `npm install`
- **Run dev server**
  - `npm run dev`
- **Build for production**
  - `npm run build`
- **Preview production build**
  - `npm run preview`

The app uses Vite defaults, so the dev server will usually run on `http://localhost:5173/`.

---

### 2. Project structure (modules)

1. **Core app & routing**
   - Files: `src/App.jsx`, `src/main.jsx`, `src/App.css`, `src/index.css`
   - Responsibilities:
     - App shell, navigation bar, theme toggle (dark/light)
     - Global state for projects/tasks
     - Fetching from the mock API and syncing with `localStorage`
     - React Router setup and route wiring to pages

2. **Dashboard & project listing**
   - Files: `src/pages/Dashboard.jsx`, `src/components/ProjectCard.jsx`
   - Responsibilities:
     - Home dashboard layout and copy
     - Project cards and task counts per project
     - Navigation to individual project boards

3. **Project task board**
   - Files: `src/pages/ProjectTasks.jsx`, `src/components/TaskColumn.jsx`, `src/components/TaskCard.jsx`
   - Responsibilities:
     - Per‑project board (To Do / In Progress / Done)
     - Search/filter within a project
     - Drag‑and‑drop between columns
     - Buttons to update status and delete tasks

4. **Forms: Add Project & Add Task (Person D)**
   - Files: `src/pages/AddProject.jsx`, `src/pages/AddTask.jsx`
   - Responsibilities:
     - Redirecting after submit
     - Dropdown for selecting project and status when creating tasks
---

### 4. Data & APIs

- **Projects API**: `https://69405a7a993d68afba6bd602.mockapi.io/api/v1/project`
- On first load, the app:
  - Fetches projects from the API
  - Imports tasks from the API into local state and `localStorage`
- Afterwards, the app prefers **localStorage** so user changes are not overwritten.

---

### 5. Tech stack

- **Frontend**: React (functional components, hooks)
- **Routing**: `react-router-dom`
- **Styling**: CSS (custom design with dark/light themes)
- **Persistence**: `window.localStorage` + mock REST API