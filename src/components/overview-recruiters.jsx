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
import { overview } from '../utils/dashboard-requests.js'
import { FourSquare } from "react-loading-indicators";

export function RecruitersOverView({setSelectedBar}){
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
    }, []);

    let firstName = '';
    try {
        firstName = profile.full_name.split(" ")[0];
    } catch {
        firstName = profile.full_name;
    }

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

    return(
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Dash>
        <DashContent>
            <Greeting>Welcome back, {firstName}</Greeting>
            <SubText>Manage your job postings and candidate applications</SubText>
            
            <StatsContainer>
                <StatBox style={{ backgroundColor: isDarkMode ? '#0c43913c':'#0d67e53b', color: isDarkMode ? '#e8e6e3' : '#18191c'}}>
                    <StatNumber>{dashboardData.active_jobs}</StatNumber>
                    <StatLabel>Active Jobs</StatLabel>
                    <img src={BriefCase} alt="Active Jobs" style={{ width: '24px', height: '24px' }} />
                </StatBox>

                <StatBox style={{ backgroundColor: isDarkMode ? '#910c2039':'#dd082839', color: isDarkMode ? '#e8e6e3' : '#18191c'}}>
                    <StatNumber>{dashboardData.total_applications}</StatNumber>
                    <StatLabel>Total Applications</StatLabel>
                    <img src={Stack} alt="Applications" style={{ width: '24px', height: '24px' }} />
                </StatBox>
                
                <StatBox style={{ backgroundColor: isDarkMode ? '#003c24':'#16d50452', color: isDarkMode ? '#e8e6e3' : '#18191c'}}>
                    <StatNumber>{dashboardData.total_applications}</StatNumber>
                    <StatLabel>Total Views</StatLabel>
                    <img src={Favorite} alt="Shortlisted" style={{ width: '24px', height: '24px' }} />
                </StatBox>
            </StatsContainer>

            <CompanyInfoSection>
                <HeaderRow>
                    <h3>Company Information</h3>
                    <ViewAll onClick={()=>setSelectedBar("settings")}>Edit →</ViewAll>
                </HeaderRow>
                <CompanyCard>
                    <CompanyHeader>
                        {profile.profile_image_url ? (
                            <CompanyLogo>
                                <img src={profile.profile_image_url} alt={profile.company_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </CompanyLogo>
                        ) : (
                            <CompanyLogo style={{backgroundColor: '#25C277'}}>{profile.company_name?.[0]}</CompanyLogo>
                        )}
                        <CompanyDetails>
                            <CompanyName>{profile.company_name || 'Your Company'}</CompanyName>
                            <CompanyMeta>
                                <Industry>{profile.industry || 'Industry not set'}</Industry>
                                <CompanySize>{profile.company_size || 'Size not set'}</CompanySize>
                            </CompanyMeta>
                        </CompanyDetails>
                    </CompanyHeader>
                    <CompanyWebsite href={profile.company_website} target="_blank">
                        {profile.company_website || 'Website not set'}
                    </CompanyWebsite>
                </CompanyCard>
            </CompanyInfoSection>
           
            <RecentlyAppliedSection>
                <HeaderRow>
                    <h3>Recent Applications</h3>
                    <ViewAll onClick={()=>setSelectedBar("applications")}>View all →</ViewAll>
                </HeaderRow>
                <TableWrapper>
                    <JobsTable>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Candidate</TableHeaderCell>
                                <TableHeaderCell>Applied For</TableHeaderCell>
                                <TableHeaderCell>Date Applied</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell>Action</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dashboardData?.recently_applied?.map((application, index) => (
                                <TableRow 
                                    key={index} 
                                    $isClickable={true}
                                    onClick={() => {
                                        console.log('Clicked application:', application);
                                    }}
                                >
                                    <TableCell>
                                        <JobInfo>
                                            <CompanyLogo style={{backgroundColor: '#25C277'}}>
                                                {application.applicant_name?.substring(0, 2)}
                                            </CompanyLogo>
                                            <JobDetails>
                                                <JobTitle>{application.applicant_name}</JobTitle>
                                                <JobMeta>
                                                    <Location>{application.applicant_title?.substring(0, 20)}{application.applicant_title?.length > 20 ? '...' : ''}</Location>
                                                    
                                                </JobMeta>
                                            </JobDetails>
                                        </JobInfo>
                                    </TableCell>
                                    <TableCell data-label="Applied For">{application.job_title?.substring(0, 20)}{application.job_title?.length > 20 ? '...' : ''}</TableCell>
                                    <TableCell data-label="Date Applied">{new Date(application.applied_date).toLocaleString()}</TableCell>
                                    <TableCell data-label="Status"><StatusBadge>New</StatusBadge></TableCell>
                                    <TableCell data-label="Action"><ViewDetailsButton >Review</ViewDetailsButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </JobsTable>
                </TableWrapper>
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

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    display: block;
    -webkit-overflow-scrolling: touch;
`

const JobsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    
    @media (max-width: 1200px) {
        min-width: 900px;
    }

    @media (max-width: 768px) {
        min-width: unset;
        display: block;
    }
`

const TableHeader = styled.thead`
    background-color: ${({theme})=>theme.secBackground};

    @media (max-width: 768px) {
        display: none; // Hide headers on mobile
    }
`

const TableBody = styled.tbody`
    @media (max-width: 768px) {
        display: block;
    }
`

const TableRow = styled.tr`
    border-bottom: 1px solid ${({theme})=>theme.weakBorderColor};
    cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({theme}) => theme.secBackground};
    }

    @media (max-width: 768px) {
        display: block;
        padding: 15px 0;
        
        &:not(:last-child) {
            border-bottom: 2px solid ${({theme})=>theme.weakBorderColor};
        }
    }
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
        display: block;
        padding: 5px 12px;
        
        &:not(:first-child) {
            &::before {
                content: attr(data-label);
                font-weight: bold;
                display: inline-block;
                width: 120px;
                color: ${({theme})=>theme.secColor};
            }
        }
    }
`

const JobInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
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

const CompanyInfoSection = styled.div`
    margin-top: 30px;
    color: ${({theme})=>theme.color};
`

const CompanyCard = styled.div`
    padding: 20px;
    background-color: ${({theme})=>theme.secBackground};
    border-radius: 8px;
`

const CompanyHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
`

const CompanyDetails = styled.div`
    display: flex;
    flex-direction: column;
`

const CompanyName = styled.h3`
    margin: 0;
    font-size: 18px;
    color: ${({theme})=>theme.color};
`

const CompanyMeta = styled.div`
    display: flex;
    gap: 12px;
    color: ${({theme})=>theme.secColor};
    font-size: 0.9em;
`

const Industry = styled.span``

const CompanySize = styled.span``

const CompanyWebsite = styled.a`
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`

const Experience = styled.span`
    color: ${({theme})=>theme.secColor};
`

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 20px;
`

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    padding: 20px;
`
