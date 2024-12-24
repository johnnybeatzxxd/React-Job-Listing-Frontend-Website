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
import { myJobs } from '../utils/dashboard-requests.js'
import { FourSquare } from "react-loading-indicators";




export function JobPostings(){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    const [jobPostingsData, setJobPostingsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        myJobs()
            .then((response) => {
                if (response.success) {
                    setJobPostingsData(response.message);
                } else {
                    setError(response.message);
                }
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <LoadingContainer>
                <FourSquare color="#0B65C6" size="medium" text="" textColor="" />
            </LoadingContainer>
        );
    }

    if (error) {
        return <ErrorMessage>Error loading Favorite jobs: {error}</ErrorMessage>;
    }

    return(
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Dash>
            <DashContent>
                <RecentlyAppliedSection>
                    <HeaderRow>
                        <h3>Job Postings</h3>
                    </HeaderRow>
                    <JobsTable>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Job</TableHeaderCell>
                                <TableHeaderCell>Posted Date</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell>Action</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobPostingsData?.map((job, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <JobInfo>
                                            <CompanyLogo style={{backgroundColor: '#25C277'}}>
                                                {job.company_name?.substring(0, 2)}
                                            </CompanyLogo>
                                            <JobDetails>
                                                <JobTitle>{job.job_title?.substring(0, 20)}{job.job_title?.length > 20 ? '...' : ''}</JobTitle>
                                                <JobMeta>
                                                    <Location>{job.country}</Location>
                                                    <Salary>${job.salary}</Salary>
                                                    <JobType>{job.job_type}</JobType>
                                                </JobMeta>
                                            </JobDetails>
                                        </JobInfo>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(job.posted_date).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge>Active</StatusBadge>
                                    </TableCell>
                                    <TableCell>
                                        <ViewDetailsButton onClick={()=>window.location.href = `/details?jobId=${job.job_id}`}>View Details</ViewDetailsButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {jobPostingsData?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan="4" style={{textAlign: 'center'}}>
                                        No Jobs Found.
                                    </TableCell>
                                </TableRow>
                            )}
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
    border-left: 1px solid ${({theme})=>theme.weakBorderColor};
    //margin-right: 20px;
`

const DashContent = styled.div`
    padding: 20px;
    width: 100%;
    overflow-x: auto;
`

const RecentlyAppliedSection = styled.div`
    //margin-top: 30px;
    color:${({theme})=>theme.color}
`

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
`



const JobsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 650px;
`

const TableHeader = styled.thead`
background-color:${({theme})=>theme.secBackground}
`

const TableBody = styled.tbody`
    color:${({theme})=>theme.color}
`

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
