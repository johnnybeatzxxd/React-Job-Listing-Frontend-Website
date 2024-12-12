import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import LogoImage from '../assets/Logo.svg'
import SearchLogo from '../assets/fi_search.svg'


export function NavigationBar(){
    return (
        <Navbar>
                <Tabs>
                    <NavTab>Home</NavTab>
                    <NavTab>Find Jobs</NavTab>
                    <NavTab>Employers</NavTab>
                    <NavTab>Candidates</NavTab>
                </Tabs>
                <Navbody>
                <LeftSpace/>
                    <Logo src={LogoImage} alt="Logo" />
                    <Search>
                        <CountryDropdown />
                        <SLogo src={SearchLogo} alt="Logo" />
                        <SearchInput placeholder='Job tittle, keyword, company'/>
                    </Search>
                    <Navbuttons>
                        <NavButton style={{backgroundColor:"white",color:"#0A65CC"}}>Sign in</NavButton>
                        <NavButton>Post A Job</NavButton>

                    </Navbuttons>
                </Navbody>
            </Navbar>
    )
}

const Navbar = styled.div`
    display: flex;
    flex-direction: column;
    height: 14%;
    width: 100vw;
    border-bottom: 1px solid grey;
`
const NavTab = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    background-color: transparent;
    color: #3d3d3d;
    outline: none;
    border-radius: 0px;
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-size: 0.8rem;
    font-weight: 100;
    font-style: normal;
    &:hover {
        border-bottom: 3px solid #0A65CC;
    }
`
const Tabs  = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #F1F2F4;
    width: 100%;
    height: 25%;
    justify-content: center;
    align-items: center;
    
    gap: 5%;
`
const LeftSpace = styled.div`
    padding-left: 130px;
`

const Navbody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: start;
    padding-top: 15px;
    padding-bottom: 10px;

    
`
const Logo = styled.img`
    display: flex;
    max-width: 100%;
    height: auto;
`
const Search = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    height: 100%;
    border: 1px solid lightgray;
    margin-left: 32px;
    border-radius: 5px;
`
const Dropdown = styled.select`
    border-radius: 5px;
    outline: none;
    border: none;
    border-right: 0.5px solid lightgrey;
    background-color: white;
    color:black
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
    color: black
`
const Navbuttons = styled.div`
    display: flex;
    justify-content: end;
    margin-left: 0%;
    gap: 10px;
    width: 30%;
    height: 100%;
    margin-right: 20px;
`
const NavButton = styled.button`
    background-color:#0A65CC;
    border: 1px solid #0A65CC;
    border-radius: 3px;
    color: white;
    
`
const CountryDropdown = () => {
    const countries = [
        { name: 'United States', code: 'US', flag: '🇺🇸' },
        { name: 'Canada', code: 'CA', flag: '🇨🇦' },
        { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
        // Add more countries as needed
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
