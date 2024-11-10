import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../components/app/layout/Layout'
import HomePage from '../pages/app/HomePage'
import NotesPage from '../pages/app/NotesPage'
import TasksPage from '../pages/app/TasksPage'
import SettingsPage from '../pages/app/SettingsPage'


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/notes' element={<NotesPage />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter