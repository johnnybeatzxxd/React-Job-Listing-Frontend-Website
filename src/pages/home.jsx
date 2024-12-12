import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from '../components/navbar'
import { SearchInbox } from '../components/search-inbox'
import { Location } from '../components/location-dropdown'
import CoverImage from '../assets/Illustration.png'
import Graphics from '../assets/pen-nib-duotone 1.svg'
import Coding from '../assets/code-duotone 1.svg'
import Marketing from '../assets/megaphone-simple-duotone 1.svg'
import Video from '../assets/monitor-play-duotone 1.svg'
import Music from '../assets/music-notes-duotone 1.svg'
import Health from '../assets/first-aid-kit-duotone 1.svg'
import Finance from '../assets/chart-bar-horizontal-duotone 1.svg'
import Database from '../assets/database-svgrepo-com.svg'

export function HomePage(){
    const categoriesData = [
        { title: "Graphics & Design", positions: "357 Open position", icon: <img src={Graphics} alt="Graphics & Design Icon" /> },
        { title: "Code & Programming", positions: "312 Open position", icon: <img src={Coding} alt="Code & Programming Icon" /> },
        { title: "Digital Marketing", positions: "297 Open position", icon: <img src={Marketing} alt="Digital Marketing Icon" /> },
        { title: "Video & Animation", positions: "247 Open position", icon: <img src={Video} alt="Video & Animation Icon" /> },
        { title: "Music & Audio", positions: "204 Open position", icon: <img src={Music} alt="Music & Audio Icon" /> },
        { title: "Account & Finance", positions: "167 Open position", icon: <img src={Finance} alt="Account & Finance Icon" /> },
        { title: "Health & Care", positions: "145 Open position", icon: <img src={Health} alt="Health & Care Icon" /> },
        { title: "Data & Science", positions: "95 Open position", icon: <img src={Database} alt="Data & Science Icon" style={{ width: '24px', height: '24px' }} /> },
    ];
        return(
        <Home>
            <NavigationBar/>
            <HomeHeader>
                <Header>
                    <Content> 
                        <Text>Find a job that suits your interest & skills. </Text>
                        <SubText>True strength lies in grace, navigating challenges with poise and embracing opportunities with wisdom.</SubText>
                        <SearchBox>
                            <SearchInbox></SearchInbox>
                            <Location></Location>
                            <FindButton>Find Jobs</FindButton>
                        </SearchBox>
                        <SubTexts>
                            <SubText style={{fontSize:"0.8rem"}}>Suggestion: </SubText>
                            <SubText style={{fontSize:"0.8rem",color:"#1d1d1d"}}> {"Designer, "}</SubText>
                            <SubText style={{fontSize:"0.8rem",color:"#1d1d1d"}}>  Programing,</SubText>
                            <SubText style={{fontSize:"0.8rem",color:"#0A65CC "}}>  Digital Marketing,</SubText>
                            <SubText style={{fontSize:"0.8rem",color:"#1d1d1d"}}>  Video,</SubText>
                            <SubText style={{fontSize:"0.8rem",color:"#1d1d1d"}}>  Animation,</SubText>
                            
                            
                        </SubTexts>
                        
                    </Content>
                    <Image>
                        <Png src={CoverImage} alt="Illustration"/>
                    </Image>
                    
                </Header>
                
            </HomeHeader>
            <HomeBody>
                <Body>
                    <Title>
                    Popular category
                     </Title>
                    <Categories>
                        {categoriesData.map((category, index) => (
                            <CategoryCard key={index}>
                                <IconWrapper>
                                    {category.icon}
                                </IconWrapper>
                                <TextContent>
                                    <CategoryTitle>{category.title}</CategoryTitle>
                                    <CategoryPositions>{category.positions}</CategoryPositions>
                                </TextContent>
                            </CategoryCard>
                        ))}
                    </Categories>
                </Body>
        
            </HomeBody>
            <Footer>
                <Foot>
                    <FooterContent>
                        <FooterSection>
                            <img src={Finance} alt="Jobpilot" style={{ height: '30px' }} />
                            <div>Call now: (+251) 977276556 </div>
                            
                        </FooterSection>
                        {footerLinks.map((section, index) => (
                            <FooterSection key={index}>
                                <FooterTitle>{section.title}</FooterTitle>
                                {section.links.map((link, linkIndex) => (
                                    <FooterLink key={linkIndex} href={link.href}>{link.name}</FooterLink>
                                ))}
                            </FooterSection>
                        ))}
                         <FooterBottom>
                        <Copyright>© 2024 Jobpilot - Job Portal. All rights Reserved</Copyright>
                        <SocialLinks>
                            <FooterLink href="#"><i className="fab fa-facebook-f"></i></FooterLink>
                            <FooterLink href="#"><i className="fab fa-youtube"></i></FooterLink>
                            <FooterLink href="#"><i className="fab fa-instagram"></i></FooterLink>
                            <FooterLink href="#"><i className="fab fa-twitter"></i></FooterLink>
                        </SocialLinks>
                    </FooterBottom>
                    </FooterContent>
                   
                </Foot>
            </Footer>
        </Home>
    )
}
const Home = styled.div`
    height: 100vh;
    width: 100vw;
`
const HomeHeader = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    width: 100%;
    background-color:#F1F2F4;
