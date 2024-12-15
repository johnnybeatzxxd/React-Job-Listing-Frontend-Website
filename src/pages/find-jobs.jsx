import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from '../components/navbar'
import { SearchInbox } from '../components/search-inbox'
import { Location } from '../components/location-dropdown'
import { FooterBar } from '../components/footer.jsx'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'

export function FindJobs(){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    const jobs = [
        {
            title: "Create web blog about Design with Django framework",
            postedTime: "Posted yesterday",
            jobType: "Fixed-price",
            experienceLevel: "Entry level",
            budget: "$20",
            description: "Need to quickly create a web app for a design blog",
            tags: ["PostgreSQL", "Web Development", "HTML", "CSS", "Django"],
            paymentVerified: "✓ Payment verified",
            spent: "$0 spent",
            location: "🌍 KAZ",
            proposals: "Proposals: 10 to 15"
        },
        {
            title: "Create web blog about Design with Django framework",
            postedTime: "Posted yesterday",
            jobType: "Fixed-price",
            experienceLevel: "Entry level",
            budget: "$20",
            description: "Need to quickly create a web app for a design blog",
            tags: ["PostgreSQL", "Web Development", "HTML", "CSS", "Django"],
            paymentVerified: "✓ Payment verified",
            spent: "$0 spent",
            location: "🌍 KAZ",
            proposals: "Proposals: 10 to 15"
        },
        {
            title: "Create web blog about Design with Django framework",
            postedTime: "Posted yesterday",
            jobType: "Fixed-price",
            experienceLevel: "Entry level",
            budget: "$20",
            description: "Need to quickly create a web app for a design blog",
            tags: ["PostgreSQL", "Web Development", "HTML", "CSS", "Django"],
            paymentVerified: "✓ Payment verified",
            spent: "$0 spent",
            location: "🌍 KAZ",
            proposals: "Proposals: 10 to 15"
        },
        // Add more job objects here as needed
    ];

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <JobsPage>
            <NavigationBar/>
            <Header>
                <HeaderContent>
                    <HeaderText>Find Jobs</HeaderText>
                    <Path>Home / Find Job</Path>
                </HeaderContent>
            </Header>
            <JobsContainer>
                <Jobs>
                    <FiltersContainer>
                        <FilterSection>
                            <FilterTitle>Category</FilterTitle>
                            <Select>
                                <option>Select Categories</option>
                                {/* Add more options here */}
                            </Select>
                        </FilterSection>
                        <FilterSection>
                            <FilterTitle>Experience level</FilterTitle>
                            <Checkbox>
                                <input type="checkbox" />
                                Entry Level (44)
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" />
                                Intermediate (429)
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" />
                                Expert (243)
                            </Checkbox>
                        </FilterSection>
                        <FilterSection>
                            <FilterTitle>Job type</FilterTitle>
                            <Checkbox>
                                <input type="checkbox" />
                                Hourly (444)
                            </Checkbox>
                            <PriceInput>
                                <input type="text" placeholder="$ Min" />
                                <span>/ hr</span>
                                <input type="text" placeholder="$ Max" />
                            </PriceInput>
                            <Checkbox>
                                <input type="checkbox" />
                                Fixed-Price (272)
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" />
                                Less than $100 (87)
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" />
                                $100 to $500 (82)
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" />
                                $500 - $1K (27)
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" />
                                $1K - $5K (59)
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" />
                                $5K+ (17)
                            </Checkbox>
                            <PriceInput>
                                <input type="text" placeholder="$ Min" />
                                <input type="text" placeholder="$ Max" />
                            </PriceInput>
                        </FilterSection>
                    </FiltersContainer>
                    <JobsList>
                        {jobs.map((job, index) => (
                            <JobCard onClick={()=>{window.location.href = "details"}} key={index}>
                                <JobHeader>
                                    <PostedTime>{job.postedTime}</PostedTime>
                                    <div>
                                        <span>❤️</span>
                                    </div>
                                </JobHeader>
                                <JobTitle>{job.title}</JobTitle>
                                <JobDetails>
                                    <span>{job.jobType}</span>
                                    <span>{job.experienceLevel}</span>
                                    <span>Est. Budget: {job.budget}</span>
                                </JobDetails>
                                <p>{job.description}</p>
                                <Tags>
                                    {job.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                                </Tags>
                                <JobDetails>
                                    <span>{job.paymentVerified}</span>
                                    <span>{job.spent}</span>
                                    <span>{job.location}</span>
                                    <span>{job.proposals}</span>
                                </JobDetails>
                            </JobCard>
                        ))}
                    </JobsList>
                </Jobs>
                
            </JobsContainer>
            <FooterBar/>
        </JobsPage>
        </ThemeProvider>
    );
}
const JobsPage = styled.div`
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    background-color:  ${({theme})=>theme.background};
`
const JobsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: auto;
    width: 100%;
    margin-bottom: 50px;
    color:  ${({theme})=>theme.color};
    background-color:  ${({theme})=>theme.background};
    @media (max-width: 768px) {
        height: auto;
        padding: 20px 0;
    }
