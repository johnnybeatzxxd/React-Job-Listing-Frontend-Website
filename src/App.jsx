import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from './pages/home';
import { FindJobs } from './pages/find-jobs';
import { JobDetails } from './pages/job-details';
import { DashboardPage } from './pages/dashboard'
import './index.css'
import { createContext, useEffect } from 'react';
export const Context = createContext()
function App() {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);


  return (
    <Context.Provider value={[isDarkMode,setIsDarkMode]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="find-jobs" element={<FindJobs />} />
          <Route path="details" element={<JobDetails />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
