## TaskBoard – React Kanban Project

TaskBoard is a small kanban‑style task manager built with **React + Vite**.  
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

We split the project into four logical modules so each team member can own and push their part:

1. **Core app & routing (Person A)**
   - Files: `src/App.jsx`, `src/main.jsx`, `src/App.css`, `src/index.css`
   - Responsibilities:
     - App shell, navigation bar, theme toggle (dark/light)
     - Global state for projects/tasks
     - Fetching from the mock API and syncing with `localStorage`
     - React Router setup and route wiring to pages

2. **Dashboard & project listing (Person B)**
   - Files: `src/pages/Dashboard.jsx`, `src/components/ProjectCard.jsx`
   - Responsibilities:
     - Home dashboard layout and copy
     - Project cards and task counts per project
     - Navigation to individual project boards

3. **Project task board (Person C)**
   - Files: `src/pages/ProjectTasks.jsx`, `src/components/TaskColumn.jsx`, `src/components/TaskCard.jsx`
   - Responsibilities:
     - Per‑project kanban board (To Do / In Progress / Done)
     - Search/filter within a project
     - Drag‑and‑drop between columns
     - Buttons to update status and delete tasks

4. **Forms: Add Project & Add Task (Person D)**
   - Files: `src/pages/AddProject.jsx`, `src/pages/AddTask.jsx`
   - Responsibilities:
     - Form UX and validation for creating projects and tasks
     - Redirecting after submit
     - Dropdown for selecting project and status when creating tasks

> Each person can primarily work inside their own module, but you may touch shared files (like `App.jsx` and `App.css`) when necessary. Coordinate before changing shared code to avoid conflicts.

---

### 3. Git workflow for the team

1. **Create the repository**
   - One member:
     - Run `git init`
     - Run `git add . && git commit -m "Initial TaskBoard project"`
     - Create a GitHub repo and push: `git remote add origin <repo-url>` then `git push -u origin main`
2. **Each person creates a feature branch**
   - Example naming:
     - Person A: `feature/core-app`
     - Person B: `feature/dashboard`
     - Person C: `feature/project-board`
     - Person D: `feature/forms`
   - Commands:
     - `git checkout -b feature/<your-module>`
3. **Normal contribution cycle**
   - Pull latest main: `git checkout main && git pull`
   - Update your branch: `git checkout feature/<your-module> && git merge main`
   - Work on your files, then:
     - `git add <changed-files>`
     - `git commit -m "Describe your change"`
     - `git push origin feature/<your-module>`
   - Open a Pull Request (PR) on GitHub from your feature branch to `main`.
   - Have at least one teammate review and approve before merging.

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
- **Build tool**: Vite
- **Routing**: `react-router-dom`
- **Styling**: CSS (custom design with dark/light themes)
- **Persistence**: `window.localStorage` + mock REST API

This README should be enough for your instructor to understand the project and for all 4 teammates to collaborate cleanly through Git. 
