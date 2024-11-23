import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PomodoroTimer from '../components/app/home/time/Pomodoro'
import Layout from '../components/app/layout/Layout'
import KanbanContainer from '../components/app/objects/project-components/KanbanContainer'
import HomePage from '../pages/app/HomePage'
import NotesPage from '../pages/app/NotesPage'
import SettingsPage from '../pages/app/SettingsPage'
import TasksPage from '../pages/app/TasksPage'
import ProjectDetail from '../pages/app/project/ProjectDetail'
import ProjectsPage from '../pages/app/project/ProjectsPage'


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/notes' element={<NotesPage />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/test-pomo' element={<PomodoroTimer />} />
          <Route path='/test-kanban' element={<KanbanContainer />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:projectId' element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;