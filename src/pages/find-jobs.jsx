import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from '../components/navbar.jsx'
import { SearchInbox } from '../components/search-inbox.jsx'
import { Location } from '../components/location-dropdown.jsx'
import { FooterBar } from '../components/footer.jsx'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'
import { fetchJobs } from '../utils/job-requests.js'
import { FourSquare } from "react-loading-indicators";

export default function FindJobs(){
    const [isDarkMode, setIsDarkMode, profile] = useContext(Context);
    const [filters, setFilters] = useState({
        category: '',
        experienceLevel: '',
        jobType: [],
        skills: [],
        priceRange: {
            hourly: { min: '', max: '' },
            fixed: { min: '', max: '' }
        }
    });
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState({
        query: '',
        countryCode: 'ALL'
    });

    const professionLevelOptions = [
        'Entry',
        'Intermediate', 
        'Senior',
        'Lead',
        'Expert'
    ];

    const initialVisibleSkills = [
        'Python',
        'TypeScript',
        'JavaScript',
        'React',
        'Node.js',
    ];

    const additionalSkills = [
        'PHP',
        'Ruby',
        'Swift',
        'Go',
        'Rust',
        'SQL',
        'MongoDB',
        'AWS',
        'Docker',
        'Kubernetes'
    ];

    const visibleSkills = showAllSkills 
        ? [...initialVisibleSkills, ...additionalSkills]
        : initialVisibleSkills;

    const handleCategoryChange = (e) => {
        setFilters({ ...filters, category: e.target.value });
    };

    const handleExperienceChange = (level) => {
        setFilters(prev => ({
            ...prev,
            experienceLevel: prev.experienceLevel === level ? '' : level
        }));
    };

    const handleJobTypeChange = (type) => {
        if (filters.jobType.includes(type)) {
            setFilters({
                ...filters,
                jobType: filters.jobType.filter(t => t !== type)
            });
        } else {
            setFilters({
                ...filters,
                jobType: [...filters.jobType, type]
            });
        }
    };

    const handlePriceRangeChange = (type, field, value) => {
        setFilters({
            ...filters,
            priceRange: {
                ...filters.priceRange,
                [type]: {
                    ...filters.priceRange[type],
                    [field]: value
                }
            }
        });
    };

    const handleSkillChange = (skill) => {
        setFilters(prev => {
            if (prev.skills.includes(skill)) {
                return {
                    ...prev,
                    skills: prev.skills.filter(s => s !== skill)
                };
            }
            return {
                ...prev,
                skills: [...prev.skills, skill]
            };
        });
    };

    const applyFilters = () => {
        console.log('Applying filters:', filters);
    };

    const loadJobs = async () => {
        setLoading(true);
        try {
            const requestData = {
                query: searchParams.query,
                filters: filters,
                countryCode: searchParams.countryCode
            };
            
            const response = await fetchJobs(requestData);
            if (response.success) {
                setJobs(response.message || []);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadJobs();
    }, [filters, searchParams]); 

    useEffect(() => {
        
        const params = new URLSearchParams(window.location.search);
        setSearchParams({
            query: params.get('query') || '',
            countryCode: params.get('country') || 'ALL'
        });
    }, []);

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
                            <Select value={filters.category} onChange={handleCategoryChange}>
                                <option value="">Select Categories</option>
                                <option value="technology">Technology</option>
                            </Select>
                        </FilterSection>
                        <FilterSection>
                            <FilterTitle>Experience level</FilterTitle>
                            {professionLevelOptions.map(level => (
                                <CheckboxLabel key={level}>
                                    <CheckboxInput 
                                        type="checkbox"
                                        checked={filters.experienceLevel === level}
                                        onChange={() => handleExperienceChange(level)}
                                    />
                                    <CheckboxText>{level}</CheckboxText>
                                </CheckboxLabel>
                            ))}
                        </FilterSection>
                        <FilterSection>
                            <FilterHeader>
                                <FilterTitle>Skills</FilterTitle>
                                <ExpandIcon onClick={() => setShowAllSkills(!showAllSkills)}>
                                    {showAllSkills ? '▼' : '▲'}
                                </ExpandIcon>
                            </FilterHeader>
                            <SkillsList>
                                {visibleSkills.map(skill => (
                                    <SkillCheckboxLabel key={skill}>
                                        <CheckboxInput
                                            type="checkbox"
                                            checked={filters.skills.includes(skill)}
                                            onChange={() => handleSkillChange(skill)}
                                        />
                                        <CheckboxText>{skill}</CheckboxText>
                                    </SkillCheckboxLabel>
                                ))}
                                <SeeMoreButton 
                                    onClick={() => setShowAllSkills(!showAllSkills)}
                                >
                                    {showAllSkills ? '▲ See less' : '▼ See more'}
                                </SeeMoreButton>
                            </SkillsList>
                        </FilterSection>
                        <FilterSection>
                            <FilterTitle>Job type</FilterTitle>
                            <CheckboxLabel>
                                <CheckboxInput 
                                    type="checkbox"
                                    checked={filters.jobType.includes('hourly')}
                                    onChange={() => handleJobTypeChange('hourly')}
                                />
                                <CheckboxText>Hourly</CheckboxText>
                            </CheckboxLabel>
                            {filters.jobType.includes('hourly') && (
                                <PriceInput>
                                    <input 
                                        type="number" 
                                        placeholder="$ Min"
                                        value={filters.priceRange.hourly.min}
                                        onChange={(e) => handlePriceRangeChange('hourly', 'min', e.target.value)}
                                    />
                                    <span>/ hr</span>
                                    <input 
                                        type="number" 
                                        placeholder="$ Max"
                                        value={filters.priceRange.hourly.max}
                                        onChange={(e) => handlePriceRangeChange('hourly', 'max', e.target.value)}
                                    />
                                </PriceInput>
                            )}
                            <CheckboxLabel>
                                <CheckboxInput 
                                    type="checkbox"
                                    checked={filters.jobType.includes('fixed')}
                                    onChange={() => handleJobTypeChange('fixed')}
                                />
                                <CheckboxText>Fixed-Price</CheckboxText>
                            </CheckboxLabel>
                        </FilterSection>
                       
                    </FiltersContainer>
                    <JobsList>
                        {loading ? (
                            <LoaderContainer>
                                <FourSquare color="#0B65C6" size="medium" text="" textColor="" />
                            </LoaderContainer>
                        ) : jobs.length > 0 ? (
                            jobs.map((job, index) => (
                                <JobCard key={index} {...job} />
                            ))
                        ) : (
                            <NoJobsMessage>No jobs found matching your criteria</NoJobsMessage>
                        )}
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
    color: #147df5;
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

const ApplyButton = styled.button`
    background-color: #147df5;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    
    &:hover {
        background-color: #0e63c7;
    }
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
`;

const CheckboxInput = styled.input`
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${({theme}) => theme.weakBorderColor};
    border-radius: 3px;
    margin-right: 8px;
    cursor: pointer;
    position: relative;
    background-color: ${({theme}) => theme.background};

    &:checked {
        background-color: #0A65CC;
        border-color: #0A65CC;
    }

    &:checked::after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 14px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const CheckboxText = styled.span`
    color: ${({theme}) => theme.color};
    font-size: 14px;
`;

const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const ExpandIcon = styled.span`
    cursor: pointer;
    color: ${({theme}) => theme.color};
    font-size: 12px;
`;

const SkillsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SkillCheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px 0;
`;

const SeeMoreButton = styled.button`
    background: none;
    border: none;
    color: #0A65CC;
    cursor: pointer;
    font-size: 14px;
    padding: 5px 0;
    margin-top: 5px;
    text-align: left;

    &:hover {
        text-decoration: underline;
    }
`;

const RadioLabel = styled(CheckboxLabel)`
    &:hover {
        background-color: ${({theme}) => theme.secBackground};
    }
`;

const RadioInput = styled(CheckboxInput)`
    border-radius: 50%;

    &:checked::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const RadioText = styled(CheckboxText)`
    font-size: 14px;
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    width: 100%;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: ${({theme}) => theme.color};
`;

const NoJobsMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: ${({theme}) => theme.secColor};
`;
