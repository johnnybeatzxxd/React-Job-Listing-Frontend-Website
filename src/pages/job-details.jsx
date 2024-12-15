import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from '../components/navbar'
import { SearchInbox } from '../components/search-inbox'
import { Location } from '../components/location-dropdown'
import { FooterBar } from '../components/footer.jsx'
import { ApplicationModal } from '../components/application-modal.jsx'
import BriefCase from '../assets/briefcase.svg'
import Calender from '../assets/CalendarBlank.svg'
import Map from '../assets/MapTrifold.svg'
import Wallet from '../assets/Wallet.svg'
import Timer from '../assets/Timer.svg'
import Stack from '../assets/Stack.svg'
import Linkdin from '../assets/linkdin.svg'
import Twitter from '../assets/twitter.svg'
import Facebook from '../assets/facebook.svg'
import Email from '../assets/email.svg'



const jobDescriptionData = {
    description: `Veistar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!

Here at Veistar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.

The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure and scalable features for our clients on the Shopify platform

Want to work with us? You're in good company!`,

    requirements: [
        "Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on",
        "3+ years of experience in back-end development working either with multiple smaller projects simultaneously or large-scale applications",
        "Experience with HTML, JavaScript, CSS, PHP, Symphony and/or Laravel",
        "Working regularly with APIs and Web Services (REST, GraphQL, SOAP, etc)",
        "Have experience in Agile application development, commercial off-the-shelf software, middleware, servers and storage, and database management",
        "Familiarity with version control and project management systems (e.g., Github, Jira)",
        "Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on",
        "Ambitious and hungry to grow your career in a fast-growing agency"
    ],

    desirable: [
        "Working knowledge of eCommerce platforms, ideally Shopify but also others e.g. Magento, WooCommerce, Visualsoft or similar ecommerce migrations"
    ],

    salary: {
        amount: "$100,000 - $120,000",
        period: "Yearly salary"
    },

    location: {
        city: "Dhaka",
        country: "Bangladesh"
    },

    details: {
        posted: "14 Jun, 2021",
        expires: "14 Aug, 2021",
        level: "Entry Level",
        experience: "$50k-80k/month",
        education: "Graduation"
    }

};

