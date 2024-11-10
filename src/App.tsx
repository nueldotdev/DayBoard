import React from 'react'
import './App.css'
// import HomePage from './pages/app/HomePage'
import useApplyTheme from './hooks/useApplyTheme'
// import ThemeToggle from './components/app/ThemeToggle'
import AppRouter from './router/Router'

const App: React.FC = () => {
  useApplyTheme()

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
