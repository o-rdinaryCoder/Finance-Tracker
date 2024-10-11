import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { Auth } from './pages/auth'
import { FinancialRecordsProvider } from './context/financial-record-context'
import { SignedIn, UserButton } from '@clerk/clerk-react'

function App() {
  const changeTheme = () => {
    document.body.classList.toggle("dark-theme");
  }
  return (
    <Router>
      <div className="app-container">
        <div className='navbar'>
          <button className="theme-button" onClick={changeTheme}>Change Theme</button>
          <Link to ='/'> Dashboard </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App