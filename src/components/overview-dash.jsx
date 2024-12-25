import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from './navbar.jsx'
import { FooterBar } from './footer.jsx'
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
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'
import { RecruitersOverView } from './overview-recruiters.jsx'
import { overview } from '../utils/dashboard-requests.js'
import { FourSquare } from "react-loading-indicators";


export function OverView({setSelectedBar}){
    const [isDarkMode, setIsDarkMode, profile] = useContext(Context);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        overview()
            .then((response) => {
                if (response.success) {
                    setDashboardData(response.message);
                } else {
                    setError(response.message);
                }
                setLoading(false);
            });
    }, [dashboardData]);

    let firstName = '';
    try {
        firstName = profile.full_name.split(" ")[0];
    } catch {
        firstName = profile.full_name;
    }

    if (profile.role === "recruiter") return(<RecruitersOverView setSelectedBar={setSelectedBar}/>)
    
    if (loading) {
        return (
            <LoadingContainer>
                <FourSquare color="#0B65C6" size="medium" text="" textColor="" />
            </LoadingContainer>
        );
    }

    if (error) {
        return <ErrorMessage>Error loading dashboard: {error}</ErrorMessage>;
    }
    console.log("this is the dashboard data: ",dashboardData )
    return(
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Dash>
            <DashContent>
                <Greeting>Hello, {firstName}</Greeting>
                <SubText>Here is your daily activities and job alerts</SubText>
                
                <StatsContainer>
                    <StatBox style={{ backgroundColor: isDarkMode ? '#0c43913c':'#0d67e53b', color: isDarkMode ? '#e8e6e3' : '#18191c'}}>
                        <StatNumber>{dashboardData?.applied_nums || 0}</StatNumber>
                        <StatLabel>Applied Jobs</StatLabel>
                        <img src={BriefCase} alt="Applied Jobs" style={{ width: '24px', height: '24px' }} />
                    </StatBox>

                    <StatBox style={{ backgroundColor: isDarkMode ? '#910c2039':'#dd082839', color: isDarkMode ? '#e8e6e3' : '#18191c'}}>
                        <StatNumber>{dashboardData?.favorite_nums || 0}</StatNumber>
                        <StatLabel>Favorite Jobs</StatLabel>
                        <img src={Favorite} alt="Favorite Jobs" style={{ width: '24px', height: '24px' }} />
                    </StatBox>
                    
                    <StatBox style={{ backgroundColor: isDarkMode ? '#003c24':'#16d50452', color: isDarkMode ? '#e8e6e3' : '#18191c'}}>
                        <StatNumber>{dashboardData?.alert || 0}</StatNumber>
                        <StatLabel>Job Alerts</StatLabel>
                        <img src={Bell} alt="Job Alerts" style={{ width: '24px', height: '24px' }} />
                    </StatBox>
                </StatsContainer>

                <ProfileInfoSection>
                    <HeaderRow>
                        <h3>Profile Information</h3>
                        <ViewAll onClick={()=>window.location.href = '/set-profile'}>Edit →</ViewAll>
                    </HeaderRow>
                    <ProfileCard>
                        <ProfileHeader>
                            {profile.profile_image_url ? (
                                <ProfileLogo>
                                    <img src={profile.profile_image_url} alt={profile.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </ProfileLogo>
                            ) : (
                                <ProfileLogo style={{backgroundColor: '#25C277'}}>{profile.full_name?.[0]}</ProfileLogo>
                            )}
                            <ProfileDetails>
                                <ProfileName>{profile.full_name || 'Your Name'}</ProfileName>
                                <ProfileMeta>
                                    <Title>{profile.title || 'Title not set'}</Title>
                                    <Experience>${profile.hourly_rate || 'Hourly rate not set'}/h</Experience>
                                </ProfileMeta>
                            </ProfileDetails>
                        </ProfileHeader>
                        <ProfileEmail href={`mailto:${profile.email}`}>
                            {profile.email || 'Email not set'}
                        </ProfileEmail>
                    </ProfileCard>
                </ProfileInfoSection>

                <RecentlyAppliedSection>
                    <HeaderRow>
                        <h3>Recently Applied</h3>
                        <ViewAll onClick={()=>setSelectedBar("appliedJobs")} >View all →</ViewAll>
                    </HeaderRow>
                    <JobsTable>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Job</TableHeaderCell>
                                <TableHeaderCell>Date Applied</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell>Action</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dashboardData?.recently_applied?.map((job, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <JobInfo>
                                            {job.profile_picture ? (
                                                <CompanyLogo>
                                                    <img src={job.profile_picture} alt={job.company_name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                                </CompanyLogo>
                                            ) : (
                                                <CompanyLogo style={{backgroundColor: '#25C277'}}>{job.company_name?.substring(0, 2)}</CompanyLogo>
                                            )}
                                            <JobDetails>
                                                <JobTitle>{job.company_name}</JobTitle>
                                                <JobMeta>
                                                    <Location>{job.country}</Location>
                                                    <Salary>${job.salary}{job.salary_type === 'fixed' ? '-/month' : '-/hour'}</Salary>
                                                    {/* <JobType>{job.salary_type}</JobType> */}
                                                </JobMeta>
                                            </JobDetails>
                                        </JobInfo>
                                    </TableCell>
                                    <TableCell>{new Date(job.applied_date).toLocaleString()}</TableCell>
                                    <TableCell><StatusBadge>Active</StatusBadge></TableCell>
                                    <TableCell><ViewDetailsButton>View Details</ViewDetailsButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </JobsTable>
                </RecentlyAppliedSection>
            </DashContent>
        </Dash>
        </ThemeProvider>
    )
}

const Dash = styled.div`
    display: flex;
    flex: 1;
    border-left: 1px solid ${({theme})=>theme.weakBorderColor};;
    background-color: ${({theme})=>theme.background};
    //color: ${({theme})=>theme.color};;
    //margin-right: 20px;
`

const DashContent = styled.div`
    padding: 20px;
    width: 100%;
    overflow-x: auto;
`

const Greeting = styled.h1`
    font-size: 24px;
    margin-bottom: 8px;
    color: ${({theme})=>theme.color};
`

const SubText = styled.p`
    color: ${({theme})=>theme.secColor};
    margin-bottom: 24px;
`

const StatsContainer = styled.div`
    display: flex;
    gap: 20px;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const StatBox = styled.div`
    flex: 1;
    padding: 15px;
    border-radius: 6px;
    position: relative;
    
    img {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
    }
`

const StatNumber = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 6px;
`

const StatLabel = styled.div`
    color: ${({theme})=>theme.secColor};
    font-size: 12px;
`

const RecentlyAppliedSection = styled.div`
    color: ${({theme})=>theme.color};
    margin-top: 30px;
`

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const ViewAll = styled.a`
    color: #0066cc;
    cursor: pointer;
    text-decoration: none;
`

const JobsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 650px;
`

const TableHeader = styled.thead`
    background-color: ${({theme})=>theme.secBackground};
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
    border-bottom: 1px solid ${({theme})=>theme.weakBorderColor};
`

const TableHeaderCell = styled.th`
    text-align: left;
    padding: 12px;
    color: ${({theme})=>theme.secColor};
    font-weight: 500;
`

const TableCell = styled.td`
    padding: 12px;

    @media (max-width: 768px) {
        padding: 8px;
    }
`

const JobInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 480px) {
        gap: 8px;
    }
`

const CompanyLogo = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;

    @media (max-width: 480px) {
        width: 32px;
        height: 32px;
        font-size: 0.9em;
    }
`

const JobDetails = styled.div`
    display: flex;
    flex-direction: column;
`

const JobTitle = styled.div`
    font-weight: 500;
    margin-bottom: 2px;
`

const JobMeta = styled.div`
    display: flex;
    gap: 8px;
    color: ${({theme})=>theme.secColor};
    font-size: 0.8em;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 4px;
    }
`

const Location = styled.span``

const Salary = styled.span``

const JobType = styled.span`
    color: #0066cc;
`

const StatusBadge = styled.span`
    color: #22C55E;
    background-color: ${({theme})=>theme.secBackground};
    padding: 4px 8px;
    border-radius: 4px;
`

const ViewDetailsButton = styled.button`
    color: #0066cc;
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px 4px;
    
    &:hover {
        background-color: ${({theme})=>theme.secBackground};
        border-radius: 4px;
    }
`

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    padding: 20px;
`

const ProfileInfoSection = styled.div`
    margin-top: 30px;
    color: ${({theme})=>theme.color};
`

const ProfileCard = styled.div`
    padding: 20px;
    background-color: ${({theme})=>theme.secBackground};
    border-radius: 8px;
`

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
`

const ProfileLogo = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    overflow: hidden;
`

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
`

const ProfileName = styled.h3`
    margin: 0;
    font-size: 18px;
    color: ${({theme})=>theme.color};
`

const ProfileMeta = styled.div`
    display: flex;
    gap: 12px;
    color: ${({theme})=>theme.secColor};
    font-size: 0.9em;
`

const Title = styled.span``

const Experience = styled.span`
    color: ${({theme})=>theme.secColor};
`

const ProfileEmail = styled.a`
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`

