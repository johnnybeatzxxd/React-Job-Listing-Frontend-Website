import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from './pages/home';
import FindJobs from './pages/find-jobs';
import { JobDetails } from './pages/job-details';
import { DashboardPage } from './pages/dashboard';
import { SignupPage } from './pages/signup';
import { SigninPage } from './pages/signin';
import { ProfileSetupPage } from './pages/profile';
import './index.css'
import { createContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { get_profile } from './utils/auth-requests.js';
import { PostJob } from './pages/post-job.jsx';
import Modal from 'react-modal';

export const Context = createContext()
function App() {
  const [profile, setProfile] = useState('Profile');
  const [user, setUser] = useState();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    console.log("request sent!!");
    get_profile().then((data) => {
      if (data.message === 'Profile not found') {
        setProfile("Profile not found");
        setUser({'fullName':data.user.full_name,'role':data.user.role})
        
      }
      else if (data.message === 'Authentication required') {
        setProfile(null);
      }
      else {
        setProfile(data.message);
      }
    });
  },
     []);

  return (
    <>
      <Toaster position="top-right" />
      <Context.Provider value={[isDarkMode,setIsDarkMode,profile,user]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="find-jobs" element={<FindJobs />} />
            <Route path="details" element={<JobDetails />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="set-profile" element={<ProfileSetupPage />} />
            <Route path="post-job" element={<PostJob />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  )
}

Modal.setAppElement('#root');

export default App
