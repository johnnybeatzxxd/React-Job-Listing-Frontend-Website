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
import { appliedJobs } from '../utils/dashboard-requests.js'
import { FourSquare } from "react-loading-indicators";

export function AppliedJobs(){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    const [appliedJobsData, setAppliedJobsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        appliedJobs()
            .then((response) => {
                if (response.success) {
                    setAppliedJobsData(response.message);
                } else {
                    setError(response.message);
                }
                setLoading(false);
            });
    }, []);

    const handleViewDetails = (job) => {
        setSelectedJob(job);
    };

    const closeModal = () => {
        setSelectedJob(null);
    };

    if (loading) {
        return (
            <LoadingContainer>
                <FourSquare color="#0B65C6" size="medium" text="" textColor="" />
            </LoadingContainer>
        );
    }

    if (error) {
        return <ErrorMessage>Error loading applied jobs: {error}</ErrorMessage>;
    }

    return(
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Dash>
            <DashContent>
                <RecentlyAppliedSection>
                    <HeaderRow>
                        <h3>Applied Jobs</h3>
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
                            {appliedJobsData?.map((job, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <JobInfo>
                                            <CompanyLogo style={{backgroundColor: '#25C277'}}>
                                                {job.company_profile_image ? (
                                                    <img 
                                                        src={job.company_profile_image} 
                                                        alt={job.company_name}
                                                        style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}}
                                                    />
                                                ) : (
                                                    job.company_name?.substring(0, 2)
                                                )}
                                            </CompanyLogo>
                                            <JobDetails>
                                                <JobTitle>{job.company_name}</JobTitle>
                                                <JobMeta>
                                                    <Location>{job.country}</Location>
                                                    <Salary>${job.salary}</Salary>
                                                    <JobType>{job.job_type}</JobType>
                                                </JobMeta>
                                            </JobDetails>
                                        </JobInfo>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(job.applied_date).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge>Active</StatusBadge>
                                    </TableCell>
                                    <TableCell>
                                        <ViewDetailsButton onClick={() => handleViewDetails(job)}>
                                            View Details
                                        </ViewDetailsButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {appliedJobsData?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan="4" style={{textAlign: 'center'}}>
                                        No applied jobs found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </JobsTable>
                </RecentlyAppliedSection>
            </DashContent>

            {selectedJob && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <ModalHeader>
                            <h2>Application Details</h2>
                            <CloseButton onClick={closeModal}>&times;</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <DetailSection>
                                <SectionTitle>Job Information</SectionTitle>
                                <DetailGrid>
                                    <DetailCard>
                                        <DetailLabel>Company</DetailLabel>
                                        <DetailValue>{selectedJob.company_name}</DetailValue>
                                    </DetailCard>
                                    <DetailCard>
                                        <DetailLabel>Job Title</DetailLabel>
                                        <DetailValue>{selectedJob.job_title}</DetailValue>
                                    </DetailCard>
                                    <DetailCard>
                                        <DetailLabel>Location</DetailLabel>
                                        <DetailValue>{selectedJob.country}</DetailValue>
                                    </DetailCard>
                                    <DetailCard>
                                        <DetailLabel>Salary</DetailLabel>
                                        <DetailValue>${selectedJob.salary}</DetailValue>
                                    </DetailCard>
                                    <DetailCard>
                                        <DetailLabel>Job Type</DetailLabel>
                                        <DetailValue>{selectedJob.job_type}</DetailValue>
                                    </DetailCard>
                                    <DetailCard>
                                        <DetailLabel>Applied Date</DetailLabel>
                                        <DetailValue>
                                            {new Date(selectedJob.applied_date).toLocaleString()}
                                        </DetailValue>
                                    </DetailCard>
                                </DetailGrid>
                            </DetailSection>

                            <DetailSection>
                                <SectionTitle>Your Application</SectionTitle>
                                <ApplicationText>
                                    {selectedJob.application}
                                </ApplicationText>
                            </DetailSection>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            )}
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    background-color: ${({theme}) => theme.background};
    border-radius: 12px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const ModalHeader = styled.div`
    padding: 24px;
    border-bottom: 1px solid ${({theme}) => theme.weakBorderColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({theme}) => theme.color};

    h2 {
        margin: 0;
        font-size: 1.5rem;
    }
`

const ModalBody = styled.div`
    padding: 24px;
    color: ${({theme}) => theme.color};
`

const DetailSection = styled.div`
    margin-bottom: 32px;
    
    &:last-child {
        margin-bottom: 0;
    }
`

const SectionTitle = styled.h3`
    margin: 0 0 16px 0;
    font-size: 1.1rem;
    color: ${({theme}) => theme.color};
`

const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
`

const DetailCard = styled.div`
    background-color: ${({theme}) => theme.secBackground};
    padding: 16px;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }
`

const DetailLabel = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${({theme}) => theme.secColor};
`

const DetailValue = styled.div`
    color: ${({theme}) => theme.color};
    font-size: 1rem;
    word-break: break-word;
`

const ApplicationText = styled.div`
    background-color: ${({theme}) => theme.secBackground};
    padding: 20px;
    border-radius: 8px;
    line-height: 1.6;
    white-space: pre-wrap;
    color: ${({theme}) => theme.color};
`

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${({theme}) => theme.color};
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: ${({theme}) => theme.secBackground};
    }
`

