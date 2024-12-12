import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { NavigationBar } from '../components/navbar'
import { SearchInbox } from '../components/search-inbox'
import { Location } from '../components/location-dropdown'
import CoverImage from '../assets/Illustration.png'
export function HomePage(){
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