`
const Header = styled.div`
    display: flex;
    justify-self: end;
    width: 90.5%;
    height: 100%;

`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    height: 90%;
    border:0px solid blue;
`
const Text = styled.h1`
    display: flex;
    padding-top: 90px;
    margin:0px;
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-size: 3.5rem;
    font-weight: 300;
    font-style: normal;

`
const SubText = styled.h1`
    display: flex;
    //padding-top: 14px;
    padding-bottom: 15px;
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-size: 1.0rem;
    font-weight: 100;
    font-style: normal;
    color: #5E6670;
`
const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items : center;
    width: 90%;
    height: 70px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #E4E5E8;
    margin: 0px;
    padding-right: 5px;
    
` 
const FindButton = styled.button`
    background-color:#0A65CC;
    border: 1px solid #0A65CC;
    border-radius: 3px;
    color: white;
    margin-left: auto;
    height: 80%;
    justify-self:end;
    
`
const Image = styled.div`
    display: flex;
    flex: 1;
    height: 90%;
    justify-content: center;
    align-items: center;
    border: 0px solid yellow;
`
const Png = styled.img``


const SubTexts = styled.div`
    display: flex;
    flex-direction: row;

`

const HomeBody = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 60%;
`
const Body = styled.div`
    display: flex; 
    flex-direction:column ;
    justify-self: end;
    width: 90.5%;
    height: 100%;
`
const Title = styled.h1`
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-size: 2.2rem;
    font-weight: 500 ;
    font-style: normal;
`
const Categories = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    height: 60%;
    width: 100%;
`

const CategoryCard = styled.div`
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`

const IconWrapper = styled.div`
    background-color: #E7F0FA;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #0A65CC;
    min-width: 48px;
    min-height: 48px;
`

const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const CategoryTitle = styled.h3`
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
`

const CategoryPositions = styled.span`
    color: #666;
    font-size: 0.9rem;
`
const Footer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
    width: 100%;
    height:40%;
    background-color: #18191C;
`
const Foot = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: end;
    width: 90.5%;
    height: 100%;
    color: white;
    padding: 40px 0;
`

const FooterContent = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
`

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const FooterTitle = styled.h3`
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
`

const FooterLink = styled.a`
    color: #9CA3AF;
    text-decoration: none;
    font-size: 0.9rem;
    &:hover {
        color: white;
    }
`

const FooterBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    background-color: #18191C;
    border-top: 1px solid #333;
`

const Copyright = styled.p`
    color: #9CA3AF;
    font-size: 0.9rem;
    margin: 0;
`

const SocialLinks = styled.div`
    display: flex;
    gap: 16px;
`

const footerLinks = [
   
    {
        title: "Candidate",
        links: [
            { name: "Browse Jobs", href: "#" },
            { name: "Browse Employers", href: "#" },
            { name: "Candidate Dashboard", href: "#" },
            { name: "Saved Jobs", href: "#" },
        ],
    },
    {
        title: "Employers",
        links: [
            { name: "Post a Job", href: "#" },
            { name: "Browse Candidates", href: "#" },
            { name: "Employers Dashboard", href: "#" },
            { name: "Applications", href: "#" },
        ],
    },
    
];

