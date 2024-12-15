import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import LogoImage from '../assets/Logo.svg'
import LogoDark from '../assets/Logo-dark.svg'
import SearchLogo from '../assets/fi_search.svg'
import MoonIcon from '../assets/moon.svg'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'


export function NavigationBar(){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
      };
    return (   
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>     
        <Navbar>
                <Tabs>
                    <NavTab onClick={()=>{window.location.href = "/"}}>Home</NavTab>
                    <NavTab onClick={()=>{window.location.href = "find-jobs"}}>Find Jobs</NavTab>
                    <NavTab>Employers</NavTab>
                    <NavTab onClick={()=>{window.location.href = "dashboard"}}>Dashboard</NavTab>
                    <ThemeIcon onClick={toggleTheme} src={MoonIcon} alt="Theme Toggle" />
                </Tabs>
                <Navbody>
                <LeftSpace/>
                    <Logo src={isDarkMode ? LogoDark :LogoImage} alt="Logo" />
                    <SearchWrapper>
                        <Search>
                            <CountryDropdown />
                            <SLogo src={SearchLogo} alt="Logo" />
                            <SearchInput placeholder='Job title, keyword, company'/>
                        </Search>
                    </SearchWrapper>
                    <Navbuttons>
                        <NavButton>Sign in</NavButton>
                        <NavButton style={{background:"#0A65CC",color:"white"}}>Post A Job</NavButton>

                    </Navbuttons>
                </Navbody>
            </Navbar>
            </ThemeProvider>
    )
}

const Navbar = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid grey;
`
const NavTab = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.secColor};
    outline: none;
    border-radius: 0px;
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-size: 0.8rem;
    font-weight: 100;
    font-style: normal;
    border-bottom: 2px solid transparent;
    &:hover {
        border-bottom: 2px solid #0A65CC;
    }
`
const Tabs  = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${({ theme }) => theme.secBackground};
    width: 100%;
    height: 25%;
    justify-content: center;
    align-items: center;
    gap: 5%;
    position: relative;
`
const LeftSpace = styled.div`
    padding-left: 130px;

    @media (max-width: 768px) {
        padding-left: 10px;
    }
`

const Navbody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 10px;
    background-color: ${({ theme }) => theme.background};

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }

`
const Logo = styled.img`
    display: flex;
    max-width: 100%;
    height: auto;
`
const SearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-grow: 1;
`
const Search = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    width: 100%;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.weakBorderColor};
    border-radius: 5px;

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 10px;
    }
`
const Dropdown = styled.select`
    border-radius: 5px;
    outline: none;
    border: none;
    border-right: 0.5px solid lightgrey;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color}
`
const SLogo = styled.img`
    margin-left: 15px;
    height: 20px;
    width: 20px;
`
const SearchInput = styled.input`
    width:80%;
    margin-left: 15px;
    background-color: transparent;
    border:none;
    outline: none;
    color: ${({ theme }) => theme.color};

    @media (max-width: 768px) {
        width: 70%;
    }
`
const Navbuttons = styled.div`
    display: flex;
    justify-content: end;
    margin-left: 0%;
    gap: 10px;
    width: 30%;
    margin-right: 20px;

    @media (max-width: 768px) {
        justify-content: center;
        width: 100%;
        margin-top: 10px;
    }
`
const NavButton = styled.button`
    background-color: ${({ theme }) => theme.background};
    border: 1px solid #0A65CC;
    border-radius: 3px;
    color:${({ theme }) => theme.color} ;
`
const CountryDropdown = () => {
    const countries = [
        { name: 'United States', code: 'US', flag: '🇺🇸' },
        { name: 'Canada', code: 'CA', flag: '🇨🇦' },
        { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
    ];

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    return (
        <Dropdown onChange={(e) => setSelectedCountry(countries[e.target.value])}>
            {countries.map((country, index) => (
                <option key={country.code} value={index}>
                    {country.flag} {country.name}
                </option>
            ))}
        </Dropdown>
    );
};

const ThemeIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 1.2rem;
`