`

const Jobs = styled.div`
    display: flex;
    justify-self: end;
    width: 90.3%;
    height: 100%;

    @media (max-width: 1024px) {
        width: 95%;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        width: 90%;
        margin: 0 auto;
    }
`
const Header = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 50px;
    background-color:${({theme})=>theme.secBackground};
    @media (max-width: 771px) {
        display: none;
    
    }
`
const HeaderContent = styled.div`
    display: flex;
    justify-self: end;
    justify-content: space-between;
    align-items: center;
    width: 90.3%;
    height: 100%;
`
const HeaderText = styled.h2`
    color:${({theme})=>theme.color};
    font-optical-sizing: auto;
    font-size: 1.15rem;
    font-weight: 500;
    font-style: normal;
`
const Path = styled.div`
    display: flex;
    color:${({theme})=>theme.secColor};
    font-size: 0.9rem;
    margin-right: 20px;
`
const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 20px;
    background-color: ${({theme})=>theme.background};;
    border: 1px solid  ${({theme})=>theme.weakBorderColor};
    @media (max-width: 771px) {
        display: none;
    
    }
`
const JobsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 20px;
    gap: 10px;
`
const JobCard = styled.div`
    background-color:  ${({theme})=>theme.background};
    border: 1px solid  ${({theme})=>theme.weakBorderColor};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color:  ${({theme})=>theme.secBackground}; // Change color on hover
    }
`

const JobHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const PostedTime = styled.span`
    color: #666;
    font-size: 0.9rem;
`

const JobTitle = styled.h3`
    font-size: 1.1rem;
    color: #0A65CC;
    margin: 0;
`

const JobDetails = styled.div`
    display: flex;
    gap: 15px;
    color: #666;
    font-size: 0.9rem;
`

const Tags = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`

const Tag = styled.span`
    background-color:  ${({theme})=>theme.iconWrapper};
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.85rem;
    color:  ${({theme})=>theme.secColor};
`

const FilterSection = styled.div`
    margin-bottom: 0px;
`;

const FilterTitle = styled.h3`
    font-size: 1rem;
    margin-bottom: 5px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    background-color: ${({theme})=>theme.background};;
    color: ${({theme})=>theme.color};;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Checkbox = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    input {
        margin-right: 10px;
        background-color: ${({theme})=>theme.background};;
        border: 1px solid #ccc;
        cursor: pointer;
    }
`;

const PriceInput = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    input {
        width: 80px;
        margin-right: 5px;
        padding: 8px;
        color: ${({theme})=>theme.color};
        background-color: ${({theme})=>theme.background};;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
    }
    span {
        margin-right: 5px;
        color: #666;
    }
`;