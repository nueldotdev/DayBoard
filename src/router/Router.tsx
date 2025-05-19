import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from '../components/app/layout/Layout'
// import KanbanContainer from '../components/app/objects/project-components/KanbanContainer'
import HomePage from '../pages/app/HomePage'
import NotesPage from '../pages/app/NotesPage'
import SettingsPage from '../pages/app/SettingsPage'
import TasksPage from '../pages/app/TasksPage'
import ProjectDetail from '../pages/app/project/ProjectDetail'
import ProjectsPage from '../pages/app/project/ProjectsPage'
// import ProjectSection from '../pages/app/project/ProjectSection'
// import { SchedulePage } from '../pages/app/SchedulePage'
import LandingPage from '../pages/index/LandingPage'
// import { getTheme } from '../utils/getTheme'
import { StatsPage } from '../pages/app/focus/StatsPage'
import NotFound from '../pages/index/NotFound'
import WaitlistPage from '../pages/index/WaitlistPage'
import AuthPage from '../pages/auth/AuthPage'
import ColorPicker from '../components/app/objects/project-components/ColorPicker'
// import { handleTokens } from '../../services/handleToken'


const AppRouter: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/app' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='notes' element={<NotesPage />} />
          <Route path='tasks' element={<TasksPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='stats' element={<StatsPage />} />
          <Route path='b' element={<ProjectsPage />} />
          <Route path='b/:boardSlug' element={<ProjectDetail />} />
          {/* <Route path='p/:projectId/s/:sectionId' element={<ProjectSection />} /> */}
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/waitlist' element={<WaitlistPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/test' element={<ColorPicker onSelect={() => {}} color='' />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;