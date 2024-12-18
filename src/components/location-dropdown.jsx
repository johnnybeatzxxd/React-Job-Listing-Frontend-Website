import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import LogoImage from '../assets/Logo.svg'
import SearchLogo from '../assets/fi_search.svg'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'

export function Location(){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <CountryDropdown />
        </ThemeProvider>
    )
}

const Dropdown = styled.select`
    border-radius: 5px;
    outline: none;
    border: none;
    border-right: 0.0px solid lightgrey;
    background-color: ${({ theme }) => theme.background};
    color:${({ theme }) => theme.color}
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