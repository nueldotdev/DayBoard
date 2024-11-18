import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../components/app/layout/Layout'
import HomePage from '../pages/app/HomePage'
import NotesPage from '../pages/app/NotesPage'
import TasksPage from '../pages/app/TasksPage'
import SettingsPage from '../pages/app/SettingsPage'
import NoteDetail from '../pages/app/detail/NoteDetail'
import PomodoroTimer from '../components/app/home/time/Pomodoro'


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
          {/* <Route path='/project/:projectId' element={<NoteDetail />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;