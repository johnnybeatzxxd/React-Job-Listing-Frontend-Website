import { useState, useEffect, useContext } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import LogoImage from '../assets/Logo.svg'
import LogoDark from '../assets/Logo-dark.svg'
import SearchLogo from '../assets/fi_search.svg'
import MoonIcon from '../assets/moon.svg'
import SunIcon from '../assets/sun.svg'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { Context } from '../App.jsx'
import { Location } from './location-dropdown.jsx'


export function NavigationBar(){
    const getInitialValues = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            query: params.get('query') || '',
            country: params.get('country') || 'ALL'
        };
    };

    const [isDarkMode, setIsDarkMode, profile] = useContext(Context);
    const [searchQuery, setSearchQuery] = useState(getInitialValues().query);
    const [selectedCountry, setSelectedCountry] = useState({ 
        code: getInitialValues().country,
        name: getInitialValues().country === 'ALL' ? 'All Countries' : getInitialValues().country,
        flag: getInitialValues().country === 'ALL' ? '🌍' : ''
    });
  
    const [isInitialMount, setIsInitialMount] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get('query') || '';
        const countryParam = params.get('country') || 'ALL';

        if (queryParam !== searchQuery) {
            setSearchQuery(queryParam);
        }

        const countries = [
            { name: 'All Countries', code: 'ALL', flag: '🌍' },
            { name: 'United States', code: 'US', flag: '🇺🇸' },
            { name: 'Canada', code: 'CA', flag: '🇨🇦' },
            { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
        ];

        const foundCountry = countries.find(c => c.code === countryParam) || countries[0];
        if (foundCountry.code !== selectedCountry.code) {
            setSelectedCountry(foundCountry);
        }
    }, [window.location.search]);

    const handleSearch = () => {
        const currentParams = new URLSearchParams(window.location.search);
        const currentQuery = currentParams.get('query');
        const currentCountry = currentParams.get('country');

        if (currentQuery === searchQuery && currentCountry === selectedCountry.code) {
            return;
        }

        const countryParam = selectedCountry.code;
        const queryParam = encodeURIComponent(searchQuery);
        
        const newUrl = `find-jobs?country=${countryParam}&query=${queryParam}`;
        window.history.pushState({}, '', newUrl);
        
        window.dispatchEvent(new Event('popstate'));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleCountryChange = (newCountry) => {
        setSelectedCountry(newCountry);
        
        const queryParam = encodeURIComponent(searchQuery);
        const newUrl = `find-jobs?country=${newCountry.code}&query=${queryParam}`;
        window.history.pushState({}, '', newUrl);
        window.dispatchEvent(new Event('urlchange'));
    };

    return (   
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>     
        <Navbar>
                <Tabs>
                    <NavTab onClick={()=>{window.location.href = "/"}}>Home</NavTab>
                    <NavTab onClick={()=>{window.location.href = "find-jobs"}}>Find Jobs</NavTab>
                    <NavTab>Employers</NavTab>
                    <NavTab onClick={()=>{window.location.href = "dashboard"}}>Dashboard</NavTab>
                    <ThemeIcon onClick={toggleTheme} src={isDarkMode ? SunIcon : MoonIcon} alt="Theme Toggle" />
                </Tabs>
                <Navbody>
                <LeftSpace/>
                    <Logo onClick={()=>{window.location.href = "/"}} src={isDarkMode ? LogoDark :LogoImage} alt="Logo" />
                    <SearchWrapper>
                        <Search>
                            <Location 
                                selectedCountry={selectedCountry} 
                                onCountrySelect={handleCountryChange} 
                            />
                            <SLogo onClick={handleSearch} src={SearchLogo} alt="Logo" style={{ cursor: 'pointer' }} />
                            <SearchInput 
                                placeholder='Job title, keyword, company'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                        </Search>
                    </SearchWrapper>
                    <Navbuttons>
                        <NavButton onClick={()=>{window.location.href = profile?"/dashboard":"/signin"}}>{!profile?"Sign in":"Dashboard"}</NavButton>
                        <NavButton onClick={()=> window.location.href = profile?.role === 'candidate' ? '/find-job' : '/post-job'} style={{background:"#0A65CC",color:"white"}}>
                            {profile?.role === 'candidate' ? 'Find A Job' : 'Post A Job'}
                        </NavButton>

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
    border-bottom: 1px solid ${({theme})=>theme.weakBorderColor};
`
const NavTab = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 89px;
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
    &:active {
        border-bottom: none;
    }
    &:focus {
        border-bottom: none;
        outline: none;
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

    @media (max-width: 905px) {
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

    @media (max-width: 905px) {
        flex-direction: column;
        align-items: center;
    }

`
const Logo = styled.img`
    display: flex;
    max-width: 100%;
    height: auto;
    cursor: pointer;
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
    padding-left: 10px;
    width: 100%;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.weakBorderColor};
    border-radius: 5px;

    @media (max-width: 905px) {
        width: 100%;
        margin-top: 10px;
    }
`
const Dropdown = styled.select`
    text-align: center;
    border-radius: 5px;
    outline: none;
    border: none;
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

    @media (max-width: 905px) {
        width: 100%;
    }
`
const Navbuttons = styled.div`
    display: flex;
    justify-content: end;
    margin-left: 0%;
    gap: 10px;
    width: 30%;
    margin-right: 20px;

    @media (max-width: 905px) {
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
    @media (max-width: 768px) {
        right: 25px;
        top: 65px;
        transform: translateY(-50%);
    }
    @media (max-width: 405px) {
        right: 20px;
        top: 71px;
        transform: translateY(-50%);
    }
`

