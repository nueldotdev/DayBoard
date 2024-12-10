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
// import ProjectSection from '../pages/app/project/ProjectSection'
import { SchedulePage } from '../pages/app/SchedulePage'
import LandingPage from '../pages/index/LandingPage'
import { getTheme } from '../utils/getTheme'


const AppRouter: React.FC = () => {
  const {currentTheme} = getTheme();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/app' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='notes' element={<NotesPage />} />
          <Route path='tasks' element={<TasksPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='schedule' element={<SchedulePage />} />
          <Route path='b' element={<ProjectsPage />} />
          <Route path='b/:boardId' element={<ProjectDetail />} />
          {/* <Route path='p/:projectId/s/:sectionId' element={<ProjectSection />} /> */}
        </Route>
        <Route path='/pomodoro' element={<PomodoroTimer theme={currentTheme} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;