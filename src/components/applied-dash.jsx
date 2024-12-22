import { useState } from 'react'
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

export function AppliedJobs({title,data}){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    return(
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Dash>
            <DashContent>
                 {/* Recently Applied Section */}
            <RecentlyAppliedSection>
                <HeaderRow>
                    <h3>Recently Applied</h3>
                    
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
                        <TableRow>
                            <TableCell>
                                <JobInfo>
                                    <CompanyLogo style={{backgroundColor: '#25C277'}}>Up</CompanyLogo>
                                    <JobDetails>
                                        <JobTitle>Networking Engineer</JobTitle>
                                        <JobMeta>
                                            <Location>Washington</Location>
                                            <Salary>$50k-80k/month</Salary>
                                            <JobType>Remote</JobType>
                                        </JobMeta>
                                    </JobDetails>
                                </JobInfo>
                            </TableCell>
                            <TableCell>Feb 2, 2019 19:28</TableCell>
                            <TableCell><StatusBadge>Active</StatusBadge></TableCell>
                            <TableCell><ViewDetailsButton>View Details</ViewDetailsButton></TableCell>
                        </TableRow>
                        {/* Add more rows as needed */}
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