export function JobDetails(){
    const [modal, setModal] = useState(false);

    return(
    <DetailsPage>
        <NavigationBar></NavigationBar>
        <Header>
            <HeaderContent>
                <HeaderText>Job Details</HeaderText>
                <Path>Home / Find Job / Django / Job Details</Path>
                </HeaderContent>
            </Header>
        <DetailsContainer>
            <Details>
                <DetailsHeader>
                    <HeaderLeft>
                        <CompanyLogo>
                            <img src={BriefCase} alt="" />
                        </CompanyLogo>
                        <JobInfo>
                            <JobTitle>Senior UX Designer</JobTitle>
                            <CompanyDetails>
                                <span>at Facebook</span>
                                <span>•</span>
                                <span>FULL-TIME</span>
                                <span>•</span>
                                <span>Featured</span>
                            </CompanyDetails>
                        </JobInfo>
                    </HeaderLeft>
                    <HeaderRight>
                        <SaveButton>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="#7C8493" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </SaveButton>
                        <ApplyButton onClick={()=>{setModal(true)}}>
                            Apply Now
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </ApplyButton>
                    </HeaderRight>
                </DetailsHeader>
                <DetailsBody>
                
                    <DetailsDescription>
                        <div>
                            <h3>Job Description</h3>
                            <p>{jobDescriptionData.description}</p>
                        </div>
                        
                        <div>
                            <h3>Requirements</h3>
                            <ul>
                                {jobDescriptionData.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3>Desirable</h3>
                            <ul>
                                {jobDescriptionData.desirable.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </DetailsDescription>
                    <JobInformation>
                        <FirstSection>
                            <SalarySection>
                                <h4 style={{margin:"0px"}}>Salary (USD)</h4>
                                <Amount>{jobDescriptionData.salary.amount}</Amount>
                                <Period>{jobDescriptionData.salary.period}</Period>
                            </SalarySection>
                            
                            <LocationSection>
                                <img src={Map} />
                                    <h4 style={{margin:"0px"}}>Job Location</h4>
                                    <Period>{jobDescriptionData.location.city}, {jobDescriptionData.location.country}</Period>
                                
                            </LocationSection>
                        </FirstSection>
                        
                        <JobOverview>
                            <h3>Job Overview</h3>
                            <DetailsGrid>
                                <DetailItem>
                                <img src={Calender} />
                                    <div>
                                        <Label>JOB POSTED:</Label>
                                        <Value>{jobDescriptionData.details.posted}</Value>
                                    </div>
                                </DetailItem>
                                <DetailItem>
                                    <img src={Timer} />
                                    <div>
                                        <Label>JOB EXPIRE IN:</Label>
                                        <Value>{jobDescriptionData.details.expires}</Value>
                                    </div>
                                </DetailItem>
                                <DetailItem>
                                    <img src={Stack} />
                                    <div>
                                        <Label>JOB LEVEL:</Label>
                                        <Value>{jobDescriptionData.details.level}</Value>
                                    </div>
                                </DetailItem>
                                <DetailItem>
                                    <img src={Wallet} />
                                    <div>
                                        <Label>EXPERIENCE</Label>
                                        <Value>{jobDescriptionData.details.experience}</Value>
                                    </div>
                                </DetailItem>
                                <DetailItem>
                                    <img src={BriefCase} />
                                    <div>
                                        <Label>EDUCATION</Label>
                                        <Value>{jobDescriptionData.details.education}</Value>
                                    </div>
                                </DetailItem>
                            </DetailsGrid>
                        </JobOverview>
                        <Share>
                            <ShareText>Share this job:</ShareText>
                            <CopyButton>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="#0B65C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.33333 10H2.66667C2.31305 10 1.97391 9.85953 1.72386 9.60948C1.47381 9.35943 1.33334 9.02029 1.33334 8.66667V2.66667C1.33334 2.31305 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31305 1.33334 2.66667 1.33334H8.66667C9.02029 1.33334 9.35943 1.47381 9.60948 1.72386C9.85953 1.97391 10 2.31305 10 2.66667V3.33334" stroke="#0B65C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Copy Link
                            </CopyButton>
                            <ShareButtons>
                                <IconButton>
                                    <img src={Linkdin} style={{height: "30px", width: "30px" }}/>
                                </IconButton>
                                <IconButton>
                                    <img src={Facebook} style={{height: "30px", width: "30px" }}/>
                                </IconButton>
                                <IconButton>
                                    <img src={Twitter} style={{height: "30px", width: "30px" }}/>
                                </IconButton>
                                <IconButton>
                                    <img src={Email} style={{height: "30px", width: "30px" }}/>
                                </IconButton>
                            </ShareButtons>
                        </Share>
                        <JobTags>
                            <ShareText>Job tags:</ShareText>
                            <Tag>Back-end</Tag>
                            <Tag>PHP</Tag>
                            <Tag>Laravel</Tag>
                            <Tag>Development</Tag>
                            <Tag>Front-end</Tag>
                        </JobTags>
                    </JobInformation>
                </DetailsBody>
            </Details>
        </DetailsContainer>  
        <FooterBar/>  
        <ApplicationModal isOpen={modal} onClose={() => setModal(false)} />
    </DetailsPage>)
};

const DetailsPage = styled.div`
    height: 100vh;
    width: 100vw;
    //overflow-x: hidden;
`
const Header = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 10%;
    background-color:#F1F2F4;
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
    font-optical-sizing: auto;
    font-size: 1.15rem;
    font-weight: 500;
    font-style: normal;
`
const Path = styled.div`
    display: flex;
    font-size: 0.9rem;
    color: #393939;
    margin-right: 20px;
`
const DetailsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    //height: 100%;
    width: 100%;
    margin-bottom: 50px;
    margin-right: 20px;

    @media (max-width: 768px) {
        height: auto;
        padding: 20px 0;
    }
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
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
const DetailsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height:20%;
    padding-top: 20px;
    background: white;
    margin-right: 20px;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
const CompanyLogo = styled.div`
    display: flex;
    width: 48px;
    height: 48px;
    background: #E4E5E8;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`
const JobInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const JobTitle = styled.h1`
    
    font-size: 18px;
    font-weight: 500;

    color: #25324B;
    margin: 0;
`
const CompanyDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #7C8493;
    font-size: 14px;
    
`
const HeaderRight = styled.div`
    display: flex;
    gap: 20px;
    align-items: center; 
    margin-right: 20px;
`
const ApplyButton = styled.button`
    background: #0B65C6;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background: #0952a5;
    }
    
`
const SaveButton = styled.button`
    background: transparent;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
`
const DetailsBody = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-right: 20px;
`
const DetailsDescription = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 20px;
    gap: 2px;
    background: white;

    h3 {
        color: #25324B;
        margin-bottom: 16px;
        font-size: 18px;
        font-weight: 500;
    }

    p {
        color: #3d4148;
        line-height: 1.6;
        margin-bottom: 16px;
    }

    ul {
        list-style-type: disc;
        padding-left: 20px;
        color: #3d4148;
        
        li {
            margin-bottom: 6px;
            line-height: 1.6;
        }
    }
`
const JobInformation = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height:fit-content;
    margin-top: 20px;
    margin-left: 25px;
    padding: 20px;
    border: 1px solid #aeb9cb;
    border-radius: 10px;
    gap: 20px;
    background: white;
`

const FirstSection = styled.div`
    display: flex;
    display: row;
    height: 150px;
    justify-content: center;
    gap:75px;
    border-radius: 20px;
    border-bottom: 1px solid grey;
`
const SecondSection = styled.div`
    display: flex;
    display: row;
    border: 1px solid black;
`
const SalarySection = styled.div`
    display: flex;
    flex-direction: column;
    //border: 2px solid red;
    justify-content: center;
    align-items: center;
    //margin-bottom: 20px;
`

const Amount = styled.div`
    color: #0B65C6;
    font-size: 1.2rem;
    font-weight: 500;
`

const Period = styled.div`
    color: #7C8493;
    font-size: 12px;
`

const LocationSection = styled.div`
    display: flex;
    flex-direction: column;
    //border: 2px solid red;
    justify-content: center;
    align-items: center;
`

const JobOverview = styled.div`
    h3 {
        margin-bottom: 16px;
        font-size: 16px;
    }
`

const DetailsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 45%;
`

const Label = styled.div`
    color: #7C8493;
    font-size: 10px;
    text-transform: uppercase;
`

const Value = styled.div`
    color: #25324B;
    font-size: 12px;
`

const Share = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 0;
    border-top: 1px solid #E4E5E8;
`

const ShareText = styled.span`
    color: #25324B;
    font-size: 14px;
    font-weight: 500;
`

const ShareButtons = styled.div`
    display: flex;
    gap: 8px;
`

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #E4E5E8;
    background: white;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #F1F2F4;
    }
`

const CopyButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #E4E5E8;
    background: #F8F9FB;
    color: #0B65C6;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #F1F2F4;
    }
`

const JobTags = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const Tag = styled.span`
    padding: 6px 12px;
    background: #E4E5E8;
    border-radius: 4px;
    color: #32353b;
    font-size: 14px;
`



