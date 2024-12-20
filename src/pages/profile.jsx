import { useState, useContext, useEffect } from 'react';
import { styled, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { Context } from '../App.jsx';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { CandidateProfileSetup } from '../components/candidate-profile.jsx';
import { RecruiterProfileSetup } from '../components/recruiter-profile.jsx';
import { Atom, FourSquare, Mosaic } from "react-loading-indicators";

export function ProfileSetupPage() {
  const [searchParams] = useSearchParams();
  const [isDarkMode, setIsDarkMode,profile,user] = useContext(Context);


  if (!user){
    if (!profile) window.location.href = '/signin';
    return(<LoadingIndicator>
      <FourSquare color="#0B65C6" size="medium" text="" textColor="" />
    </LoadingIndicator>)
  }
  if (user.role === "candidate"){
    return(<CandidateProfileSetup user={user}/>)
  }
  if (user.role === "recruiter"){
    return(<RecruiterProfileSetup user={user}/>)
  }
  
}

const LoadingIndicator = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`