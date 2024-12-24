import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import LogoImage from '../assets/Logo.svg'


export function FooterBar(){
    return(
    <Footer>
        <Foot>
            <FooterContent>
                <FooterSection>
                    <img src={LogoImage} alt="Jobpilot" style={{ height: '30px' }} />
                    <div>Call now: (+251) 977XXXXXX </div>
                    
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
    </Footer>)
};

const Footer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
    width: 100%;
    height: 40%;
    background-color: #18191C;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
`
const Foot = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: end;
    width: 90.5%;
    height: 50%;
    color: white;
    padding: 40px 0;

    @media (max-width: 768px) {
        padding: 20px 0;
    }
`

const FooterContent = styled.div`
    display: flex;
    justify-content: space-around;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 768px) {
        align-items: center;
    }
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
    background-color: #18191C;
    border-top: 1px solid #333;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
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

