import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from '../components/navbar.jsx'
import { SearchInbox } from '../components/search-inbox.jsx'
import { Location } from '../components/location-dropdown.jsx'
import CoverImage from '../assets/Illustration.png'
import Graphics from '../assets/pen-nib-duotone 1.svg'
import Coding from '../assets/code-duotone 1.svg'
import Marketing from '../assets/megaphone-simple-duotone 1.svg'
import Video from '../assets/monitor-play-duotone 1.svg'
import Music from '../assets/music-notes-duotone 1.svg'
import Health from '../assets/first-aid-kit-duotone 1.svg'
import Finance from '../assets/chart-bar-horizontal-duotone 1.svg'
import Database from '../assets/database-svgrepo-com.svg'
import LogoImage from '../assets/Logo.svg'
import { FooterBar } from '../components/footer.jsx'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'

export function HomePage(){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
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
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
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
                            <SubText style={{fontSize:"0.8rem",color:`${({ theme }) => theme.color}`}}> {"Designer, "}</SubText>
                            <SubText style={{fontSize:"0.8rem",color:`${({ theme }) => theme.color}`}}>  Programing,</SubText>
                            <SubText style={{fontSize:"0.8rem",color:"#0A65CC "}}>  Digital Marketing,</SubText>
                            <SubText style={{fontSize:"0.8rem",color:`${({ theme }) => theme.color}`}}>  Video,</SubText>
                            <SubText style={{fontSize:"0.8rem",color:`${({ theme }) => theme.color}`}}>  Animation,</SubText>
                            
                            
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
            <FooterBar/>
        </Home>
        </ThemeProvider>
    )
}
const Home = styled.div`
    height: 100vh;
    width: 100vw;
    //overflow-x: hidden;
`
const HomeHeader = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    width: 100%;
    background-color:${({ theme }) => theme.secBackground};

    @media (max-width: 768px) {
        height: auto;
        padding: 20px 0;
    }
`
const Header = styled.div`
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
const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    height: 90%;
    border:0px solid blue;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        text-align: center;
        align-items: center;
    }
`
const Text = styled.h1`
    display: flex;
    padding-top: 90px;
    margin:0px;
    color: ${({ theme }) => theme.color} ;
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-size: 3.5rem;
    font-weight: 300;
    font-style: normal;

    @media (max-width: 1024px) {
        font-size: 2.8rem;
    }

    @media (max-width: 768px) {
        font-size: 2.2rem;
        padding-top: 40px;
        text-align: center;
        justify-content: center;
    }
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
    color: ${({ theme }) => theme.secColor};
`
const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items : center;
    width: 90%;
    height: 65px;
    background-color: ${({ theme }) => theme.background};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.weakBorderColor};
    margin: 0px;
    padding-right: 5px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        padding: 10px;
        gap: 10px;
    }
` 
const FindButton = styled.button`
    background-color:#0A65CC;
    border: 1px solid #0A65CC;
    border-radius: 3px;
    color: white;
    margin-left: auto;
    height: 80%;
    justify-self:end;
    padding: 0 20px;

    @media (max-width: 768px) {
        width: 100%;
        margin: 10px 0;
        height: 40px;
    }
    
`
const Image = styled.div`
    display: flex;
    flex: 1;
    height: 90%;
    justify-content: center;
    align-items: center;
    border: 0px solid yellow;

    @media (max-width: 810px) {
        height: 300px;
        margin-top: 20px;
    }
`
const Png = styled.img`
    max-width: 100%;
    height: auto;
`


const SubTexts = styled.div`
    display: flex;
    flex-direction: row;
    color: ${({ theme }) => theme.secColor};

    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
    }
`

const HomeBody = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 60%;
    background-color:  ${({ theme }) => theme.background};

    @media (max-width: 768px) {
        height: auto;
        padding: 20px 0;
    }
`
const Body = styled.div`
    display: flex; 
    flex-direction:column ;
    justify-self: end;
    width: 90.5%;
    height: 100%;
    background-color:  ${({ theme }) => theme.background};
    @media (max-width: 1024px) {
        width: 95%;
    }

    @media (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
    }
`
const Title = styled.h1`
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-size: 2.2rem;
    font-weight: 500 ;
    font-style: normal;
    color:${({ theme }) => theme.color};
    @media (max-width: 768px) {
        font-size: 1.8rem;
        text-align: center;
    }
`
const Categories = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 15px;
    height: auto;
    width: 95%;
    margin-bottom: 20px;
    margin-right: 20px;
    background-color:  ${({ theme }) => theme.background};

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

const CategoryCard = styled.div`
    background: ${({ theme }) => theme.background};
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 600px) {
        padding: 12px;
    }
`

const IconWrapper = styled.div`
    background-color: ${({theme})=>theme.iconWrapper};
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #0A65CC;
    min-width: 40px;
    min-height: 40px;
`

const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const CategoryTitle = styled.h3`
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.color};
`

const CategoryPositions = styled.span`
    color: #666;
    font-size: 0.8rem;
`