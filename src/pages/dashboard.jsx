import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from '../components/navbar.jsx'
import { FourSquare } from "react-loading-indicators";
import BriefCaseGrey from '../assets/briefcase-grey.svg'
import BriefCase     from '../assets/briefcase.svg'
import Stack from '../assets/Stack.svg'
import StackGrey from '../assets/Stack-grey.svg'
import Bell from '../assets/bell.svg'
import BellGrey from '../assets/bell-grey.svg'
import Setting from '../assets/setting.svg'
import SettingGrey from '../assets/setting-grey.svg'
import FavoriteGrey from '../assets/favorite-grey.svg'
import Favorite from '../assets/favorite.svg'
import Logout from '../assets/logout.svg'

import { OverView } from '../components/overview-dash.jsx'
import { FavoriteJobs } from '../components/favorite-dash.jsx';
import { RecruitersOverView } from '../components/overview-recruiters.jsx';
import { AppliedJobs } from '../components/applied-dash.jsx';
import { Applications } from '../components/applications-dash.jsx';
import { logout } from '../utils/auth-requests.js'
import { JobPostings } from '../components/job-postings.jsx';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext, useEffect } from 'react'
import { Context } from '../App.jsx'



export function DashboardPage(){
    const [selectedBar, setSelectedBar] = useState("overview")
    const [isDarkMode, setIsDarkMode,profile] = useContext(Context);
    console.log("thisis the dashnoard",profile);
    if(profile === null){
        window.location.href = "/signin";
    }
    if (profile === "Profile not found"){
        window.location.href = '/set-profile'
    }
    const handleLogout = () => {
        logout().then((response) => {
            if(response.success){
                
                localStorage.removeItem('csrfToken');
                window.location.href = "/";
                
            }
        })
    }
    if (profile === "Profile"){
        return(
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <LoadingScreen>
                    <NavigationBar/>
                    <LoadingContainer>
                        <FourSquare color="#0B65C6" size="medium" text="" textColor="" />
                    </LoadingContainer>
                </LoadingScreen>
            </ThemeProvider>
        )
    }
 
    const renderSidebarItems = () => {
        if (profile.role === 'recruiter') {
            return (
                <>
                    <Title>RECRUITER DASHBOARD</Title>
                    <SideBarItem 
                        style={selectedBar === "overview" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("overview")}>
                        <img src={selectedBar === "overview" ? Stack : StackGrey} style={{ width: '23px', height: '23px' }} alt="Overview" />
                        <span style={selectedBar === "overview" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Overview</span>
                    </SideBarItem>
                    <SideBarItem 
                        style={selectedBar === "postings" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("postings")}>
                        <img src={selectedBar === "postings" ? BriefCase : BriefCaseGrey} style={{ width: '23px', height: '23px' }} alt="Job Postings" />
                        <span style={selectedBar === "postings" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Job Postings</span>
                    </SideBarItem>
                    <SideBarItem 
                        style={selectedBar === "applications" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("applications")}>
                        <img src={selectedBar === "applications" ? Favorite : FavoriteGrey} style={{ width: '23px', height: '23px' }} />
                        <span style={selectedBar === "applications" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Applications</span>
                    </SideBarItem>
                    <SideBarItem 
                        style={selectedBar === "candidates" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("candidates")}>
                        <img src={selectedBar === "candidates" ? Bell : BellGrey} alt="Candidates" style={{ width: '23px', height: '23px' }} />
                        <span style={selectedBar === "candidates" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Candidates</span>
                    </SideBarItem>
                </>
            );
        } if (profile.role === 'candidate') {
            return (
                <>
                    <Title>CANDIDATE DASHBOARD</Title>
                    <SideBarItem 
                        style={selectedBar === "overview" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("overview")}>
                        <img src={selectedBar === "overview" ? Stack : StackGrey} style={{ width: '23px', height: '23px' }} alt="Overview" />
                        <span style={selectedBar === "overview" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Overview</span>
                    </SideBarItem>
                    <SideBarItem 
                        style={selectedBar === "appliedJobs" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("appliedJobs")}>
                        <img src={selectedBar === "appliedJobs" ? BriefCase : BriefCaseGrey} style={{ width: '23px', height: '23px' }} alt="Applied Jobs" />
                        <span style={selectedBar === "appliedJobs" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Applied Jobs</span>
                    </SideBarItem>
                    <SideBarItem 
                        style={selectedBar === "favorite" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("favorite")}>
                        <img src={selectedBar === "favorite" ? Favorite : FavoriteGrey} style={{ width: '23px', height: '23px' }} />
                        <span style={selectedBar === "favorite" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Favorite Jobs</span>
                    </SideBarItem>
                    <SideBarItem 
                        style={selectedBar === "alert" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                        onClick={() => setSelectedBar("alert")}>
                        <img src={selectedBar === "alert" ? Bell : BellGrey} alt="Job Alert" style={{ width: '23px', height: '23px' }} />
                        <span style={selectedBar === "alert" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Job Alert</span>
                        <span style={{ marginLeft: 'auto', backgroundColor: isDarkMode ? '#0066cc' : '#0066cc', padding: '2px 6px', borderRadius: '10px' }}>09</span>
                    </SideBarItem>
                </>
            );
        }
    };

    const renderMainContent = () => {
        if (profile.role === 'recruiter') {
            return (
                <>
                    {selectedBar === "overview" && <RecruitersOverView setSelectedBar={setSelectedBar}/>}
                    {selectedBar === "postings" && <JobPostings />}
                    {selectedBar === "applications" && <Applications />}
                    {selectedBar === "candidates" && <Candidates />}
                </>
            );
        } else {
            return (
                <>
                    {selectedBar === "overview" && <OverView setSelectedBar={setSelectedBar}/>}
                    {selectedBar === "appliedJobs" && <AppliedJobs />}
                    {selectedBar === "favorite" && <FavoriteJobs />}
                    {selectedBar === "alert" && <JobAlerts />}
                </>
            );
        }
    };

    return(
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Dashboard>
            <NavigationBar/>
            <DashboardContainer>
                <Content>     
                    <SideBar>
                        {renderSidebarItems()}
                        <SideBarItem 
                            style={selectedBar === "setting" ? { backgroundColor: isDarkMode ? '#1f2223' : '#f1f2f4', borderLeft: "3px solid #0B65C6" } : {}}
                            onClick={() => setSelectedBar("setting")}>
                            <img src={selectedBar === "setting" ? Setting : SettingGrey} style={{ width: '23px', height: '23px' }} alt="Settings" />
                            <span style={selectedBar === "setting" ? { color: '#0066cc' } : {color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Settings</span>
                        </SideBarItem>
                        <LogoutItem onClick={handleLogout}>
                            <img src={Logout}  style={{ width: '23px', height: '23px', }} alt="Logout" />
                            <span style={{color: isDarkMode ? '#e8e6e3' : '#18191c'}}>Logout</span>
                        </LogoutItem>
                    </SideBar>
                    {renderMainContent()}
                </Content>
            </DashboardContainer>
        </Dashboard>
        </ThemeProvider>
    )
}

const Dashboard = styled.div`
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    background-color: ${({theme})=>theme.background};
    
    @media (max-width: 768px) {
        height: auto;
        min-height: 100vh;
    }
`
const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 100%;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        padding: 10px 0;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-self: end;
    width: 90.3%;
    height: 100%;
    background-color: ${({theme})=>theme.background};
    @media (max-width: 1024px) {
        width: 95%;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0 15px;
    }
`
const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    width: 25%;
    min-width: 20%;
    padding: 20px 0px 20px 0;
    position: sticky;
    top: 0;

    @media (max-width: 1024px) {
        width: 30%;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 10px 0;
        margin-bottom: 20px;
        height: auto;
        position: static;
    }
`

const SideBarItem = styled.div`
    display: flex;
    flex-direction: row;
    height: 20px;
    align-items: center;
    gap: 10px;
    padding: 12px;
    cursor: pointer;
    
    &:hover {
        background-color: ${({theme})=>theme.secBackground};
        border-left: 3px solid #0B65C6;
        border-radius: 4px;
    }

    span {
        @media (max-width: 1024px) {
            font-size: 14px;
        }
    }

    img {
        @media (max-width: 768px) {
            width: 20px !important;
            height: 20px !important;
        }
    }
`
const LogoutItem = styled(SideBarItem)`
    margin-top: auto !important;
    position: sticky;
    bottom: 0;
    background-color: ${({theme})=>theme.background};
    
    &:hover {
        border-left: 3px solid red;
    }

    @media (max-width: 768px) {
        position: static;
        margin-top: 20px !important;
    }
`

const Title = styled.h2`
    font-size: 14px;
    font-size: 0.7rem;
    color: #8b8b8b;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        font-size: 0.8rem;
        text-align: center;
    }
`

const LoadingScreen = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: ${({theme}) => theme.background};
`

const LoadingContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`